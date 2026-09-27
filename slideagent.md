# slideagent — 슬라이딩 웹페이지(발표 자료) 생성 가이드

이 문서는 **단일 정적 HTML 슬라이드 덱**을 만드는 규약이다. 아래를 그대로 따르면 동일한 스타일 · 동작의 슬라이드 페이지가 재현된다.

> 참고 구현: `public/ai-engineer-skills/index.html` (21장)

---

## 1. 산출물 규약

| 항목 | 규칙 |
|---|---|
| 형식 | **단일 HTML 파일**, CSS · JS 전부 인라인 |
| 외부 의존성 | 없음 (프레임워크 · 빌드 · CDN · 웹폰트 전부 배제) |
| 위치 | `public/<slug>/index.html` → `https://<도메인>/<slug>/` 로 서빙 |
| 슬러그 | 소문자-하이픈 (예: `ai-engineer-skills`) |
| 언어 | `<html lang="ko">`, 본문은 한글. `word-break: keep-all` |
| 폰트 | 시스템 폰트 스택만. **외부 웹폰트 금지** (CSP `font-src 'self'` 차단) |
| 이미지 | 원칙적으로 **인라인 SVG**. 필수 사진만 `../figures/` 상대경로 |

---

## 2. 화면 구조

```
body (scroll-snap-type: y mandatory, height:100vh)
└── .progress-bar > .progress-fill#progress     ← 상단 3px 진행률
└── main
    └── section.slide × N                        ← 각 슬라이드 = 뷰포트 1개
        ├── .corner.tl/.tr/.bl/.br               ← (표지 전용)
        ├── 콘텐츠 블록
        ├── .page-num    → "007 / 021"           ← 우상단
        ├── .page-section → "PART 1 / 03"        ← 좌상단
        └── .page-footer  → 제작자 · 저장소        ← 하단
└── script                                        ← 진행률 + 키보드 네비게이션
```

### 슬라이드 3종
| 클래스 | 용도 | 배경 |
|---|---|---|
| `.slide.cover` | 표지 · 클로징 | radial-gradient + 코너 프레임 |
| `.slide.content` | 본문 | 기본 `--bg` |
| `.slide.div` | 파트 간지 | linear-gradient + `.div-wrap` |

---

## 3. 디자인 토큰

| 역할 | 토큰 | 값 |
|---|---|---|
| 배경 | `--bg` | `#17121f` |
| 패널 | `--panel` | `#211a2c` |
| 보더 | `--line` | `#342a40` |
| 본문 | `--text` | `#f2ecf5` |
| 보조 | `--muted` | `#a99cb6` |
| 더 흐리게 | `--dim` | `#7d6c90` |
| 강조 | `--coral` | `#ff8a6b` |
| 강조(어둡게) | `--coral-d` | `#d4604a` |
| 크림 | `--cream` | `#efe8f2` |
| 여백 | `--pad` | `clamp(2rem, 4.5vw, 4.2rem)` |
| 카드 속 배경 | — | `#2a1d38` / 보더 `#4a3a5e` |

**폰트**
```css
font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo',
             'Noto Sans KR', 'Malgun Gothic', 'Nanum Gothic', sans-serif;
/* 숫자·코드: */ .mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
```

**타이포는 반드시 `clamp()`** — 뷰포트에 따라 유동적으로 크다.

| 요소 | clamp |
|---|---|
| 표지 제목 | `clamp(3rem, 8vw, 5.6rem)` |
| 슬라이드 제목 | `clamp(1.5rem, 3.3vw, 2.4rem)` |
| 간지 제목 | `clamp(2rem, 4.6vw, 3.3rem)` |
| 큰 인용 | `clamp(1.15rem, 2.5vw, 1.8rem)` |
| 본문 리드 | `clamp(.95rem, 1.7vw, 1.12rem)` |
| 각주 · 캡션 | `clamp(.86rem, 1.5vw, 1rem)` |
| 카드 제목 | `clamp(1rem, 1.7vw, 1.18rem)` |
| 표 셀 | `clamp(.82rem, 1.4vw, 1.02rem)` |

---

