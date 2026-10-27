/**
 * 패스워드 생성기 관련 TypeScript 타입 정의
 *
 * @module password.types
 */

/**
 * 사용 가능한 문자 집합
 */
export interface CharacterSet {
  uppercase: string[];
  lowercase: string[];
  numbers: string[];
  symbols: string[];
}

/**
 * 패스워드 생성 설정
 */
export interface PasswordConfig {
  /** 패스워드 길이 */
  length: number;
  /** 생성할 패스워드 개수 */
  count: number;
  /** 선택된 대문자 */
  selectedUppercase: string[];
  /** 선택된 소문자 */
  selectedLowercase: string[];
  /** 선택된 숫자 */
  selectedNumbers: string[];
  /** 선택된 특수문자 */
  selectedSymbols: string[];
}

/**
 * 패스워드 강도 정보
 */
export interface PasswordStrength {
  /** 강도 텍스트 (약함/보통/강함) */
  text: string;
  /** Tailwind CSS 색상 클래스 */
  color: string;
  /** 점수 (0-6, 프로그래밍 방식 사용) */
  score: number;
}

/**
 * 패스워드 생성 결과
 */
export interface GenerationResult {
  /** 생성된 패스워드 배열 */
  passwords: string[];
  /** 경고 메시지 (있는 경우) */
  warning?: string;
}

/**
 * 문자 타입 설정
 */
export interface CharacterTypeConfig {
  /** 고유 식별자 */
  id: string;
  /** 표시 레이블 */
  label: string;
  /** 사용 가능한 문자 배열 */
  available: string[];
  /** 선택된 문자 배열 */
  selected: string[];
  /** 활성화 여부 */
  enabled: boolean;
}
