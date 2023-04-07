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
    const options: echarts.EChartsOption = {
      xAxis: {
        type: 'category',
        data: xData,
        axisLabel: {
          formatter: (value: string) => value.slice(value.indexOf('-') + 1)
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: false
        }
      },
      grid: {
        containLabel: true,
        left: '10',
        right: '10',
        top: '20',
        bottom: '0%'
      },
      color: ['#5a72e0'],
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      series: [
        {
          data: yData,
          type: 'line',
          smooth: true
        }
      ]
    }
    myChart.setOption(options)
  }, [])

  return (
			<div className={className} ref={chartRef}></div>
  )
}