## 4. 필수 CSS (전체 복사)

```css
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
:root{--bg:#17121f;--panel:#211a2c;--line:#342a40;--text:#f2ecf5;--muted:#a99cb6;--dim:#7d6c90;
 --coral:#ff8a6b;--coral-d:#d4604a;--cream:#efe8f2;--pad:clamp(2rem,4.5vw,4.2rem)}
*{box-sizing:border-box;margin:0}
body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Noto Sans KR','Malgun Gothic','Nanum Gothic',sans-serif;
 scroll-snap-type:y mandatory;overflow-y:scroll;height:100vh;word-break:keep-all}
.mono{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.progress-bar{position:fixed;top:0;left:0;right:0;height:3px;background:#0f0b15;z-index:99}
.progress-fill{height:100%;background:var(--coral);width:0;transition:width .2s}
.slide{min-height:100vh;scroll-snap-align:start;display:flex;flex-direction:column;justify-content:center;
 padding:var(--pad);position:relative;border-bottom:1px solid var(--line)}
.eyebrow{font-size:.78rem;letter-spacing:.18em;font-weight:700;text-transform:uppercase;margin-bottom:.9rem}
.eyebrow.coral{color:var(--coral)} .eyebrow.cream{color:var(--muted)}
.coral-t{color:var(--coral)} .big{font-size:clamp(1.3rem,2.8vw,2rem);font-weight:800;line-height:1.5;color:var(--coral)} .small-q{display:block;font-size:.62em;font-weight:500;color:var(--muted);margin-top:.4rem}
.content-title{font-size:clamp(1.5rem,3.3vw,2.4rem);font-weight:800;line-height:1.3;text-wrap:balance}
.bar{height:3px;width:64px;background:var(--coral);margin:1rem 0 1.3rem;border-radius:2px}
.lead{color:var(--muted);font-size:clamp(.95rem,1.7vw,1.12rem);line-height:1.7;margin-bottom:1.1rem;max-width:62rem}
.foot-note{color:var(--muted);font-size:clamp(.86rem,1.5vw,1rem);line-height:1.7;margin-top:1.2rem;max-width:66rem}
.foot-note b,.lead b,.after b,.stat-l b{color:var(--cream)}
.cover{background:radial-gradient(1200px 600px at 50% 0%,#2a1d38 0%,#17121f 70%)}
.cover-wrap{max-width:62rem}
.cover-title{font-size:clamp(3rem,8vw,5.6rem);font-weight:800;line-height:1.05;letter-spacing:-.01em}
.cover-title.end{font-size:clamp(2.4rem,6vw,4.2rem)}
.cover-sub{color:var(--cream);font-size:clamp(1.05rem,2.1vw,1.5rem);margin-top:.8rem;line-height:1.45}
.cover-quote{font-size:clamp(1rem,1.9vw,1.3rem);line-height:1.7;margin:.2rem 0 .6rem}
.cover-by{color:var(--muted);font-size:clamp(.85rem,1.5vw,1rem);line-height:1.6}
.cover-meta{display:flex;gap:1.4rem;flex-wrap:wrap;color:var(--dim);font-size:.9rem;margin-top:1.8rem}
.motif{width:min(420px,80%);height:auto;margin:1.4rem 0}
.corner{position:absolute;width:26px;height:26px;border:2px solid var(--coral-d);opacity:.5}
.corner.tl{top:26px;left:26px;border-right:0;border-bottom:0}.corner.tr{top:26px;right:26px;border-left:0;border-bottom:0}
.corner.bl{bottom:26px;left:26px;border-right:0;border-top:0}.corner.br{bottom:26px;right:26px;border-left:0;border-top:0}
.div{background:linear-gradient(120deg,#2a1d38 0%,#17121f 65%)}
.div-wrap{display:grid;grid-template-columns:1.3fr .7fr;gap:2.4rem;align-items:center}
.div-title{font-size:clamp(2rem,4.6vw,3.3rem);font-weight:800;line-height:1.2;margin:.2rem 0 .9rem;text-wrap:balance}
.div-sub{color:var(--muted);font-size:clamp(.95rem,1.7vw,1.15rem);line-height:1.7;max-width:40rem}
.div-ch{list-style:none;padding:0;border-left:3px solid var(--coral);padding-left:1.2rem}
.div-ch li{font-size:clamp(1rem,1.7vw,1.2rem);line-height:2;color:var(--cream)}
.grid{display:grid;gap:1rem}.grid-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-4{grid-template-columns:repeat(4,minmax(0,1fr))}
.card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:1.1rem 1.2rem}
.card-num{color:var(--coral);font-size:.8rem;font-weight:700;margin-bottom:.5rem}
.card-h{font-weight:700;font-size:clamp(1rem,1.7vw,1.18rem);line-height:1.4;margin-bottom:.45rem}
.card-sub{color:var(--muted);font-size:clamp(.85rem,1.4vw,.98rem);line-height:1.6}
.bigq{border-left:4px solid var(--coral);padding:.4rem 0 .4rem 1.4rem;margin:.6rem 0 1rem;
 font-size:clamp(1.15rem,2.5vw,1.8rem);line-height:1.6;font-weight:600;max-width:64rem}
.q-src{color:var(--dim);font-size:.92rem;line-height:1.6;margin-bottom:.9rem;max-width:64rem}
.after{color:var(--muted);font-size:clamp(.9rem,1.6vw,1.06rem);line-height:1.7;max-width:62rem}
.deck-table{border-collapse:collapse;width:100%;max-width:74rem;margin:.4rem 0}
.deck-table th,.deck-table td{border:1px solid var(--line);padding:.6rem .85rem;text-align:left;
 font-size:clamp(.82rem,1.4vw,1.02rem);line-height:1.55;vertical-align:top}
.deck-table th{background:var(--panel);color:var(--coral);font-weight:700}
.big-list{padding-left:1.3rem;max-width:66rem}.big-list li{font-size:clamp(.95rem,1.75vw,1.2rem);line-height:1.75;margin:.5rem 0}
.big-list b{color:var(--cream)}
.stat-row{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));max-width:74rem}
.stat{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:1.2rem 1.3rem}
.stat-n{color:var(--coral);font-size:clamp(1.6rem,3.4vw,2.5rem);font-weight:800;line-height:1.1;margin-bottom:.5rem}
.stat-l{color:var(--muted);font-size:clamp(.85rem,1.4vw,1rem);line-height:1.6}
.deck-fig{margin:.2rem auto 0;width:100%;max-width:74rem;text-align:center}
.deck-fig svg{display:block;margin:0 auto;width:100%;height:auto;border:1px solid var(--line);
 border-radius:12px;background:#1b1526;padding:6px}
.deck-fig figcaption{color:var(--dim);font-size:.88rem;margin-top:.6rem}
.easy{margin-top:1.3rem;max-width:66rem;background:#2a1d38;border:1px solid #4a3a5e;border-left:4px solid var(--coral);
 border-radius:10px;padding:.85rem 1.1rem;font-size:clamp(.95rem,1.7vw,1.14rem);line-height:1.65;color:var(--text)}
.easy-k{display:inline-block;color:var(--coral);font-weight:800;font-size:.8em;letter-spacing:.06em;margin-right:.7rem}
.page-num{position:absolute;top:1.5rem;right:1.8rem;color:var(--dim);font-size:.8rem}
.page-section{position:absolute;top:1.5rem;left:1.8rem;color:var(--dim);font-size:.8rem;letter-spacing:.08em}
.page-footer{position:absolute;bottom:1.2rem;left:1.8rem;right:1.8rem;display:flex;justify-content:space-between;gap:1rem;color:#5a4d68;font-size:.75rem}
.cover .page-num{top:3.5rem;right:3.6rem}.cover .page-section{top:3.5rem;left:3.6rem}.cover .page-footer{bottom:3.2rem;left:3.6rem;right:3.6rem}
@media(max-width:900px){.grid-3,.grid-4{grid-template-columns:1fr}.div-wrap{grid-template-columns:1fr}
 .page-footer{display:none}.slide{min-height:auto;padding:2.4rem 1.1rem 3rem}.deck-table{display:block;overflow-x:auto}}
@media print{body{height:auto;overflow:visible;background:#fff;color:#111}
 .slide{page-break-after:always;min-height:auto;border:none;background:#fff!important;color:#111}
 .card,.stat,.deck-table th{background:#f6f1f7!important;border-color:#ccc!important}
 .content-title,.card-h,.div-title,.cover-title{color:#111}.card-sub,.lead,.foot-note,.div-sub,.after{color:#444}.easy{background:#fdf3ef!important;color:#111;border-color:#e8c9bd!important}.progress-bar{display:none}}
```

