
import React, { useEffect } from 'react'
import { logic } from './logic';
import { useValues, useActions } from 'kea'
import './style.css'

export function TopBars() {

    const { data } = useValues(logic);
    const { loadData } = useActions(logic);
    useEffect(() => {
        if (data === null) loadData()
    }, [data])
    return (
        <div className="divRow">
            <div className='splitItem'>
                Temperature: {data && data.temperature.toFixed(2)}
            </div>
            <div className='splitItem'>
                Damp: {data && data.damp}
            </div>
        </div>
    )
}