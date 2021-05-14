import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
    const [chartData, setChartData] = useState({});

    function chart(){
        setChartData({
            labels: ['pod1', 'pod2', 'pod3', 'pod4', 'pod5'],
            datasets: [
                {
                    label: 'Pods Data',
                    data: [23, 2, 24, 12, 54],
                    backgroundColor: [
                        'rgb(144, 112, 140)'
                    ],
                    borderWidth: 5
                }
            ]
        })
    }

    useEffect(() => {
        chart()
    }, [])

    return(
        <div className='barChart'>
        <Bar data={chartData} options={{
                maintainAspectRatio: false,
                responsive: true,
                title: {text: 'Some Data', display: true},
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 10,
                                beginAtZero: true
                            },
                            gridLines: {
                                display:false,
                            }
                        }
                    ],
                    xAxes: [
                        {
                            gridLines: {
                                display: false
                            }
                        }
                        
                    ]
                }
            }} />
        </div>
    )
};

export default BarChart;