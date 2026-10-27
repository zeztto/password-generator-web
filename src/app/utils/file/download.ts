/**
 * 파일 다운로드 유틸리티
 *
 * @module download
 */

/**
 * 패스워드를 텍스트 파일로 다운로드합니다.
 * 파일명은 "passwords_YYYY-MM-DD.txt" 형식입니다.
 *
 * @param passwords - 다운로드할 패스워드 배열
 *
 * @example
 * ```typescript
 * const passwords = ['Abc123!@#', 'Xyz789$%^'];
 * downloadPasswordsAsText(passwords);
 * // "passwords_2025-12-23.txt" 파일 다운로드
 * ```
 */
export function downloadPasswordsAsText(passwords: string[]): void {
  if (passwords.length === 0) return;

  // 줄바꿈으로 구분하여 텍스트 생성
  const content = passwords.join('\n');
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `passwords_${new Date().toISOString().split('T')[0]}.txt`;

  // 다운로드 실행
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 메모리 정리
  URL.revokeObjectURL(url);
}
