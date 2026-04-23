import { GroupType } from 'models/QuestionGroup';
import { QuestionTypes } from 'models/Question';
import { SessionTypes } from 'models/Session';

import {
  prepareRaAnswerColumnMap,
  SUPPORTED_RA_QUESTION_TYPES,
  parsePredefinedParticipantsCsv,
  generatePredefinedParticipantsExampleCsv,
  prepareBulkCreatePredefinedParticipantsPayload,
} from '../utils';
import { RaAnswerColumnMap } from '../types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const makeRaSession = (overrides = {}) => ({
  id: 'session-ra-1',
  variable: 's1',
  type: SessionTypes.RA_SESSION,
  name: 'RA Session',
  position: 1,
  interventionId: 'int-1',
  interventionOwnerId: 'user-1',
  generatedReportCount: 0,
  createdAt: '2026-01-01',
  updatedAt: '2026-01-01',
  ...overrides,
});

const makeQuestionGroup = (questions: any[] = []) => ({
  id: 'group-1',
  type: GroupType.PLAIN,
  questions,
});

const makeSingleQuestion = (overrides = {}) => ({
  id: 'q1',
  type: QuestionTypes.SINGLE,
  body: { variable: { name: 'var1' } },
  title: 'Single Question',
  ...overrides,
});

const makeNumberQuestion = (overrides = {}) => ({
  id: 'q2',
  type: QuestionTypes.NUMBER,
  body: { variable: { name: 'var2' } },
  title: 'Number Question',
  ...overrides,
});

const makeDateQuestion = (overrides = {}) => ({
  id: 'q3',
  type: QuestionTypes.DATE,
  body: { variable: { name: 'var3' } },
  title: 'Date Question',
  ...overrides,
});

const makeUnsupportedQuestion = (overrides = {}) => ({
  id: 'q-unsupported',
  type: QuestionTypes.FREE_RESPONSE,
  body: { variable: { name: 'varUnsupported' } },
  title: 'Text Question',
  ...overrides,
});

// ---------------------------------------------------------------------------
// 1. prepareRaAnswerColumnMap
// ---------------------------------------------------------------------------

