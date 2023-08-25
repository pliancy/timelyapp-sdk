import { AxiosInstance } from 'axios'
import { AddTimelyClient, TimelyAppConfig, TimelyClient } from '../types'

export class Clients {
    constructor(
        private readonly http: AxiosInstance,
        private readonly config: TimelyAppConfig,
    ) {}

    async getAll(): Promise<TimelyClient[]> {
        const { data } = await this.http.get(`/${this.config.accountId}/clients?show=all`)
        return data
    }

    async getById(clientId: number): Promise<TimelyClient> {
        const { data } = await this.http.get(`/${this.config.accountId}/clients/${clientId}`)
        return data
    }

    async getByName(clientName: string): Promise<TimelyClient | undefined> {
        const clients = await this.getAll()
        return clients.find((c) => c.name === clientName)
    }

    async getByExternalId(customerId: string): Promise<TimelyClient | undefined> {
        const clients = await this.getAll()
        return clients.find((e) => e.external_id === customerId)
    }

    async add(client: AddTimelyClient): Promise<TimelyClient> {
        const { data } = await this.http.post(`/${this.config.accountId}/clients`, { client })
        return data
    }

    async update(clientId: number, client: Partial<TimelyClient>): Promise<TimelyClient> {
        const { data } = await this.http.put(`/${this.config.accountId}/clients/${clientId}`, {
            client,
        })
        return data
    }
}
