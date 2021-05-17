import { AxiosInstance } from 'axios'
import {
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
        return this.http.get(`/${this.config.accountId}/users?limit=1000`)
    }

    async getById(userId: number): Promise<TimelyUser> {
        return this.http.get(`/${this.config.accountId}/users/${userId}`)
    }

    async getByEmail(userEmail: string): Promise<TimelyUser> {
        const { data: response }: { data: TimelyUser[] } = await this.http.get(
            `/${this.config.accountId}/users?limit=999`,
        )
        const user = response.find((u) => u.email === userEmail)
        if (!user) throw new Error(`Can't find user with email of ${userEmail}`)
        return user
    }

    async add(user: TimelyUser): Promise<TimelyUser> {
        return this.http.post(`/${this.config.accountId}/users`, user)
    }

    async update(userId: number, user: TimelyUser): Promise<TimelyUser> {
        return this.http.put(`/${this.config.accountId}/users${userId}`, user)
    }

    async removeUserById(userId: number): Promise<{}> {
        return this.http.delete(`/${this.config.accountId}/users/${userId}`)
    }

    async removeUserByEmail(userEmail: string): Promise<{}> {
        const user = await this.getByEmail(userEmail)
        if (!user) throw new Error(`failed to find user with email: ${userEmail}`)
        return await this.removeUserById(user.id as number)
    }

    async getRoles(): Promise<TimelyRole[]> {
        return this.http.get(`/${this.config.accountId}/roles`)
    }

    async getUserCapacities(): Promise<TimelyUserCapacity[]> {
        return this.http.get(`/${this.config.accountId}/users/capacities`)
    }

    async getUserCapacityById(userId: number): Promise<TimelyCapacity> {
        return this.http.get(`/${this.config.accountId}/users/${userId}/capacities`)
    }

    async getUsersPermissions(): Promise<TimelyPermission[]> {
        return this.http.get(`/${this.config.accountId}/users/current/permissions`)
    }

    async getUsersPermissionsById(userId: number): Promise<TimelyPermission[]> {
        return this.http.get(`/${this.config.accountId}/users/${userId}/permissions`)
    }
}
