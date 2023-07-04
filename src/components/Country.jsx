import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart',
        },
    },
};


export function Country({ countries, countryNps, quarterYear }) {

    const [chartData, setChartData] = useState(null);


    useEffect(() => {
        const labels = countries.map((country) => country.countryName);
        const datasets = quarterYear.map((quarter, index) => {
            const data = countries.map((country) => {
                const entry = countryNps.find(
                    (nps) =>
                        nps.country === country.countryName &&
                        nps.quarterYear === quarter.quarterYear
                );
                return entry ? entry.score : 0;
            });

            return {
                label: quarter.quarterYear,
                data: data,
                backgroundColor: index === 0 ? 'rgba(175, 202, 255, 0.8)' :
                    index === 1 ? 'rgba(79, 140, 255, 0.8)' :
                        index === 2 ? 'rgba(0, 88, 255, 0.8)' : 'rgba(0, 63, 182, 0.8)',
            };
        });

        setChartData({
            labels: labels,
            datasets: datasets,
        });
    }, [countries, countryNps, quarterYear]);

    return (
        <div className='flex flex-row items-center justify-center h-full w-full bg-white rounded-xl shadow-lg'>
            {chartData ? <Bar options={options} data={chartData} /> : <p>Loading...</p>}
        </div>
    );
}
