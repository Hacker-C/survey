import ReactECharts from 'echarts-for-react'

interface CircleChartProps {
  title: string
  subtitle: string
  data: any
}

export default function CircleChart({ data, title, subtitle }: CircleChartProps) {
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
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data
      }
    ]
  }
  return <ReactECharts option={options} className='border-1 border-solid border-gray-200 rounded p5 mt3 mb5'/>
}
