/**
 * 경고 메시지 컴포넌트
 * 사용자에게 경고 또는 알림 메시지를 표시합니다.
 *
 * @module WarningMessage
 */

import { memo } from 'react';

interface WarningMessageProps {
  /** 경고 메시지 내용 */
  message: string;
}

/**
 * 경고 메시지 컴포넌트
 * React.memo로 최적화되어 불필요한 리렌더링을 방지합니다.
 */
export const WarningMessage = memo(function WarningMessage({
  message,
}: WarningMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="p-3 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
      <p className="text-sm text-yellow-800 dark:text-yellow-200">
        {message}
      </p>
    </div>
  );
});
