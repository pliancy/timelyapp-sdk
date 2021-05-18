import { createHttpClient } from './http'

describe('Http', () => {
    it('creates', () => {
        expect(createHttpClient({} as never).get).toBeDefined()
    })
})
