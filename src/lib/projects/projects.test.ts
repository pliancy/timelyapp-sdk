import { Projects } from './projects'

describe('Projects', () => {
    it('creates', () => {
        expect(new Projects({} as never, {} as never)).toBeTruthy()
    })
})
