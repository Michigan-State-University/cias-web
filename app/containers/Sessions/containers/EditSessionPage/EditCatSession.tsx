import Box from 'components/Box';
import Text from 'components/Text';
import { CatSessionDto } from 'models/Session/SessionDto';
import React, { useState } from 'react';
import { colors } from 'theme';
import { useIntl } from 'react-intl';
import Row from 'components/Row';
import Divider from 'components/Divider';
import ApiSelect from 'components/Select/ApiSelect';
import { jsonApiToArray } from 'utils/jsonApiMapper';
import messages from './messages';

type Props = {
  session: CatSessionDto;
  editingPossible: boolean;
};

const EditCatSession = ({ session, editingPossible }: Props): JSX.Element => {
  const [selectedLanguageValue, setSelectedLanguageValue] = useState(null);
  const { formatMessage } = useIntl();
  console.log(session, editingPossible, formatMessage);
  return (
    <Box display="flex" justify="center" align="center">
      <Box
        padding={30}
        mt={25}
        maxWidth={860}
        width="100%"
        bg={colors.white}
        borderRadius={5}
        boxShadow="0px 4px 20px #E3EEFB"
        height="100%"
      >
        <Text fontSize={20} fontWeight="bold">
          {formatMessage(messages.generalSettings)}
        </Text>
        <Row my={30}>
          <Divider />
        </Row>
        <Text mb={25} fontSize={16}>
          {formatMessage(messages.sessionDetails)}
        </Text>
        {/* @ts-ignore */}
        <ApiSelect
          url="/v1/cat_mh/languages"
          dataParser={(data: any) => jsonApiToArray(data, 'language')}
          selectProps={{
            onChange: setSelectedLanguageValue,
            value: selectedLanguageValue,
          }}
          optionsFormatter={({ id, name }: any) => ({ value: id, label: name })}
        />
      </Box>
    </Box>
  );
};

export default EditCatSession;
