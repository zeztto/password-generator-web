import { useState, useCallback, useLayoutEffect, useRef } from 'react';

const COPY_FEEDBACK_DURATION = 2000;

/** 복사 피드백을 현재 결과 목록과 마지막 복사 요청에 연결합니다. */
export function useClipboard(passwords: readonly string[]) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copyError, setCopyError] = useState('');
  const generation = useRef(0);
  const request = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    generation.current += 1;
    setCopiedIndex(null);
    setCopyError('');
    if (timer.current) clearTimeout(timer.current);
    return () => {
      generation.current += 1;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [passwords]);

  const copyToClipboard = useCallback(async (text: string, index: number) => {
    const activeGeneration = generation.current;
    const activeRequest = ++request.current;
    const isCurrent = () => generation.current === activeGeneration && request.current === activeRequest;
    setCopyError('');
    setCopiedIndex(null);
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(text);
      if (!isCurrent()) return;
      setCopiedIndex(index);
      timer.current = setTimeout(() => {
        if (isCurrent()) setCopiedIndex(null);
      }, COPY_FEEDBACK_DURATION);
    } catch {
      if (isCurrent()) {
        setCopyError('복사하지 못했습니다. 브라우저 권한을 확인하거나 TXT 다운로드를 사용해 주세요.');
      }
    }
  }, []);

  return { copiedIndex, copyToClipboard, copyError };
}
