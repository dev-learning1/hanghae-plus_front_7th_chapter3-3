import { fetchUser } from "@/entities/User/api/index.ts"
import { UserId } from "@/entities/User"
import { useQuery } from "@tanstack/react-query"

export const useQueryUser = (userId: UserId) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUser(userId),
  })
}
