// import React from 'react';
import { Line } from 'react-chartjs-2';

const CandlestickChart = () => {
  const data = [
    { date: '2024-03-01', open: 120, high: 125, low: 118, close: 122 },
    { date: '2024-03-02', open: 123, high: 128, low: 122, close: 126 },
    { date: '2024-03-03', open: 127, high: 130, low: 125, close: 128 },
    { date: '2024-03-04', open: 129, high: 132, low: 128, close: 131 },
    // Add more data as needed
  ];
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [{
      label: 'Candlestick Chart',
      data: data.map(item => ({
        t: new Date(item.date),
        o: item.open,
        h: item.high,
        l: item.low,
        c: item.close
      })),
      borderColor: 'black',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderWidth: 2,
      pointRadius: 0
    }]
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day'
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      }],

      y: {
        ticks: {
          callback: function(value) {
            return '$' + value;
          },
        },
        min: 110,
        max: 135
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default CandlestickChart;