---

## 5. 필수 JS (전체 복사)

```js
const slides=[...document.querySelectorAll('.slide')],fill=document.getElementById('progress');let cur=0;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){cur=slides.indexOf(e.target);
fill.style.width=((cur+1)/slides.length*100)+'%';}}),{threshold:.55});slides.forEach(s=>io.observe(s));
function go(i){i=Math.max(0,Math.min(slides.length-1,i));slides[i].scrollIntoView({behavior:'smooth',block:'start'});}
addEventListener('keydown',e=>{if(['ArrowDown','ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();go(cur+1);}
if(['ArrowUp','ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(cur-1);}
if(e.key==='Home'){e.preventDefault();go(0);}if(e.key==='End'){e.preventDefault();go(slides.length-1);}});
```

> 동작: `IntersectionObserver(threshold: 0.55)` 로 현재 슬라이드를 찾아 진행률 바를 갱신하고, 방향키 · Space · PageUp/Down · Home/End 로 슬라이드를 건넌다.

---

## 6. 슬라이드 컴포넌트 카탈로그

모든 본문 슬라이드는 **고정 순서**를 따른다.

```html
<section class="slide content" id="s7" data-n="7">
  <div class="eyebrow cream">카테고리 라벨</div>      <!-- 1. 소제목 -->
  <h2 class="content-title">한 장의 제목</h2>          <!-- 2. 주장 -->
  <div class="bar small"></div>                        <!-- 3. 코럴 구분선 -->
  <!-- 4. 본문 (아래 중 하나) -->
  <div class="page-num mono">007 / 021</div>
  <div class="page-section mono">PART 1 / 03</div>
  <div class="page-footer">
    <span>자료 제목</span><span>저자 · 저장소</span>
  </div>
</section>
```

