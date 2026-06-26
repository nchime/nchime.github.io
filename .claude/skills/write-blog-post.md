# 블로그 포스트 작성 스킬

곽선생 Tech Blog (nchime.github.io)의 글쓰기 스타일 지침입니다.  
이 블로그의 기존 포스트를 분석하여 작성된 스타일 가이드입니다.

---

## 파일 규칙

- **경로**: `data/blog/YYYYMMDD-kebab-case-title.mdx`
- **파일명**: 날짜(YYYYMMDD) + 하이픈 + 영어 소문자 케밥케이스 제목
- **예시**: `20260601-kubernetes-best-practices.mdx`

---

## Frontmatter 템플릿

```yaml
---
title: '기술명(영어): 한국어 부제목으로 핵심 내용 표현'
date: 'YYYY-MM-DD'
tags: ['Tag1', 'Tag2', 'Tag3']
images: ['https://images.unsplash.com/photo-XXXXX?q=80&w=2070&auto=format&fit=crop']
draft: false
summary: '한국어로 1~2문장. 독자가 이 글에서 얻을 것을 명확히 설명합니다.'
---
```

### Frontmatter 작성 규칙

| 필드      | 규칙                                                                             |
| :-------- | :------------------------------------------------------------------------------- |
| `title`   | 한국어. 기술 용어는 영어 원어 유지. `기술명: 설명` 형태 권장                     |
| `date`    | `'YYYY-MM-DD'` 형식, 따옴표 포함                                                 |
| `tags`    | 영어, 2~6개. 기술 용어는 PascalCase (`KnowledgeGraph`), 일반어는 소문자 (`blog`) |
| `images`  | Unsplash URL 또는 `/static/images/파일명.png`. 배열 형태                         |
| `draft`   | `false` (발행) / `true` (임시저장)                                               |
| `summary` | 한국어 1~2문장. "~합니다/~소개합니다" 로 마무리                                  |

---

## 글 구조 (전체 레이아웃)

```
[도입부 - 배경 설명 2~3문장]

[글의 목적 선언 1문장 - "이 글에서는 ~을 소개합니다"]

---

## 1. 첫 번째 섹션

### 1-1. 하위 섹션 (필요시)

---

## 2. 두 번째 섹션

...

## 마치며

[요약 + 독자 행동 촉구 2~4문장]

---

참고 링크:
- [링크명](URL)
```

---

## 도입부 작성 패턴

### 패턴 A — 기술 트렌드형 (AI/DevOps 주제)

```
최근 [분야]에서 [현상/트렌드]이 주목받고 있습니다. [배경 설명 1문장].

이 글에서는 [핵심 개념]의 [주요 내용]과 함께, 실제 [적용/활용] 방법을 [출처/근거]를 바탕으로 자세히 알아보겠습니다.
```

### 패턴 B — 개념 정의형 (기술 개요 주제)

```
[기술/개념]이 빠르게 [진화/발전]하면서 [관련 필요성]에 대한 관심도 높아지고 있습니다. 그 중심에 [핵심 기술/개념]이 있습니다.

이 글에서는 [주제]가 무엇인지, [추가 질문 1], 그리고 [추가 질문 2]를 구체적으로 정리합니다.
```

---

## 섹션 번호 체계

```markdown
## 1. 대섹션 제목

### 1-1. 하위 섹션 (또는 ### 1.1 하위 섹션)

#### 세부 항목 (필요시)
```

- 대섹션: `## 1.`, `## 2.` ...
- 하위: `### 1-1.`, `### 2-1.` 또는 `### 1.1`, `### 2.1`
- 세부: `#### 항목명` (중첩이 깊어지는 경우 `### • 항목명` 도 사용)

---

## 본문 스타일

### 언어

- **전체 한국어** 작성, 존댓말(합니다/입니다) 유지
- 기술 용어는 **영어 원어** 유지 + 첫 등장 시 한국어 설명 병기
  - 예: `하네스(Harness)`, `온톨로지(Ontology)`, `RAG(Retrieval-Augmented Generation)`
- 괄호로 영어 원어 병기: `팬아웃/팬인(Fan-out/Fan-in)`

### 강조 표현

- `**볼드**`: 핵심 기술 용어, 중요 개념 첫 등장 시
- `> 인용구`: 섹션의 핵심 요점 강조
- `> <span className="text-blue-500">강조 텍스트</span>`: 멘토링/조언 글에서 핵심 메시지

### 불릿 리스트

```markdown
- **항목명**: 설명 (항목에 볼드 적용)
- **항목명**: 설명
```

### 구분선

