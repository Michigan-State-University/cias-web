import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from 'i18n';

import { InterventionStatus } from 'models/Intervention';
import { CharacterType } from 'models/Character';
import { setAnimationStopPosition } from 'global/reducers/localState';
import { initialState as authInitialState } from 'global/reducers/auth/reducer';
import { createTestStore } from 'utils/testUtils/storeUtils';
import { setClientSize } from 'utils/testUtils';

import { saveNarratorMovement } from '../../QuestionSettings/Settings/actions';
import { UPDATE_NARRATOR_MOVEMENT } from '../../QuestionSettings/Settings/constants';
import QuestionNarrator from '../index';

const USER_ID = 'user-1';
const QUESTION_ID = 'question-1';
const STORED_POSITION = { x: 120, y: 80 };
const BOUNDARIES_WIDTH = 800;
const CONTAINER_SIZE = { width: 800, height: 600 };
const CHARACTER_SIZE = 100;

const buildState = ({
  draggable = true,
  status = InterventionStatus.DRAFT,
} = {}) => ({
  auth: { ...authInitialState, user: { id: USER_ID, roles: [] } },
  intervention: {
    intervention: { id: 'intervention-1', status, userId: USER_ID },
  },
  localState: {
    draggable,
    currentNarratorBlockIndex: 0,
    animationPosition: STORED_POSITION,
    previewData: { animation: 'standStill', type: 'BodyAnimation' },
  },
});

const createBoundaries = () => {
  const element = document.createElement('div');
  Object.defineProperty(element, 'clientWidth', { value: BOUNDARIES_WIDTH });
  Object.defineProperty(element, 'clientHeight', { value: 0 });
  return { current: element };
};

const renderNarrator = (stateOptions) => {
  const store = createTestStore(buildState(stateOptions));
  const dispatchSpy = jest.spyOn(store, 'dispatch');

  const utils = render(
    <Provider store={store}>
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MemoryRouter>
          <QuestionNarrator
            questionId={QUESTION_ID}
            animationBoundaries={createBoundaries()}
            settings={{
              voice: true,
              animation: true,
              character: CharacterType.PEEDY,
            }}
          />
        </MemoryRouter>
      </IntlProvider>
    </Provider>,
  );

  const handle = utils.container.querySelector('#lottie');
  const narrator = handle.parentElement;

  const container = narrator.parentElement;
  setClientSize(container, CONTAINER_SIZE.width, CONTAINER_SIZE.height);
  container.style.padding = '0px';
  setClientSize(narrator, CHARACTER_SIZE, CHARACTER_SIZE);
  narrator.style.margin = '0px';
  narrator.style.borderWidth = '0px';

  return { ...utils, handle, narrator, dispatchSpy };
};

const drag = (target, { from, to }) => {
  fireEvent.mouseDown(target, { clientX: from.x, clientY: from.y });
  fireEvent.mouseMove(document, { clientX: to.x, clientY: to.y });
  fireEvent.mouseUp(document, { clientX: to.x, clientY: to.y });
};

const expectNoPositionSaved = (dispatchSpy) => {
  const actions = dispatchSpy.mock.calls.map(([action]) => action);
  expect(actions.map((action) => action.payload?.type)).not.toContain(
    UPDATE_NARRATOR_MOVEMENT,
  );
  expect(actions.map((action) => action.type)).not.toContain(
    setAnimationStopPosition(0, 0).type,
  );
};

describe('<QuestionNarrator /> dragging (react-draggable)', () => {
  it('applies the stored animation position as a translate transform', () => {
    const { narrator } = renderNarrator();
    expect(narrator.style.transform).toBe(
      `translate(${STORED_POSITION.x}px,${STORED_POSITION.y}px)`,
    );
  });

  it('saves the dropped position (saveNarratorMovement + setAnimationStopPosition) after dragging by #lottie', () => {
    const { handle, dispatchSpy } = renderNarrator();

    drag(handle, { from: { x: 10, y: 10 }, to: { x: 110, y: 60 } });

    const expected = {
      x: STORED_POSITION.x + 100,
      y: STORED_POSITION.y + 50,
    };
    expect(dispatchSpy).toHaveBeenCalledWith(
      saveNarratorMovement(0, QUESTION_ID, expected),
    );
    expect(dispatchSpy).toHaveBeenCalledWith(
      setAnimationStopPosition(expected.x, expected.y),
    );
  });

  it('keeps the narrator inside its container (bounds="parent") and saves the clamped position', () => {
    const { handle, narrator, dispatchSpy } = renderNarrator();

    drag(handle, { from: { x: 0, y: 0 }, to: { x: 5000, y: 5000 } });

    const expected = {
      x: CONTAINER_SIZE.width - CHARACTER_SIZE,
      y: CONTAINER_SIZE.height - CHARACTER_SIZE,
    };
    expect(dispatchSpy).toHaveBeenCalledWith(
      saveNarratorMovement(0, QUESTION_ID, expected),
    );
    expect(dispatchSpy).toHaveBeenCalledWith(
      setAnimationStopPosition(expected.x, expected.y),
    );
    expect(narrator.style.transform).toBe(
      `translate(${STORED_POSITION.x}px,${STORED_POSITION.y}px)`,
    );
  });

  it('moves the narrator with the mouse while it is being dragged', () => {
    const { handle, narrator } = renderNarrator();

    fireEvent.mouseDown(handle, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(document, { clientX: 30, clientY: 40 });

    expect(narrator.style.transform).toBe(
      `translate(${STORED_POSITION.x + 30}px,${STORED_POSITION.y + 40}px)`,
    );

    fireEvent.mouseUp(document, { clientX: 30, clientY: 40 });
  });

  it('does not save a position when the narrator is not draggable (localState.draggable = false)', () => {
    const { handle, narrator, dispatchSpy } = renderNarrator({
      draggable: false,
    });

    drag(handle, { from: { x: 10, y: 10 }, to: { x: 110, y: 60 } });

    expectNoPositionSaved(dispatchSpy);
    expect(narrator.style.transform).toBe(
      `translate(${STORED_POSITION.x}px,${STORED_POSITION.y}px)`,
    );
  });

  it('does not save a position when editing is not possible (intervention not in draft)', () => {
    const { handle, narrator, dispatchSpy } = renderNarrator({
      status: InterventionStatus.PUBLISHED,
    });

    drag(handle, { from: { x: 10, y: 10 }, to: { x: 110, y: 60 } });

    expectNoPositionSaved(dispatchSpy);
    expect(narrator.style.transform).toBe(
      `translate(${STORED_POSITION.x}px,${STORED_POSITION.y}px)`,
    );
  });

  it('ignores a drag that starts outside the #lottie handle', () => {
    const { narrator, dispatchSpy } = renderNarrator();

    drag(narrator, { from: { x: 10, y: 10 }, to: { x: 110, y: 60 } });

    expectNoPositionSaved(dispatchSpy);
    expect(narrator.style.transform).toBe(
      `translate(${STORED_POSITION.x}px,${STORED_POSITION.y}px)`,
    );
  });
});
