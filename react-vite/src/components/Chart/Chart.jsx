// import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// import { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);
import './Chart.css'
import { stockTestData } from './data';

function Chart() {
  // const [plotData, setPlotData] = useState([]);
  // ============ row data format ======================================
  // const data = [
  //   { x: 10, y: 10 },
  //   { x: 15, y: 20 },
  //   { x: 20, y: 15 }
  // ]

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        display: true,
      },
      // tooltips: {
      //   mode: "index",
      //   intersect: false,
      // },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },

      },
      y: {
        ticks: {
          display: true,
        },
        // suggestedMin: 0,
        // suggestedMax: 1000
      },
    },
  };


  // useEffect(() => {
  // }, [])


  const data = {
    labels: stockTestData.map(el => el.x),
    datasets: [
      {
        label: 'NET',
        type: "line",
        data: stockTestData,
        backgroundColor: "black",
        borderColor: "rgb(10,186,181)",
        borderWidth: 3,
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointHoverBackgroundColor: 'rgb(10,186,181)',
        pointHoverBorderColor: '#000000',
        pointHoverBorderWidth: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  return (
    <div className='line-chart'>
       {/* =========== test ====================  */}
      <Line data={data} options={options} />
    </div>
  )
}

export default Chart;
