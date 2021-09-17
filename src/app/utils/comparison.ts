import {FilterOperator} from "@pup/interfaces/filter";

type CompareFn = (comparedValue: string | number | null, value: string) => boolean;

export function compare(
  comparedValue: string | number | null,
  value: string,
  method: FilterOperator
): boolean {
  const compareFn = functionsMap[method] || contains;
  return compareFn(comparedValue, value);
}

const contains: CompareFn = (comparedValue: string | number | null, value: string) => {
  if (comparedValue === null && value === '') {
    return true;
  }
  if (comparedValue === null) {
    return false;
  }

  const stringComparedValue = comparedValue.toString().toLowerCase();
  return stringComparedValue.includes(value.toLowerCase());
}

const doesNotContain: CompareFn = (comparedValue: string | number | null, value: string) => {
  if (comparedValue === null && value === '') {
    return true;
  }
  if (comparedValue === null) {
    return true;
  }

  const stringComparedValue = comparedValue.toString().toLowerCase();
  return !stringComparedValue.includes(value.toLowerCase());
}

const equals: CompareFn = (comparedValue: string | number | null, value: string) => {
  if (comparedValue === null && value === '') {
    return true;
  }
  if (comparedValue === null) {
    return false;
  }

  const stringComparedValue = comparedValue.toString().toLowerCase();
  return stringComparedValue === value.toLowerCase();
}

const doesNotEqual: CompareFn = (comparedValue: string | number | null, value: string) => {
  if (comparedValue === null && value === '') {
    return false;
  }
  if (comparedValue === null) {
    return true;
  }

  const stringComparedValue = comparedValue.toString().toLowerCase();
  return stringComparedValue !== value.toLowerCase();
}

const lessThan: CompareFn = (comparedValue: string | number | null, value: string) => {
  const numberValue = Number(value);
  const numberComparedValue = Number(comparedValue);
  if (isNaN(numberComparedValue) && isNaN(numberValue)) {
    return true;
  }
  if (isNaN(numberComparedValue) || isNaN(numberValue)) {
    return true;
  }

  return numberComparedValue < numberValue;
}

const lessThanOrEqualTo: CompareFn = (comparedValue: string | number | null, value: string) => {
  const numberValue = Number(value);
  const numberComparedValue = Number(comparedValue);
  if (isNaN(numberComparedValue) && isNaN(numberValue)) {
    return true;
  }
  if (isNaN(numberComparedValue) || isNaN(numberValue)) {
    return true;
  }

  return numberComparedValue <= numberValue;
}

const moreThan: CompareFn = (comparedValue: string | number | null, value: string) => {
  const numberValue = Number(value);
  const numberComparedValue = Number(comparedValue);
  if (isNaN(numberComparedValue) && isNaN(numberValue)) {
    return true;
  }
  if (isNaN(numberComparedValue) || isNaN(numberValue)) {
    return true;
  }

  return numberComparedValue > numberValue;
}

const moreThanOrEqualTo: CompareFn = (comparedValue: string | number | null, value: string) => {
  const numberValue = Number(value);
  const numberComparedValue = Number(comparedValue);
  if (isNaN(numberComparedValue) && isNaN(numberValue)) {
    return true;
  }
  if (isNaN(numberComparedValue) || isNaN(numberValue)) {
    return true;
  }

  return numberComparedValue >= numberValue;
}

const functionsMap: Record<FilterOperator, CompareFn> = {
  [FilterOperator.Contains]: contains,
  [FilterOperator.Equals]: equals,
  [FilterOperator.DoesNotContain]: doesNotContain,
  [FilterOperator.DoesNotEqual]: doesNotEqual,
  [FilterOperator.LessThan]: lessThan,
  [FilterOperator.MoreThan]: moreThan,
  [FilterOperator.LessThanOrEqualTo]: lessThanOrEqualTo,
  [FilterOperator.MoreThanOrEqualTo]: moreThanOrEqualTo,
}
