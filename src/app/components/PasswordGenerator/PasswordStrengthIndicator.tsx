/**
 * 패스워드 강도 표시 컴포넌트
 * 패스워드 강도를 시각적으로 표시합니다.
 *
 * @module PasswordStrengthIndicator
 */

import { memo } from 'react';
import { Label } from '../ui/label';
import type { PasswordStrength } from '../../types/password.types';

interface PasswordStrengthIndicatorProps {
  /** 패스워드 강도 정보 */
  strength: PasswordStrength;
}

/**
 * 패스워드 강도 표시 컴포넌트
 * React.memo로 최적화되어 불필요한 리렌더링을 방지합니다.
 */
export const PasswordStrengthIndicator = memo(function PasswordStrengthIndicator({
  strength,
}: PasswordStrengthIndicatorProps) {
  return (
    <div className="space-y-2">
      <Label>생성 설정 참고</Label>
      <div className={`text-sm font-semibold ${strength.color}`}>
        {strength.text}
      </div>
      <p className="text-xs text-muted-foreground max-w-40">문자 유형과 길이만 고려한 참고 지표입니다.</p>
    </div>
  );
});
