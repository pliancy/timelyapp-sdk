import axios from 'axios'

export let axiosMock: jest.Mocked<typeof axios>

jest.mock('axios')
axiosMock = axios as jest.Mocked<typeof axios>

beforeAll(() => {
    axiosMock.create.mockImplementation(() => axiosMock)
})
