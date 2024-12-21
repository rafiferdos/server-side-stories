import { RequestHandler } from 'express'
import { AuthServices } from './auth.services'

const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await AuthServices.loginUser(req.body)

    res.status(200).json({
      success: true,
      message: 'Login successful',
      statusCode: 200,
      data: {
        token: result?.accessToken,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const AuthControllers = {
  loginUser,
}
