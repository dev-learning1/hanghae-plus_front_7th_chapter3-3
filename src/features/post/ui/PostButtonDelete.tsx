// features/post/ui
import { useMutationPostDelete } from "@/entities/Post/api/useMutationPostDelete.ts"
import { Button } from "@/shared/ui"
import type { Post } from "@/entities/Post"
import { Trash2 } from "lucide-react"

export function PostButtonDelete({ post }: { post: Post }) {
  const { mutate: deletePost } = useMutationPostDelete()

  // 게시물 삭제
  function handlePostDelete(post: Post) {
    deletePost(post.id)
  }

  return (
    <Button variant="ghost" size="sm" onClick={() => handlePostDelete(post)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
