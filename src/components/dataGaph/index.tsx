
import React, { useEffect, useState } from 'react'
import { logic } from './logic';
import { useActions, useAllValues } from 'kea'
import { Line, } from 'react-chartjs-2'
import './style.css'
import { sensorResult } from 'types/sensorResults';
import { ChartData, ChartOptions } from 'chart.js';

export function GraphData(props: { interval: 'day' | 'week' | 'month' }) {
    const values = useAllValues(logic);
    const { loadData } = useActions(logic);
    const [data, setData] = useState<null | sensorResult[]>(null);
    useEffect(() => {
        console.log(values)
        if (values[props.interval] === null) loadData(props.interval)
        setData(values[props.interval])
    }, [values]);
    console.log(data)
    const options: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Data Averages Across Past ' + props.interval
            },
        }
    };
    const labels = data === null ? [] : data.map((dat) => dat.insert_datetime.toLocaleString())

    const lineGraphTempData: ChartData<"line", string[] | undefined, string> = {
        labels: labels,
        datasets: [
            {
                label: 'Temperature Average in Celsius',
                data: data?.map((x) => x.temperature.toFixed(2)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'Temperature in Celsius'
            }
        ]
    }
    const lineGraphDampData: ChartData<"line", string[] | undefined, string> = {
        labels: labels,
        datasets: [
            {
                label: 'Damp Average 0 - 10000',
                data: data?.map((x) => x.damp.toString()),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'Damp Level'
            }
        ]
    }
    return (
        <>
            <h3 style={{ textAlign: 'center' }} >Graph Interval: {props.interval}</h3>
            <div className='graphOrchestrator'>
                <div className='graphSingle'>
                    {data && <Line
                        options={options}
                        data={lineGraphTempData}
                    />}
                </div>
                <div className='graphSingle'>
                    {data && <Line
                        options={options}
                        data={lineGraphDampData}
                    />}
                </div>
            </div >
        </>
    )
}
