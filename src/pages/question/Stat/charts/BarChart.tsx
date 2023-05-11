import ReactECharts from 'echarts-for-react'

interface BarChartProps {
  title: string
  subtitle: string
  category: any
  value: any
}

export default function BarChart({ category, value, title, subtitle }: BarChartProps) {
  const options = {
    title: {
      text: title,
      subtext: subtitle,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: category,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: '60%',
        data: value
      }
    ]
  }
  return <ReactECharts option={options} className='border-1 border-solid border-gray-200 rounded p5 mt3 mb5'/>
}
