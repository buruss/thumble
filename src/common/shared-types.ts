/**
 * A recursive implementation of the Partial<T> type.
 * Source: https://stackoverflow.com/a/49936686/772859
 */
export type DeepPartial<T> = {
  [P in keyof T]?:
    | null
    | (T[P] extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T[P] extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>
        : DeepPartial<T[P]>);
};
// tslint:enable:no-shadowed-variable

/**
 * A recursive implementation of Required<T>.
 * Source: https://github.com/microsoft/TypeScript/issues/15012#issuecomment-365453623
 */
export type DeepRequired<T, U extends object | undefined = undefined> = T extends object
  ? {
      [P in keyof T]-?: NonNullable<T[P]> extends NonNullable<U | Function | Type<any>>
        ? NonNullable<T[P]>
        : DeepRequired<NonNullable<T[P]>, U>;
    }
  : T;

/**
 * A type representing the type rather than instance of a class.
 */
export interface Type<T> extends Function {
  // tslint:disable-next-line:callable-types
  new (...args: any[]): T;
}

export type Json = null | boolean | number | string | Json[] | { [prop: string]: Json };

/**
 * @description
 * A type representing JSON-compatible values.
 * From https://github.com/microsoft/TypeScript/issues/1897#issuecomment-580962081
 *
 * @docsCategory common
 */
export type JsonCompatible<T> = {
  [P in keyof T]: T[P] extends Json ? T[P] : Pick<T, P> extends Required<Pick<T, P>> ? never : JsonCompatible<T[P]>;
};

/**
 * A type describing the shape of a paginated list response
 */
export type PaginatedList<T> = {
  items: T[];
  totalItems: number;
};

/**
 * Todo: typescript 4.5 이후 제거할 것
 * Promise resolve 결과 타입
 */
export type Awaited<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
