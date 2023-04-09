import * as echarts from 'echarts'
import type { FC } from 'react'
import { useEffect, useRef } from 'react'

interface Props {
  className?: string
  items: { name: string; value: number }[]
}
export const PieChart: FC<Props> = (props) => {
  const { className, items } = props
  const chartRef = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!chartRef.current) { return }
    if (initializedRef.current) { return }
    const myChart = echarts.init(chartRef.current)
    initializedRef.current = true
    const options: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '90%',
          data: items,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    myChart.setOption(options)
  }, [])

  return (
			<div className={className} ref={chartRef}></div>
  )
}
