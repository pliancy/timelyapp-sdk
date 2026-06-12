import { Projects } from './projects'
import { axiosMock } from '../../../__fixtures__/axios'
import { TimelyProject, TimelyProjectSummary } from '../types'

const ACCOUNT_ID = 'accountId'

describe('Projects', () => {
    let projects: Projects

    beforeEach(() => {
        projects = new Projects(axiosMock, { token: 'token', accountId: ACCOUNT_ID })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('getAll', () => {
        it('defaults to active state with totals', async () => {
            axiosMock.get.mockResolvedValue({ data: [] })
            await projects.getAll()
            expect(axiosMock.get).toHaveBeenCalledWith(
                `/${ACCOUNT_ID}/projects?state=active&totals=true`,
            )
        })

        it('passes the given state', async () => {
            axiosMock.get.mockResolvedValue({ data: [] })
            await projects.getAll('all')
            expect(axiosMock.get).toHaveBeenCalledWith(
                `/${ACCOUNT_ID}/projects?state=all&totals=true`,
            )
        })

        it('passes totals=false when includeTotals is false', async () => {
            axiosMock.get.mockResolvedValue({ data: [] })
            await projects.getAll('active', false)
            expect(axiosMock.get).toHaveBeenCalledWith(
                `/${ACCOUNT_ID}/projects?state=active&totals=false`,
            )
        })

        it('returns TimelyProject[] when includeTotals is true', async () => {
            const mockProjects = [{ id: 1 }] as TimelyProject[]
            axiosMock.get.mockResolvedValue({ data: mockProjects })
            const result: TimelyProject[] = await projects.getAll()
            expect(result).toEqual(mockProjects)
        })

        it('returns TimelyProjectSummary[] when includeTotals is false', async () => {
            const mockProjects = [{ id: 1 }] as TimelyProjectSummary[]
            axiosMock.get.mockResolvedValue({ data: mockProjects })
            const result: TimelyProjectSummary[] = await projects.getAll('active', false)
            expect(result).toEqual(mockProjects)
        })
    })

    describe('getArchived', () => {
        it('defaults to excluding totals', async () => {
            axiosMock.get.mockResolvedValue({ data: [] })
            await projects.getArchived()
            expect(axiosMock.get).toHaveBeenCalledWith(
                `/${ACCOUNT_ID}/projects?state=archived&totals=false`,
            )
        })

        it('passes totals=false when includeTotals is false', async () => {
            axiosMock.get.mockResolvedValue({ data: [] })
            await projects.getArchived(false)
            expect(axiosMock.get).toHaveBeenCalledWith(
                `/${ACCOUNT_ID}/projects?state=archived&totals=false`,
            )
        })

        it('passes totals=true when includeTotals is true', async () => {
            axiosMock.get.mockResolvedValue({ data: [] })
            await projects.getArchived(true)
            expect(axiosMock.get).toHaveBeenCalledWith(
                `/${ACCOUNT_ID}/projects?state=archived&totals=true`,
            )
        })

        it('returns TimelyProjectSummary[] by default', async () => {
            const mockProjects = [{ id: 2, active: false }] as TimelyProjectSummary[]
            axiosMock.get.mockResolvedValue({ data: mockProjects })
            const result: TimelyProjectSummary[] = await projects.getArchived()
            expect(result).toEqual(mockProjects)
        })

        it('returns TimelyProject[] when includeTotals is true', async () => {
            const mockProjects = [{ id: 2, active: false }] as TimelyProject[]
            axiosMock.get.mockResolvedValue({ data: mockProjects })
            const result: TimelyProject[] = await projects.getArchived(true)
            expect(result).toEqual(mockProjects)
        })
    })

    describe('getByExternalId', () => {
        it('defaults to including totals', async () => {
            axiosMock.get.mockResolvedValue({ data: [] })
            await projects.getByExternalId('CUST')
            expect(axiosMock.get).toHaveBeenCalledWith(
                `/${ACCOUNT_ID}/projects?state=active&external_ids=CUST&totals=true`,
            )
        })

        it('passes totals=false when includeTotals is false', async () => {
            axiosMock.get.mockResolvedValue({ data: [] })
            await projects.getByExternalId('CUST', false)
            expect(axiosMock.get).toHaveBeenCalledWith(
                `/${ACCOUNT_ID}/projects?state=active&external_ids=CUST&totals=false`,
            )
        })

        it('returns TimelyProject[] when includeTotals is true', async () => {
            const mockProjects = [{ id: 3, external_id: 'CUST' }] as TimelyProject[]
            axiosMock.get.mockResolvedValue({ data: mockProjects })
            const result: TimelyProject[] = await projects.getByExternalId('CUST')
            expect(result).toEqual(mockProjects)
        })

        it('returns TimelyProjectSummary[] when includeTotals is false', async () => {
            const mockProjects = [{ id: 3, external_id: 'CUST' }] as TimelyProjectSummary[]
            axiosMock.get.mockResolvedValue({ data: mockProjects })
            const result: TimelyProjectSummary[] = await projects.getByExternalId('CUST', false)
            expect(result).toEqual(mockProjects)
        })
    })

    describe('getByProjectIds', () => {
        it('defaults to including totals', async () => {
            axiosMock.get.mockResolvedValue({ data: [] })
            await projects.getByProjectIds([1, 2, 3])
            expect(axiosMock.get).toHaveBeenCalledWith(
                `/${ACCOUNT_ID}/projects?state=active&ids=1,2,3&totals=true`,
            )
        })

        it('passes totals=false when includeTotals is false', async () => {
            axiosMock.get.mockResolvedValue({ data: [] })
            await projects.getByProjectIds([1, 2], false)
            expect(axiosMock.get).toHaveBeenCalledWith(
                `/${ACCOUNT_ID}/projects?state=active&ids=1,2&totals=false`,
            )
        })

        it('returns TimelyProject[] when includeTotals is true', async () => {
            const mockProjects = [{ id: 1 }] as TimelyProject[]
            axiosMock.get.mockResolvedValue({ data: mockProjects })
            const result: TimelyProject[] = await projects.getByProjectIds([1])
            expect(result).toEqual(mockProjects)
        })

        it('returns TimelyProjectSummary[] when includeTotals is false', async () => {
            const mockProjects = [{ id: 1 }] as TimelyProjectSummary[]
            axiosMock.get.mockResolvedValue({ data: mockProjects })
            const result: TimelyProjectSummary[] = await projects.getByProjectIds([1], false)
            expect(result).toEqual(mockProjects)
        })
    })
})
