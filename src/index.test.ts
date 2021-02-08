import { TimelyApp } from '.'

describe('TimelyApp class', () => {
  it('creates a TimelyApp instance', () => {
    const timely = new TimelyApp({
      accountId: '1234',
      clientId: 'aaa',
      clientSecret: 'bbb',
    })

    expect(timely).toBeInstanceOf(TimelyApp)
  })
})
