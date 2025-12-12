import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { commentApi } from "../api"
import type { CreateCommentDto, UpdateCommentDto } from "@/shared/types"

export const COMMENT_QUERY_KEY = "comments"

export const useQueryComments = (postId: number | null) => {
  return useQuery({
    queryKey: [COMMENT_QUERY_KEY, postId],
    queryFn: () => commentApi.getComments(postId!),
    enabled: !!postId,
  })
}

export const useMutationCommentAdd = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCommentDto) => commentApi.createComment(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [COMMENT_QUERY_KEY, data.postId] })
    },
  })
}

export const useMutationCommentUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCommentDto; postId: number }) =>
      commentApi.updateComment(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [COMMENT_QUERY_KEY, variables.postId] })
    },
  })
}

export const useMutationCommentDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: number; postId: number }) => commentApi.deleteComment(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [COMMENT_QUERY_KEY, variables.postId] })
    },
  })
}

export const useMutationCommentLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number; postId: number }) =>
      commentApi.likeComment(id, likes),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [COMMENT_QUERY_KEY, variables.postId] })
    },
  })
}