describe('prepareRaAnswerColumnMap', () => {
  it('returns empty map when raSession is null', () => {
    expect(prepareRaAnswerColumnMap(null, [])).toEqual({});
  });

  it('returns empty map when questionGroups is null', () => {
    expect(prepareRaAnswerColumnMap(makeRaSession() as any, null)).toEqual({});
  });

  it('returns empty map when questionGroups is empty', () => {
    expect(prepareRaAnswerColumnMap(makeRaSession() as any, [])).toEqual({});
  });

  it('builds correct map for supported question types', () => {
    const raSession = makeRaSession();
    const groups = [
      makeQuestionGroup([
        makeSingleQuestion(),
        makeNumberQuestion(),
        makeDateQuestion(),
      ]),
    ];

    const result = prepareRaAnswerColumnMap(raSession as any, groups);

    expect(result).toEqual({
      's1.var1': {
        questionId: 'q1',
        questionType: QuestionTypes.SINGLE,
        questionTitle: 'Single Question',
      },
      's1.var2': {
        questionId: 'q2',
        questionType: QuestionTypes.NUMBER,
        questionTitle: 'Number Question',
      },
      's1.var3': {
        questionId: 'q3',
        questionType: QuestionTypes.DATE,
        questionTitle: 'Date Question',
      },
    });
  });

  it('filters out unsupported question types', () => {
    const raSession = makeRaSession();
    const groups = [
      makeQuestionGroup([makeSingleQuestion(), makeUnsupportedQuestion()]),
    ];

    const result = prepareRaAnswerColumnMap(raSession as any, groups);

    expect(Object.keys(result)).toEqual(['s1.var1']);
    expect(result).not.toHaveProperty('s1.varUnsupported');
  });

  it('skips questions with no variable in body', () => {
    const raSession = makeRaSession();
    const groups = [
      makeQuestionGroup([
        {
          id: 'q-novar',
          type: QuestionTypes.NUMBER,
          body: {},
          title: 'No var',
        },
      ]),
    ];

    expect(prepareRaAnswerColumnMap(raSession as any, groups)).toEqual({});
  });

  it('uses questionVariable as questionTitle when title is absent', () => {
    const raSession = makeRaSession();
    const groups = [
      makeQuestionGroup([
        {
          id: 'q-notitle',
          type: QuestionTypes.NUMBER,
          body: { variable: { name: 'varX' } },
        },
      ]),
    ];

    const result = prepareRaAnswerColumnMap(raSession as any, groups);
    expect(result['s1.varX'].questionTitle).toBe('varX');
  });

  it('SUPPORTED_RA_QUESTION_TYPES contains exactly SINGLE, NUMBER, DATE', () => {
    expect(SUPPORTED_RA_QUESTION_TYPES).toEqual([
      QuestionTypes.SINGLE,
      QuestionTypes.NUMBER,
      QuestionTypes.DATE,
    ]);
  });

  it('reads the variable name from body.variable.name, not body.variable (regression guard: codebase-wide convention per QuestionBody.ts:26-40)', () => {
    const raSession = makeRaSession();
    const groupsWithWrongShape = [
      makeQuestionGroup([
        {
          id: 'q-wrong',
          type: QuestionTypes.SINGLE,
          body: { variable: 'strung-as-string' as any },
          title: 'Wrong shape',
        },
      ]),
    ];

    expect(
      prepareRaAnswerColumnMap(raSession as any, groupsWithWrongShape),
    ).toEqual({});

    const groupsWithRightShape = [
      makeQuestionGroup([
        {
          id: 'q-right',
          type: QuestionTypes.SINGLE,
          body: { variable: { name: 'mood' } },
          title: 'Right shape',
        },
      ]),
    ];

    expect(
      prepareRaAnswerColumnMap(raSession as any, groupsWithRightShape),
    ).toEqual({
      's1.mood': {
        questionId: 'q-right',
        questionType: QuestionTypes.SINGLE,
        questionTitle: 'Right shape',
      },
    });
  });
});

// ---------------------------------------------------------------------------
// 2. parsePredefinedParticipantsCsv (RA-answer extensions)
// ---------------------------------------------------------------------------

