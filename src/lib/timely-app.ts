import { AxiosInstance } from 'axios'
import { TimelyAppConfig } from './types'
import { Accounts } from './accounts/accounts'
import { Clients } from './clients/clients'
import { Events } from './events/events'
import { Labels } from './labels/labels'
import { Projects } from './projects/projects'
import { Users } from './users/users'
import { createHttpClient } from './http/http'
import { Teams } from './teams/teams'
import { Reports } from './reports/reports'

export class TimelyApp {
    readonly accounts: Accounts

    readonly clients: Clients

    readonly events: Events

    readonly http: AxiosInstance

    readonly labels: Labels

    readonly projects: Projects

    readonly teams: Teams

    readonly users: Users

    readonly reports: Reports

    constructor(private readonly config: TimelyAppConfig) {
        this.validateConfig()
        const httpConfig = {
            baseURL: 'https://api.timelyapp.com/1.1',
            timeout: this.config.timeout ?? 20000,
            headers: {
                authorization: `Bearer ${this.config.token}`,
            },
        }

        this.http = createHttpClient(httpConfig)
        this.accounts = new Accounts(this.http)
        this.clients = new Clients(this.http, this.config)
        this.events = new Events(this.http, this.config)
        this.labels = new Labels(this.http, this.config)
        this.projects = new Projects(this.http, this.config)
        this.teams = new Teams(this.http, this.config)
        this.users = new Users(this.http, this.config)
        this.reports = new Reports(this.http, this.config)
    }

    private validateConfig() {
        if (!this.config.accountId || !this.config.token)
            throw new Error('Missing required inputs for TimelyApp constructor')
    }
}
