# Changelog

## 1.0.0 — 2026-10-28

- 실행 가능한 공개 source edition을 분리했습니다.
- 동명 구형 Math.random 컴포넌트를 제외해 기존 Web Crypto 구현을 연결했습니다. 길이·개수 정수 경계, 32-bit 난수 상한, typecheck, clipboard 실패 안내, 긴 결과 줄바꿈과 접근성 이름을 보완했습니다. 설정을 바꾸면 이전 결과를 비우고 강도 지표의 참고용 한계를 UI에 표시합니다. 결과 변경 시 clipboard 피드백과 pending 작업을 무효화합니다.
- 재현 가능한 npm lockfile, Node test, 읽기 권한 CI와 third-party notice를 추가했습니다.
- 로컬 typecheck·test·build·audit와 browser QA를 수행했습니다. 공개 배포와 원격 CI는 별도입니다.
