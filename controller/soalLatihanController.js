const SoalLatihan = require('../models/soalLatihan');

const create = async (req, res) => {
  const { title, questions, code } = req.body;
  const userId = req.decoded.id;
  console.log('save soal masuk', req.body)

  try {
    const result = await SoalLatihan.create({ title, questions, code, user: userId });
    console.log('save soal keluar', result)
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
        const result = await SoalLatihan.find({}).populate({path: 'user', select: 'name _id email'}).sort('-createdAt')
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
    const {title, questions, code} = req.body
    const _id = req.params.id
    try {
        const result = await SoalLatihan.updateOne({_id}, {title, questions, code})
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


const deleteSoalLatihan = async (req, res) => {
    const _id = req.params.id
    try {
        const result = await SoalLatihan.deleteOne({_id})
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
  deleteSoalLatihan
};
