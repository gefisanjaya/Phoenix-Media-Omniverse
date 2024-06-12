const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Register user
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = new User({
      username,
      password: bcrypt.hashSync(password, 10),
      role,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1d' });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login user

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Sertakan role dalam payload token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      'your_jwt_secret',
      { expiresIn: '1d' }
    );

    // Kirim respons dengan token dan role
    res.status(200).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Forgot password
exports.forgotPassword = async (req, res) => {
  // Implement forgot password functionality
};

// Reset password
exports.resetPassword = async (req, res) => {
  // Implement reset password functionality
};

// Confirm password
exports.confirmPassword = async (req, res) => {
  // Implement confirm password functionality
};

// Update password
exports.updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user || !bcrypt.compareSync(oldPassword, user.password)) {
      return res.status(401).json({ message: 'Invalid old password' });
    }

    user.password = bcrypt.hashSync(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
