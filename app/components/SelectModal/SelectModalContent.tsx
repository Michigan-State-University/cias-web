import { ModalContentRendererProps } from 'components/Modal';
import Column from 'components/Column';

import { SelectModalOption } from './types';
import { SelectModalOptionComponent } from './SelectModalOptionComponent';

export const SelectModalContent = <Id extends string | number>({
  modalState,
  closeModal,
}: ModalContentRendererProps<SelectModalOption<Id>[], Id>) => {
  if (!modalState) return null;

  return (
    <Column gap={16}>
      {modalState.map((option) => (
        <SelectModalOptionComponent
          key={option.id}
          {...option}
          onClick={closeModal}
        />
      ))}
    </Column>
  );
};
