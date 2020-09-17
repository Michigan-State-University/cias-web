import styled from 'styled-components';

import Box from 'components/Box';
import Row from 'components/Row';
import Column from 'components/Column';
import UserAvatar from 'components/UserAvatar';
import TextButton from 'components/Button/TextButton';
import UploadFileButton from 'components/UploadFileButton';
import { mediaQuery } from 'theme';

export const StyledBox = styled(Box)`
  padding: 60px 160px;
  ${mediaQuery.laptop`
    padding: 30px 80px;
  `}
  ${mediaQuery.tablet`
    padding: 15px 40px;
  `}
  ${mediaQuery.mobile`
    padding: 15px 20px;
  `}
`;

export const StyledColumn = styled(Column)`
  padding: 40px 30px;
  ${mediaQuery.laptop`
    padding: 20px 40px;
  `}
  ${mediaQuery.tablet`
    padding: 15px 20px;
  `}
`;

export const StyledRow = styled(Row)`
  margin-top: 50px;
  ${mediaQuery.tablet`
    margin-top: 25px;
    flex-direction: column;
    align-items: flex-start;
  `}
`;

export const StyledTextButton = styled(TextButton)`
  margin-left: 25px;
  margin-top: 22px;
  ${mediaQuery.tablet`
    margin-left: 0;
    margin-top: 25px;
  `}
`;

export const StyledInputBox = styled(Box)`
  width: 50%;
  ${mediaQuery.tablet`
    width: 100%;
  `}
`;

export const StyledFullNameRow = styled(Row)`
  ${mediaQuery.mobile`
    flex-direction: column;
    align-items: flex-start;
  `}
`;

export const StyledUserAvatar = styled(UserAvatar)`
  height: 125px;
  width: 125px;
  font-size: 65px;
  ${mediaQuery.mobile`
    height: 80px;
    width: 80px;
    font-size: 45px;
  `}
`;

export const StyledButtonsRow = styled(Row)`
  ${mediaQuery.tablet`
    margin-left: 30px;
    flex-direction: column;
    align-items: center;
  `}
  ${mediaQuery.mobile`
    margin-left: 0px;
  `}
`;

export const StyledDeleteButton = styled(TextButton)`
  margin-left: 30px;
  ${mediaQuery.tablet`
    margin-top: 20px;
    margin-left: 20px;
  `}
  ${mediaQuery.mobileSm`
    margin-left: 10px;
  `}
`;

export const StyledContainerRow = styled(Row)`
  ${mediaQuery.mobile`
    justify-content: flex-end;
  `}
`;

export const StyledUploadFileButton = styled(UploadFileButton)`
  margin-left: 20px;
  ${mediaQuery.mobileSm`
    margin-left: 10px;
  `}
`;
