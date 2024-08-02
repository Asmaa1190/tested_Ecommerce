
import { User } from '../../database/models/user.model.js'
import { appError } from '../modules/utils/appError.js'

export const checkEmail = async (req, res, next) => {
    let isExist = await User.findOne({ email: req.body.email })
    if (isExist)return next(new appError("email already exsist",409))
        next()
}
