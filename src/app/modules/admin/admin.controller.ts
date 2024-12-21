/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express'
import AppError from '../../errors/AppError'
import { adminServices } from './admin.services'

//make user blocked
const makeUserBlockByAdmin: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.params.userId
    const result = await adminServices.makeUserBlockedIntoDBByAdmin(userId)

    if (!result) {
      throw new AppError(400, 'Failed to block user')
    }

    res.status(200).json({
      success: true,
      message: 'User blocked successfully',
      statusCode: 200,
    })
  } catch (error) {
    next(error)
  }
}
//Delete Blog
const deleteBlogByAdmin: RequestHandler = async (req, res, next) => {
  try {
    const id = req?.params?.id
    const result = adminServices.deleteBlogFromDBByAdmin(id)
    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
    })
  } catch (error) {
    next(error)
  }
}

export const adminControllers = {
  makeUserBlockByAdmin,
  deleteBlogByAdmin,
}
