import { AxiosInstance } from 'axios'
import { AddTimelyClient, TimelyAppConfig, TimelyClient } from '../types'

export class Clients {
    constructor(private readonly http: AxiosInstance, private readonly config: TimelyAppConfig) {}

    async getAll(): Promise<TimelyClient[]> {
        const { data } = await this.http.get(`/${this.config.accountId}/clients?show=all`)
        return data
    }

    async getById(clientId: number): Promise<TimelyClient> {
        const { data } = await this.http.get(`/${this.config.accountId}/clients/${clientId}`)
        return data
    }

    async getByName(clientName: string): Promise<TimelyClient> {
        const clients = await this.getAll()
        const client = clients.find((c) => c.name === clientName)
        if (!client) throw new Error(`Can't find client with name of ${clientName}`)
        return client
    }

    async add(client: TimelyClient): Promise<AddTimelyClient> {
        const { data } = await this.http.post(`/${this.config.accountId}/clients`, { client })
        return data
    }

    async update(clientId: string, client: Partial<TimelyClient>): Promise<TimelyClient> {
        const { data } = await this.http.put(`/${this.config.accountId}/clients/${clientId}`, {
            client,
        })
        return data
    }
}
