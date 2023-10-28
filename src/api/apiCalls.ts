import { sensorResult, urlChoices } from "types/sensorResults";

export async function getSensorDataFromServer(timeSpan: urlChoices): Promise<sensorResult[]> {
    const req = await fetch('/api/env/' + timeSpan, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    if (!req.ok) return [];
    const data = await req.json() as sensorResult[];
    for (const dat of data) {
        dat.insert_datetime = new Date(dat.insert_datetime);
    }
    return data;
}