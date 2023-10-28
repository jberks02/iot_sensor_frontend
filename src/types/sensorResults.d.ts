export interface sensorResult {
    insert_datetime: Date;
    temperature: number;
    damp: number;
}

export type urlChoices = 'now' | 'day' | 'week' | 'month'