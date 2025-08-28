'use client'

import { ArcElement, Chart as chartjs, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

chartjs.register(ArcElement, Tooltip, Legend);

const DoughnotChart = ({ accounts }: DoughnutChartProps) => {

    const data = {
        datasets: [
            {
                label: 'Banks',
                data: [1250, 750, 250],
                backgroundColor: ['#0747b6', '#4F46E5', '#A78BFA'],
            }
        ], 
        labels: ['Bank 1', 'Bank 2', 'Bank 3']
    }

  return <>
    <Doughnut 
        data={data}
        options={{
            cutout: '60%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }}
    />
  </>

}

export default DoughnotChart