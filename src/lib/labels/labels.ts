import { AxiosInstance } from 'axios'
import { TimelyAppConfig, TimelyLabel } from '../types'

export class Labels {
    constructor(private readonly http: AxiosInstance, private readonly config: TimelyAppConfig) {}

    async getAll(): Promise<TimelyLabel[]> {
        return this.http.get(`/${this.config.accountId}/labels`)
    }

    async getById(labelId: number): Promise<TimelyLabel> {
        return this.http.get(`/${this.config.accountId}/labels/${labelId}`)
    }

    async update(labelId: number, label: TimelyLabel): Promise<TimelyLabel> {
        return this.http.put(`/${this.config.accountId}/labels/${labelId}`, label)
    }
}
