import { TimelyApp } from '.'

describe('TimelyApp class', () => {
    it('creates a TimelyApp instance', () => {
        const timely = new TimelyApp({
            accountId: '1234',
            token: 'asdf',
        })

        expect(timely).toBeInstanceOf(TimelyApp)
    })
})
