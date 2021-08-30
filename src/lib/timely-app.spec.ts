import { TimelyApp } from './timely-app'
import { Labels } from './labels/labels'
import { Events } from './events/events'
import { Clients } from './clients/clients'
import { Accounts } from './accounts/accounts'
import { Projects } from './projects/projects'

describe('TimelyApp', () => {
    it('fails to create given a bad config', () => {
        try {
            new TimelyApp({} as never)
        } catch (e) {
            expect((e as Error).message).toBe('Missing required inputs for TimelyApp constructor')
        }
    })

    it('creates component instances', () => {
        const t = new TimelyApp({
            accountId: 'accountId',
            timeout: 20000,
            token: 'token',
        })

        expect(t.http).toBeDefined()
        expect(t.labels).toBeInstanceOf(Labels)
        expect(t.events).toBeInstanceOf(Events)
        expect(t.clients).toBeInstanceOf(Clients)
        expect(t.accounts).toBeInstanceOf(Accounts)
        expect(t.projects).toBeInstanceOf(Projects)
    })
})
