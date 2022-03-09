import React, { ChangeEvent } from 'react';
import { useIntl } from 'react-intl';

import globalMessages from 'global/i18n/globalMessages';
import { SubstanceConsumption, TlfbQuestionAnswerBody } from 'models/Tlfb';
import { Substance } from 'models/Question';

import Text from 'components/Text';
import Radio from 'components/Radio';
import Row from 'components/Row';
import Divider from 'components/Divider';

import { UngroupedSubstancesForm } from './UngroupedSubstancesForm';

export type TlfbConsumptionFormProps = {
  substances: Substance[];
  grouped: boolean;
  loading: boolean;
  answerBody: Nullable<TlfbQuestionAnswerBody>;
  onChange: (newAnswerBody: TlfbQuestionAnswerBody) => void;
  mobile: boolean;
};

export const TlfbConsumptionForm = ({
  substances,
  grouped,
  loading,
  answerBody,
  onChange,
  mobile,
}: TlfbConsumptionFormProps) => {
  const { formatMessage } = useIntl();

  const { substancesConsumed, consumptions } = answerBody ?? {};

  const handleSubstancesConsumedChange =
    (value: boolean) => (_: boolean, event: ChangeEvent) => {
      // prevent outside click detection (due to spinner)
      event.stopPropagation();

      const newAnswerBody: TlfbQuestionAnswerBody = value
        ? {
            substancesConsumed: true,
            consumptions: [],
          }
        : {
            substancesConsumed: false,
            consumptions: null,
          };

      onChange(newAnswerBody);
    };

  const handleConsumptionsChange = (value: SubstanceConsumption[]) => {
    onChange({ substancesConsumed: true, consumptions: value });
  };

  return (
    <>
      <Row mt={16} mb={24} gap={32}>
        <Radio
          id="yes-option"
          disabled={loading}
          onChange={handleSubstancesConsumedChange(true)}
          checked={substancesConsumed === true}
        >
          <Text>{formatMessage(globalMessages.yes)}</Text>
        </Radio>
        <Radio
          id="no-option"
          disabled={loading}
          onChange={handleSubstancesConsumedChange(false)}
          checked={substancesConsumed === false}
        >
          <Text>{formatMessage(globalMessages.no)}</Text>
        </Radio>
      </Row>
      {substancesConsumed && (
        <>
          {mobile && <Divider mb={26} />}
          {!grouped && (
            <UngroupedSubstancesForm
              substances={substances}
              consumptions={consumptions ?? []}
              onChange={handleConsumptionsChange}
              loading={loading}
            />
          )}
          {/* {grouped && TODO CIAS30-2023 place component for scenario yes here } */}
        </>
      )}
    </>
  );
};
