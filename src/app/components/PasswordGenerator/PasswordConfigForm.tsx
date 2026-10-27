/**
 * 패스워드 설정 폼 컴포넌트
 * 패스워드 길이와 생성 개수를 설정합니다.
 *
 * @module PasswordConfigForm
 */

import { memo } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { PASSWORD_CONFIG } from '../../constants/config';

interface PasswordConfigFormProps {
  /** 패스워드 길이 */
  length: number;
  /** 생성 개수 */
  count: number;
  /** 길이 변경 핸들러 */
  onLengthChange: (length: number) => void;
  /** 개수 변경 핸들러 */
  onCountChange: (count: number) => void;
}

/**
 * 패스워드 설정 폼 컴포넌트
 * React.memo로 최적화되어 불필요한 리렌더링을 방지합니다.
 */
export const PasswordConfigForm = memo(function PasswordConfigForm({
  length,
  count,
  onLengthChange,
  onCountChange,
}: PasswordConfigFormProps) {
  return (
    <>
      {/* 패스워드 길이 */}
      <div className="space-y-2">
        <Label htmlFor="length">길이</Label>
        <div className="relative">
          <Input
            id="length"
            type="text"
            inputMode="numeric"
            value={length}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || /^\d+$/.test(value)) {
                const numValue = parseInt(value);
                if (value !== '' && numValue >= PASSWORD_CONFIG.MIN_LENGTH && numValue <= PASSWORD_CONFIG.MAX_LENGTH) {
                  onLengthChange(numValue);
                }
              }
            }}
            onBlur={(e) => {
              const value = e.target.value;
              if (value === '' || parseInt(value) < PASSWORD_CONFIG.MIN_LENGTH) {
                onLengthChange(PASSWORD_CONFIG.MIN_LENGTH);
              } else if (parseInt(value) > PASSWORD_CONFIG.MAX_LENGTH) {
                onLengthChange(PASSWORD_CONFIG.MAX_LENGTH);
              }
            }}
          />
          {length !== PASSWORD_CONFIG.DEFAULT_LENGTH && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-2 hover:bg-transparent"
              aria-label="길이 기본값으로 초기화"
              onClick={() => onLengthChange(PASSWORD_CONFIG.DEFAULT_LENGTH)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* 생성 개수 */}
      <div className="space-y-2">
        <Label htmlFor="count">생성 개수</Label>
        <div className="relative">
          <Input
            id="count"
            type="text"
            inputMode="numeric"
            value={count}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || /^\d+$/.test(value)) {
                const numValue = parseInt(value);
                if (value !== '' && numValue >= PASSWORD_CONFIG.MIN_COUNT && numValue <= PASSWORD_CONFIG.MAX_COUNT) {
                  onCountChange(numValue);
                }
              }
            }}
            onBlur={(e) => {
              const value = e.target.value;
              if (value === '' || parseInt(value) < PASSWORD_CONFIG.MIN_COUNT) {
                onCountChange(PASSWORD_CONFIG.MIN_COUNT);
              } else if (parseInt(value) > PASSWORD_CONFIG.MAX_COUNT) {
                onCountChange(PASSWORD_CONFIG.MAX_COUNT);
              }
            }}
          />
          {count !== PASSWORD_CONFIG.DEFAULT_COUNT && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-2 hover:bg-transparent"
              aria-label="생성 개수 기본값으로 초기화"
              onClick={() => onCountChange(PASSWORD_CONFIG.DEFAULT_COUNT)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </>
  );
});
