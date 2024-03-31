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
import './SmallChart.css'
import { stockTestData } from '../data.js';

function SmallChart() {
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
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },

      },
      y: {
        ticks: {
          display: false,
        },
        min: function(){
            return Math.min(...stockTestData.map(el => el.y));
        },
        max: function(){
            return Math.max(...stockTestData.map(el => el.y));
        },
        // suggestedMin: 35,
        // suggestedMax: 110
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
        backgroundColor: "white",
        borderColor: "rgb(10,186,181)",
        borderWidth: 1,
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
      }
    ]
  };

  return (
    <div className='small-line-chart'>
      <Line data={data} options={options} />
    </div>
  )
}

export default SmallChart;
