import { AxiosInstance } from 'axios'
import { TimelyAccount } from '../types'

export class Accounts {
    constructor(private readonly http: AxiosInstance) {}

    async getAll(): Promise<TimelyAccount[]> {
        const { data } = await this.http.get('/accounts')
        return data
    }

    async getById(accountId: string): Promise<TimelyAccount> {
        const { data } = await this.http.get(`/accounts/${accountId}`)
        return data
    }
}
