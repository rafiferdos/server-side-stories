import { Router } from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import { BlogController } from './blog.controller'
import { createBlogZodSchema, updateBlogZodSchema } from './blog.validation'

const router = Router()

router.post(
  '/',
  validateRequest(createBlogZodSchema),
  BlogController.createBlog,
)
router.get('/', BlogController.getAllBlogs)
router.get('/:id', BlogController.getBlogById)
router.patch(
  '/:id',
  validateRequest(updateBlogZodSchema),
  BlogController.updateBlog,
)
router.delete('/:id', BlogController.deleteBlog)

export const BlogRoutes = router
