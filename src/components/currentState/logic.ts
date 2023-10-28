import { getSensorDataFromServer } from '../../api/apiCalls'
import { kea, MakeLogicType } from 'kea'
import { sensorResult } from 'types/sensorResults'

interface Values {
    data: sensorResult | null
}//[{"temperature":26.323721612903224,"damp":74.35483870967742,"insert_datetime":"2023-10-22T05:47:40.089Z"}]

interface Actions {
    setData: (data: sensorResult) => { data: sensorResult }
    loadData: () => null
}

interface Props {
    id: number
}

type myLogicType = MakeLogicType<Values, Actions, Props>

export const logic = kea<myLogicType>({
    actions: {
        setData: (data) => ({ data }),
        loadData: () => { }
    },
    reducers: {
        data: [null, { setData: (_, { data }) => data }]
    },
    listeners: ({ actions }) => ({
        loadData: async () => {
            const data = await getSensorDataFromServer('now');
            actions.setData(data[0])
        }
    })
})
