import { AxiosInstance } from 'axios'
import { paginatedRequest } from '../http/paginated-request'
import {
    DateString,
    TimelyAppConfig,
    TimelyBulkUpdateEventsReturn,
    TimelyEvent,
    TimelyEventBulkUpdate,
} from '../types'

export class Events {
    constructor(
        private readonly http: AxiosInstance,
        private readonly config: TimelyAppConfig,
    ) {}

    async getAll(start?: DateString, end?: DateString): Promise<TimelyEvent[]> {
        // Ensure given date range conforms to ISO string format
        const [startDate, endDate] = [start, end].map((s) => (s ? this.ensureISOFormat(s) : null))
        const params = {} as { since: string; upto: string }
        if (startDate && endDate) {
            params.since = startDate
            params.upto = endDate
        }
        const data = await paginatedRequest(this.http, `/${this.config.accountId}/events`, params)
        return data
    }

    async getByProjectId(
        projectId: number,
        start: DateString,
        end: DateString,
    ): Promise<TimelyEvent[]> {
        // Ensure given date range conforms to ISO string format
        const [startDate, endDate] = [start, end].map((s) => this.ensureISOFormat(s))
        const params = {} as { since?: string; upto?: string }
        if (startDate) {
            params.since = startDate
        }
        if (endDate) {
            params.upto = endDate
        }
        const data = await paginatedRequest(
            this.http,
            `/${this.config.accountId}/projects/${projectId}/events`,
            params,
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
        const { data } = await this.http.post(`/${this.config.accountId}/bulk/events`, {
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
    ensureISOFormat(date: DateString) {
        try {
            return new Date(date).toISOString().slice(0, 10)
        } catch (e) {
            throw new Error(`Unable to parse "${date}" as YYYY-MM-DD`)
        }
    }
}