- `---` 를 주요 섹션 사이에 적극 사용

---

## 코드블록 규칙

언어를 반드시 명시합니다:

````markdown
```bash
# macOS 설치
brew install 패키지명
```

```shell
# 실행 명령어
명령어
```

```javascript
// 설정 코드
const config = {}
```

```text
[흐름도나 다이어그램]
A → B → C
```
````

---

## 표(Table) 작성 규칙

```markdown
| 구분        | 항목A | 항목B |
| :---------- | :---- | :---- |
| **행 제목** | 내용  | 내용  |
```

- 열 정렬: `:---` (왼쪽 정렬) 기본
- 행 제목은 `**볼드**` 처리
- 비교표 구조: `| 구분 | A기술 | B기술 |`

---

## ASCII 다이어그램

흐름/아키텍처 설명 시 코드블록 내 ASCII 다이어그램 사용:

```text
[입력] → [처리단계1] ─┬→ [분기A]
                     ├→ [분기B]
                     └→ [분기C]
                           ↓
                     [최종 출력]
```

---

## MDX 컴포넌트 활용

### 박스형 강조 (전제조건, 요약 목록)

```jsx
<div className="rounded-lg border-2 border-gray-200 p-1 text-left">- 항목 1 - 항목 2</div>
```

### 회색 배경 박스 (사전 준비사항)

```jsx
<div className="rounded-lg border-2 border-gray-200 bg-gray-100 p-1 text-left">
  - 항목 1 - 항목 2
</div>
```

### 접이식 섹션 (긴 설명/코드)

```jsx
<details>
  <summary>펼쳐서 보기: 항목명</summary>
  내용...
</details>
```

### 목차 삽입

```jsx
<div className="rounded-lg border-2 border-gray-200 bg-gray-100 p-1 text-left">
  <TOCInline toc={props.toc} exclude="Overview" toHeading={2} />
</div>
```

### 이미지 삽입

```jsx
<img src="이미지URL" width="600" alt="설명" />
```

---

## 마무리 섹션 패턴

```markdown
## 마치며

[글 전체 핵심 요약 1~2문장].

[독자에 대한 행동 촉구 또는 전망 1~2문장]. [실천 권유 문장].

---

참고 링크:

- [문서/블로그명](URL)
- [문서/블로그명](URL)
```

또는 아래처럼 볼드 헤더 형식:

```markdown
---

**참고 링크:**

- [문서명](URL)
```

---

## 이미지 소스 선택

### Unsplash (무료 고품질 사진)

주제에 맞는 키워드로 Unsplash에서 검색:

- 기술/코딩: `coding`, `technology`, `server`, `data`
- 클라우드/인프라: `cloud`, `network`, `kubernetes`
- AI: `artificial intelligence`, `robot`
- 개발자 조언: `mentoring`, `office`, `team`

URL 형식: `https://images.unsplash.com/photo-XXXXX?q=80&w=2070&auto=format&fit=crop`

### 로컬 이미지

`public/static/images/` 에 저장 후 `/static/images/파일명.png` 로 참조

---

## 주제별 태그 참고

| 주제          | 태그 예시                                        |
| :------------ | :----------------------------------------------- |
| AI/LLM        | `AI`, `LLM`, `RAG`, `Agent`, `Ontology`          |
| 인프라/DevOps | `k8s`, `infra`, `DevOps`, `GitHub`, `CI/CD`      |
| 프론트엔드    | `nextjs`, `react`, `tailwind`, `MDX`             |
| 개발 생산성   | `Harness`, `DeveloperProductivity`, `AgentTeams` |
| 커리어        | `mento`, `talk`, `career`                        |
| 블로그        | `blog`, `SEO`, `opengraph`                       |

---

## 작성 체크리스트

글 완성 전 확인 사항:

- [ ] frontmatter 모든 필드 작성 완료 (`title`, `date`, `tags`, `images`, `draft`, `summary`)
- [ ] 도입부: 배경 설명 + 글의 목적 선언
- [ ] 섹션 번호 체계 일관성 (`## 1.`, `### 1-1.`)
- [ ] 기술 용어 첫 등장 시 한국어 설명 병기
- [ ] 비교/정리 내용은 표(Table)로 정리
- [ ] 코드블록에 언어 명시
- [ ] `---` 구분선으로 섹션 분리
- [ ] `## 마치며` 마무리 섹션 작성
- [ ] `참고 링크:` 섹션에 출처 URL 포함
- [ ] 존댓말(합니다/입니다) 일관성
- [ ] 파일명 형식: `YYYYMMDD-kebab-case.mdx`
