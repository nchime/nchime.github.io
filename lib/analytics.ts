import { BetaAnalyticsDataClient, protos } from '@google-analytics/data'

type RunReportResponse = protos.google.analytics.data.v1beta.IRunReportResponse

const propertyId = process.env.GA_PROPERTY_ID // e.g. 'properties/123456789'

function getAnalyticsDataClient() {
  const raw = process.env.GA_SERVICE_ACCOUNT_KEY
  if (!raw) {
    throw new Error('GA_SERVICE_ACCOUNT_KEY environment variable is not set')
  }

  // Support both raw JSON and base64-encoded JSON
  let credentials: Record<string, unknown>
  try {
    credentials = JSON.parse(Buffer.from(raw, 'base64').toString('utf-8'))
  } catch {
    credentials = JSON.parse(raw)
  }

  return new BetaAnalyticsDataClient({ credentials })
}

export interface AnalyticsOverviewRow {
  date: string
  activeUsers: number
  sessions: number
  pageViews: number
  avgSessionDuration: number
  bounceRate: number
}

export interface TopPageRow {
  pagePath: string
  pageViews: number
}

export interface AnalyticsData {
  overview: AnalyticsOverviewRow[]
  topPages: TopPageRow[]
  totals: {
    activeUsers: number
    sessions: number
    pageViews: number
    avgSessionDuration: number
    bounceRate: number
  }
}

export async function getAnalyticsData(days: number = 30): Promise<AnalyticsData> {
  const client = getAnalyticsDataClient()
  const property = propertyId

  const dateRange = { startDate: `${days}daysAgo`, endDate: 'today' }

  // Fetch each report individually to avoid tuple type issues with Promise.all
  const overviewTuple = await client.runReport({
    property,
    dateRanges: [dateRange],
    metrics: [
      { name: 'activeUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
      { name: 'averageSessionDuration' },
      { name: 'bounceRate' },
    ],
    dimensions: [{ name: 'date' }],
    orderBys: [{ dimension: { dimensionName: 'date' } }],
  })

  const topPagesTuple = await client.runReport({
    property,
    dateRanges: [dateRange],
    metrics: [{ name: 'screenPageViews' }],
    dimensions: [{ name: 'pagePath' }],
    limit: 10,
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
  })

  const totalsTuple = await client.runReport({
    property,
    dateRanges: [dateRange],
    metrics: [
      { name: 'activeUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
      { name: 'averageSessionDuration' },
      { name: 'bounceRate' },
    ],
  })

  // runReport returns a tuple [response, request, response_metadata]
  const overviewResponse: RunReportResponse = overviewTuple[0]
  const topPagesResponse: RunReportResponse = topPagesTuple[0]
  const totalsResponse: RunReportResponse = totalsTuple[0]

  const overview: AnalyticsOverviewRow[] = (overviewResponse.rows || []).map((row) => ({
    date: row.dimensionValues?.[0]?.value || '',
    activeUsers: parseInt(row.metricValues?.[0]?.value || '0', 10),
    sessions: parseInt(row.metricValues?.[1]?.value || '0', 10),
    pageViews: parseInt(row.metricValues?.[2]?.value || '0', 10),
    avgSessionDuration: parseFloat(row.metricValues?.[3]?.value || '0'),
    bounceRate: parseFloat(row.metricValues?.[4]?.value || '0'),
  }))

  const topPages: TopPageRow[] = (topPagesResponse.rows || []).map((row) => ({
    pagePath: row.dimensionValues?.[0]?.value || '',
    pageViews: parseInt(row.metricValues?.[0]?.value || '0', 10),
  }))

  const totalsRow = totalsResponse.rows?.[0]
  const totals = {
    activeUsers: parseInt(totalsRow?.metricValues?.[0]?.value || '0', 10),
    sessions: parseInt(totalsRow?.metricValues?.[1]?.value || '0', 10),
    pageViews: parseInt(totalsRow?.metricValues?.[2]?.value || '0', 10),
    avgSessionDuration: parseFloat(totalsRow?.metricValues?.[3]?.value || '0'),
    bounceRate: parseFloat(totalsRow?.metricValues?.[4]?.value || '0'),
  }

  return { overview, topPages, totals }
}
