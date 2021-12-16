export type Enumerable<T> = T | Array<T>;

export type StringNullableFilter = {
  equals?: string | null;
  in?: Enumerable<string> | null;
  notIn?: Enumerable<string> | null;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  not?: NestedStringNullableFilter | string | null;
};

export type NestedStringNullableFilter = {
  equals?: string | null;
  in?: Enumerable<string> | null;
  notIn?: Enumerable<string> | null;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  not?: NestedStringNullableFilter | string | null;
};

export type IntFilter = {
  equals?: number;
  in?: Enumerable<number>;
  notIn?: Enumerable<number>;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntFilter | number;
};

export type NestedIntFilter = {
  equals?: number;
  in?: Enumerable<number>;
  notIn?: Enumerable<number>;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: NestedIntFilter | number;
};

export type BoolFilter = {
  equals?: boolean;
  not?: NestedBoolFilter | boolean;
};

export type NestedBoolFilter = {
  equals?: boolean;
  not?: NestedBoolFilter | boolean;
};

export type DateTimeNullableFilter = {
  equals?: Date | string | null;
  in?: Enumerable<Date> | Enumerable<string> | null;
  notIn?: Enumerable<Date> | Enumerable<string> | null;
  lt?: Date | string;
  lte?: Date | string;
  gt?: Date | string;
  gte?: Date | string;
  not?: NestedDateTimeNullableFilter | Date | string | null;
};

export type NestedDateTimeNullableFilter = {
  equals?: Date | string | null;
  in?: Enumerable<Date> | Enumerable<string> | null;
  notIn?: Enumerable<Date> | Enumerable<string> | null;
  lt?: Date | string;
  lte?: Date | string;
  gt?: Date | string;
  gte?: Date | string;
  not?: NestedDateTimeNullableFilter | Date | string | null;
};

export const SortOrder: {
  asc: 'asc';
  desc: 'desc';
} = {
  asc: 'asc',
  desc: 'desc',
};

export type SortOrder = typeof SortOrder[keyof typeof SortOrder];
