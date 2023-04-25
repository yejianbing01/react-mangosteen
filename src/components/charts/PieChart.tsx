import * as echarts from 'echarts'
import type { FC } from 'react'
import { useEffect, useRef } from 'react'

interface Props {
  className?: string
  items: { name: string; value: number | string; sign: string }[]
}
export const PieChart: FC<Props> = (props) => {
  const { className, items } = props

  const chartDOMRef = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)
  const chartRef = useRef<echarts.EChartsType>()

  useEffect(() => {
    if (!chartDOMRef.current) { return }
    if (initializedRef.current) { return }
    chartRef.current = echarts.init(chartDOMRef.current)
    initializedRef.current = true
    const options: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item',
        show: true,
        formatter: ({ data: { name, value, sign } }: any) => {
          return `${sign} ${name}: ${value}元`
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '85%',
          data: items.map(item => ({ ...item, value: parseFloat(item.value.toString()) })),
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
    chartRef.current.setOption(options)
  }, [])

  useEffect(() => {
    if (!chartRef.current) { return }
    chartRef.current.setOption({
      series: [{ data: items }]
    })
  }, [items])

  return (
			<div className={className} ref={chartDOMRef}></div>
  )
}
