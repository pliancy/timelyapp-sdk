import { AxiosInstance } from 'axios'
import {
    AddTimelyUser,
    TimelyAppConfig,
    TimelyCapacity,
    TimelyPermission,
    TimelyRole,
    TimelyUser,
    TimelyUserCapacity,
} from '../types'

export class Users {
    constructor(private readonly http: AxiosInstance, private readonly config: TimelyAppConfig) {}

    async getAll(): Promise<TimelyUser[]> {
        const { data } = await this.http.get(`/${this.config.accountId}/users?limit=1000`)
        return data
    }

    async getById(userId: number): Promise<TimelyUser> {
        const { data } = await this.http.get(`/${this.config.accountId}/users/${userId}`)
        return data
    }

    async getByEmail(userEmail: string): Promise<TimelyUser> {
        const { data: response }: { data: TimelyUser[] } = await this.http.get(
            `/${this.config.accountId}/users?limit=999`,
        )
        return response.find((u) => u.email === userEmail) as TimelyUser
    }

    async add(user: AddTimelyUser): Promise<TimelyUser> {
        const { data } = await this.http.post(`/${this.config.accountId}/users`, { user })
        return data
    }

    async update(userId: number, user: Partial<TimelyUser>): Promise<TimelyUser> {
        const { data } = await this.http.put(`/${this.config.accountId}/users${userId}`, { user })
        return data
    }

    async removeUserById(userId: number): Promise<{}> {
        const { data } = await this.http.delete(`/${this.config.accountId}/users/${userId}`)
        return data
    }

    async removeUserByEmail(userEmail: string): Promise<{}> {
        const user = await this.getByEmail(userEmail)
        if (!user) throw new Error(`failed to find user with email: ${userEmail}`)
        return await this.removeUserById(user.id as number)
    }

    async getRoles(): Promise<TimelyRole[]> {
        const { data } = await this.http.get(`/${this.config.accountId}/roles`)
        return data
    }

    async getUserCapacities(): Promise<TimelyUserCapacity[]> {
        const { data } = await this.http.get(`/${this.config.accountId}/users/capacities`)
        return data
    }

    async getUserCapacityById(userId: number): Promise<TimelyCapacity> {
        const { data } = await this.http.get(`/${this.config.accountId}/users/${userId}/capacities`)
        return data
    }

    async getUsersPermissions(): Promise<TimelyPermission[]> {
        const { data } = await this.http.get(`/${this.config.accountId}/users/current/permissions`)
        return data
    }

    async getUsersPermissionsById(userId: number): Promise<TimelyPermission[]> {
        const { data } = await this.http.get(
            `/${this.config.accountId}/users/${userId}/permissions`,
        )
        return data
    }
}
