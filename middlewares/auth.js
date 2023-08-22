import passport from 'passport'
import jsonwebtoken from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

export const login = (req, res, next) => {
  passport.authenticate('login', { session: false }, (error, user, info) => {
    if (error || !user) {
      if (info.message === 'Missing credentials') {
        info.message = '欄位錯誤'
      }
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: info.message
      })
    }
    req.user = user
    next()
  })(req, res, next)
}

export const jwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, data, info) => {
    if (error || !data) {
      if (info instanceof jsonwebtoken.JsonWebTokenError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: 'JWT 錯誤'
        })
      } else {
        if (info.message === 'No auth token') {
          info.message = '缺少 JWT'
        }
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: info.message || '錯誤'
        })
      }
    }
    req.user = data.user
    req.token = data.token
    next()
  })(req, res, next)
}