describe('parsePredefinedParticipantsCsv — RA answer extensions', () => {
  const normalizedHealthClinicsInfos = {};
  const isReportingIntervention = false;

  const raAnswerColumns: RaAnswerColumnMap = {
    's1.var1': {
      questionId: 'q1',
      questionType: QuestionTypes.SINGLE,
      questionTitle: 'Single Q',
    },
    's1.var2': {
      questionId: 'q2',
      questionType: QuestionTypes.NUMBER,
      questionTitle: 'Number Q',
    },
    's1.var3': {
      questionId: 'q3',
      questionType: QuestionTypes.DATE,
      questionTitle: 'Date Q',
    },
  };

  const makeRow = (extra: Record<string, string> = {}) => ({
    data: {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      externalId: 'EXT001',
      ...extra,
    },
  });

  it('captures valid RA answers on a row', () => {
    const data = [
      makeRow({
        's1.var1': '1',
        's1.var2': '42',
        's1.var3': '2026-04-22',
      }),
    ];

    const result = parsePredefinedParticipantsCsv(
      data as any,
      normalizedHealthClinicsInfos,
      isReportingIntervention,
      raAnswerColumns,
    );

    expect(result.raAnswerTypeMismatchCount).toBe(0);
    expect(result.unknownRaAnswerColumnCount).toBe(0);
    expect(result.participants[0].raAnswers).toEqual({
      's1.var1': '1',
      's1.var2': '42',
      's1.var3': '2026-04-22',
    });
    expect(result.participants[0].raAnswerTypeMismatches).toBeUndefined();
  });

  it('increments raAnswerTypeMismatchCount for invalid NUMBER', () => {
    const data = [makeRow({ 's1.var2': 'not-a-number' })];

    const result = parsePredefinedParticipantsCsv(
      data as any,
      normalizedHealthClinicsInfos,
      isReportingIntervention,
      raAnswerColumns,
    );

    expect(result.raAnswerTypeMismatchCount).toBe(1);
    expect(result.participants[0].raAnswerTypeMismatches).toContain('s1.var2');
  });

  it('increments raAnswerTypeMismatchCount for invalid DATE', () => {
    const data = [makeRow({ 's1.var3': 'not-a-date' })];

    const result = parsePredefinedParticipantsCsv(
      data as any,
      normalizedHealthClinicsInfos,
      isReportingIntervention,
      raAnswerColumns,
    );

    expect(result.raAnswerTypeMismatchCount).toBe(1);
    expect(result.participants[0].raAnswerTypeMismatches).toContain('s1.var3');
  });

  it('detects unknown dotted columns (unknownRaAnswerColumnCount)', () => {
    const data = [makeRow({ 'unknownSession.unknownVar': 'value' })];

    const result = parsePredefinedParticipantsCsv(
      data as any,
      normalizedHealthClinicsInfos,
      isReportingIntervention,
      raAnswerColumns,
    );

    expect(result.unknownRaAnswerColumnCount).toBe(1);
  });

  it('skips empty RA answer values (does not add to raAnswers)', () => {
    const data = [makeRow({ 's1.var2': '' })];

    const result = parsePredefinedParticipantsCsv(
      data as any,
      normalizedHealthClinicsInfos,
      isReportingIntervention,
      raAnswerColumns,
    );

    expect(result.participants[0].raAnswers).toBeUndefined();
    expect(result.raAnswerTypeMismatchCount).toBe(0);
  });

  it('returns zero counts when raAnswerColumns is empty (default)', () => {
    const data = [makeRow({ 's1.var1': 'something' })];

    const result = parsePredefinedParticipantsCsv(
      data as any,
      normalizedHealthClinicsInfos,
      isReportingIntervention,
    );

    // The dotted key is "unknown" since raAnswerColumns defaults to {}
    expect(result.unknownRaAnswerColumnCount).toBe(1);
    expect(result.raAnswerTypeMismatchCount).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// 3. generatePredefinedParticipantsExampleCsv (RA column extensions)
// ---------------------------------------------------------------------------

describe('generatePredefinedParticipantsExampleCsv — RA column extensions', () => {
  const raAnswerColumns: RaAnswerColumnMap = {
    's1.z_var': {
      questionId: 'qz',
      questionType: QuestionTypes.SINGLE,
      questionTitle: 'Z Single Q',
    },
    's1.a_var': {
      questionId: 'qa',
      questionType: QuestionTypes.NUMBER,
      questionTitle: 'A Number Q',
    },
    's1.m_var': {
      questionId: 'qm',
      questionType: QuestionTypes.DATE,
      questionTitle: 'M Date Q',
    },
  };

  it('appends RA columns sorted alphabetically to non-reporting rows', () => {
    const rows = generatePredefinedParticipantsExampleCsv(
      [],
      {},
      false,
      raAnswerColumns,
    );

    expect(rows.length).toBe(3);

    // Keys should be present and the order matches alphabetical sort
    const raKeys = Object.keys(rows[0]).filter((k) => k.includes('.'));
    expect(raKeys).toEqual(['s1.a_var', 's1.m_var', 's1.z_var']);
  });

  it('uses correct example value per question type', () => {
    const rows = generatePredefinedParticipantsExampleCsv(
      [],
      {},
      false,
      raAnswerColumns,
    );

    expect(rows[0]['s1.a_var']).toBe('42'); // NUMBER
    expect(rows[0]['s1.m_var']).toBe('2026-04-22'); // DATE
    expect(rows[0]['s1.z_var']).toBe('0'); // SINGLE
  });

  it('uses empty string for unsupported type in raAnswerColumns (default branch)', () => {
    const colsWithUnsupported: RaAnswerColumnMap = {
      's1.other': {
        questionId: 'qx',
        // Cast to simulate an unsupported type slipping through
        questionType: QuestionTypes.FREE_RESPONSE as any,
        questionTitle: 'Unsupported',
      },
    };

    const rows = generatePredefinedParticipantsExampleCsv(
      [],
      {},
      false,
      colsWithUnsupported,
    );

    expect(rows[0]['s1.other']).toBe('');
  });

  it('works without raAnswerColumns (backward compat — default {})', () => {
    const rows = generatePredefinedParticipantsExampleCsv([], {}, false);
    expect(rows.length).toBe(3);
    // No dotted keys expected
    expect(Object.keys(rows[0]).some((k) => k.includes('.'))).toBe(false);
  });

  it('appends RA columns to reporting-intervention rows', () => {
    const healthClinicOptions = [{ value: 'clinic-1', label: 'Clinic 1' }];
    const normalizedHealthClinicsInfos = {
      'clinic-1': {
        healthClinicName: 'Clinic 1',
        healthSystemName: 'System 1',
        deleted: false,
      },
    };

    const rows = generatePredefinedParticipantsExampleCsv(
      healthClinicOptions as any,
      normalizedHealthClinicsInfos,
      true,
      raAnswerColumns,
    );

    expect(rows.length).toBe(1);
    expect(rows[0]['s1.a_var']).toBe('42');
  });
});

// ---------------------------------------------------------------------------
// 4. prepareBulkCreatePredefinedParticipantsPayload
// ---------------------------------------------------------------------------

describe('prepareBulkCreatePredefinedParticipantsPayload', () => {
  const interventionId = 'int-1';

  const makeParticipant = (overrides = {}) => ({
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice@example.com',
    externalId: 'EXT001',
    iso: '',
    number: '',
    emailNotification: true,
    smsNotification: false,
    healthClinicOption: undefined,
    healthClinicName: '',
    healthSystemName: '',
    raAnswers: undefined,
    raAnswerTypeMismatches: undefined,
    ...overrides,
  });

  it('emits variableAnswers as empty object when raAnswers is undefined', () => {
    const values = { participants: [makeParticipant()] };
    const payload = prepareBulkCreatePredefinedParticipantsPayload(
      values as any,
      interventionId,
    );

    expect(payload.participants[0].variableAnswers).toEqual({});
  });

  it('forwards raAnswers as variableAnswers when present', () => {
    const raAnswers = { 's1.var1': '1', 's1.var2': '2026-04-22' };
    const values = { participants: [makeParticipant({ raAnswers })] };
    const payload = prepareBulkCreatePredefinedParticipantsPayload(
      values as any,
      interventionId,
    );

    expect(payload.participants[0].variableAnswers).toEqual(raAnswers);
  });

  it('includes interventionId in the payload root', () => {
    const values = { participants: [makeParticipant()] };
    const payload = prepareBulkCreatePredefinedParticipantsPayload(
      values as any,
      interventionId,
    );

    expect(payload.interventionId).toBe(interventionId);
  });

  it('emits variableAnswers for each participant independently', () => {
    const raAnswers1 = { 's1.var1': '10' };
    const raAnswers2 = { 's1.var1': '20' };
    const values = {
      participants: [
        makeParticipant({ raAnswers: raAnswers1 }),
        makeParticipant({ email: 'bob@example.com', raAnswers: raAnswers2 }),
      ],
    };

    const payload = prepareBulkCreatePredefinedParticipantsPayload(
      values as any,
      interventionId,
    );

    expect(payload.participants[0].variableAnswers).toEqual(raAnswers1);
    expect(payload.participants[1].variableAnswers).toEqual(raAnswers2);
  });
});
