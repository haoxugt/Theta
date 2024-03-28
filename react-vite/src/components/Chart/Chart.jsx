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
import { useEffect, useState } from 'react';

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
  const [plotData, setPlotData] = useState([]);
  // ============ test 1 ======================================
  const data1 =
    [{
      x: 10,
      y: 20
    }, {
      x: 15,
      y: 10
    }, {
      x: 20,
      y: 16
    }]

  const options1 = {
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

  //============= test 2 =============================================
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },

    },
    scales: {
      x: {
        ticks: {
          display: true,
        },
      },
      y: {
        ticks: {
          display: true,
        },
      },
    },
  };
  //==================================
  const stockData = () => {
    let data = [];
    let value = 50;
    for (var i = 0; i < 365; i++) {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(i);
      value = Math.random() * 1000;
      data.push({ x: date.toJSON().slice(0, 10), y: value });
    }
    setPlotData(data)
  }

  useEffect(() => {
    stockData();
    console.log("====== plot data", plotData)
  }, [])

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'AAPL',
        data: [1, 2, 3, 4, 5, 6, 7],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'NVDA',
        data: [7, 2, 4, 4, 5, 4, 7],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className='line-chart'>
      {/* =========== test 1 ====================  */}
      <Line
        data={{
          labels: stockTestData.map(el => el.x),
          datasets: [
            {
              label: 'NET',
              type: "line",
              // data: [{ x: 10, y: 20 }, { x: 15, y: 10 }],
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
        }}
        options={options1}
      />
      {/* =========== test 2 ====================  */}
      {/* <Line options={options} data={data} /> */}
    </div>
  )
}

export default Chart;
