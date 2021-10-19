const Materi = require('../models/materi');

const create = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.decoded.id;
  try {
    const result = await Materi.create({ title, content, user: userId });
    res.status(201).json({
      status: true,
      data: result,
    });
  } catch (e) {
    res.status(400).json({
      status: false,
      error: e.message,
    });
  }
};

module.exports = {
  create,
};
