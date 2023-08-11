export type SelectModalOption<Id extends string | number> = {
  id: Id;
  icon: SVGElement;
  title: string;
  description: string;
  disabled?: boolean;
};
