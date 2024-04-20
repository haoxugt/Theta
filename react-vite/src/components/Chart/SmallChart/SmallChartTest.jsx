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
                data: [0, 0],
                backgroundColor: "black",
                borderColor: "rgb(10,186,181)",
                borderWidth: 1,
                pointBorderColor: 'rgba(0, 0, 0, 0)',
                pointBackgroundColor: 'rgba(0, 0, 0, 0)',
            },
        ]
    });
    const [ydataset, setYdataset] = useState([0, 1])
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    let options = {}
try{
    useEffect(() => {
        const fetchData = async () => {
            const res = await dispatch(getSingleStockRealtimeDataThunk(stockCode))

            const previousClosePrice = res.info['previous_close_price'];
            let dataSet1 = [];
            let localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            let localTime = (new Date(res.stockdata[0][0])).toLocaleString("en-US", {timeZone: localTimezone});
            dataSet1.push(localTime.toString())

            for (let i = 1; i <= 78; i++) {
                dataSet1.push((new Date((new Date(dataSet1[i - 1])).getTime() + 5*60/0.001).toLocaleString("en-US", {timeZone: localTimezone}).toString()))
            }

            setPlotdata({
                labels: dataSet1,
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
                    data: dataSet1?.map(() => previousClosePrice),
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

    options = {
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



} catch(e) {
    console.log(e)
    setErrors({"message": e.message});
}
if(Object.values(errors).length) {
    return <h2>{errors.message}</h2>
}

    return (
        <div className='small-line-chart'>
            <Line data={plotdata} options={options} />
        </div>
    )
}

export default SmallChartTest;
