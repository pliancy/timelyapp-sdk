import { AxiosInstance } from 'axios'
import { TimelyAppConfig, TimelyClient } from '../types'

export class Clients {
    constructor(private readonly http: AxiosInstance, private readonly config: TimelyAppConfig) {}

    async getAll(): Promise<TimelyClient[]> {
        return this.http.get(`/${this.config.accountId}/clients?show=all`)
    }

    async getById(clientId: number): Promise<TimelyClient> {
        return this.http.get(`/${this.config.accountId}/clients/${clientId}`)
    }

    async getByName(clientName: string): Promise<TimelyClient> {
        const clients = await this.getAll()
        const client = clients.find((c) => c.name === clientName)
        if (!client) throw new Error(`Can't find client with name of ${clientName}`)
        return client
    }

    async add(client: TimelyClient): Promise<TimelyClient> {
        return this.http.post(`/${this.config.accountId}/clients`, client)
    }

    async update(clientId: string, client: TimelyClient): Promise<TimelyClient> {
        return this.http.put(`/${this.config.accountId}/clients/${clientId}`, client)
    }
}
