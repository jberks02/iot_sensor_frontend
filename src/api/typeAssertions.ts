import { sensorResult } from "../types/sensorResults";

export function assertsDataIsSensorResults(data: unknown): asserts data is sensorResult {
    if (
        data === undefined ||
        data === null ||
        typeof data !== 'object' ||
        !('insert_datetime' in data) ||
        !(data.insert_datetime instanceof Date) ||
        !('temperature' in data) ||
        typeof data.temperature !== 'number' ||
        !('damp' in data) ||
        typeof data.damp !== 'number'
    ) throw new Error('MALFORMED DATA BODY')
}