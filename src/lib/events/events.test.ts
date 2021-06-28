import { Events } from './events'
import { axiosMock } from '../../../__fixtures__/axios'

describe('Events', () => {
    let events: Events

    beforeEach(() => (events = new Events(axiosMock, { token: 'token', accountId: 'accountId' })))

    it('creates', () => {
        expect(new Events({} as never, {} as never)).toBeTruthy()
    })

    describe('when finding events', () => {
        it('finds an event by id', async () => {
            const res = { data: null }
            jest.spyOn(axiosMock, 'get').mockResolvedValue(res)
            await expect(events.getById(1)).resolves.toBeNull()
        })

        it('finds all events', async () => {
            jest.spyOn(axiosMock, 'post').mockResolvedValue({ data: [] })
            await expect(events.getAll()).resolves.toEqual([])
        })

        it('finds all events in a given range', async () => {
            const data = [
                { id: 1, date: new Date('01/01/2021').toISOString() },
                { id: 2, date: new Date('01/02/2021').toISOString() },
                { id: 3, date: new Date('01/03/2021').toISOString() },
                { id: 4, date: new Date('02/01/2021').toISOString() },
            ]
            jest.spyOn(axiosMock, 'post').mockResolvedValue({ data })
            data.pop()
            await expect(events.getAll('2021/01/01', '2021/01/31')).resolves.toEqual(data)
        })

        it('finds all events in a given range by projectId', async () => {
            const data = [
                { id: 1, projectId: 1, date: new Date('01/01/2021').toISOString() },
                { id: 2, projectId: 1, date: new Date('01/02/2021').toISOString() },
                { id: 3, projectId: 1, date: new Date('01/03/2021').toISOString() },
                { id: 3, projectId: 1, date: new Date('02/01/2021').toISOString() },
            ]
            jest.spyOn(axiosMock, 'get').mockResolvedValue({ data })
            data.pop()
            await expect(events.getByProjectId(1, '2021/01/01', '2021/01/31')).resolves.toEqual(
                data,
            )
        })
    })

    describe('when updating events', () => {
        it('updates an event', async () => {
            const res = { data: { id: 1 } }
            jest.spyOn(axiosMock, 'put').mockResolvedValue(res)
            await expect(events.update(1, { billed: true })).resolves.toEqual(res.data)
        })

        it('updates events in bulk', async () => {
            const update = [{ id: 1, billed: true }]
            const res = { data: { updated_ids: [1] } }
            jest.spyOn(axiosMock, 'post').mockResolvedValue(res)
            await expect(events.bulkUpdate(update)).resolves.toEqual(res.data)
            expect(axiosMock.post).toHaveBeenCalledWith('/accountId/bulk/hours', {
                update: [{ billed: true, id: 1 }],
            })
        })
    })

    describe('when deleting events', () => {
        it('deletes events in bulk', async () => {
            const eventIds = [1]
            const res = { data: { deleted_ids: [1] } }
            jest.spyOn(axiosMock, 'post').mockResolvedValue(res)
            await expect(events.bulkDelete(eventIds)).resolves.toEqual(res.data)
            expect(axiosMock.post).toHaveBeenCalledWith('/accountId/bulk/events', {
                delete: eventIds,
            })
        })
    })

    describe('date parsing/formatting', () => {
        it('fails to ensure ISO format given input that cannot be parsed as a date', () => {
            expect(() => events['ensureISOFormat']('i am not a date')).toThrow(
                'Unable to parse i am not a date as a JS ISO-formatted string',
            )
        })

        it('ensures ISO format given a date formatted as mm/dd/yyyy', () => {
            expect(events['ensureISOFormat']('01/01/1970')).toEqual('1970-01-01')
        })

        it('ensures ISO format given a date formatted as yyyy/mm/dd', () => {
            expect(events['ensureISOFormat']('1970/01/01')).toEqual('1970-01-01')
        })
    })
})
