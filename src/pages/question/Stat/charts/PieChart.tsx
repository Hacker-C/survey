import ReactECharts from 'echarts-for-react'

interface PieChartProps {
  title: string
  subtitle: string
  data: any
}

export default function PieChart({ data, title, subtitle }: PieChartProps) {
  const options = {
    title: {
      text: title,
      subtext: subtitle,
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data,
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
  return <ReactECharts option={options} className='border-1 border-solid border-gray-200 rounded p5 mt3 mb5'/>
}
