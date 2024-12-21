import { Request, Response } from 'express'
import { BlogService } from './blog.services'

export const BlogController = {
  async createBlog(req: Request, res: Response) {
    const result = await BlogService.createBlog({
      author: req.user?._id,
      ...req.body,
    })
    res
      .status(201)
      .json({ success: true, message: 'Blog created', data: result })
  },

  async getAllBlogs(req: Request, res: Response) {
    const result = await BlogService.getAllBlogs()
    res.status(200).json({ success: true, message: 'All blogs', data: result })
  },

  async getBlogById(req: Request, res: Response) {
    const result = await BlogService.getBlogById(req.params.id)
    res
      .status(200)
      .json({ success: true, message: 'Single blog', data: result })
  },

  async updateBlog(req: Request, res: Response) {
    const result = await BlogService.updateBlog(req.params.id, req.body)
    res
      .status(200)
      .json({ success: true, message: 'Blog updated', data: result })
  },

  async deleteBlog(req: Request, res: Response) {
    const result = await BlogService.deleteBlog(req.params.id)
    res
      .status(200)
      .json({ success: true, message: 'Blog deleted', data: result })
  },
}
