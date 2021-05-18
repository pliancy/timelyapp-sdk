import { Users } from './users'

describe('Users', () => {
    it('creates', () => {
        expect(new Users({} as never, {} as never)).toBeTruthy()
    })
})
