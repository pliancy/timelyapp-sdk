import { AxiosInstance } from 'axios'
import { AddTimelyProject, TimelyAppConfig, TimelyProject } from '../types'

export class Projects {
    constructor(private readonly http: AxiosInstance, private readonly config: TimelyAppConfig) {}

    async getAll(filter?: 'active' | 'all' | 'mine' | 'archived'): Promise<TimelyProject[]> {
        const { data } = await this.http.get(
            `/${this.config.accountId}/projects?filter=${filter ?? 'active'} `,
        )
        return data
    }

    async getArchived(): Promise<TimelyProject[]> {
        const { data } = await this.http.get(`/${this.config.accountId}/projects?filter=archived`)
        return data
    }

    async getById(projectId: number): Promise<TimelyProject> {
        const { data } = await this.http.get(`/${this.config.accountId}/projects/${projectId}`)
        return data
    }

    async getByExternalId(externalId: string): Promise<TimelyProject | undefined> {
        const projects = await this.getAll()
        if (!(projects && projects.length)) return undefined
        return projects.find((e) => e?.external_id === externalId)
    }

    async add(project: AddTimelyProject): Promise<TimelyProject> {
        const { data } = await this.http.post(`/${this.config.accountId}/projects`, { project })
        return data
    }

    async remove(projectId: number): Promise<{}> {
        const { data } = await this.http.delete(`/${this.config.accountId}/projects/${projectId}`)
        return data
    }

    async update(projectId: number, project: Partial<TimelyProject>): Promise<TimelyProject> {
        const { data } = await this.http.put(`/${this.config.accountId}/projects/${projectId}`, {
            project,
        })
        return data
    }
}
