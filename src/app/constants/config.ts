/**
 * 패스워드 생성기 설정 상수
 *
 * @module config
 */

/**
 * 패스워드 생성 설정
 */
export const PASSWORD_CONFIG = {
  /** 최소 패스워드 길이 */
  MIN_LENGTH: 1,
  /** 최대 패스워드 길이 */
  MAX_LENGTH: 128,
  /** 기본 패스워드 길이 */
  DEFAULT_LENGTH: 16,
  /** 최소 생성 개수 */
  MIN_COUNT: 1,
  /** 최대 생성 개수 */
  MAX_COUNT: 100,
  /** 기본 생성 개수 */
  DEFAULT_COUNT: 10,
  /** 최대 생성 시도 횟수 (중복 방지) */
  MAX_GENERATION_ATTEMPTS: 10000,
} as const;

/**
 * 패스워드 강도 임계값
 */
export const STRENGTH_THRESHOLDS = {
  /** 약함 임계값 */
  WEAK: 2,
  /** 보통 임계값 */
  MEDIUM: 4,
  /** 강함 임계값 */
  STRONG: 5,
} as const;
