import { Reports } from './reports'

describe('Clients', () => {
    it('creates', () => {
        expect(new Reports({} as never, {} as never)).toBeTruthy()
    })
})
