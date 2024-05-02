// import LineChartTest3 from '../../../components/Chart/LineChartTest3'
// import File

import './ManagePage.css'
// import { IoConstructOutline } from 'react-icons/io5';
// import data from '../../../../public/csvs/portfolio-3-2.json'

function ManagePage() {

    // let date = data.time
    // let asset = data.assets
    // console.log("22222222222222222222222", data['time'])
    // let datapoints = {date: date, asset: asset}
    // let datapoints = {}
    // import data from

    // let csv_file = new File(["time"], './csvs/portfolio-3.csv');
    // let reader = new FileReader();
    // reader.onload = function (e) {

    // }
    // reader.readAsText(csv_file)
    // csv_file.readfile()
    // const reader = new FileReader();
    // let aa= reader.readAsText(csv_file)

    // let csv_file = new File(["time"], './csvs/portfolio-3.csv');
    // let date = [];
    // let asset = [];
    // csv_file.
    // csv_file.encoding = 'utf-8';
    // let data = csv_file.read().split('/\r\n|\n/'); // split by lines
    // csv_file.close();
    // for (let row in data)  {
    //     let [col1, col2] = data[row].split(','); // split all lines by comas

    // }

    // new ChartJS(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //         datasets: [{
    //             label: '# of Votes',
    //             data: [12, 19, 3, 5, 2, 3],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true
    //             }
    //         }
    //     }
    // });
    // const reader = new FileReader();    // reader.readAsText('./portfolio-3.csv')
    // setDatapoints();
    // let data = {}
    // let options = {}
    // // let plugins = {}
    // let datapoints = {}

    // async function setDatapoints() {
    //     datapoints = await getData();


    //     options = {
    //         responsive: true,
    //         maintainAspectRatio: false,

    //         plugins: {
    //             legend: {
    //                 position: 'top',
    //                 display: false,
    //             },
    //         },
    //         scales: {
    //             x: {
    //                 ticks: {
    //                     display: false,
    //                 },

    //             },
    //             y: {
    //                 ticks: {
    //                     display: true,
    //                 },
    //                 min: function () {
    //                     return Math.min(...datapoints.asset);
    //                 },
    //                 max: function () {
    //                     return Math.max(...datapoints.asset);
    //                 },
    //             },
    //         },
    //     };


    //     data = {
    //         labels: datapoints.date,
    //         datasets: [
    //             {
    //                 // label: 'NET',
    //                 type: "line",
    //                 data: datapoints.asset,
    //                 backgroundColor: "black",
    //                 borderColor: "rgb(10,186,181)",
    //                 borderWidth: 3,
    //                 pointBorderColor: 'rgba(0, 0, 0, 0)',
    //                 pointBackgroundColor: 'rgba(0, 0, 0, 0)',
    //                 pointHoverBackgroundColor: 'rgb(10,186,181)',
    //                 pointHoverBorderColor: '#000000',
    //                 pointHoverBorderWidth: 4,
    //                 pointHoverRadius: 6,
    //             },

    //         ]
    //     };

    //     const config = {
    //         type: 'line',
    //         data,
    //         options: options
    //     };

    //     const myChart = new ChartJS(
    //         document.getElementById('myChart'),
    //         config
    //     );

    // }



    // async function getData() {
    //     const url = './csvs/portfolio-3.csv'
    //     const date = []
    //     const asset = []

    //     const response = await fetch(url);
    //     const datapoints = await response.text();


    //     const table = datapoints.split('\n');

    //     table.forEach(el => {
    //         const column = el.split(',');
    //         date.push(column[0]);
    //         asset.push(column[1])
    //     })

    //     date.shift();
    //     asset.shift();

    //     return { date, asset }
    // }
    // async function getData() {
    //     const url = './csvs/portfolio-3-2.json'
    //     // const date = []
    //     // const asset = []

    //     const response = await fetch(url);
    //     datapoints = await response.json();

    //     // const table = datapoints.split('\n');

    //     // table.forEach(el => {
    //     //     const column = el.split(',');
    //     //     date.push(column[0]);
    //     //     asset.push(column[1])
    //     // })

    //     // date.shift();
    //     // asset.shift();

    //     // return { date, asset }
    // }
    // getData();


    const update = async () => {
        const res = await fetch(`/api/portfolios/update`, {
            method: 'POST'
        });

        const data = await res.json();
        alert(data.message);

    }


    return (
        <div>
            <h2>Manage dashboard</h2>
            <button onClick={update}>Update portfolios</button>
            {/* <LineChartTest3 datapoints={datapoints} /> */}


            {/* <Line data={data}  options={options} plugins={plugins}/> */}


        </div>
    )
}

export default ManagePage;
