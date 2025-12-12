import { Post } from "@/entities/Post"
import { atom, useAtom } from "jotai"

const selectedPostAtom = atom<Post | null>(null)

export const usePost = () => {
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)

  return new (class {
    selectedPost = selectedPost
    setSelectedPost = setSelectedPost
  })()
}
