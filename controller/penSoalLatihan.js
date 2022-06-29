const PenSoal = require("../models/penilaianSoal")

const addPenilaianSoal =  async (req, res) => {
    try{
        const payload = {
            answer: req.body.answer,
            soal: req.body.soal,
            user: req.decoded.id,
          };
          const isFound = await PenSoal.findOne({ user: req.decoded.id });
          if (isFound) {
            await PenSoal.deleteMany({user: req.decoded.id})
            const result = await PenSoal.create(payload)
            res.status(200).json({
                status: "success",
                message: "sukses add penilaian",
                data: result,
              });
          } else {
            const result = await PenSoal.create(payload)
            res.status(200).json({
                status: "success",
                message: "sukses add penilaian",
                data: result,
              });
          }
    }catch(err) {
        res.status(400).json({
            status: "error",
            message: err,
          });
    }
}

const getPenSoal = async (req, res) => {
    try {
      const user = req.decoded;
      if (user.role === "guru") {
        const result = await PenSoal.find({});
        if (result.length > 0) {
          res.status(200).json({
            status: "success",
            message: "sukses get data",
            data: result,
          });
        }
      } else {
        const result = await PenSoal.find({ user: req.decoded.id });
        if (result) {
        const formatResult = result;
            res.status(200).json({
              status: "success",
              message: "sukses get data",
              data: formatResult,
            });
        }
      }
    } catch (err) {
      res.status(400).json({
          code: 400,
        status: "error",
        message: err.message,
      });
    }
  };

module.exports = {
    addPenilaianSoal,
    getPenSoal
}
