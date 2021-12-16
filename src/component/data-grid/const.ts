import { FilterType } from './interface';

export const FilterOperators: Record<FilterType, Record<string, string>> = {
  string: {
    contains: '포함',
    equals: '=',
    not: '같지 않음',
    lt: '<',
    lte: '<=',
    gt: '>',
    gte: '>=',
    startsWith: '로 시작',
    endsWith: '로 끝',
    in: '안에 있음',
    notIn: '안에 없음',
  },
  number: {
    equals: '=',
    not: '같지 않음',
    lt: '<',
    lte: '<=',
    gt: '>',
    gte: '>=',
    in: '안에 있음',
    notIn: '안에 없음',
  },
  date: {
    equals: '=',
    not: '같지 않음',
    lt: '<',
    lte: '<=',
    gt: '>',
    gte: '>=',
  },
  boolean: { equals: '=' },
};
