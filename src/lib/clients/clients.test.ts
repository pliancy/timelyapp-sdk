import { Clients } from './clients'

describe('Clients', () => {
    it('creates', () => {
        expect(new Clients({} as never, {} as never)).toBeTruthy()
    })
})
