'use client'

import { useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Link from '@/components/Link'

// ECharts is heavy — dynamically import with SSR disabled
const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

interface OverviewRow {
  date: string
  activeUsers: number
  sessions: number
  pageViews: number
  avgSessionDuration: number
  bounceRate: number
}

interface TopPageRow {
  pagePath: string
  pageViews: number
}

interface AnalyticsData {
  overview: OverviewRow[]
  topPages: TopPageRow[]
  totals: {
    activeUsers: number
    sessions: number
    pageViews: number
    avgSessionDuration: number
    bounceRate: number
  }
  isSample?: boolean
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return `${m}분 ${s}초`
}

function formatDate(dateStr: string): string {
  // dateStr is YYYYMMDD
  if (dateStr.length !== 8) return dateStr
  return `${dateStr.slice(4, 6)}/${dateStr.slice(6, 8)}`
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      {sub && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{sub}</p>}
    </div>
  )
}

export default function DashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [days, setDays] = useState(30)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/analytics?days=${days}`)
      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.details || body.error || 'Failed to fetch')
      }
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [days])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // ECharts option for daily page views line chart
  const pageViewsOption = data
    ? {
        tooltip: { trigger: 'axis' as const },
        grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
        xAxis: {
          type: 'category' as const,
          data: data.overview.map((r) => formatDate(r.date)),
          axisLabel: { interval: Math.max(0, Math.floor(data.overview.length / 7) - 1) },
        },
        yAxis: { type: 'value' as const },
        series: [
          {
            name: '페이지뷰',
            type: 'line' as const,
            smooth: true,
            data: data.overview.map((r) => r.pageViews),
            areaStyle: { opacity: 0.15 },
            lineStyle: { width: 2 },
            itemStyle: { color: '#6366f1' },
          },
        ],
      }
    : {}

  // ECharts option for daily users bar chart
  const usersOption = data
    ? {
        tooltip: { trigger: 'axis' as const },
        grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
        xAxis: {
          type: 'category' as const,
          data: data.overview.map((r) => formatDate(r.date)),
          axisLabel: { interval: Math.max(0, Math.floor(data.overview.length / 7) - 1) },
        },
        yAxis: { type: 'value' as const },
        series: [
          {
            name: '활성 사용자',
            type: 'bar' as const,
            data: data.overview.map((r) => r.activeUsers),
            itemStyle: { color: '#10b981', borderRadius: [4, 4, 0, 0] },
          },
        ],
      }
    : {}

  // ECharts option for top pages horizontal bar
  const topPagesOption = data
    ? {
        tooltip: { trigger: 'axis' as const, axisPointer: { type: 'shadow' as const } },
        grid: { left: '3%', right: '10%', bottom: '3%', top: '10%', containLabel: true },
        xAxis: { type: 'value' as const },
        yAxis: {
          type: 'category' as const,
          data: [...data.topPages].reverse().map((r) => r.pagePath),
          axisLabel: { width: 120, overflow: 'truncate' as const },
        },
        series: [
          {
            name: '페이지뷰',
            type: 'bar' as const,
            data: [...data.topPages].reverse().map((r) => r.pageViews),
            itemStyle: { color: '#f59e0b', borderRadius: [0, 4, 4, 0] },
          },
        ],
      }
    : {}

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📊 블로그 통계</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Google Analytics 기반 접속 통계 대시보드
          </p>
          {data?.isSample && (
            <span className="mt-1 inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
              📌 샘플 데이터 — 실제 연동 시 실시간 데이터로 표시됩니다
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value={7}>최근 7일</option>
            <option value={30}>최근 30일</option>
            <option value={90}>최근 90일</option>
          </select>
          <button
            onClick={fetchData}
            disabled={loading}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? '로딩…' : '새로고침'}
          </button>
        </div>
      </div>

      {/* Error — only show if we also have no data at all */}
      {error && !data && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
          <p className="font-semibold">⚠️ 데이터를 불러올 수 없습니다</p>
          <p className="mt-1">{error}</p>
          <p className="mt-2 text-xs text-red-500">
            환경변수 <code>GA_SERVICE_ACCOUNT_KEY</code>와 <code>GA_PROPERTY_ID</code>가 올바르게
            설정되었는지 확인하세요.
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && !data && (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
        </div>
      )}

      {/* Content */}
      {data && (
        <>
          {/* Stat Cards */}
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <StatCard
              label="총 페이지뷰"
              value={data.totals.pageViews.toLocaleString()}
              sub={`최근 ${days}일`}
            />
            <StatCard label="활성 사용자" value={data.totals.activeUsers.toLocaleString()} />
            <StatCard label="세션" value={data.totals.sessions.toLocaleString()} />
            <StatCard
              label="평균 체류시간"
              value={formatDuration(data.totals.avgSessionDuration)}
            />
            <StatCard label="이탈률" value={`${(data.totals.bounceRate * 100).toFixed(1)}%`} />
          </div>

          {/* Charts Row 1 */}
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            {/* Page Views Trend */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                📈 일별 페이지뷰
              </h2>
              <ReactECharts option={pageViewsOption} style={{ height: 300 }} />
            </div>

            {/* Daily Users */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                👥 일별 활성 사용자
              </h2>
              <ReactECharts option={usersOption} style={{ height: 300 }} />
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            {/* Top Pages */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                🔥 인기 페이지 TOP 10
              </h2>
              <ReactECharts option={topPagesOption} style={{ height: 400 }} />
            </div>

            {/* Top Pages Table */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                📋 페이지뷰 순위
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="pb-3 text-left font-medium text-gray-500 dark:text-gray-400">
                        순위
                      </th>
                      <th className="pb-3 text-left font-medium text-gray-500 dark:text-gray-400">
                        페이지
                      </th>
                      <th className="pb-3 text-right font-medium text-gray-500 dark:text-gray-400">
                        페이지뷰
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topPages.map((page, i) => (
                      <tr
                        key={page.pagePath}
                        className="border-b border-gray-100 last:border-0 dark:border-gray-700/50"
                      >
                        <td className="py-3 text-gray-500 dark:text-gray-400">{i + 1}</td>
                        <td className="py-3">
                          <Link
                            href={page.pagePath}
                            className="text-indigo-600 hover:underline dark:text-indigo-400"
                          >
                            {page.pagePath}
                          </Link>
                        </td>
                        <td className="py-3 text-right font-medium text-gray-900 dark:text-white">
                          {page.pageViews.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Back link */}
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
        >
          ← 블로그로 돌아가기
        </Link>
      </div>
    </div>
  )
}
