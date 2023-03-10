const Utilities = require('../Utilities')
const User = require('../models/User')

class AuthController {

  /**
   * /api/users
   */
  async create(req, res) {
    try {
      const doesExist = await User.findOne({ email: req.body.email })
      if (doesExist) return Utilities.apiResponse(res, 422, 'Email is already been registered')
      const user = new User(req.body)
      const savedUser = await user.save()
      let data = {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email
      }
      Utilities.apiResponse(res, 200, 'User Created Successfully!', data)
    } catch (error) {
      Utilities.apiResponse(res, 500, error)
    }
  }

  /**
   * /api/users/id
   */
  async read(req, res) {
    try {
      let users = {}
      if (req.params.id) {
        users = await User.findOne({ _id: req.params.id })
      } else {
        users = await User.find()
      }
      Utilities.apiResponse(res, 200, 'Get User Details Successfully', users)
    } catch (error) {
      Utilities.apiResponse(res, 500, error)
    }
  }

  /**
   * /api/users/id
   */
  async update(req, res) {
    try {
      await User.findOneAndUpdate({ _id: req.params.id }, req.body)
      Utilities.apiResponse(res, 200, 'User Has Been Updated Successfully')
    } catch (error) {
      Utilities.apiResponse(res, 500, error)
    }
  }

  /**
   * /api/users/id
   */
  async delete(req, res) {
    try {
      await User.find({ _id: req.params.id }).remove().exec();
      Utilities.apiResponse(res, 200, 'User Deleted Successfully')
    } catch (error) {
      Utilities.apiResponse(res, 500, error)
    }
  }

}

module.exports = new AuthController();