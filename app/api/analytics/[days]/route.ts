import { NextRequest, NextResponse } from 'next/server'
import { getAnalyticsData } from '@/lib/analytics'

// Pre-generate static files for common days values (7, 30, 90 days)
export async function generateStaticParams() {
  return [{ days: '7' }, { days: '30' }, { days: '90' }]
}

function generateSampleData(days: number) {
  const overview: {
    date: string
    activeUsers: number
    sessions: number
    pageViews: number
    avgSessionDuration: number
    bounceRate: number
  }[] = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().slice(0, 10).replace(/-/g, '')

    const baseViews = 80 + Math.sin(i * 0.3) * 40
    const weekendFactor = d.getDay() === 0 || d.getDay() === 6 ? 0.6 : 1.0
    const randomFactor = 0.7 + Math.random() * 0.6

    const pageViews = Math.round(baseViews * weekendFactor * randomFactor)
    const activeUsers = Math.round(pageViews * (0.4 + Math.random() * 0.2))
    const sessions = Math.round(activeUsers * (1.2 + Math.random() * 0.3))
    const avgDuration = 90 + Math.random() * 120
    const bounceRate = 0.3 + Math.random() * 0.25

    overview.push({
      date: dateStr,
      activeUsers,
      sessions,
      pageViews,
      avgSessionDuration: Math.round(avgDuration * 10) / 10,
      bounceRate: Math.round(bounceRate * 1000) / 1000,
    })
  }

  const topPages = [
    { pagePath: '/', pageViews: 3420 },
    { pagePath: '/blog', pageViews: 2180 },
    { pagePath: '/blog/ai-llm-interview-guide', pageViews: 1856 },
    { pagePath: '/blog/ai-model-evaluation', pageViews: 1243 },
    { pagePath: '/about', pageViews: 987 },
    { pagePath: '/blog/harness-engineering', pageViews: 876 },
    { pagePath: '/blog/ontology-in-ai', pageViews: 654 },
    { pagePath: '/tags', pageViews: 543 },
    { pagePath: '/projects', pageViews: 432 },
    { pagePath: '/blog/developer-productivity', pageViews: 321 },
  ]

  const totals = overview.reduce(
    (acc, row) => ({
      activeUsers: acc.activeUsers + row.activeUsers,
      sessions: acc.sessions + row.sessions,
      pageViews: acc.pageViews + row.pageViews,
      avgSessionDuration: acc.avgSessionDuration + row.avgSessionDuration,
      bounceRate: acc.bounceRate + row.bounceRate,
    }),
    { activeUsers: 0, sessions: 0, pageViews: 0, avgSessionDuration: 0, bounceRate: 0 }
  )

  const n = overview.length || 1
  totals.avgSessionDuration = Math.round((totals.avgSessionDuration / n) * 10) / 10
  totals.bounceRate = Math.round((totals.bounceRate / n) * 1000) / 1000

  return { overview, topPages, totals, isSample: true }
}
export async function GET(request: NextRequest, { params }: { params: Promise<{ days: string }> }) {
  const { days: daysParam } = await params
  const days = parseInt(daysParam || '30', 10)

  try {
    const data = await getAnalyticsData(days)
    return NextResponse.json(data)
  } catch (error) {
    console.log('GA4 not configured, returning sample data:', (error as Error).message)
    const sampleData = generateSampleData(days)
    return NextResponse.json(sampleData)
  }
}
