import { apiClient } from "@/shared/api/client"
import type { User } from "@/shared/types"

const API_BASE = "/api"

export const userApi = {
  async getUser(id: number): Promise<User> {
    return apiClient.get<User>(`${API_BASE}/users/${id}`)
  },
}
