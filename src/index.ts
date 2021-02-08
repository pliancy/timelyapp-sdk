import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import * as qs from 'querystring'

import { TimelyAppConfig, TimelyAccount, TimelyClient, TimelyUser } from './types'
export { TimelyAppConfig, TimelyAccount, TimelyClient, TimelyUser }

export class TimelyApp {
  private readonly _config: TimelyAppConfig
  private readonly _httpConfig: AxiosRequestConfig
  private token: string

  constructor(_config: TimelyAppConfig) {
    this._config = _config
    this.token = ''
    this._httpConfig = {
      baseURL: 'https://api.timelyapp.com/1.1',
      timeout: this._config.timeout ?? 20000,
    }
  }

  checkAuth(): void {
    if (this.token === '') throw new Error('You must call authenticate() once before attempting to call methods')
  }

  private async _request(url: string, axiosOptions?: AxiosRequestConfig): Promise<AxiosResponse> {
    return await axios(url, {
      ...this._httpConfig,
      ...(axiosOptions ?? {}),
    })
  }

  async authenticate(): Promise<void> {
    const resp = await axios.post(
      'https://api.timelyapp.com/1.1/oauth/token',
      qs.stringify({
        grant_type: 'client_credentials',
        redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
        client_id: this._config.clientId,
        client_secret: this._config.clientSecret,
      }),
    )
    console.dir(resp, { depth: null })
    // gotta wait for them to give me client_credentials code flow before i can finish the auth stuff
    this.token = 'averygoodaccesstoken'
  }

  async getAccounts(): Promise<TimelyAccount[]> {
    this.checkAuth()
    const { data: response }: { data: TimelyAccount[] } = await this._request('/accounts')
    return response
  }

  async getAccountById(accountId: string): Promise<TimelyAccount> {
    this.checkAuth()
    const { data: response }: { data: TimelyAccount } = await this._request(`/accounts/${accountId}`)
    return response
  }

  async getClients(): Promise<TimelyClient[]> {
    this.checkAuth()
    const { data: response }: { data: TimelyClient[] } = await this._request(
      `/${this._config.accountId}/clients?show=all&limit=999`,
    )
    return response
  }

  async addClient(client: TimelyClient): Promise<TimelyClient> {
    this.checkAuth()
    const { data: response }: { data: TimelyClient } = await this._request(`/${this._config.accountId}/clients`, {
      method: 'POST',
      data: client,
    })
    return response
  }

  async updateClientById(clientId: string, client: TimelyClient): Promise<TimelyClient> {
    this.checkAuth()
    const { data: response }: { data: TimelyClient } = await this._request(
      `/${this._config.accountId}/clients/${clientId}`,
      {
        method: 'PUT',
        data: client,
      },
    )
    return response
  }

  async getUsers(): Promise<TimelyUser[]> {
    this.checkAuth()
    const { data: response }: { data: TimelyUser[] } = await this._request(`/${this._config.accountId}/users?limit=999`)
    return response
  }

  async getUserById(userId: number): Promise<TimelyUser> {
    this.checkAuth()
    const { data: response }: { data: TimelyUser } = await this._request(`/${this._config.accountId}/users/${userId}`)
    return response
  }

  async getUserByEmail(userEmail: string): Promise<TimelyUser | null> {
    this.checkAuth()
    const { data: response }: { data: TimelyUser[] } = await this._request(`/${this._config.accountId}/users?limit=999`)
    const user = response.find((u) => u.email === userEmail)
    if (!user) return null
    return user
  }

  async addUser(user: TimelyUser): Promise<TimelyUser> {
    this.checkAuth()
    const { data: response }: { data: TimelyUser } = await this._request(`/${this._config.accountId}/users`, {
      method: 'POST',
      data: user,
    })
    return response
  }

  async updateUserById(userId: string, user: TimelyUser): Promise<TimelyUser> {
    this.checkAuth()
    const { data: response }: { data: TimelyUser } = await this._request(`/${this._config.accountId}/users${userId}`, {
      method: 'PUT',
      data: user,
    })
    return response
  }

  async removeUserById(userId: string): Promise<{}> {
    this.checkAuth()
    const { data: response }: { data: {} } = await this._request(`/${this._config.accountId}/users/${userId}`, {
      method: 'DELETE',
    })
    return response
  }

  async removeUserByEmail(userEmail: string): Promise<{}> {
    this.checkAuth()
    const user = await this.getUserByEmail(userEmail)
    if (!user) throw new Error(`failed to find user with email: ${userEmail}`)
    const { data: response }: { data: {} } = await this._request(
      `/${this._config.accountId}/users/${user.id as number}`,
      { method: 'DELETE' },
    )
    return response
  }
}

export default TimelyApp
