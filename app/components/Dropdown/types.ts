import { ComponentType } from 'react';

export type DropdownOption = {
  id: string;
  label: string;
  icon?: string | ComponentType<{ size?: number; color?: string }>;
  action: () => void;
  color?: string;
  disabled?: boolean;
};
