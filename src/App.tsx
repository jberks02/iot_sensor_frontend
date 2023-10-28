
import React from 'react'
import { hot } from 'react-hot-loader/root'
// import { Counter } from './components/Counter'
import { TopBars } from './components/currentState'
import { GraphData } from './components/dataGaph'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const App = hot(_App)
export function _App(): JSX.Element | null {
    setTimeout(() => {
        location.reload();
    }, 1000 * 60 * 5);
    return (
        <div >
            <h1 style={{ textAlign: 'center' }}>Local Environment System</h1>
            <TopBars />
            <GraphData interval='day' />
            <GraphData interval='week' />
            <GraphData interval='month' />
        </div>
    )
}