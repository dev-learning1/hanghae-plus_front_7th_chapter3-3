import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { postApi } from "../api"
import type { CreatePostDto, UpdatePostDto } from "@/shared/types"

export const POST_QUERY_KEY = "posts"

export const useQueryPosts = (params: { limit: number; skip: number; enabled?: boolean }) => {
  return useQuery({
    queryKey: [POST_QUERY_KEY, params.limit, params.skip],
    queryFn: () => postApi.getPosts(params),
    enabled: params.enabled !== false,
  })
}

export const useQueryPostsSearch = (query: string) => {
  return useQuery({
    queryKey: [POST_QUERY_KEY, "search", query],
    queryFn: () => postApi.searchPosts(query),
    enabled: !!query,
  })
}

export const useQueryPostsByTag = (tag: string) => {
  return useQuery({
    queryKey: [POST_QUERY_KEY, "tag", tag],
    queryFn: () => postApi.getPostsByTag(tag),
    enabled: !!tag && tag !== "all",
  })
}

export const useMutationPostAdd = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePostDto) => postApi.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POST_QUERY_KEY] })
    },
  })
}

export const useMutationPostUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePostDto }) => postApi.updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POST_QUERY_KEY] })
    },
  })
}

export const useMutationPostDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => postApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POST_QUERY_KEY] })
    },
  })
}
