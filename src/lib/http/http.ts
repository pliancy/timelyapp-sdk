import axios, { AxiosRequestConfig } from 'axios'

export const createHttpClient = (config: AxiosRequestConfig) => axios.create(config)
