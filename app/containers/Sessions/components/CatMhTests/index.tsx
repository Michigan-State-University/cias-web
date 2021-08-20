import React from 'react';
import { themeColors } from 'theme';
import { CatMhTestDto } from 'models/CatMhTest/CatMhTestDto';
import { jsonApiToArray } from 'utils/jsonApiMapper';
import useGet from 'utils/useGet';

import ErrorAlert from 'components/ErrorAlert';
import { Col, Container, Row } from 'components/ReactGridSystem';
import Spinner from 'components/Spinner';

import TestItem from './TestItem';

type Props = {
  url: string;
  selectedTestIds: number[];
  onSelectTest: (newTestIds: number[]) => void;
};

const CatMhTests = ({
  url,
  onSelectTest,
  selectedTestIds,
}: Props): JSX.Element => {
  const { data, error, isFetching } = useGet<any, CatMhTestDto[]>(
    url,
    (tests) => jsonApiToArray(tests, 'testType'),
  );

  const onCheckboxToggle = (testId: number) => {
    if (selectedTestIds.includes(testId)) {
      const newTestIds = selectedTestIds.filter((id) => id !== testId);
      onSelectTest(newTestIds);
    } else {
      onSelectTest([...selectedTestIds, testId]);
    }
  };

  if (isFetching) {
    return <Spinner color={themeColors.secondary} size={50} />;
  }
  if (error) {
    <ErrorAlert errorText={error} fullPage={false} />;
  }
  return (
    <Container>
      <Row>
        {data?.map((test) => (
          <Col my={20} sm={6}>
            <TestItem
              test={test}
              selected={selectedTestIds.includes(test.id)}
              onToggle={onCheckboxToggle}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CatMhTests;
