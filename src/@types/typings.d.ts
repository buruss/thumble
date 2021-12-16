declare global {
  interface String {
    /**
     * 양 끝의 공백과 특정 문자 제거
     * @param trimChar str의 양끝에서 제거할 문자
     */
    trimEx: (trimChar: string) => string;
  }
}
