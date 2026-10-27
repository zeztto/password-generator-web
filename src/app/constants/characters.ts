/**
 * 패스워드 생성에 사용할 문자 집합 상수
 *
 * @module characters
 */

/**
 * 사용 가능한 모든 문자 집합
 */
export const CHARACTER_SETS = {
  /** 대문자 A-Z */
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),

  /** 소문자 a-z */
  lowercase: 'abcdefghijklmnopqrstuvwxyz'.split(''),

  /** 숫자 0-9 */
  numbers: '0123456789'.split(''),

  /** 특수문자 */
  symbols: [
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=',
    '[', ']', '{', '}', '|', ';', ':', ',', '.', '<', '>', '?'
  ],
} as const;
