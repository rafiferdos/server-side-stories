import { Router } from 'express'

const router = Router()

const moduleRoutes = [
  {
    path: "/auth/register",
    route: userRoutes,
  },
  {
    path: "/auth/login",
    route: AuthRoutes,
  },
  {
    path: "/blogs",
    route: blogRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
]

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
