# 비밀번호 생성기

Web Crypto `crypto.getRandomValues()`와 rejection sampling으로 선택한 문자에서 비밀번호를 생성합니다. 대문자·소문자·숫자·기호를 개별 제외하고 1~128자, 1~100개를 생성하며 TXT 다운로드와 항목별 복사를 지원합니다. 생성값은 서버나 브라우저 storage에 저장하지 않으며 설정을 바꾸면 이전 결과를 비웁니다.

## 실행

Node.js 22 이상과 npm이 필요합니다. API key, 계정, backend, 외부 서비스 설정은 필요하지 않습니다.

```sh
npm ci --ignore-scripts
npm run dev -- --host 127.0.0.1
```

표시된 localhost URL을 브라우저에서 엽니다.

```sh
npm run typecheck
npm test
npm run build
npm run preview
```

`dist/`를 HTTPS 정적 hosting에 배포할 수 있습니다. Vite dev/preview server는 로컬 확인용입니다. Web Crypto와 Clipboard API는 최신 브라우저 및 HTTPS 또는 localhost에서 사용하세요.

## 검증과 한계

6개 Node test: Web Crypto 경로·선택 문자와 제외 문자·중복 방지, 빈 문자/유한 조합, 길이·개수 경계, 난수 범위·shuffle, 결과 identity 변경 시 복사 상태 초기화·늦은 응답 폐기·권한 실패. 테스트는 synthetic 입력만 사용합니다.

로컬 production build를 Ego Lite에서 1440×900, 1024×768, 390×844, 360×800으로 확인했습니다. 128자 숫자 3개 생성, 0·1 제외, TXT 실제 다운로드와 표시값의 바이트 일치, clipboard write 성공 상태, 가로 overflow를 확인했습니다. Clipboard의 실제 저장 바이트 readback과 모바일 실기기 검증은 수행하지 않았습니다. 공개 배포·원격 CI 실행은 이 source 준비 단계에 포함되지 않습니다.

선택한 문자 유형이 매 비밀번호에 반드시 하나씩 들어간다는 보장은 없습니다. 중복 없는 생성은 유한 조합 수까지로 제한되며 재시도 상한이 있습니다. 표시되는 강도는 문자 유형 수·길이에 기반한 기존 참고 지표이며 엔트로피 계산이나 서비스 정책 준수·크래킹 내성 보증이 아닙니다. 복사와 다운로드는 기기의 일반 clipboard와 평문 파일에 남습니다. 실제 비밀번호의 보관은 별도 password manager를 사용하세요.

## Source edition

기존 first-party 앱에서 실행에 필요한 source와 검토한 SVG favicon만 분리했습니다. 환경 파일, 운영 이력, 예전 문서, 미사용 UI·legacy code, raster/OG 자산은 포함하지 않았습니다. 의존성은 `package-lock.json`에 고정하고 CI action은 commit SHA로 고정했습니다. `.github/workflows/ci.yml`은 push/PR에서 읽기 권한만 사용하여 typecheck, test, build, audit를 수행합니다.

MIT License입니다. 기존 `ATTRIBUTIONS.md`를 보존했으며 실제 포함된 third-party package와 license 원문은 `THIRD_PARTY_NOTICES.md`를 확인하세요. 원본 attribution의 Unsplash 문구는 원본 보존용이며 이 edition에는 사진이 없습니다.
