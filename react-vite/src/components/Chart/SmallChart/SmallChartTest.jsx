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
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSingleStockRealtimeDataThunk } from '../../../redux/stockinfo.js';
// import { stockTestData } from '../data.js';

function SmallChartTest({ stockCode, color }) {
    // const [plotData, setPlotData] = useState([]);
    // ============ row data format ======================================
    // const data = [
    //   { x: 10, y: 10 },
    //   { x: 15, y: 20 },
    //   { x: 20, y: 15 }
    // ]
    const [plotdata, setPlotdata] = useState({
        labels: [0, 1],
        datasets: [
            {
                // label: stockCode,
                type: "line",
                data: [0, 1],
                backgroundColor: "black",
                borderColor: "rgb(10,186,181)",
                borderWidth: 1,
                pointBorderColor: 'rgba(0, 0, 0, 0)',
                pointBackgroundColor: 'rgba(0, 0, 0, 0)',
            },
        ]
    });
    const [ydataset, setYdataset] = useState([])

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const res = await dispatch(getSingleStockRealtimeDataThunk(stockCode))

            const previousClosePrice = res.info['previous_close_price'];

            setPlotdata({
                labels: res.stockdata[0],
                datasets: [
                  {
                    // label: 'c',
                    type: "line",
                    data: res.stockdata[1],
                    backgroundColor: "white",
                    borderColor: color,
                    borderWidth: 1,
                    pointBorderColor: 'rgba(0, 0, 0, 0)',
                    pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                  },
                  {
                    // label: 'o',
                    type: "line",
                    data: res.stockdata[1].map(() => previousClosePrice),
                    backgroundColor: "white",
                    borderColor: "white",
                    borderDash: [2,2],
                    borderWidth: 1,
                    pointBorderColor: 'rgba(0, 0, 0, 0)',
                    pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                  },
                ]
            });

            setYdataset([...res.stockdata[1], previousClosePrice]);
        }
        fetchData();
      }, [dispatch, stockCode, color])

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
                min: function () {
                    return Math.min(...ydataset);
                },
                max: function () {
                    return Math.max(...ydataset);
                },
                // suggestedMin: 35,
                // suggestedMax: 110
            },
        },
    };





    return (
        <div className='small-line-chart'>
            <Line data={plotdata} options={options} />
        </div>
    )
}

export default SmallChartTest;
