const Materi = require('../models/materi');

const create = async (req, res) => {
  const { title, content, code } = req.body;
  const userId = req.decoded.id;
  try {
    const result = await Materi.create({ title,code, content, user: userId });
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

const getAll = async (req, res) => {
    try {
        const result = await Materi.find({}).populate({path: 'user', select: 'name _id email'}).sort('-createdAt')
        res.status(200).json({
            status: true,
            data: result,
          });

    } catch (e) {
        res.status(400).json({
          status: false,
          error: e.message,
        });
      }
}

const update = async (req, res) => {
    const {title, content, code} = req.body
    const _id = req.params.id
    try {
        const result = await Materi.updateOne({_id}, {title, content, code})
        res.status(200).json({
            status: true,
            data: result,
          });

    }catch(e) {
        res.status(400).json({
            status: false,
            error: e.message,
          });

    }
}


const deleteMateri = async (req, res) => {
    const _id = req.params.id
    try {
        const result = await Materi.deleteOne({_id})
        res.status(200).json({
            status: true,
            data: result,
          });

    }catch(e) {
        res.status(400).json({
            status: false,
            error: e.message,
          });

    }
}
module.exports = {
  create,
  getAll,
  update,
  deleteMateri
};
