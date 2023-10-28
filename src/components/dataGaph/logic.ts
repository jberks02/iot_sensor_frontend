import { getSensorDataFromServer } from '../../api/apiCalls'
import { kea, MakeLogicType } from 'kea'
import { sensorResult, urlChoices } from 'types/sensorResults'

interface Values {
    day: sensorResult[] | null
    week: sensorResult[] | null
    month: sensorResult[] | null
}

interface Actions {
    setDay: (day: sensorResult[]) => { day: sensorResult[] }
    setWeek: (week: sensorResult[]) => { week: sensorResult[] }
    setMonth: (month: sensorResult[]) => { month: sensorResult[] }
    loadData: (choice: urlChoices) => { choice: urlChoices }
}

interface Props {
    id: number
}

type myLogicType = MakeLogicType<Values, Actions, Props>

export const logic = kea<myLogicType>({
    actions: {
        setDay: (day) => ({ day }),
        setWeek: (week) => ({ week }),
        setMonth: (month) => ({ month }),
        loadData: (choice) => ({ choice })
    },
    reducers: {
        day: [null, { setDay: (_, { day }) => day }],
        week: [null, { setWeek: (_, { week }) => week }],
        month: [null, { setMonth: (_, { month }) => month }],
    },
    listeners: ({ actions }) => ({
        loadData: async ({ choice }) => {
            const data = await getSensorDataFromServer(choice);
            switch (choice) {
                case 'day':
                    actions.setDay(data);
                    break;
                case 'week':
                    actions.setWeek(data);
                    break;
                case 'month':
                    actions.setMonth(data);
                    break;
                default:
                    console.error('Valid url choice not sent')
            }
        }
    })
})
