const PenProyek = require("../models/penilaianProyek");
const os = require("os");
const fs = require("fs");
const path = require("path");

const addPenProyek = async (req, res) => {
    try {
      const payload = {
        answer: req.file.filename,
        proyek: req.params.proyekId,
        user: req.decoded.id,
      };
    //   const isFound = await PenProyek.findOne({ user: req.decoded.id, proyek: req.body.proyek });
    //   if (isFound) {
    //     await fs.unlinkSync(path.join(__dirname, `../upload/${isFound.answer}`));
    //     await PenProyek.deleteMany({ user: req.decoded.id });
    //     const result = await PenProyek.create(payload);
    //     res.status(200).json({
    //       status: "success",
    //       message: "sukses add data",
    //       data: result,
    //       host: os.hostname(),
    //     });
    //   } else {
        const result = await PenProyek.create(payload);
        res.status(200).json({
          status: "success",
          message: "sukses add data",
          data: result,
          host: os.hostname(),
        });
    //   }
    } catch (err) {
      res.status(400).json({
        status: "error",
        message: err,
      });
    }
  };

const getPenProyek = async (req, res) => {
      try {
        const user = req.decoded;
        if (user.role === "guru") {
          const result = await PenProyek.find({proyek: req.params.proyekId}).populate('proyek').populate("user").sort({
            createdAt: "desc"
          });
          console.log('masuk sini', result)
          if (result.length > 0) {
            const formatResult = result.map((item) => {
              item.answer = process.env.CURRENT_URL + "/file/" + item.answer;
              return item;
            });
            console.log('format result', formatResult)
            res.status(200).json({
              status: "success",
              message: "sukses get data",
              data: formatResult,
            });
          } else {
            res.status(200).json({
                status: "success",
                message: "sukses get data",
                data: [],
              });
          }
        } else {
          const result = await PenProyek.find({ user: req.decoded.id }).populate('proyek').populate("user").sort({
            createdAt: "desc"
          });
          if (result) {
            const formatResult = result.map((item) => {
                item.answer = process.env.CURRENT_URL + "/file/" + item.answer;
                return item
            })
              res.status(200).json({
                status: "success",
                message: "sukses add data",
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


    const submitScoreProyek = async(req, res) => {
      try{
        const user = req.decoded;
        if (user.role  !== "guru") {
          throw new Error('not authorized')
        } else {
          const result = await PenProyek.updateOne({_id:req.params.id}, {score: req.body.score})
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
  
    const deletePenProyek = async(req, res) => {
      try{
        const user = req.decoded;
        if (user.role  !== "guru") {
          throw new Error('not authorized')
        } else {
          const result = await PenProyek.deleteOne({_id: req.params.id})
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
   addPenProyek,
   getPenProyek,
   submitScoreProyek,
   deletePenProyek
  };