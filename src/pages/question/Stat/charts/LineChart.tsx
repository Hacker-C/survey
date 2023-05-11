import ReactECharts from 'echarts-for-react'

interface LineChartProps {
  title: string
  subtitle: string
  category: any
  value: any
}

export default function LineChart({ category, value, title, subtitle }: LineChartProps) {
  const options = {
    title: {
      text: title,
      subtext: subtitle,
      left: 'center'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    xAxis: {
      type: 'category',
      data: category
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: value,
        type: 'line'
      }
    ]
  }

  return <ReactECharts option={options} className='border-1 border-solid border-gray-200 rounded p5 mt3 mb5'/>
}
