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
import 'chart.js/auto'; // ADD THIS
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
import { useRef } from 'react';


function LineChartTest({ datalist })  {
    const ref = useRef();
    // const [plotData, setPlotData] = useState([]);
    // ============ row data format ======================================
    // const data = [
    //   { x: 10, y: 10 },
    //   { x: 15, y: 20 },
    //   { x: 20, y: 15 }
    // ]

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
                intersect: true,
                callbacks: {
                    afterFooter: function (chart) {
                        const hoverval = document.getElementById("hoverval");
                        hoverval.innerText = `$${chart[0].parsed.y.toFixed(2)}`;
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
                min: function () {
                    return Math.min(...datalist[1]);
                },
                max: function () {
                    return Math.max(...datalist[1]);
                },
            },
        },
    };


    // useEffect(() => {
    // }, [])


    const data = {
        labels: datalist[0],
        datasets: [
            {
                // label: 'NET',
                type: "line",
                data: datalist[1],
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
    };


    Tooltip.positioners.top = function (elements, eventPosition) {

        // const { chartArea: { top, bottom } } = this.chart;
        return {
            x: eventPosition.x,
            y: 0,
            xAlign: 'center',
            yAlign: 'bottom'
        }
    }

    return (
        <div className='line-chart'>
            {/* =========== test ====================  */}
            <Line ref={ref} data={data} options={options} plugins={plugins} />
        </div>
    )
}

export default LineChartTest;
