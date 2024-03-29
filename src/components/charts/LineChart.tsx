import * as echarts from 'echarts'
import type { FC } from 'react'
import { useEffect, useRef } from 'react'

interface Props {
  className?: string
  items: { x: string; y: string | number }[]
}
export const LineChart: FC<Props> = (props) => {
  const { className, items } = props
  const chartDOMRef = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)
  const chartRef = useRef<echarts.ECharts>()

  const xData = items.map(item => item.x)
  const yData = items.map(item => item.y)

  useEffect(() => {
    if (!chartDOMRef.current) { return }
    if (initializedRef.current) { return }
    const myChart = echarts.init(chartDOMRef.current)
    chartRef.current = myChart
    initializedRef.current = true
    const options: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        show: true,
        formatter: ([{ axisValue, data }]: any) => {
          const parts = axisValue.split('-')
          const label = `${parts[0]}年${parts[1]}月${parts[2]}日`
          const value = data === null ? '无数据' : `${data}元`
          return `${label}<br/><div style="text-align: right;">${value}</div>`
        }
      },
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
        left: '16',
        right: '16',
        top: '20',
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
    }
    myChart.setOption(options)
  }, [])

  useEffect(() => {
    chartRef.current?.setOption({ xAxis: { data: xData }, series: [{ data: yData }] })
  }, [items])

  return (
			<div className={className} ref={chartDOMRef}></div>
  )
}
