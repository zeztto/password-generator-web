/**
 * 암호학적으로 안전한 난수 생성기
 * Web Crypto API를 사용하여 예측 불가능한 난수 값을 생성합니다.
 *
 * @module secureRandom
 */

/**
 * 0(포함)부터 max(제외) 사이의 암호학적으로 안전한 난수를 생성합니다.
 * Rejection sampling을 사용하여 modulo bias를 방지합니다.
 *
 * @param max - 상한값 (제외)
 * @returns 0 이상 max 미만의 정수
 * @throws {Error} max가 양의 정수가 아닌 경우
 *
 * @example
 * ```typescript
 * const randomIndex = getSecureRandomInt(10); // 0-9 사이의 난수
 * ```
 */
export function getSecureRandomInt(max: number): number {
  if (max <= 0 || max > 0x100000000 || !Number.isInteger(max)) {
    throw new Error('max는 1부터 2^32 사이의 정수여야 합니다');
  }

  // 작은 범위는 단순한 방법 사용
  if (max <= 256) {
    const randomByte = new Uint8Array(1);
    let result: number;

    // Rejection sampling으로 modulo bias 방지
    do {
      crypto.getRandomValues(randomByte);
      result = randomByte[0];
    } while (result >= Math.floor(256 / max) * max);

    return result % max;
  }

  // 큰 범위는 32비트 값 사용
  const randomBuffer = new Uint32Array(1);
  let result: number;
  const maxUint32 = 0x100000000;

  do {
    crypto.getRandomValues(randomBuffer);
    result = randomBuffer[0];
  } while (result >= Math.floor(maxUint32 / max) * max);

  return result % max;
}

/**
 * 암호학적으로 안전한 난수 배열을 생성합니다.
 *
 * @param count - 생성할 난수의 개수
 * @param max - 각 난수의 상한값 (제외)
 * @returns 난수 배열
 *
 * @example
 * ```typescript
 * const randomNumbers = getSecureRandomInts(5, 100); // [23, 67, 12, 89, 45]
 * ```
 */
export function getSecureRandomInts(count: number, max: number): number[] {
  return Array.from({ length: count }, () => getSecureRandomInt(max));
}

/**
 * Fisher-Yates 알고리즘을 사용하여 배열을 안전하게 섞습니다.
 *
 * @param array - 섞을 배열 (원본은 수정되지 않음)
 * @returns 새로운 섞인 배열
 *
 * @example
 * ```typescript
 * const cards = ['A', 'B', 'C', 'D'];
 * const shuffled = secureShuffleArray(cards); // ['C', 'A', 'D', 'B']
 * ```
 */
export function secureShuffleArray<T>(array: readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