### 6-1. 표지
```html
<section class="slide cover" id="s1" data-n="1">
  <div class="corner tl"></div><div class="corner tr"></div>
  <div class="corner bl"></div><div class="corner br"></div>
  <div class="cover-wrap">
    <div class="eyebrow coral">시리즈 이름</div>
    <h1 class="cover-title">제목 <span class="coral-t">강조</span></h1>
    <p class="cover-sub">부제</p>
    <!-- 장식 모티프 (420x60 SVG, 생략 가능) -->
    <svg class="motif" viewBox="0 0 420 60">...</svg>
    <p class="cover-quote">"핵심 인용"</p>
    <p class="cover-by">— 부연</p>
    <div class="cover-meta"><span>발표 정보</span><span class="mono">버전</span></div>
  </div>
  <div class="page-num mono">001 / 021</div>
  <div class="page-section mono">OPENING / 01</div>
  <div class="page-footer">...</div>
</section>
```

### 6-2. 간지 (파트 표지)
```html
<section class="slide div" id="s5" data-n="5">
  <div class="div-wrap">
    <div>
      <div class="eyebrow coral">PART 1</div>
      <h2 class="div-title">파트 제목</h2>
      <p class="div-sub">한 줄 요약</p>
      <svg class="motif" viewBox="0 0 420 60">...</svg>
    </div>
    <ul class="div-ch">
      <li>1장. …</li><li>2장. …</li>
    </ul>
  </div>
  <!-- page-num / page-section / page-footer -->
</section>
```

### 6-3. 본문 패턴 7가지

**a) 큰 인용 + 설명**
```html
<blockquote class="bigq">주장 한 줄<br><span class="coral-t">강조한 줄</span></blockquote>
<p class="q-src">— 출처</p>
<p class="after">뒤에 붙이는 해설. <b>굵은 강조</b> 포함 가능</p>
```

