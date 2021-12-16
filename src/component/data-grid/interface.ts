import { ColDef } from 'ag-grid-community';
import {
  StringNullableFilter,
  IntFilter,
  BoolFilter,
  DateTimeNullableFilter,
  Enumerable,
  SortOrder,
} from '../../common/prisma';

export type BaseEntity = { id?: number };

export enum FilterType {
  string = 'string',
  number = 'number',
  date = 'date',
  boolean = 'boolean',
}

export type ColDefEx = ColDef & { useFilter?: boolean; filterType?: FilterType };

export type PrimitiveFields<T extends BaseEntity> = {
  [K in keyof T]: T[K] extends number | string | boolean | Date ? K : never;
}[keyof T];

export type NullOptionals<T> = {
  [K in keyof T]: null extends T[K] ? NullOptionals<T[K]> | null : NullOptionals<T[K]>;
};

export type WhereInput<T> = {
  AND?: Enumerable<WhereInput<T>>;
  OR?: Enumerable<WhereInput<T>>;
  NOT?: Enumerable<WhereInput<T>>;
} & {
  [K in keyof T]?:
    | (T[K] extends string
        ? StringNullableFilter | string
        : T[K] extends number
        ? IntFilter | number
        : T[K] extends boolean
        ? BoolFilter | boolean
        : T[K] extends Date
        ? DateTimeNullableFilter | Date
        : any)
    | (T[K] extends null ? null : never);
};

export type SelectOption<T> = {
  [K in keyof T]?: boolean;
};

export type OrderByWithRelationInput<T> = {
  [K in keyof T]?: SortOrder;
};

export type WhereUniqueInput = {
  id?: number;
};
