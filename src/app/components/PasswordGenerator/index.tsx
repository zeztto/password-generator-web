/**
 * 패스워드 생성기 메인 컴포넌트
 * 모듈화된 서브 컴포넌트와 커스텀 훅을 사용하여 구성됩니다.
 *
 * @module PasswordGenerator
 */

import { useCallback, useEffect, useMemo } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { RefreshCw, Download } from 'lucide-react';

import { PasswordConfigForm } from './PasswordConfigForm';
import { CharacterTypeSelector } from './CharacterTypeSelector';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { WarningMessage } from './WarningMessage';
import { PasswordList } from './PasswordList';

import { usePasswordGenerator } from '../../hooks/usePasswordGenerator';
import { useCharacterSelection } from '../../hooks/useCharacterSelection';
import { useClipboard } from '../../hooks/useClipboard';

import { calculatePasswordStrength } from '../../utils/password/strength';
import { downloadPasswordsAsText } from '../../utils/file/download';
import { CHARACTER_SETS } from '../../constants/characters';

/**
 * 패스워드 생성기 컴포넌트
 * 커스텀 훅과 서브 컴포넌트를 조합하여 패스워드 생성 기능을 제공합니다.
 */
export function PasswordGenerator() {
  // 커스텀 훅 사용
  const {
    passwords,
    warningMessage,
    length,
    count,
    setLength,
    setCount,
    generate,
    resetResults,
  } = usePasswordGenerator();

  const [uppercase, uppercaseActions] = useCharacterSelection();
  const [lowercase, lowercaseActions] = useCharacterSelection();
  const [numbers, numbersActions] = useCharacterSelection();
  const [symbols, symbolsActions] = useCharacterSelection();

  const { copiedIndex, copyToClipboard, copyError } = useClipboard(passwords);

  useEffect(() => {
    resetResults();
  }, [length, count, uppercase.selected, lowercase.selected, numbers.selected, symbols.selected, resetResults]);

  // 패스워드 강도 계산 (메모이제이션)
  const strength = useMemo(
    () => calculatePasswordStrength(
      length,
      uppercase.selected,
      lowercase.selected,
      numbers.selected,
      symbols.selected
    ),
    [length, uppercase.selected, lowercase.selected, numbers.selected, symbols.selected]
  );

  // 생성 버튼 비활성화 여부
  const isGenerateDisabled = useMemo(
    () => !uppercase.selected.length &&
          !lowercase.selected.length &&
          !numbers.selected.length &&
          !symbols.selected.length,
    [uppercase.selected, lowercase.selected, numbers.selected, symbols.selected]
  );

  // 패스워드 생성 핸들러
  const handleGenerate = useCallback(() => {
    generate({
      length,
      count,
      selectedUppercase: uppercase.selected,
      selectedLowercase: lowercase.selected,
      selectedNumbers: numbers.selected,
      selectedSymbols: symbols.selected,
    });
  }, [
    generate,
    length,
    count,
    uppercase.selected,
    lowercase.selected,
    numbers.selected,
    symbols.selected,
  ]);

  // 다운로드 핸들러
  const handleDownload = useCallback(() => {
    downloadPasswordsAsText(passwords);
  }, [passwords]);

  return (
    <div className="w-full max-w-2xl space-y-6">
      {/* 타이틀 섹션 */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">비밀번호 생성기</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          암호학적으로 안전한 비밀번호를 최대 100개까지 생성하세요
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          {/* 패스워드 설정 */}
          <PasswordConfigForm
            length={length}
            count={count}
            onLengthChange={setLength}
            onCountChange={setCount}
          />

          {/* 문자 타입 선택 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">포함할 문자</div>
              {passwords.length > 0 && (
                <PasswordStrengthIndicator strength={strength} />
              )}
            </div>

            <CharacterTypeSelector
              id="uppercase"
              label="대문자 (A-Z)"
              enabled={uppercase.enabled}
              available={CHARACTER_SETS.uppercase}
              selected={uppercase.selected}
              onEnabledChange={(checked) => uppercaseActions.toggleEnabled(checked, CHARACTER_SETS.uppercase)}
              onToggleCharacter={uppercaseActions.toggleCharacter}
              onSelectAll={() => uppercaseActions.selectAll(CHARACTER_SETS.uppercase)}
              onClearAll={uppercaseActions.clearAll}
            />

            <CharacterTypeSelector
              id="lowercase"
              label="소문자 (a-z)"
              enabled={lowercase.enabled}
              available={CHARACTER_SETS.lowercase}
              selected={lowercase.selected}
              onEnabledChange={(checked) => lowercaseActions.toggleEnabled(checked, CHARACTER_SETS.lowercase)}
              onToggleCharacter={lowercaseActions.toggleCharacter}
              onSelectAll={() => lowercaseActions.selectAll(CHARACTER_SETS.lowercase)}
              onClearAll={lowercaseActions.clearAll}
            />

            <CharacterTypeSelector
              id="numbers"
              label="숫자 (0-9)"
              enabled={numbers.enabled}
              available={CHARACTER_SETS.numbers}
              selected={numbers.selected}
              onEnabledChange={(checked) => numbersActions.toggleEnabled(checked, CHARACTER_SETS.numbers)}
              onToggleCharacter={numbersActions.toggleCharacter}
              onSelectAll={() => numbersActions.selectAll(CHARACTER_SETS.numbers)}
              onClearAll={numbersActions.clearAll}
            />

            <CharacterTypeSelector
              id="symbols"
              label="특수문자 (!@#$%^&*)"
              enabled={symbols.enabled}
              available={CHARACTER_SETS.symbols}
              selected={symbols.selected}
              onEnabledChange={(checked) => symbolsActions.toggleEnabled(checked, CHARACTER_SETS.symbols)}
              onToggleCharacter={symbolsActions.toggleCharacter}
              onSelectAll={() => symbolsActions.selectAll(CHARACTER_SETS.symbols)}
              onClearAll={symbolsActions.clearAll}
            />
          </div>

          {/* 생성 버튼 */}
          <Button
            onClick={handleGenerate}
            className="w-full"
            disabled={isGenerateDisabled}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            비밀번호 생성
          </Button>

          {/* 경고 메시지 */}
          <WarningMessage message={copyError || warningMessage} />

          {/* 생성된 패스워드 목록 */}
          {passwords.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">
                  생성된 비밀번호 ({passwords.length}개)
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDownload}
                >
                  <Download className="mr-2 h-4 w-4" />
                  TXT 다운로드
                </Button>
              </div>

              <PasswordList
                passwords={passwords}
                copiedIndex={copiedIndex}
                onCopy={copyToClipboard}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
