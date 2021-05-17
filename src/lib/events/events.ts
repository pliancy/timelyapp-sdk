import { AxiosInstance } from 'axios'
import { TimelyAppConfig, TimelyBulkUpdateEventsReturn, TimelyEvent } from '../types'

export class Events {
    constructor(private readonly http: AxiosInstance, private readonly config: TimelyAppConfig) {}

    async getAll(start?: string, end?: string): Promise<TimelyEvent[]> {
        return this.http.post(`/${this.config.accountId}/reports/filter.json`, {
            // TODO: Are all properties required?
            project_ids: '',
            user_ids: '',
            team_ids: '',
            label_ids: '',
            since: start ?? null,
            until: end ?? null,
            scope: 'events',
            limit: 9999,
            page: 1,
            select: 'all',
            sort: 'day',
            order: 'desc',
            published: true,
        })
    }

    async getByProjectId(projectId: number, start: string, end: string): Promise<TimelyEvent[]> {
        return this.http.get(
            `/${this.config.accountId}/projects/${projectId}/events${
                start ? `?since=${start}` : ''
            }${end ? `&upto=${end}` : ''}`,
        )
    }

    /**
     *
     * @param updateArray
     *  example minimum keys for updateArray
     * [
     *   { id: 123456760, billed: true},
     *   { id: 123456761, billed: true, label_ids: []},
     *   { id: 123456762, billed: true, label_ids: [], project_id: 1234567 },
     *   { id: 123456763, billed: true, label_ids: [], project_id: 1234567 },
     *   { id: 123456764, billed: true, label_ids: [], project_id: 1234567 },
     * ]
     */
    async bulkUpdate(updateArray: any[]): Promise<TimelyBulkUpdateEventsReturn[]> {
        return this.http.post(`/${this.config.accountId}/bulk/hours`, { update: updateArray })
    }

    async bulkDelete(eventIds: number[]): Promise<TimelyBulkUpdateEventsReturn[]> {
        return this.http.post(`/${this.config.accountId}/bulk/events`, { delete: eventIds })
    }

    async update(eventId: number, event: TimelyEvent): Promise<TimelyEvent> {
        return this.http.put(`/${this.config.accountId}/events/${eventId}`, event)
    }

    async getById(eventId: number): Promise<TimelyEvent> {
        return this.http.get(`/${this.config.accountId}/events/${eventId}`)
    }
}
