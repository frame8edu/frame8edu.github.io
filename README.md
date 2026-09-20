# 프레임8교육연구소 홈페이지

`frame8edu.com`용 정적 HTML 홈페이지입니다. 별도의 빌드 과정 없이 GitHub Pages에서 배포할 수 있습니다.

## GitHub Pages 연결

1. GitHub에서 새 저장소를 만듭니다.
2. 이 폴더 안의 파일과 폴더를 저장소 최상위에 업로드합니다.
3. 저장소의 **Settings → Pages**로 이동합니다.
4. **Source**에서 **GitHub Actions**를 선택합니다.
5. `main` 브랜치에 업로드하면 자동 배포됩니다.

## frame8edu.com 도메인 연결

저장소에는 `CNAME` 파일이 포함되어 있습니다. 도메인 관리업체의 DNS에서 다음을 설정합니다.

- `www`: CNAME → `<GitHub아이디>.github.io`
- 루트 도메인(`@`): GitHub Pages 안내에 표시되는 A 레코드 4개

DNS 반영 후 GitHub의 **Settings → Pages → Custom domain**에 `frame8edu.com`을 입력하고 **Enforce HTTPS**를 켭니다.

## 수정 위치

- 메인: `index.html`
- 프로그램: `program.html`
- AI 활용·윤리: `ai-ethics.html`
- 대표자: `director.html`
- 문의: `inquiry.html`
- 공통 디자인: `assets/style.css`
- 메뉴·폼 동작: `assets/app.js`

문의 폼은 개인정보를 저장하거나 전송하지 않는 안내용 상태입니다. 실제 접수 기능을 연결하기 전에는 현재 상태를 유지하세요.
