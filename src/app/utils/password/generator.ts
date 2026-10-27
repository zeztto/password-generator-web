/**
 * 패스워드 생성 유틸리티
 *
 * @module generator
 */

import { getSecureRandomInt } from '../crypto/secureRandom';
import { PASSWORD_CONFIG } from '../../constants/config';
import type { PasswordConfig, GenerationResult } from '../../types/password.types';

/**
 * 단일 패스워드를 암호학적으로 안전한 난수로 생성합니다.
 *
 * @param characters - 사용할 문자열
 * @param length - 패스워드 길이
 * @returns 생성된 패스워드
 */
function generateSinglePassword(characters: string, length: number): string {
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = getSecureRandomInt(characters.length);
    password += characters[randomIndex];
  }
  return password;
}

/**
 * 주어진 문자 개수와 길이로 가능한 총 조합 수를 계산합니다.
 *
 * @param characterCount - 사용 가능한 문자 개수
 * @param length - 패스워드 길이
 * @returns 가능한 조합 수
 */
function calculateTotalCombinations(characterCount: number, length: number): number {
  return Math.pow(characterCount, length);
}

/**
 * 중복되지 않는 여러 개의 패스워드를 생성합니다.
 *
 * @param config - 패스워드 생성 설정
 * @returns 생성된 패스워드 배열과 경고 메시지(있는 경우)
 *
 * @example
 * ```typescript
 * const result = generatePasswords({
 *   length: 16,
 *   count: 10,
 *   selectedUppercase: ['A', 'B', 'C'],
 *   selectedLowercase: ['a', 'b', 'c'],
 *   selectedNumbers: ['1', '2', '3'],
 *   selectedSymbols: ['!', '@', '#']
 * });
 * // result.passwords: ['Aa1!2Bc3...', ...]
 * ```
 */
export function generatePasswords(config: PasswordConfig): GenerationResult {
  const { length, count, selectedUppercase, selectedLowercase, selectedNumbers, selectedSymbols } = config;

  if (!Number.isInteger(length) || length < PASSWORD_CONFIG.MIN_LENGTH || length > PASSWORD_CONFIG.MAX_LENGTH ||
      !Number.isInteger(count) || count < PASSWORD_CONFIG.MIN_COUNT || count > PASSWORD_CONFIG.MAX_COUNT) {
    return { passwords: [], warning: "길이는 1~128, 생성 개수는 1~100 사이의 정수여야 합니다." };
  }

  // 모든 선택된 문자 결합
  const characters = [
    ...selectedUppercase,
    ...selectedLowercase,
    ...selectedNumbers,
    ...selectedSymbols,
  ].join('');

  if (characters === '') {
    return {
      passwords: [],
      warning: '적어도 하나의 문자 유형을 선택해야 합니다.',
    };
  }

  const totalCombinations = calculateTotalCombinations(characters.length, length);
  const actualCount = Math.min(count, totalCombinations);

  let warning: string | undefined;
  if (totalCombinations < count) {
    warning = `선택한 옵션으로 생성 가능한 조합은 최대 ${totalCombinations.toLocaleString()}개입니다. ${actualCount.toLocaleString()}개만 생성됩니다.`;
  }

  const generatedPasswords: string[] = [];
  const passwordSet = new Set<string>();

  for (let j = 0; j < actualCount; j++) {
    let password = '';
    let attempts = 0;

    do {
      password = generateSinglePassword(characters, length);
      attempts++;
    } while (passwordSet.has(password) && attempts < PASSWORD_CONFIG.MAX_GENERATION_ATTEMPTS);

    if (!passwordSet.has(password)) {
      passwordSet.add(password);
      generatedPasswords.push(password);
    }

    // 가능한 모든 조합을 생성한 경우 중단
    if (passwordSet.size >= totalCombinations) {
      break;
    }
  }

  return {
    passwords: generatedPasswords,
    warning,
  };
}
