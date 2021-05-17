import { AxiosInstance } from 'axios'
import { AddTimelyProject, TimelyAppConfig, TimelyProject } from '../types'

export class Projects {
    constructor(private readonly http: AxiosInstance, private readonly config: TimelyAppConfig) {}

    async getAll(): Promise<TimelyProject[]> {
        return this.http.get(`/${this.config.accountId}/projects`)
    }

    async getById(projectId: number): Promise<TimelyProject> {
        return this.http.get(`/${this.config.accountId}/projects/${projectId}`)
    }

    async add(project: AddTimelyProject): Promise<TimelyProject> {
        return this.http.post(`/${this.config.accountId}/projects`, { project })
    }

    async remove(projectId: number): Promise<{}> {
        return this.http.delete(`/${this.config.accountId}/projects/${projectId}`)
    }

    async update(projectId: number, project: TimelyProject): Promise<TimelyProject> {
        return this.http.put(`/${this.config.accountId}/projects/${projectId}`, project)
    }
}
