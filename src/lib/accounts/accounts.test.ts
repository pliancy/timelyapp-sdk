import { Accounts } from './accounts'

describe('Accounts', () => {
    it('creates', () => {
        expect(new Accounts({} as never)).toBeTruthy()
    })
})
