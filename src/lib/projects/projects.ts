import { AxiosInstance } from 'axios'
import { AddTimelyProject, TimelyAppConfig, TimelyProject, TimelyProjectSummary } from '../types'

export class Projects {
    constructor(
        private readonly http: AxiosInstance,
        private readonly config: TimelyAppConfig,
    ) {}

    /**
     * Retrieves a list of projects based on the specified state and whether to include totals. Note:
     * excluding totals makes this call *way* faster. Defaulting to including them to avoid breaking existing code.
     *
     * Overloaded: passing `includeTotals: false` narrows the return type to `TimelyProjectSummary[]`
     * (totals fields absent), while omitting it or passing `true` returns `TimelyProject[]` (totals fields present).
     *
     * @param {('active'|'all'|'mine')} [state='active'] - The state of the projects to retrieve. Defaults to 'active' if not provided.
     * @param {boolean} [includeTotals=true] - Indicates whether to include total values in the response. Defaults to true if not provided.
     * @return {Promise<TimelyProject[]|TimelyProjectSummary[]>} A promise that resolves to an array of projects.
     */
    async getAll(state?: 'active' | 'all' | 'mine', includeTotals?: true): Promise<TimelyProject[]>
    async getAll(
        state: 'active' | 'all' | 'mine' | undefined,
        includeTotals: false,
    ): Promise<TimelyProjectSummary[]>
    async getAll(
        state?: 'active' | 'all' | 'mine',
        includeTotals: boolean = true,
    ): Promise<TimelyProject[] | TimelyProjectSummary[]> {
        const { data } = await this.http.get(
            `/${this.config.accountId}/projects?state=${state ?? 'active'}&totals=${includeTotals}`,
        )
        return data
    }

    /**
     * Retrieves archived projects. Defaults to excluding totals for performance — pass `true` to include them.
     *
     * Overloaded: omitting `includeTotals` or passing `false` returns `TimelyProjectSummary[]`;
     * passing `true` returns `TimelyProject[]`.
     */
    async getArchived(includeTotals?: false): Promise<TimelyProjectSummary[]>
    async getArchived(includeTotals: true): Promise<TimelyProject[]>
    async getArchived(
        includeTotals: boolean = false,
    ): Promise<TimelyProject[] | TimelyProjectSummary[]> {
        const { data } = await this.http.get(
            `/${this.config.accountId}/projects?state=archived&totals=${includeTotals}`,
        )
        return data
    }

    async getById(projectId: number): Promise<TimelyProject> {
        const { data } = await this.http.get(`/${this.config.accountId}/projects/${projectId}`)
        return data
    }

    /**
     * Retrieves active projects matching the given external ID.
     *
     * Overloaded: passing `includeTotals: false` returns `TimelyProjectSummary[]`;
     * omitting it or passing `true` returns `TimelyProject[]`.
     */
    async getByExternalId(externalId: string, includeTotals?: true): Promise<TimelyProject[]>
    async getByExternalId(externalId: string, includeTotals: false): Promise<TimelyProjectSummary[]>
    async getByExternalId(
        externalId: string,
        includeTotals: boolean = true,
    ): Promise<TimelyProject[] | TimelyProjectSummary[]> {
        const { data: projects } = await this.http.get(
            `/${this.config.accountId}/projects?state=active&external_ids=${externalId}&totals=${includeTotals}`,
        )
        return projects
    }

    /**
     * Retrieves active projects matching the given project IDs.
     *
     * Overloaded: passing `includeTotals: false` returns `TimelyProjectSummary[]`;
     * omitting it or passing `true` returns `TimelyProject[]`.
     */
    async getByProjectIds(projectIds: number[], includeTotals?: true): Promise<TimelyProject[]>
    async getByProjectIds(
        projectIds: number[],
        includeTotals: false,
    ): Promise<TimelyProjectSummary[]>
    async getByProjectIds(
        projectIds: number[],
        includeTotals: boolean = true,
    ): Promise<TimelyProject[] | TimelyProjectSummary[]> {
        const { data: projects } = await this.http.get(
            `/${this.config.accountId}/projects?state=active&ids=${projectIds.join(
                ',',
            )}&totals=${includeTotals}`,
        )
        return projects
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
