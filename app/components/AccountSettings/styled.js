import styled from 'styled-components';

import Row from 'components/Row';
import UserAvatar from 'components/UserAvatar';
import StyledTextButton from 'components/Button/StyledTextButton';
import UploadFileButton from 'components/UploadFileButton';
import { StyledButton } from 'components/Button/StyledButton';
import { mediaQuery } from 'theme';

export const StyledFullNameRow = styled(Row)`
  ${mediaQuery.mobile`
    flex-direction: column;
    align-items: flex-start;
  `}
`;

export const StyledUserAvatar = styled(UserAvatar)`
  height: 75px;
  width: 75px;
  font-size: 40px;
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

export const StyledDeleteButton = styled(StyledTextButton)`
  margin-left: 30px;
  ${mediaQuery.tablet`
    margin-top: 20px;
    margin-left: 20px;
  `}
  ${mediaQuery.mobileSm`
    margin-left: 10px;
  `}
`;

export const StyledUploadFileButton = styled(UploadFileButton)`
  margin-left: 20px;
  ${mediaQuery.mobileSm`
    margin-left: 10px;
  `}
`;

export const ConfirmButton = styled(StyledButton)`
  margin-top: 12px;
  width: 40%;
  ${mediaQuery.tablet`
    width: 100%;
  `}
`;
