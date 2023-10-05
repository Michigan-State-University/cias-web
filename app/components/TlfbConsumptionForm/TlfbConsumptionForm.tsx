import React, { ChangeEvent } from 'react';
import { useIntl } from 'react-intl';

import globalMessages from 'global/i18n/globalMessages';
import { SubstanceConsumption, TlfbQuestionAnswerBody } from 'models/Tlfb';
import { Substance, SubstanceGroup } from 'models/Question';

import Text from 'components/Text';
import Radio from 'components/Radio';
import Row from 'components/Row';
import Divider from 'components/Divider';

import { UngroupedSubstancesForm } from './UngroupedSubstancesForm';
import { GroupedSubstancesForm } from './GroupedSubstancesForm';

export type TlfbConsumptionFormProps = {
  substances: Substance[];
  substanceGroups: SubstanceGroup[];
  grouped: boolean;
  loading: boolean;
  answerBody: Nullable<TlfbQuestionAnswerBody>;
  onChange: (newAnswerBody: TlfbQuestionAnswerBody) => void;
  mobile: boolean;
  disabled?: boolean;
};

export const TlfbConsumptionForm = ({
  substances,
  substanceGroups,
  grouped,
  loading,
  answerBody,
  onChange,
  mobile,
  disabled,
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

  const calculateSubstancesConsumedValue = (
    newConsumptions: SubstanceConsumption[],
  ) => {
    if (grouped) return true;
    return newConsumptions.some(({ consumed }) => consumed);
  };

  const handleConsumptionsChange = (
    newConsumptions: SubstanceConsumption[],
  ) => {
    onChange({
      substancesConsumed: calculateSubstancesConsumedValue(newConsumptions),
      consumptions: newConsumptions,
    });
  };

  const showSubstancesQuestion = grouped || !substances.length;
  const showSubstances =
    (Boolean(substances.length) || Boolean(substanceGroups.length)) &&
    (!grouped || substancesConsumed);

  return (
    <>
      {showSubstancesQuestion && (
        <Row mb={24} gap={32}>
          <Radio
            id="yes-option"
            disabled={loading || disabled}
            onChange={handleSubstancesConsumedChange(true)}
            checked={substancesConsumed === true}
          >
            <Text>{formatMessage(globalMessages.yes)}</Text>
          </Radio>
          <Radio
            id="no-option"
            disabled={loading || disabled}
            onChange={handleSubstancesConsumedChange(false)}
            checked={substancesConsumed === false}
          >
            <Text>{formatMessage(globalMessages.no)}</Text>
          </Radio>
        </Row>
      )}
      {showSubstances && (
        <>
          {mobile && <Divider mb={26} />}
          {!grouped && (
            <UngroupedSubstancesForm
              substances={substances}
              consumptions={consumptions ?? []}
              onChange={handleConsumptionsChange}
              loading={loading}
              disabled={disabled}
            />
          )}
          {grouped && (
            <GroupedSubstancesForm
              substanceGroups={substanceGroups}
              consumptions={consumptions ?? []}
              onChange={handleConsumptionsChange}
              loading={loading}
              mobile={mobile}
              disabled={disabled}
            />
          )}
        </>
      )}
    </>
  );
};
