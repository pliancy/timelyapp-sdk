import { AxiosInstance } from 'axios'
import { TimelyAccount } from '../types'

export class Accounts {
    constructor(private readonly http: AxiosInstance) {}

    async getAll(): Promise<TimelyAccount[]> {
        return this.http.get('/accounts')
    }

    async getById(accountId: string): Promise<TimelyAccount> {
        return this.http.get(`/accounts/${accountId}`)
    }
}
