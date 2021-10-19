const User = require('../models/user');
const { generateToken, verifyToken } = require('../helper/token');
const { verifyPassword } = require('../helper/hash');

const Register = async (req, res) => {
  try {
    const { email, name, password, role } = req.body;
    const result = await User.create({ email, name, password, role });
    const token = await generateToken({
      id: result.id,
      email: result.email,
    });
    res.status(201).json({
      status: true,
      message: 'Success Register',
      token: token,
    });
  } catch (e) {
    res.status(400).json({
      status: false,
      message: 'error register',
      error: JSON.stringify(e.message),
    });
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    if (!userData || !verifyPassword(password, userData.password)) {
      res.status(400).json({
        status: false,
        message: 'error login',
        error: 'User / Password is Not matching',
      });
    } else {
      const token = await generateToken({
        id: userData.id,
        email: userData.email,
      });

      res.status(200).json({
        status: true,
        message: 'Success Login',
        token: token,
      });
    }
  } catch (e) {
    console.log('error logiiin', JSON.stringify(e.message));
    res.status(400).json({
      status: false,
      message: 'error login',
      error: JSON.stringify(e.message),
    });
  }
};

const getUser = async (req, res) => {
  try {
    const resultToken = verifyToken(req.headers.token);
    const userData = await User.findOne({ id: resultToken.id });
    // console.log('verify token',userData)
    res.status(200).json({
      status: true,
      data: userData,
    });
  } catch (e) {
    console.log('error getuser', JSON.stringify(e.message));
    res.status(400).json({
      status: false,
      message: 'error get user',
      error: JSON.stringify(e.message),
    });
  }
};

module.exports = {
  Register,
  Login,
  getUser,
};
