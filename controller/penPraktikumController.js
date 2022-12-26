const PenPraktikum = require("../models/penilaianPraktikum");
const os = require("os");
const fs = require("fs");
const path = require("path");

const addPenilaianPraktikumOld = async (req, res) => {
  try {
    const payload = {
      answer: req.file.filename,
      praktikum: req.body.praktikumId,
      user: req.decoded.id,
    };
    const isFound = await PenPraktikum.findOne({ user: req.decoded.id, praktikum: req.body.praktikumId });
    if (isFound) {
      await fs.unlinkSync(path.join(__dirname, `../upload/${isFound.answer}`));
      await PenPraktikum.deleteMany({ user: req.decoded.id });
      const result = await PenPraktikum.create(payload);
      res.status(200).json({
        status: "success",
        message: "sukses add data",
        data: result,
        host: os.hostname(),
      });
    } else {
      const result = await PenPraktikum.create(payload);
      res.status(200).json({
        status: "success",
        message: "sukses add data",
        data: result,
        host: os.hostname(),
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

const addPenilaianPraktikum =  async (req, res) => {
  try{
      const payload = {
          answer: req.body.answer,
          praktikum: req.body.praktikum,
          user: req.decoded.id,
        };
        const isFound = await PenPraktikum.findOne({ user: req.decoded.id, praktikum: payload.praktikum });
        
        if (isFound) {
          await PenPraktikum.deleteMany({user: req.decoded.id})
          const result = await PenPraktikum.create(payload)
          res.status(200).json({
              status: "success",
              message: "sukses add penilaian",
              data: result,
            });
        } else {
          const result = await PenPraktikum.create(payload)
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

// const getPenPraktikum = async (req, res) => {
//   try {
//     const user = req.decoded;
//     if (user.role === "guru") {
//       const result = await PenPraktikum.find({});
//       if (result.length > 0) {
//         const formatResult = result.map((item) => {
//           item.answer = req.get("host") + "/file/" + item.answer;
//           return item;
//         });
//         res.status(200).json({
//           status: "success",
//           message: "sukses add data",
//           host: req.get("host"),
//           data: formatResult,
//         });
//       }
//     } else {
//       const result = await PenPraktikum.find({ user: req.decoded.id });
//       if (result) {
//         const formatResult = result;
//         formatResult.answer = req.get("host") + "/file/" + result.answer;
//           res.status(200).json({
//             status: "success",
//             message: "sukses add data",
//             host: req.get("host"),
//             data: formatResult,
//           });
//       }
//     }
//   } catch (err) {
//     res.status(400).json({
//         code: 400,
//       status: "error",
//       message: err.message,
//     });
//   }
// };


const getPenilaianPraktikum = async (req, res) => {
  console.log("req.params.praktikum id]", req.params.praktikumId)
    try {
      const user = req.decoded;
      if (user.role === "guru") {
        const result = await PenPraktikum.find({praktikum: req.params.praktikumId}).populate('praktikum').populate("user").sort({
          createdAt: "desc"
        });
        console.log("result", result)
        if (result) {
          res.status(200).json({
            status: "success",
            message: "sukses get data",
            data: result,
          });
        }
      } else {
        const result = await PenPraktikum.find({ user: req.decoded.id, praktikum: req.params.praktikumId });
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

  const submitScorePraktikum = async(req, res) => {
    try{
      const user = req.decoded;
      if (user.role  !== "guru") {
        throw new Error('not authorized')
      } else {
        const result = await PenPraktikum.updateOne({_id:req.params.id}, {score: req.body.score})
        res.status(200).json({
          status: "success",
          message: "sukses submit score",
          data: result,
        });
      }
  
    }catch(err) {
      res.status(400).json({
        code: 400,
      status: "error",
      message: err.message,
    });
    }
  }

  const deletePenPraktikum = async(req, res) => {
    try{
      const user = req.decoded;
      if (user.role  !== "guru") {
        throw new Error('not authorized')
      } else {
        const result = await PenPraktikum.deleteOne({_id: req.params.id})
        res.status(200).json({
          status: "success",
          message: "sukses delete data",
          data: result,
        });
      }
  
    }catch(err) {
      res.status(400).json({
        code: 400,
      status: "error",
      message: err.message,
    });
    }
  }


module.exports = {
  addPenilaianPraktikum,
  getPenilaianPraktikum,
  submitScorePraktikum,
  deletePenPraktikum
};
