import { Router } from 'express'
import { AdminRoutes } from '../modules/admin/admin.route'
import { AuthRoutes } from '../modules/Auth/auth.routes'
import { BlogRoutes } from '../modules/blog/blog.route'
import { userRoutes } from '../modules/user/user.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth/register',
    route: userRoutes,
  },
  {
    path: '/auth/login',
    route: AuthRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
]

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
