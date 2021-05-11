import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import {
  TimelyAppConfig,
  TimelyAccount,
  TimelyClient,
  TimelyUser,
  TimelyLabel,
  TimelyProject,
  AddTimelyProject,
  TimelyRole,
  TimelyUserCapacity,
  TimelyCapacity,
} from './types'
export { TimelyAppConfig, TimelyAccount, TimelyClient, TimelyUser, TimelyLabel, TimelyProject, AddTimelyProject }

export class TimelyApp {
  private readonly _config: TimelyAppConfig
  private readonly _httpConfig: AxiosRequestConfig

  constructor(_config: TimelyAppConfig) {
    if (!_config.accountId || !_config.token) throw new Error('Missing required inputs for TimelyApp constructor')
    this._config = _config
    this._httpConfig = {
      baseURL: 'https://api.timelyapp.com/1.1',
      timeout: this._config.timeout ?? 20000,
      headers: {
        authorization: `Bearer ${this._config.token}`,
      },
    }
  }

  private async _request(url: string, axiosOptions?: AxiosRequestConfig): Promise<AxiosResponse> {
    return await axios(url, {
      ...this._httpConfig,
      ...(axiosOptions ?? {}),
    })
  }

  async getAccounts(): Promise<TimelyAccount[]> {
    const { data: response }: { data: TimelyAccount[] } = await this._request('/accounts')
    return response
  }

  async getAccountById(accountId: string): Promise<TimelyAccount> {
    const { data: response }: { data: TimelyAccount } = await this._request(`/accounts/${accountId}`)
    return response
  }

  async getClients(): Promise<TimelyClient[]> {
    const { data: response }: { data: TimelyClient[] } = await this._request(
      `/${this._config.accountId}/clients?show=all`,
    )
    return response
  }

  async getClientById(clientId: number): Promise<TimelyClient> {
    const { data: response }: { data: TimelyClient } = await this._request(
      `/${this._config.accountId}/clients/${clientId}`,
    )
    return response
  }

  async getClientByName(clientName: string): Promise<TimelyClient> {
    const clients = await this.getClients()
    const client = clients.find((c) => c.name === clientName)
    if (!client) throw new Error(`Can't find client with name of ${clientName}`)
    return client
  }

  async addClient(client: TimelyClient): Promise<TimelyClient> {
    const { data: response }: { data: TimelyClient } = await this._request(`/${this._config.accountId}/clients`, {
      method: 'POST',
      data: client,
    })
    return response
  }

  async updateClientById(clientId: string, client: TimelyClient): Promise<TimelyClient> {
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
    const { data: response }: { data: TimelyUser[] } = await this._request(
      `/${this._config.accountId}/users?limit=1000`,
    )
    return response
  }

  async getUserById(userId: number): Promise<TimelyUser> {
    const { data: response }: { data: TimelyUser } = await this._request(`/${this._config.accountId}/users/${userId}`)
    return response
  }

  async getUserByEmail(userEmail: string): Promise<TimelyUser> {
    const { data: response }: { data: TimelyUser[] } = await this._request(`/${this._config.accountId}/users?limit=999`)
    const user = response.find((u) => u.email === userEmail)
    if (!user) throw new Error(`Can't find user with email of ${userEmail}`)
    return user
  }

  async addUser(user: TimelyUser): Promise<TimelyUser> {
    const { data: response }: { data: TimelyUser } = await this._request(`/${this._config.accountId}/users`, {
      method: 'POST',
      data: user,
    })
    return response
  }

  async updateUserById(userId: string, user: TimelyUser): Promise<TimelyUser> {
    const { data: response }: { data: TimelyUser } = await this._request(`/${this._config.accountId}/users${userId}`, {
      method: 'PUT',
      data: user,
    })
    return response
  }

  async removeUserById(userId: number): Promise<{}> {
    const { data: response }: { data: {} } = await this._request(`/${this._config.accountId}/users/${userId}`, {
      method: 'DELETE',
    })
    return response
  }

  async removeUserByEmail(userEmail: string): Promise<{}> {
    const user = await this.getUserByEmail(userEmail)
    if (!user) throw new Error(`failed to find user with email: ${userEmail}`)
    const response = await this.removeUserById(user.id as number)
    return response
  }

