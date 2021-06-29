import { AxiosInstance } from 'axios'
import {
    DateString,
    TimelyAppConfig,
    TimelyBulkUpdateEventsReturn,
    TimelyEvent,
    TimelyEventBulkUpdate,
} from '../types'

export class Events {
    constructor(private readonly http: AxiosInstance, private readonly config: TimelyAppConfig) {}

    async getAll(start?: DateString, end?: DateString): Promise<TimelyEvent[]> {
        // Ensure given date range conforms to ISO string format
        const [startDate, endDate] = [start, end].map((s) => (s ? this.ensureISOFormat(s) : null))
        const { data } = await this.http.post(`/${this.config.accountId}/reports/filter.json`, {
            // TODO: Are all properties required?
            project_ids: '',
            user_ids: '',
            team_ids: '',
            label_ids: '',
            since: startDate,
            until: endDate,
            scope: 'events',
            limit: 9999,
            page: 1,
            select: 'all',
            sort: 'day',
            order: 'desc',
            published: true,
        })

        return data
    }

    async getByProjectId(
        projectId: number,
        start: DateString,
        end: DateString,
    ): Promise<TimelyEvent[]> {
        // Ensure given date range conforms to ISO string format
        const [startDate, endDate] = [start, end].map((s) => this.ensureISOFormat(s))
        const { data } = await this.http.get(
            `/${this.config.accountId}/projects/${projectId}/events${
                start ? `?since=${startDate}` : ''
            }${end ? `&upto=${endDate}` : ''}`,
        )
        return data
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
    async bulkUpdate(
        updateArray: TimelyEventBulkUpdate[],
    ): Promise<TimelyBulkUpdateEventsReturn[]> {
        const { data } = await this.http.post(`/${this.config.accountId}/bulk/hours`, {
            update: updateArray,
        })
        return data
    }

    async bulkDelete(eventIds: number[]): Promise<TimelyBulkUpdateEventsReturn[]> {
        const { data } = await this.http.post(`/${this.config.accountId}/bulk/events`, {
            delete: eventIds,
        })
        return data
    }

    async update(eventId: number, event: Partial<TimelyEvent>): Promise<TimelyEvent> {
        const { data } = await this.http.put(`/${this.config.accountId}/events/${eventId}`, event)
        return data
    }

    async getById(eventId: number): Promise<TimelyEvent> {
        const { data } = await this.http.get(`/${this.config.accountId}/events/${eventId}`)
        return data
    }

    /**
     * Convert any Date or Date-parseable string to ISO format (e.g., yyyy-mm-dd)
     * @param date
     */
    ensureISOFormat(date: DateString): string {
        try {
            const re = /^\d{4}-\d{2}-\d{2}$/
            if (typeof date === 'string' && re.test(date)) return date
            return date instanceof Date
                ? this.asShortISOString(date)
                : this.asShortISOString(new Date(date.replace(/-/gi, '/')))
        } catch (e) {
            throw new Error(`Unable to parse ${date} as YYYY-MM-DD`)
        }
    }

    private asShortISOString(date: Date): string {
        return date.toISOString().slice(0, 10)
    }
}
