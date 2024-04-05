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
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSingleStockRealtimeDataThunk } from '../../redux/stockinfo';
// import { stockTestData } from './data';
// import { useParams } from 'react-router-dom';

function LineChartTest2({stockCode}) {
    // const { stockCode } = useParams();
  // const [plotData, setPlotData] = useState([]);
  // ============ row data format ======================================
  // const data = [
  //   { x: 10, y: 10 },
  //   { x: 15, y: 20 },
  //   { x: 20, y: 15 }
  // ]
  const [plotdata, setPlotdata] = useState({
    labels: [0,1],
    datasets: [
      {
        label: 'NET',
        type: "line",
        data: [0,0],
        backgroundColor: "black",
        borderColor: "rgb(10,186,181)",
        borderWidth: 3,
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointHoverBackgroundColor: 'rgb(10,186,181)',
        pointHoverBorderColor: '#000000',
        pointHoverBorderWidth: 4,
        pointHoverRadius: 6,
      },
    // //   {
    // //     // label: 'NET',
    // //     type: "line",
    // //     data: [0],
    // //     backgroundColor: "black",
    // //     borderColor: "white",
    // //     borderDash: [10,5],
    // //     borderWidth: 1,
    // //     pointBorderColor: 'rgba(0, 0, 0, 0)',
    // //     pointBackgroundColor: 'rgba(0, 0, 0, 0)',
    // //     pointHoverBackgroundColor: 'rgb(10,186,181)',
    // //     pointHoverBorderColor: '#000000',
    // //     pointHoverBorderWidth: 4,
    // //     pointHoverRadius: 1,
    // //   }
    ]
});
  const dispatch = useDispatch();
//   console.log("============= stockCode ============", stockCode)

  useEffect(() => {
    const fetchData = async () => {
        const res = await dispatch(getSingleStockRealtimeDataThunk(stockCode))
        // console.log("9999999999999999999999999999 res ===>",stockCode, res.stockdata[0])
        let dataSet1 = [];
        let localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        for (let i = 0; i < res.stockdata[0].length; i++) {
            let localTime = (new Date(res.stockdata[0][i])).toLocaleString("en-US", {timeZone: localTimezone});
            // let localTime = res.stockdata[0][i].substring(0,19);
            dataSet1.push(localTime.toString())
            // console.log(" =========== time ================", typeof(res.stockdata[0][i]), localTimezone, res.stockdata[0][i].toLocaleString("en-US", {timeZone: 'PST'}),dataSet1[0],res.stockdata[0][i].toLocaleString("en-US", {timeZone: localTimezone}))
            // tz_convert(local_tz)
        }
        setPlotdata({
            labels: dataSet1,
            datasets: [
              {
                // label: stockCode,
                type: "line",
                data: res.stockdata[1],
                backgroundColor: "black",
                borderColor: "rgb(10,186,181)",
                borderWidth: 3,
                pointBorderColor: 'rgba(0, 0, 0, 0)',
                pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointHoverBackgroundColor: 'rgb(10,186,181)',
                pointHoverBorderColor: '#000000',
                pointHoverBorderWidth: 4,
                pointHoverRadius: 6,
              },
            //   {
            //     // label: 'NET',
            //     type: "line",
            //     data: [{ x: "2023-01-03", y: 56 } ,{ x: "2024-03-01", y: 56 }],
            //     backgroundColor: "black",
            //     borderColor: "white",
            //     borderDash: [10,5],
            //     borderWidth: 1,
            //     pointBorderColor: 'rgba(0, 0, 0, 0)',
            //     pointBackgroundColor: 'rgba(0, 0, 0, 0)',
            //     pointHoverBackgroundColor: 'rgb(10,186,181)',
            //     pointHoverBorderColor: '#000000',
            //     pointHoverBorderWidth: 4,
            //     pointHoverRadius: 1,
            //   }
            ]
        });
    }
    fetchData();
  }, [dispatch, stockCode])

  const hoverLine = {
    id: 'hoverLine',
    afterDatasetsDraw(chart) {
      const { ctx,
              tooltip,
              chartArea: {
                top, bottom
              },
              scales: { x }
            } = chart;
            if (tooltip._active.length > 0){
              const xCoor = x.getPixelForValue(tooltip.dataPoints[0].dataIndex);
              // const yCoor = tooltip.dataPoints[0].parsed.y;
              ctx.save();
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.strokeStyle = 'rgba(66, 73, 77, 1)';
              ctx.moveTo(xCoor, top);
              ctx.lineTo(xCoor, bottom);
              ctx.stroke();
              ctx.closePath();
            }
    }
  }
  const plugins = [hoverLine]

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // tooltip: {
    //   mode: "index",
    //   intersect: false,
    // },
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
      // tooltip: {
      //   mode: "point",
      //   intersect: false,
      // },
      tooltip: {
        position: 'top',
        mode: "index",
        intersect: true,
        callbacks: {
          afterFooter: function(chart) {
            const hoverval = document.getElementById("hoverval");
            hoverval.innerText=`$${chart[0].parsed.y.toFixed(2)}`;
          }
        }
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
    //     min: function(){
    //         return Math.min(....map(el => el.y));
    //     },
    //     max: function(){
    //         return Math.max(...stockTestData.map(el => el.y));
    //   },
      },
    },
  };





//   const data = {
//     labels: stockTestData.map(el => el.x),
//     datasets: [
//       {
//         // label: 'NET',
//         type: "line",
//         data: stockTestData,
//         backgroundColor: "black",
//         borderColor: "rgb(10,186,181)",
//         borderWidth: 3,
//         pointBorderColor: 'rgba(0, 0, 0, 0)',
//         pointBackgroundColor: 'rgba(0, 0, 0, 0)',
//         pointHoverBackgroundColor: 'rgb(10,186,181)',
//         pointHoverBorderColor: '#000000',
//         pointHoverBorderWidth: 4,
//         pointHoverRadius: 6,
//       },
//       {
//         // label: 'NET',
//         type: "line",
//         data: [{ x: "2023-01-03", y: 56 } ,{ x: "2024-03-01", y: 56 }],
//         backgroundColor: "black",
//         borderColor: "white",
//         borderDash: [10,5],
//         borderWidth: 1,
//         pointBorderColor: 'rgba(0, 0, 0, 0)',
//         pointBackgroundColor: 'rgba(0, 0, 0, 0)',
//         pointHoverBackgroundColor: 'rgb(10,186,181)',
//         pointHoverBorderColor: '#000000',
//         pointHoverBorderWidth: 4,
//         pointHoverRadius: 1,
//       }
//     ]
//   };


  Tooltip.positioners.top = function(elements, eventPosition) {
      // console.log(this)
      // const { chartArea: { top, bottom } } = this.chart;
      return {
        x:eventPosition.x,
        y: 0,
        xAlign: 'center',
        yAlign: 'bottom'
      }
  }

  return (
    <div className='line-chart'>
       {/* =========== test ====================  */}

      <Line data={plotdata}  options={options} plugins={plugins}/>

    </div>
  )
}

export default LineChartTest2;