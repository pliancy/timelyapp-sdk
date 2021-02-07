import axios, { AxiosInstance } from 'axios'
import * as qs from 'querystring'

import { TimelyAppConfig, TimelyAccount, TimelyClient, TimelyUser } from './types'

export class TimelyApp {
  private readonly _config: TimelyAppConfig
  private readonly _httpClient: AxiosInstance
  private _authenticated: boolean

  constructor(_config: TimelyAppConfig) {
    this._config = _config
    this._httpClient = axios.create({
      baseURL: 'https://api.timelyapp.com/1.1',
    })
    this._authenticated = false
  }

  private async _authenticate(): Promise<void> {
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
  }

  async getAccounts(): Promise<TimelyAccount[]> {
    if (!this._authenticated) await this._authenticate()
    const { data: response }: { data: TimelyAccount[] } = await this._httpClient.get('/accounts')
    this._authenticated = false
    return response
  }

  async getAccountById(accountId: string): Promise<TimelyAccount> {
    if (!this._authenticated) await this._authenticate()
    const { data: response }: { data: TimelyAccount } = await this._httpClient.get(`/accounts/${accountId}`)
    this._authenticated = false
    return response
  }

  async getClients(): Promise<TimelyClient[]> {
    if (!this._authenticated) await this._authenticate()
    const { data: response }: { data: TimelyClient[] } = await this._httpClient.get(
      `/${this._config.accountId}/clients?show=all&limit=999`,
    )
    this._authenticated = false
    return response
  }

  async addClient(client: TimelyClient): Promise<TimelyClient> {
    if (!this._authenticated) await this._authenticate()
    const { data: response }: { data: TimelyClient } = await this._httpClient.post(
      `/${this._config.accountId}/clients`,
      client,
    )
    this._authenticated = false
    return response
  }

  async updateClientById(clientId: string, client: TimelyClient): Promise<TimelyClient> {
    if (!this._authenticated) await this._authenticate()
    const { data: response }: { data: TimelyClient } = await this._httpClient.put(
      `/${this._config.accountId}/clients/${clientId}`,
      client,
    )
    this._authenticated = false
    return response
  }

  async getUsers(): Promise<TimelyUser[]> {
    if (!this._authenticated) await this._authenticate()
    const { data: response }: { data: TimelyUser[] } = await this._httpClient.get(
      `/${this._config.accountId}/users?limit=999`,
    )
    this._authenticated = false
    return response
  }

  async getUserById(userId: number): Promise<TimelyUser> {
    if (!this._authenticated) await this._authenticate()
    const { data: response }: { data: TimelyUser } = await this._httpClient.get(
      `/${this._config.accountId}/users/${userId}`,
    )
    this._authenticated = false
    return response
  }

  async getUserByEmail(userEmail: string): Promise<TimelyUser | null> {
    if (!this._authenticated) await this._authenticate()
    const { data: response }: { data: TimelyUser[] } = await this._httpClient.get(
      `/${this._config.accountId}/users?limit=999`,
    )
    const user = response.find((u) => u.email === userEmail)
    if (!user) return null
    this._authenticated = false
    return user
  }

  async addUser(user: TimelyUser): Promise<TimelyUser> {
    if (!this._authenticated) await this._authenticate()
    const { data: response }: { data: TimelyUser } = await this._httpClient.post(
      `/${this._config.accountId}/users`,
      user,
    )
    this._authenticated = false
    return response
  }

  async updateUserById(userId: string, user: TimelyUser): Promise<TimelyUser> {
    if (!this._authenticated) await this._authenticate()
    const { data: response }: { data: TimelyUser } = await this._httpClient.put(
      `/${this._config.accountId}/users${userId}`,
      user,
    )
    this._authenticated = false
    return response
  }

  async removeUserById(userId: string): Promise<{}> {
    if (!this._authenticated) await this._authenticate()
    const { data: response }: { data: {} } = await this._httpClient.delete(`/${this._config.accountId}/users/${userId}`)
    this._authenticated = false
    return response
  }

  async removeUserByEmail(userEmail: string): Promise<{}> {
    if (!this._authenticated) await this._authenticate()
    const user = await this.getUserByEmail(userEmail)
    if (!user) throw new Error(`failed to find user with email: ${userEmail}`)
    const { data: response }: { data: {} } = await this._httpClient.delete(
      `/${this._config.accountId}/users/${user.id as number}`,
    )
    this._authenticated = false
    return response
  }
}

export default TimelyApp
