import express from 'express'
import auth from '../../middlewares/auth'
import { validateRequest } from '../../middlewares/validateRequest'
import { blogControllers } from './blog.controller'
import { blogValidations } from './blog.validation'
const router = express.Router()

router.post(
  '/',
  auth(),
  validateRequest(blogValidations.blogValidationSchema),
  blogControllers.createBlog,
)
router.get('/', blogControllers.getAllBlog)
router.get('/:id', blogControllers.getSingleBlog)
router.delete('/:id', auth(), blogControllers.deleteBlog)
router.patch('/:id', auth(), blogControllers.updateBlog)

export const BlogRoutes = router
