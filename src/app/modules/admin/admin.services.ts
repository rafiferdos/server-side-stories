import AppError from '../../errors/AppError'
import { blogModel } from '../blog/blog.model'
import { userModel } from '../user/user.model'

///Make User Blocked
const makeUserBlockedIntoDBByAdmin = async (id: string) => {
  const targetUser = await userModel.findById(id)
  if (!targetUser) {
    throw new AppError(404, 'This User not exists')
  }

  // Need to explicitly set isBlocked
  const result = await userModel.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  )
  return result
}

//Delete Blog
const deleteBlogFromDBByAdmin = async (id: string) => {
  const targetBlog = await blogModel.findById(id)
  if (!targetBlog) {
    throw new AppError(404, 'This blog not exists')
  }
  const result = await blogModel.findByIdAndDelete(id)
  return result
}

export const adminServices = {
  makeUserBlockedIntoDBByAdmin,
  deleteBlogFromDBByAdmin,
}