  async getLabels(): Promise<TimelyLabel[]> {
    const { data: response }: { data: TimelyLabel[] } = await this._request(`/${this._config.accountId}/labels`)
    return response
  }

  async getLabelById(labelId: number): Promise<TimelyLabel> {
    const { data: response }: { data: TimelyLabel } = await this._request(
      `/${this._config.accountId}/labels/${labelId}`,
    )
    return response
  }

  async updateLabelById(labelId: number, label: TimelyLabel): Promise<TimelyLabel> {
    const { data: response }: { data: TimelyLabel } = await this._request(
      `/${this._config.accountId}/labels/${labelId}`,
      {
        method: 'PUT',
        data: label,
      },
    )
    return response
  }

  async getAllEvents(start: string, end: string): Promise<any[]> {
    const { data: response }: { data: any[] } = await this._request(`/${this._config.accountId}/reports/filter.json`, {
      method: 'POST',
      data: {
        project_ids: '',
        user_ids: '',
        team_ids: '',
        label_ids: '',
        since: start,
        until: end,
        scope: 'events',
        limit: 9999,
        page: 1,
        select: 'all',
        sort: 'day',
        order: 'desc',
        published: true,
      },
    })
    return response
  }

  async getEventsByProjectId(projectId: number, start: string, end: string): Promise<any[]> {
    const { data: response }: { data: any[] } = await this._request(
      `/${this._config.accountId}/projects/${projectId}/events${start ? `?since=${start}` : ''}${
        end ? `&upto=${end}` : ''
      }`,
    )
    return response
  }

  /**
   *
   * @param updateArray
   *  example minimum keys for updateArray
   * [
   *   { id: 123456760, billed: true, label_ids: [], project_id: 1234567 },
   *   { id: 123456761, billed: true, label_ids: [], project_id: 1234567 },
   *   { id: 123456762, billed: true, label_ids: [], project_id: 1234567 },
   *   { id: 123456763, billed: true, label_ids: [], project_id: 1234567 },
   *   { id: 123456764, billed: true, label_ids: [], project_id: 1234567 },
   * ]
   */
  async bulkUpdateEvents(updateArray: any[]): Promise<any[]> {
    const { data: response }: { data: any[] } = await this._request(`/${this._config.accountId}/bulk/hours`, {
      method: 'POST',
      data: {
        update: updateArray,
      },
    })
    return response
  }

  async getProjects(): Promise<TimelyProject[]> {
    const { data: response }: { data: TimelyProject[] } = await this._request(`/${this._config.accountId}/projects`)
    return response
  }

  async getProjectById(projectId: number): Promise<TimelyProject> {
    const { data: response }: { data: TimelyProject } = await this._request(
      `/${this._config.accountId}/projects/${projectId}`,
    )
    return response
  }

  async addProject(project: AddTimelyProject): Promise<TimelyProject> {
    const { data: response }: { data: TimelyProject } = await this._request(`/${this._config.accountId}/projects`, {
      method: 'POST',
      data: { project: project },
    })
    return response
  }

  async removeProjectById(projectId: number): Promise<{}> {
    const { data: response }: { data: {} } = await this._request(`/${this._config.accountId}/projects/${projectId}`, {
      method: 'DELETE',
    })
    return response
  }

  async updateProjectById(projectId: number, project: TimelyProject): Promise<TimelyProject> {
    const { data: response }: { data: TimelyProject } = await this._request(
      `/${this._config.accountId}/projects/${projectId}`,
      {
        method: 'PUT',
        data: project,
      },
    )
    return response
  }

  async getRoles(): Promise<TimelyRole[]> {
    const { data: response }: { data: TimelyRole[] } = await this._request(`/${this._config.accountId}/roles`)
    return response
  }

  async getUserCapacities(): Promise<TimelyUserCapacity[]> {
    const { data: response }: { data: TimelyUserCapacity[] } = await this._request(
      `/${this._config.accountId}/users/capacities`,
    )
    return response
  }

  async getUserCapacityById(userId: string): Promise<TimelyCapacity> {
    const { data: response }: { data: TimelyCapacity } = await this._request(
      `/${this._config.accountId}/users/${userId}/capacities`,
    )
    return response
  }
}

export default TimelyApp
