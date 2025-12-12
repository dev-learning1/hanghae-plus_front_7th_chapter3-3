import { Comment, CommentId, CommentInput, CommentsOfPost } from "@/entities/Comment"
import { PostId } from "@/entities/Post"
import ky from "ky"

export function fetchCommentsByPostId(postId: PostId): Promise<CommentsOfPost> {
  return ky.get(`/api/comments/post/${postId}`).json()
}

export function addComment(comment: CommentInput): Promise<Comment> {
  return ky.post("/api/comments/add", { json: comment }).json()
}

export function deleteComment(id: CommentId): Promise<void> {
  return ky.delete(`/api/comments/${id}`).json()
}

export function patchComment(postId: PostId, comment: Partial<Comment>): Promise<Comment> {
  return ky.patch(`/api/comments/${postId}`, { json: comment }).json()
}
