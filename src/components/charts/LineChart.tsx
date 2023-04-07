import * as echarts from 'echarts'
import type { FC } from 'react'
import { useEffect, useRef } from 'react'

interface Props {
  className?: string
  items: { x: string; y: number }[]
}
export const LineChart: FC<Props> = (props) => {
  const chartRef = useRef(null)
  const { className, items } = props
  const xData = items.map(item => item.x)
  const yData = items.map(item => item.y)

  useEffect(() => {
    if (!chartRef.current) { return }
    const myChart = echarts.init(chartRef.current)
    myChart.setOption({
      xAxis: {
        type: 'category',
        data: xData
      },
      yAxis: {
        type: 'value'
      },
      grid: {
        containLabel: true,
        left: '0%',
        right: '0%',
        top: '0%',
        bottom: '0%'
      },
      color: ['#5a72e0'],
      series: [
        {
          data: yData,
          type: 'line',
          smooth: true
        }
      ]
    })
  }, [])

  return (
			<div className={className} ref={chartRef}></div>
  )
}
