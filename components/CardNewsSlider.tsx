'use client'

import { useState, useRef, useEffect } from 'react'

interface CardItem {
  icon: string
  title: string
  body: string
  color: string
}

const cards: CardItem[] = [
  {
    icon: '📮',
    title: 'Kafka',
    body: '이벤트 수집 및 버퍼링\n피크 트래픽 흡수, 데이터 유실 방지\n파티션 기반 병렬 처리',
    color: '#1e40af',
  },
  {
    icon: '⚙️',
    title: 'Flink',
    body: '실시간 스트림 처리\n상태 기반 계산, Exactly-Once 보장\n이벤트 시간 윈도우 집계',
    color: '#c2410c',
  },
  {
    icon: '📊',
    title: 'ClickHouse',
    body: '컬럼형 OLAP 분석\n10배 압축으로 스토리지 절감\n초고속 집계 쿼리',
    color: '#a16207',
  },
  {
    icon: '🔗',
    title: '역할 분리',
    body: '각 컴포넌트가 하나의 역할에 전문화\n독립적 확장 및 교체 가능\n점진적 도입 지원',
    color: '#15803d',
  },
  {
    icon: '💰',
    title: '비용',
    body: '오픈소스 무상 라이선스\nManaged Service 월 $100~\n프로덕션 인프라 월 $1,600~',
    color: '#7c3aed',
  },
  {
    icon: '🚀',
    title: '추천 시나리오',
    body: '초실시간 분석 필수 시\n이벤트 일수백만 건 이상\n상태 기반 처리 필요 시',
    color: '#0369a1',
  },
  {
    icon: '⚠️',
    title: '주의사항',
    body: '3개 시스템 운영 복잡도\n학습 곡선 존재\n최소 구성 리소스 필요',
    color: '#b91c1c',
  },
]

export default function CardNewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const diff = e.touches[0].clientX - startX
    setTranslateX(diff)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (Math.abs(translateX) > 50) {
      if (translateX < 0) handleNext()
      else handlePrev()
    }
    setTranslateX(0)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const diff = e.clientX - startX
    setTranslateX(diff)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (Math.abs(translateX) > 50) {
      if (translateX < 0) handleNext()
      else handlePrev()
    }
    setTranslateX(0)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="my-10 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">📌 핵심 요약 카드</h3>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            aria-label="이전 카드"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            aria-label="다음 카드"
          >
            →
          </button>
        </div>
      </div>

      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${isDragging ? translateX : 0}px))`,
          }}
        >
          {cards.map((card, i) => (
            <div key={i} className="min-w-full px-2">
              <div
                className="flex flex-col items-center rounded-lg p-6 text-white shadow-lg md:flex-row md:gap-6"
                style={{ backgroundColor: card.color }}
              >
                <div className="mb-4 text-5xl md:mb-0">{card.icon}</div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="mb-2 text-xl font-bold">{card.title}</h4>
                  {card.body.split('\n').map((line, j) => (
                    <p key={j} className="text-sm leading-relaxed opacity-90">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all duration-200 ${i === currentIndex ? 'w-6 bg-primary-500' : 'w-2 bg-gray-300 dark:bg-gray-600'}`}
            aria-label={`${i + 1}번째 카드`}
          />
        ))}
      </div>

      <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">
        ← 스와이프 또는 화살표로 탐색 →
      </p>
    </div>
  )
}
