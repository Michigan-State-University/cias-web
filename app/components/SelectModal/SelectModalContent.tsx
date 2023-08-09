import { ModalProps } from 'components/Modal';
import Column from 'components/Column';

import { SelectModalOption } from './types';
import { SelectModalOptionComponent } from './SelectModalOptionComponent';

export const SelectModalContent: ModalProps<
  SelectModalOption[],
  string
>['modalContentRenderer'] = ({ modalState, closeModal }) => {
  if (!modalState) return null;

  return (
    <Column gap={16}>
      {modalState.map((option) => (
        <SelectModalOptionComponent {...option} onClick={closeModal} />
      ))}
    </Column>
  );
};
