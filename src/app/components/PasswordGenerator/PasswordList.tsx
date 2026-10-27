/**
 * 패스워드 목록 컴포넌트
 * 생성된 패스워드 목록을 표시하고 복사 기능을 제공합니다.
 *
 * @module PasswordList
 */

import { memo } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Copy, Check } from 'lucide-react';

interface PasswordListProps {
  /** 패스워드 배열 */
  passwords: string[];
  /** 복사된 패스워드의 인덱스 */
  copiedIndex: number | null;
  /** 복사 핸들러 */
  onCopy: (password: string, index: number) => void;
}

/**
 * 패스워드 목록 컴포넌트
 * React.memo로 최적화되어 불필요한 리렌더링을 방지합니다.
 */
export const PasswordList = memo(function PasswordList({
  passwords,
  copiedIndex,
  onCopy,
}: PasswordListProps) {
  if (passwords.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">
        생성된 패스워드 ({passwords.length}개)
      </div>
      <ScrollArea className="h-[300px] rounded-md border p-4">
        <div className="space-y-2">
          {passwords.map((password, index) => (
            <div
              key={index}
              className="flex min-w-0 items-center justify-between gap-2 p-2 rounded-md bg-muted"
            >
              <span className="font-mono text-sm min-w-0 break-all">
                {index + 1}. {password}
              </span>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                aria-label={`${index + 1}번 비밀번호 복사`}
                onClick={() => onCopy(password, index)}
                className="h-8 w-8 p-0"
              >
                {copiedIndex === index ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
});
