export interface Filter {
  columnName: string;
  operator: FilterOperator;
  value: string;
}

export enum FilterOperator {
  LessThan = 'less than',
  LessThanOrEqualTo = 'less than or equal to',
  MoreThan = 'more than',
  MoreThanOrEqualTo = 'more than or equal to',
  Equals = 'equals',
  DoesNotEqual = 'does not equal',
  Contains = 'contains',
  DoesNotContain = 'does not contain',
}
