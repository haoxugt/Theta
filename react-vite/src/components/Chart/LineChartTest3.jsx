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
import { useEffect, useState } from 'react';


function LineChartTest3({ portfolio, amount }) {
    // const [plotData, setPlotData] = useState([]);
    // ============ row data format ======================================
    // const data = [
    //   { x: 10, y: 10 },
    //   { x: 15, y: 20 },
    //   { x: 20, y: 15 }
    // ]

    const[errors, setErrors] = useState({})
    const [plotdata, setPlotdata] = useState({
        labels: [0, 1],
        datasets: [
          {
            type: "line",
            data: [0,0],
            backgroundColor: "black",
            borderColor: "rgb(10,186,181)",
            borderWidth: 3,
            // pointBorderColor: 'rgba(0, 0, 0, 0)',
            // pointBackgroundColor: 'rgba(0, 0, 0, 0)',
            // pointHoverBackgroundColor: 'rgb(10,186,181)',
            // pointHoverBorderColor: '#000000',
            // pointHoverBorderWidth: 4,
            // pointHoverRadius: 6,
          },
        ]
    })

    useEffect(() => {
        const fetchData = async() => {
            setErrors({});
            let url = `./csvs/portfolio-${portfolio.id}-2.json`
            if (portfolio.id > 7)
               url = './csvs/portfolio-new-2.json';
            const response = await fetch(url);
            let datapoints;
            if (response.ok) {

                datapoints = await response.json();

            } else {

                // setErrors({"message": "Portfolio data does not exist for a new user"})
                // return;
                let now = new Date();
                let year = now.toLocaleString("default", {year: "numeric"});
                let month = now.toLocaleString("default", {month: "2-digit"});
                let day = now.toLocaleString("default", {day: "2-digit"});
                let today = year + "-" + month + "-" + day
                datapoints ={time: [today], assets: [0]}
            }
            let now = new Date();
            let year = now.toLocaleString("default", {year: "numeric"});
            let month = now.toLocaleString("default", {month: "2-digit"});
            let day = now.toLocaleString("default", {day: "2-digit"});
            let today = year + "-" + month + "-" + day
            datapoints.time.push(today)
            datapoints.assets.push(amount)

            setPlotdata({
                labels: datapoints.time,
                datasets: [
                  {
                    type: "line",
                    data: datapoints.assets,
                    backgroundColor: "black",
                    borderColor: 'rgb(10,186,181)',
                    // borderColor: color,
                    borderWidth: 3,
                    pointBorderColor: 'rgba(0, 0, 0, 0)',
                    pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                    pointHoverBackgroundColor: 'rgb(10,186,181)',
                    pointHoverBorderColor: '#000000',
                    pointHoverBorderWidth: 3,
                    pointHoverRadius: 5,
                  },
                ]
            });
        }
        fetchData();
    },[portfolio.id, amount]);

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
            if (tooltip._active.length > 0) {
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
                intersect: false,
                callbacks: {
                  afterFooter: function(chart) {
                    const hoverval = document.getElementById("hoverval");
                    hoverval.innerText=`${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(chart[0].parsed.y)}`;
                  }
                }
            },
        },
        scales: {
            x: {
                ticks: {
                    display: false,
                },
                // min: "2023-01-01",
                // max: "2024-04-07",

            },
            y: {
                ticks: {
                    display: true,
                },
                // min: function () {
                //     return Math.min(...datapoints.assets);
                // },
                // max: function () {
                //     return Math.max(...datapoints.assets);
                // },
            },
        },
    };



    Tooltip.positioners.top = function(elements, eventPosition) {
        // const { chartArea: { top, bottom } } = this.chart;
        return {
          x:eventPosition.x,
          y: 0,
          xAlign: 'center',
          yAlign: 'bottom'
        }
    }

    if (Object.values(errors).length) return <h2 style={{margin: "30px 0"}}>{errors.message}</h2>

    return (
        <div className='line-chart'>
            {/* =========== test ====================  */}
            <Line data={plotdata} options={options} plugins={plugins}/>
            {/* <Line data={plotdata} options={options} /> */}
        </div>
    )
}

export default LineChartTest3;
