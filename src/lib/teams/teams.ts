import { AxiosInstance } from 'axios'
import { TimelyAppConfig, TimelyTeam, TimelyUser } from '../types'

export class Teams {
    constructor(private readonly http: AxiosInstance, private readonly config: TimelyAppConfig) {}

    async getAll(): Promise<TimelyUser[]> {
        const { data } = await this.http.get(`/${this.config.accountId}/teams`)
        return data
    }

    async getByName(name: string): Promise<TimelyTeam> {
        const { data: response }: { data: TimelyTeam[] } = await this.http.get(
            `/${this.config.accountId}/teams`,
        )
        const team = response.find((u) => u.name === name)
        if (!team) throw new Error(`Can't find team with name ${name}`)
        return team
    }

    async update(teamId: number, team: Partial<TimelyTeam>): Promise<TimelyTeam> {
        const { data } = await this.http.put(`/${this.config.accountId}/teams${teamId}`, { team })
        return data
    }
}
