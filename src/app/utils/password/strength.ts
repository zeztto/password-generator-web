/**
 * 패스워드 강도 계산 유틸리티
 *
 * @module strength
 */

import { STRENGTH_THRESHOLDS } from '../../constants/config';
import type { PasswordStrength } from '../../types/password.types';

/**
 * 패스워드 강도를 계산합니다.
 *
 * 강도 점수는 다음 요소로 결정됩니다:
 * - 대문자 사용: +1
 * - 소문자 사용: +1
 * - 숫자 사용: +1
 * - 특수문자 사용: +1
 * - 길이 16자 이상: +1
 * - 길이 20자 이상: +1
 *
 * @param length - 패스워드 길이
 * @param selectedUppercase - 선택된 대문자 배열
 * @param selectedLowercase - 선택된 소문자 배열
 * @param selectedNumbers - 선택된 숫자 배열
 * @param selectedSymbols - 선택된 특수문자 배열
 * @returns 패스워드 강도 정보 (텍스트, 색상, 점수)
 *
 * @example
 * ```typescript
 * const strength = calculatePasswordStrength(
 *   20,
 *   ['A', 'B'],
 *   ['a', 'b'],
 *   ['1', '2'],
 *   ['!', '@']
 * );
 * // strength: { text: '강함', color: 'text-green-600', score: 6 }
 * ```
 */
export function calculatePasswordStrength(
  length: number,
  selectedUppercase: string[],
  selectedLowercase: string[],
  selectedNumbers: string[],
  selectedSymbols: string[]
): PasswordStrength {
  let score = 0;

  // 각 문자 유형 사용 여부 확인
  if (selectedUppercase.length > 0) score++;
  if (selectedLowercase.length > 0) score++;
  if (selectedNumbers.length > 0) score++;
  if (selectedSymbols.length > 0) score++;

  // 길이에 따른 보너스 점수
  if (length >= 16) score++;
  if (length >= 20) score++;

  // 점수에 따른 강도 분류
  if (score <= STRENGTH_THRESHOLDS.WEAK) {
    return { text: '약함', color: 'text-destructive', score };
  }
  if (score <= STRENGTH_THRESHOLDS.MEDIUM) {
    return { text: '보통', color: 'text-yellow-600', score };
  }
  return { text: '강함', color: 'text-green-600', score };
}
