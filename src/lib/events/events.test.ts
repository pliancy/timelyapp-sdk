import { Events } from './events'

describe('Events', () => {
    it('creates', () => {
        expect(new Events({} as never, {} as never)).toBeTruthy()
    })
})
