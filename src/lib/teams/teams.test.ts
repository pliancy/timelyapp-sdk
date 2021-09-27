import { Teams } from './teams'

describe('Teams', () => {
    it('creates', () => {
        expect(new Teams({} as never, {} as never)).toBeTruthy()
    })
})
