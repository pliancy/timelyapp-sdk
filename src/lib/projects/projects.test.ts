import { Projects } from './projects'
import { axiosMock } from '../../../__fixtures__/axios'
import { TimelyProject } from '../types'

describe('Projects', () => {
    let projects: Projects

    beforeEach(
        () => (projects = new Projects(axiosMock, { token: 'token', accountId: 'accountId' })),
    )

    describe('getByExternalId', () => {
        it(`returns an empty array given getAll doesn't behave as expected`, async () => {
            jest.spyOn(projects, 'getAll').mockResolvedValue({} as never)
            await expect(projects.getByExternalId('CUST')).resolves.toEqual([])
        })

        it(`returns an empty array given no matches`, async () => {
            jest.spyOn(projects, 'getAll').mockResolvedValue([{ external_id: 'NUNYA' } as never])
            await expect(projects.getByExternalId('CUST')).resolves.toEqual([])
        })

        it(`returns matching projects`, async () => {
            const p = [{ external_id: 'CUST' }] as never as TimelyProject[]
            jest.spyOn(projects, 'getAll').mockResolvedValue(p)
            await expect(projects.getByExternalId('CUST')).resolves.toEqual(p)
        })
    })
})
