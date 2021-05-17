import axios from 'axios'

export let axiosMock: jest.Mocked<typeof axios>

jest.mock('axios-cookiejar-support')
jest.mock('axios')
jest.mock('tough-cookie')
axiosMock = axios as jest.Mocked<typeof axios>

beforeAll(() => {
    axiosMock.create.mockImplementation(() => axiosMock)
})
