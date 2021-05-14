import React, { useEffect, useState } from 'react';
import { Bubble } from 'react-chartjs-2';

const HeatMap = () => {
    const [chartData, setChartData] = useState({});

    function chart(){
        setChartData({
            labels: ['Cluster1', 'Cluster2', 'Cluster3', 'Cluster4', 'Cluster5'],
            datasets: [
                {
                    label: 'Cluster Data',
                    data: [{
                        x:20,
                        y:30,
                        r:15
                    }, {
                        x:45,
                        y:12,
                        r:9
                    }, {
                        x:25,
                        y:32,
                        r:7
                    }, {
                        x:12,
                        y:22,
                        r:17
                    }, {
                        x:11,
                        y:25,
                        r:18
                    }, {
                        x:2,
                        y:20,
                        r:25
                    }, {
                        x:27,
                        y:9,
                        r:13
                    }, {
                        x:16,
                        y:21,
                        r:7
                    }],
                    backgroundColor: [
                        'rgb(225, 205, 181)'
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
        <div className='heatMap'>
        <Bubble data={chartData} options={{
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

export default HeatMap;