**b) 카드 그리드 (3 또는 4열)**
```html
<div class="grid grid-3">
  <div class="card">
    <div class="card-num mono">01</div>
    <div class="card-h">제목</div>
    <div class="card-sub">한두 줄 설명</div>
  </div>
  <!-- … -->
</div>
```
- `grid-3` 은 **9개 카드(3×3)** 까지, `grid-4` 는 4개까지.
- 카드 2행(6개) 이상이면 foot-note/박스를 줄여 높이를 확보한다.

**c) 숫자 스탯**
```html
<div class="stat-row">
  <div class="stat">
    <div class="stat-n">1536</div>
    <div class="stat-l">설명. <b>강조</b> 포함 가능</div>
  </div>
</div>
```

**d) 표**
```html
<table class="deck-table">
  <thead><tr><th>열1</th><th>열2</th></tr></thead>
  <tbody><tr><td>…</td><td>…</td></tr></tbody>
</table>
```
- 행은 **최대 5행**(헤더 포함). 그 이상은 카드로 바꾼다.

**e) 큰 목록**
```html
<ul class="big-list">
  <li><b>1. 항목</b> — 설명</li>
</ul>
```
- 최대 6항목.

**f) 그림 (인라인 SVG)**
```html
<figure class="deck-fig">          <!-- 또는 style="max-width:60rem" -->
  <svg viewBox="0 0 960 380">…</svg>
  <figcaption>그림 N. 설명</figcaption>
</figure>
```

**g) 각주 + 쉽게 말하면**
```html
<p class="foot-note">출처와 해석 주의사항. <b>굵은 강조</b></p>
<div class="easy">
  <span class="easy-k">쉽게 말하면</span>
  비유 한두 문장. <b>핵심 단어</b> 볼드.
</div>
```

---

## 7. 내용 작성 규칙

1. **한 장 = 한 주장.** 제목은 문장형으로 끝까지 읽히게 쓴다 ("~는 이것이다").
2. 모든 본문 슬라이드에 **`.easy` 박스 필수** (표지 · 간지는 제외). 비유로 다시 설명한다.
3. **섹션 라벨 체계** — `OPENING` / `PART 1~N` / `정리` / `CLOSING`, 각 섹션은 `01`부터 연속.
4. **페이지 번호** — `0NN / 총장`, 3자리 zero-pad. 덱 전체에서 denominator 가 전부 같아야 한다.
5. **슬라이드 `id` = `s1..sN`**, `data-n` 은 N과 같아야 한다.
6. 수치에는 **출처 · 분모 · 단위**를 붙인다. "느낌"은 금지.
7. 간지(`.div`)는 파트당 1장씩. 파트 요약은 `.div-ch` 목록에 담는다.
8. 클로징 슬라이드는 `.slide.cover` + `.cover-title.end` 를 쓴다.

---

## 8. 높이 예산 (매우 중요)

슬라이드는 `100vh` 를 넘으면 snap 이 깨진다. **1440×900 (뷰포트 약 750px)** 기준으로 계산한다.

| 요소 | 대략 높이 |
|---|---|
| `--pad` 위아래 | 134px |
| eyebrow + 제목 + bar | 115px |
| 카드 1행 | 130px |
| 카드 3행(3×3) | 420px |
| 표 1행 | 44px |
| stat 1행 | 130px |
| `.big-list` 1항목 | 50px |
| `.foot-note` 2줄 | 75px |
| `.easy` 2줄 | 100px |
| 인포그래픽 SVG | viewBox 높이 그대로 px |

> **계산 합계 ≤ 730px** 를 목표로 한다. 넘으면 → 텍스트 축약 · 카드 줄이기 · `max-width:60rem` 축소 순으로 조정한다.

### 인포그래픽 SVG 높이 상한
- `viewBox="0 0 960 H"` + `max-width:60rem` → **H ≤ 380**
- 그 외 caption(25px) + easy(100px) 포함 예산 내에서 설계한다.

---

