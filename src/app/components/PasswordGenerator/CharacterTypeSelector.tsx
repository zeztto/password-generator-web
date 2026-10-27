/**
 * 문자 타입 선택기 컴포넌트
 * 특정 문자 타입(대문자, 소문자, 숫자, 특수문자)의 선택을 관리합니다.
 *
 * @module CharacterTypeSelector
 */

import { memo } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

interface CharacterTypeSelectorProps {
  /** 고유 식별자 */
  id: string;
  /** 표시될 레이블 */
  label: string;
  /** 활성화 여부 */
  enabled: boolean;
  /** 사용 가능한 모든 문자 배열 */
  available: readonly string[];
  /** 선택된 문자 배열 */
  selected: string[];
  /** 활성화 변경 핸들러 */
  onEnabledChange: (checked: boolean) => void;
  /** 개별 문자 토글 핸들러 */
  onToggleCharacter: (char: string) => void;
  /** 전체 선택 핸들러 */
  onSelectAll: () => void;
  /** 전체 해제 핸들러 */
  onClearAll: () => void;
}

/**
 * 문자 타입 선택기 컴포넌트
 * React.memo로 최적화되어 불필요한 리렌더링을 방지합니다.
 */
export const CharacterTypeSelector = memo(function CharacterTypeSelector({
  id,
  label,
  enabled,
  available,
  selected,
  onEnabledChange,
  onToggleCharacter,
  onSelectAll,
  onClearAll,
}: CharacterTypeSelectorProps) {
  const allSelected = selected.length === available.length;

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={id}
          checked={enabled}
          onCheckedChange={onEnabledChange}
        />
        <label htmlFor={id} className="text-sm cursor-pointer">
          {label}
        </label>
      </div>

      {enabled && (
        <div className="pl-6 space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">
              사용할 문자 선택
            </Label>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={allSelected ? onClearAll : onSelectAll}
              className="h-7 text-xs"
            >
              {allSelected ? '전체 해제' : '전체 선택'}
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {available.map((char) => {
              const isSelected = selected.includes(char);
              return (
                <Button
                  key={char}
                  type="button"
                  size="sm"
                  variant={isSelected ? 'default' : 'outline'}
                  aria-label={`${label} ${char}`}
                  aria-pressed={isSelected}
                  onClick={() => onToggleCharacter(char)}
                  className="h-8 w-8 p-0 font-mono"
                >
                  {char}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});
