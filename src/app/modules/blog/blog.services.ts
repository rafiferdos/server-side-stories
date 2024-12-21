import { IBlog } from './blog.interface'
import { Blog } from './blog.model'

export const BlogService = {
  async createBlog(payload: IBlog) {
    return await Blog.create(payload)
  },

  async getAllBlogs() {
    return await Blog.find()
  },

  async getBlogById(id: string) {
    return await Blog.findById(id)
  },

  async updateBlog(id: string, payload: Partial<IBlog>) {
    return await Blog.findByIdAndUpdate(id, payload, { new: true })
  },

  async deleteBlog(id: string) {
    return await Blog.findByIdAndDelete(id)
  },
}
