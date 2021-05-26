import { AxiosInstance } from 'axios'
import { TimelyAppConfig, TimelyLabel } from '../types'

export class Labels {
    constructor(private readonly http: AxiosInstance, private readonly config: TimelyAppConfig) {}

    async getAll(): Promise<TimelyLabel[]> {
        const { data } = await this.http.get(`/${this.config.accountId}/labels`)
        return data
    }

    async getById(labelId: number): Promise<TimelyLabel> {
        const { data } = await this.http.get(`/${this.config.accountId}/labels/${labelId}`)
        return data
    }

    async update(labelId: number, label: Partial<TimelyLabel>): Promise<TimelyLabel> {
        const { data } = await this.http.put(`/${this.config.accountId}/labels/${labelId}`, {
            label,
        })
        return data
    }

    async add(label: TimelyLabel): Promise<TimelyLabel> {
        const { data } = await this.http.post(`/${this.config.accountId}/labels`, {
            label,
        })
        return data
    }
}
