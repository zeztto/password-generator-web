/**
 * 문자 선택 상태 관리 커스텀 훅
 *
 * @module useCharacterSelection
 */

import { useState, useCallback } from 'react';

/**
 * 문자 선택 상태
 */
export interface CharacterSelectionState {
  /** 선택된 문자 배열 */
  selected: string[];
  /** 활성화 여부 */
  enabled: boolean;
}

/**
 * 문자 선택 액션
 */
export interface CharacterSelectionActions {
  /** 활성화 토글 (체크 시 전체 선택, 해제 시 전체 해제) */
  toggleEnabled: (checked: boolean, available: readonly string[]) => void;
  /** 개별 문자 토글 */
  toggleCharacter: (char: string) => void;
  /** 모두 선택 */
  selectAll: (available: readonly string[]) => void;
  /** 모두 해제 */
  clearAll: () => void;
}

/**
 * 문자 선택 상태를 관리하는 커스텀 훅
 *
 * @param initialEnabled - 초기 활성화 상태 (기본값: false)
 * @returns [state, actions] - 상태와 액션 함수들
 *
 * @example
 * ```typescript
 * const [uppercase, uppercaseActions] = useCharacterSelection(false);
 *
 * // 활성화/비활성화
 * uppercaseActions.toggleEnabled(true);
 *
 * // 개별 문자 선택/해제
 * uppercaseActions.toggleCharacter('A');
 *
 * // 모두 선택
 * uppercaseActions.selectAll(['A', 'B', 'C']);
 * ```
 */
export function useCharacterSelection(
  initialEnabled = false
): [CharacterSelectionState, CharacterSelectionActions] {
  const [selected, setSelected] = useState<string[]>([]);
  const [enabled, setEnabled] = useState(initialEnabled);

  const toggleEnabled = useCallback((checked: boolean, available: readonly string[]) => {
    setEnabled(checked);
    if (checked) {
      // 체크 시 전체 선택
      setSelected([...available]);
    } else {
      // 해제 시 전체 해제
      setSelected([]);
    }
  }, []);

  const toggleCharacter = useCallback((char: string) => {
    setSelected(prev =>
      prev.includes(char)
        ? prev.filter(c => c !== char)
        : [...prev, char]
    );
  }, []);

  const selectAll = useCallback((available: readonly string[]) => {
    setSelected([...available]);
  }, []);

  const clearAll = useCallback(() => {
    setSelected([]);
  }, []);

  return [
    { selected, enabled },
    { toggleEnabled, toggleCharacter, selectAll, clearAll }
  ];
}
