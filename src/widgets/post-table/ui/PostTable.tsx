import { useState } from "react"
import { Edit2, MessageSquare, Trash2 } from "lucide-react"
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui"
import { PostCard } from "@/entities/post/ui/PostCard"
import { PostEditDialog } from "@/features/post-edit/ui/PostEditDialog"
import { useMutationPostDelete } from "@/entities/post/model/usePost"
import { highlightText } from "@/shared/lib/highlight"
import { useAtom } from "jotai"
import { searchQueryAtom, selectedTagAtom } from "@/features/post-search/model/store"
import type { Post } from "@/shared/types"

interface PostTableProps {
  posts: Post[]
  onPostDetail: (post: Post) => void
  onUserClick: (userId: number) => void
}

export const PostTable = ({ posts, onPostDetail, onUserClick }: PostTableProps) => {
  const [searchQuery] = useAtom(searchQueryAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)
  const [editPost, setEditPost] = useState<Post | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const { mutate: deletePost } = useMutationPostDelete()

  const handleEdit = (post: Post) => {
    setEditPost(post)
    setShowEditDialog(true)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>제목</TableHead>
            <TableHead className="w-[150px]">작성자</TableHead>
            <TableHead className="w-[150px]">반응</TableHead>
            <TableHead className="w-[150px]">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>
                <PostCard
                  post={post}
                  onTagClick={setSelectedTag}
                  onAuthorClick={() => onUserClick(post.userId)}
                  highlightText={highlightText}
                  searchQuery={searchQuery}
                  selectedTag={selectedTag}
                />
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onPostDetail(post)}>
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(post)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PostEditDialog post={editPost} open={showEditDialog} onOpenChange={setShowEditDialog} />
    </>
  )
}
