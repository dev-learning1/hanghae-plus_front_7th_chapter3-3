import { apiClient } from "@/shared/api/client"
import type { Post, PostsResponse, CreatePostDto, UpdatePostDto, User } from "@/shared/types"

const API_BASE = "/api"

export const postApi = {
  async getPosts(params: { limit: number; skip: number }): Promise<PostsResponse> {
    const postsData = await apiClient.get<PostsResponse>(`${API_BASE}/posts?limit=${params.limit}&skip=${params.skip}`)

    const usersData = await apiClient.get<{ users: User[] }>(`${API_BASE}/users?limit=0&select=username,image`)

    const postsWithUsers = postsData.posts.map((post) => ({
      ...post,
      author: usersData.users.find((user) => user.id === post.userId),
    }))

    return {
      ...postsData,
      posts: postsWithUsers,
    }
  },

  async searchPosts(query: string): Promise<PostsResponse> {
    return apiClient.get<PostsResponse>(`${API_BASE}/posts/search?q=${query}`)
  },

  async getPostsByTag(tag: string): Promise<PostsResponse> {
    const postsData = await apiClient.get<PostsResponse>(`${API_BASE}/posts/tag/${tag}`)

    const usersData = await apiClient.get<{ users: User[] }>(`${API_BASE}/users?limit=0&select=username,image`)

    const postsWithUsers = postsData.posts.map((post) => ({
      ...post,
      author: usersData.users.find((user) => user.id === post.userId),
    }))

    return {
      ...postsData,
      posts: postsWithUsers,
    }
  },

  async createPost(data: CreatePostDto): Promise<Post> {
    return apiClient.post<Post>(`${API_BASE}/posts/add`, data)
  },

  async updatePost(id: number, data: UpdatePostDto): Promise<Post> {
    return apiClient.put<Post>(`${API_BASE}/posts/${id}`, data)
  },

  async deletePost(id: number): Promise<void> {
    return apiClient.delete(`${API_BASE}/posts/${id}`)
  },
}
