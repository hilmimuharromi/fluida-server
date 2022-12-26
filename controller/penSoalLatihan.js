const PenSoal = require("../models/penilaianSoal")
const Soal = require('../models/soalLatihan')
const addPenilaianSoal =  async (req, res) => {
    try{
        const payload = {
            answer: req.body.answer,
            soal: req.body.soal,
            user: req.decoded.id,
          };
          await Soal.findById(req.body.soal)
          .then((res) => {
            let totalTrue = 0
            console.log('resss', res) 
            res.questions.map((item) => {
              console.log('itemmm', item)
              const userAnswer = payload.answer.find((i) => i.key === item.key)
              if(userAnswer) {
                const trueAnswer = item.options.find((o) => o.key === userAnswer.selectedOption && o.isTrue)
                if(trueAnswer) {
                  totalTrue +=1
                }
              }
            })
            let score = totalTrue /(res.questions.length/100)
            payload.score = score.toFixed()
          })
          const isFound = await PenSoal.findOne({ user: req.decoded.id, soal: req.body.soal });
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
  console.log("req.params.soalId", req.params.soalId)
    try {
      const user = req.decoded;
      if (user.role === "guru") {
        const result = await PenSoal.find({soal: req.params.soalId}).populate('soal').populate("user").sort({
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
        const result = await PenSoal.find({ user: req.decoded.id, soal: req.params.soalId });
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

const submitScore = async(req, res) => {
  try{
    const user = req.decoded;
    if (user.role  !== "guru") {
      throw new Error('not authorized')
    } else {
      const result = await PenSoal.updateOne({_id:req.params.id}, {score: req.body.score})
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

const deletePenSoal = async(req, res) => {
  try{
    const user = req.decoded;
    if (user.role  !== "guru") {
      throw new Error('not authorized')
    } else {
      const result = await PenSoal.deleteOne({_id: req.params.id})
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
    addPenilaianSoal,
    getPenSoal,
    deletePenSoal,
    submitScore
}
