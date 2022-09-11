import { FormulaActions } from "../productSlice";

export type CalculatePrice = (
  action: FormulaActions,
  initPrice: number,
  modificationValue: number
) => number;

const ActionsMap: Record<
  NonNullable<FormulaActions>,
  (a: number, b: number) => number
> = {
  add: (initPrice, modifier) => initPrice + modifier,
  deduct: (initPrice, modifier) => initPrice - modifier,
  multiply: (initPrice, modifier) => initPrice * modifier,
  divide: (initPrice, modifier) => initPrice / modifier,
};

export const calculatePrice: CalculatePrice = (
  action,
  initPrice,
  modificationValue
) => {
  if (action && ActionsMap[action]) {
    return ActionsMap[action]?.(initPrice, modificationValue) ?? 0;
  }
  return 0;
};
