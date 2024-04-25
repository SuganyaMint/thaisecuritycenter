const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const glob = require("glob");
const fs = require("fs");
const moment = require("moment");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/company/");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const getCompanyImage = async (req, res) => {
  try {
    let imageName = req.body.filename;
    let imagePathPattern = path.join(__dirname, `../../${imageName}`);

    glob(imagePathPattern, (err, files) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
        return;
      }

      if (files.length === 0) {
        res.status(404).json({ error: "Image not found" });
        return;
      }
      res.sendFile(files[0]);
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });
  }
};

const getCompany = async (req, res) => {
  try {
    const result = await prisma.company.findMany();
    res.json({
      status: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const result = await prisma.company.findUnique({
      where: {
        id: id,
      },
    });
    res.json({
      status: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });
  }
};

const createCompany = async (req, res) => {
  console.log(req.body);
  //   try {
  //     upload.single("file")(req, res, async (err) => {
  //       if (err) {
  //         console.log(err);
  //         res.json({
  //           status: false,
  //           message: "Error",
  //           error: err.message,
  //         });
  //       } else {
  //         const company_id = "COMPANY-" + moment().format("YYYYMMDDHHmm") + "-" + Math.floor(1000 + Math.random() * 9000);

  //         const result = await prisma.company.create({
  //           data: {
  //             company_id: company_id,
  //             company_name: req.body.company_name,
  //             status: parseInt(req.body.status),
  //             star: parseInt(req.body.star),
  //             description: req.body.description,
  //             detail: req.body.detail,
  //             keyword: req.body.keyword,
  //             address: req.body.address,
  //             district: req.body.district,
  //             amphoe: req.body.amphoe,
  //             province: req.body.province,
  //             zipcode: req.body.zipcode,
  //             laditude: req.body.laditude,
  //             longitude: req.body.longitude,
  //             phone: req.body.phone,
  //             mobile: req.body.mobile,
  //             visited: parseInt(req.body.visited),
  //             fax: req.body.fax,
  //             email: req.body.email,
  //             website: req.body.website,
  //             facebook: req.body.facebook,
  //             line: req.body.line,
  //             twitter: req.body.twitter,
  //             instagram: req.body.instagram,
  //             tiktok: req.body.tiktok,
  //             youtube: req.body.youtube,
  //             ip: req.body.ip,
  //             image: req.file.originalname,
  //             link: req.file.path,
  //           },
  //         });

  //         res.json({
  //           status: true,
  //           message: "Success",
  //           data: result,
  //         });
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.json({
  //       status: false,
  //       message: "Error",
  //       error: error.message,
  //     });
  //   }
};

const delelteCompanyById = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const result = await prisma.company.delete({
      where: {
        id: id,
      },
    });
    res.json({
      status: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });
  }
};

module.exports = {
  getCompanyImage,
  getCompany,
  getCompanyById,
  createCompany,
  delelteCompanyById,
};
