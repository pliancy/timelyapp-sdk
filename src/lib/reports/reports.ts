import { AxiosInstance } from 'axios'
import { TimelyAppConfig } from '../types'

export class Reports {
    constructor(private readonly http: AxiosInstance, private readonly config: TimelyAppConfig) {}

    async getByExternalId(
        externalId: string,
        filter: {
            group_by?: string[]
            project_ids?: number[]
            since?: string
            until?: string
        },
    ) {
        const { data } = await this.http.post(`/${this.config.accountId}/reports/filter`, filter)
        return data
    }
}
