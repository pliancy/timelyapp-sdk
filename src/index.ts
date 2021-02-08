import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { TimelyAppConfig, TimelyAccount, TimelyClient, TimelyUser, TimelyLabel } from './types'
export { TimelyAppConfig, TimelyAccount, TimelyClient, TimelyUser, TimelyLabel }

export class TimelyApp {
  private readonly _config: TimelyAppConfig
  private readonly _httpConfig: AxiosRequestConfig
  private token: string

  constructor(_config: TimelyAppConfig) {
    this._config = _config
    this.token = ''
    if (_config.token) this.token = _config.token
    this._httpConfig = {
      baseURL: 'https://api.timelyapp.com/1.1',
      timeout: this._config.timeout ?? 20000,
      headers: {
        authorization: `Bearer ${this.token}`,
      },
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
    const resp = await axios.get('https://api.timelyapp.com/1.1/oauth/authorize', {
      params: {
        response_type: 'code',
        redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
        client_id: this._config.clientId,
      },
    })
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
      `/${this._config.accountId}/clients?show=all`,
    )
    return response
  }

  async getClientById(clientId: number): Promise<TimelyClient> {
    this.checkAuth()
    const { data: response }: { data: TimelyClient } = await this._request(
      `/${this._config.accountId}/clients/${clientId}`,
    )
    return response
  }

  async getClientByName(clientName: string): Promise<TimelyClient> {
    this.checkAuth()
    const clients = await this.getClients()
    const client = clients.find((c) => c.name === clientName)
    if (!client) throw new Error(`Can't find client with name of ${clientName}`)
    return client
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
    const { data: response }: { data: TimelyUser[] } = await this._request(
      `/${this._config.accountId}/users?limit=1000`,
    )
    return response
  }

  async getUserById(userId: number): Promise<TimelyUser> {
    this.checkAuth()
    const { data: response }: { data: TimelyUser } = await this._request(`/${this._config.accountId}/users/${userId}`)
    return response
  }

  async getUserByEmail(userEmail: string): Promise<TimelyUser> {
    this.checkAuth()
    const { data: response }: { data: TimelyUser[] } = await this._request(`/${this._config.accountId}/users?limit=999`)
    const user = response.find((u) => u.email === userEmail)
    if (!user) throw new Error(`Can't find user with email of ${userEmail}`)
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

  async removeUserById(userId: number): Promise<{}> {
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
    const response = await this.removeUserById(user.id as number)
    return response
  }

  async getLabels(): Promise<TimelyLabel[]> {
    this.checkAuth()
    const { data: response }: { data: TimelyLabel[] } = await this._request(`/${this._config.accountId}/labels`)
    return response
  }

  async getLabelById(labelId: number): Promise<TimelyLabel> {
    this.checkAuth()
    const { data: response }: { data: TimelyLabel } = await this._request(
      `/${this._config.accountId}/labels/${labelId}`,
    )
    return response
  }

  async updateLabelById(labelId: number, label: TimelyLabel): Promise<TimelyLabel> {
    this.checkAuth()
    const { data: response }: { data: TimelyLabel } = await this._request(
      `/${this._config.accountId}/labels/${labelId}`,
      {
        method: 'PUT',
        data: label,
      },
    )
    return response
  }

  async getEventsByProjectId(projectId: number, start?: string, end?: string): Promise<any[]> {
    this.checkAuth()
    const { data: response }: { data: any[] } = await this._request(
      `/${this._config.accountId}/projects/${projectId}/events${start ? `?since=${start}` : ''}${
        end ? `&upto=${end}` : ''
      }`,
    )
    return response
  }
}

export default TimelyApp
