export type DropdownOption = {
  id: string;
  label: string;
  icon?: string;
  action: () => void;
  color?: string;
  disabled?: boolean;
};
