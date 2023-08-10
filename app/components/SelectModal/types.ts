export type SelectModalOption<Id extends string | number> = {
  id: Id;
  icon: SVGElement;
  iconFill?: string;
  title: string;
  description: string;
  disabled?: boolean;
};
