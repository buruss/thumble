/**
 * Simple object check.
 * From https://stackoverflow.com/a/34749873/772859
 */
export function isObject(item: any): item is object {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Takes a predicate function and returns a negated version.
 */
export function not(predicate: (...args: any[]) => boolean) {
  return (...args: any[]) => !predicate(...args);
}

/**
 * Returns a predicate function which returns true if the item is found in the set,
 * as determined by a === equality check on the given compareBy property.
 */
export function foundIn<T>(set: T[], compareBy: keyof T) {
  return (item: T) => set.some(t => t[compareBy] === item[compareBy]);
}

/**
 * Identity function which asserts to the type system that a promise which can resolve to T or undefined
 * does in fact resolve to T.
 * Used when performing a "find" operation on an entity which we are sure exists, as in the case that we
 * just successfully created or updated it.
 */
export function assertFound<T>(promise: Promise<T | undefined>): Promise<T> {
  return promise as Promise<T>;
}

/**
 * Compare ID values for equality, taking into account the fact that they may not be of matching types
 * (string or number).
 */
export function idsAreEqual(id1?: number, id2?: number): boolean {
  if (id1 === undefined || id2 === undefined) {
    return false;
  }
  return id1.toString() === id2.toString();
}

/**
 * A simple normalization for email addresses. Lowercases the whole address,
 * even though technically the local part (before the '@') is case-sensitive
 * per the spec. In practice, however, it seems safe to treat emails as
 * case-insensitive to allow for users who might vary the usage of
 * upper/lower case. See more discussion here: https://ux.stackexchange.com/a/16849
 */
export function normalizeEmailAddress(input: string): string {
  return input.trim().toLowerCase();
}

export function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

// min (포함) 과 max (포함) 사이의 난수를 정수로 변환 후 반환
export function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

declare global {
  interface String {
    /**
     * 양 끝의 공백과 특정 문자 제거
     * @param trimChar str의 양끝에서 제거할 문자
     */
    trimEx: (trimChar: string) => string;
  }
}

/**
 * 양 끝의 공백과 특정 문자 제거
 * @param trimChar str의 양끝에서 제거할 문자
 */
String.prototype.trimEx = function (trimChar = ''): string {
  if (!this) {
    return this;
  }

  let ret = this.trim();

  if (ret && trimChar) {
    if (ret.substr(0, 1) === trimChar) {
      ret = ret.substring(1, ret.length);
    }
    if (ret && ret.substr(this.length - 1, 1) === trimChar) {
      ret = ret.substring(0, ret.length - 1);
    }
  }
  return ret;
};