## 9. 생성 절차

1. **주제 → 섹션 분해.** PART 마다 2~4 소주제, 소주제마다 슬라이드 1장.
2. **장 수 확정.** 표지 1 + 오프닝 3~4 + (간지+본문) ×N + 정리 3 + 클로징 1.
3. **템플릿 파일 복사.** 이 문서 4·5 절의 CSS/JS 를 골격으로 삼는다.
4. **콘텐츠 채우기.** 위 컴포넌트 카탈로그에서 패턴을 골라 붙인다.
5. **인포그래픽 1장 추가** (정리 섹션 마지막, 클로징 직전) — 전체 구성 타임라인 + 핵심 구조.
6. **검증** (아래 체크리스트) 후 수정.
7. 로컬 확인: `open public/<slug>/index.html`

---

## 10. 검증 체크리스트

- [ ] `class="slide ` 개수 == 페이지 번호 denominator
- [ ] 페이지 번호 `001..0N` 연속, 중복 없음
- [ ] `id="s1".."sN"` 연속, `data-n` 과 일치
- [ ] `page-section` 라벨이 섹션별로 `01`부터 연속
- [ ] HTML 태그 균형 (미닫이 태그 없음)
- [ ] 중국어·일본어 잔존 문자 없음 (예: `显存`, `週`)
- [ ] 한글 오탈자 없음 (조사·띄어쓰기)
- [ ] 900px 이하에서 1열로 붕괴하는지
- [ ] `@media print` 에서 슬라이드가 페이지 단위로 분리되는지
- [ ] 인라인 `<script>` 만 있고 외부 src 가 없는지

### 검증 스크립트

```bash
python3 - <<'PY'
from html.parser import HTMLParser
import re, sys
path = sys.argv[1] if len(sys.argv) > 1 else 'public/ai-engineer-skills/index.html'
VOID = {'area','base','br','col','embed','hr','img','input','link','meta',
        'param','source','track','wbr','path','line','circle','rect','marker','use','stop'}
class P(HTMLParser):
    def __init__(s):
        super().__init__(convert_charrefs=True); s.stack=[]; s.err=[]
    def handle_starttag(s,t,a):
        if t not in VOID: s.stack.append((t, s.getpos()))
    def handle_endtag(s,t):
        if t in VOID: return
        if not s.stack: s.err.append(f'extra </{t}> {s.getpos()}'); return
        if s.stack[-1][0] != t:
            s.err.append(f'mismatch </{t}> {s.getpos()} vs <{s.stack[-1][0]}> {s.stack[-1][1]}')
            for i in range(len(s.stack)-1, -1, -1):
                if s.stack[i][0] == t: del s.stack[i:]; return
        else: s.stack.pop()

src = open(path, encoding='utf-8').read()
p = P(); p.feed(src)

pages = re.findall(r'page-num mono">(\d+) / (\d+)', src)
ids   = re.findall(r'id="(s\d+)"', src)
secs  = re.findall(r'page-section mono">([^<]+)', src)

print('HTML errors :', p.err or 'none')
print('unclosed    :', p.stack or 'none')
print('slides      :', src.count('class="slide '))
print('page numbers:', [n for n,_ in pages])
print('denominator :', {d for _,d in pages})
print('ids         :', ids)
print('sections    :', secs)

assert p.err or p.stack == [], 'HTML 태그 균형 실패'
n = src.count('class="slide ')
assert len(pages) == n, '페이지 번호 개수 불일치'
assert len({d for _,d in pages}) == 1, 'denominator 불일치'
assert [int(x[1:]) for x in ids] == list(range(1, n+1)), 'id 불연속'
assert len(secs) == n, '섹션 라벨 누락'
print('\nALL CHECKS PASSED')
PY
```

---

## 11. 금지 사항

- 외부 CSS/JS/폰트 CDN · 프레임워크(reveal.js, Swiper 등) — **금지**
- `box-shadow` 남용 (표지 이미지 1개 정도만 허용)
- 한 장에 주장 2개 이상 담기
- `.easy` 박스 생략
- 스크롤이 세로가 아닌 종 방향
