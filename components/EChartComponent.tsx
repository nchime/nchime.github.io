'use client'

import ReactECharts from 'echarts-for-react'
import { EChartsOption } from 'echarts'

const EChartComponent = () => {
  const options: EChartsOption = {
    title: {
      text: 'ECharts Sample Chart',
    },
    tooltip: {},
    xAxis: {
      data: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums'],
    },
    yAxis: {},
    series: [
      {
        name: 'Quantity',
        type: 'bar',
        data: [10, 22, 28, 43, 35],
      },
    ],
  }

  return (
    <div>
      <ReactECharts option={options} style={{ height: '400px', width: '100%' }} />
    </div>
  )
}

export default EChartComponent
