/**
 * 패스워드 생성 상태 관리 커스텀 훅
 *
 * @module usePasswordGenerator
 */

import { useState, useCallback } from 'react';
import { generatePasswords } from '../utils/password/generator';
import { PASSWORD_CONFIG } from '../constants/config';
import type { PasswordConfig } from '../types/password.types';

/**
 * 패스워드 생성 기능과 상태를 관리하는 커스텀 훅
 *
 * @returns 패스워드 생성 상태와 함수들
 *
 * @example
 * ```typescript
 * const {
 *   passwords,
 *   warningMessage,
 *   length,
 *   count,
 *   setLength,
 *   setCount,
 *   generate
 * } = usePasswordGenerator();
 *
 * // 패스워드 생성
 * generate({
 *   length: 16,
 *   count: 10,
 *   selectedUppercase: ['A', 'B'],
 *   selectedLowercase: ['a', 'b'],
 *   selectedNumbers: ['1', '2'],
 *   selectedSymbols: ['!', '@']
 * });
 * ```
 */
export function usePasswordGenerator() {
  const [passwords, setPasswords] = useState<string[]>([]);
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [length, setLength] = useState<number>(PASSWORD_CONFIG.DEFAULT_LENGTH);
  const [count, setCount] = useState<number>(PASSWORD_CONFIG.DEFAULT_COUNT);

  const generate = useCallback((config: PasswordConfig) => {
    try {
      const result = generatePasswords(config);
      setPasswords(result.passwords);
      setWarningMessage(result.warning || '');
    } catch {
      setPasswords([]);
      setWarningMessage('안전한 난수 생성에 실패했습니다. HTTPS 또는 localhost에서 다시 시도해 주세요.');
    }
  }, []);

  const resetResults = useCallback(() => {
    setPasswords([]);
    setWarningMessage('');
  }, []);

  return {
    passwords,
    warningMessage,
    length,
    count,
    setLength,
    setCount,
    generate,
    resetResults,
  };
}
