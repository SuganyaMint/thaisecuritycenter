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

const getImageByCompanyId = async (req, res) => {
  try {
    let company_id = req.params.company_id;
    const result = await prisma.companyImage.findMany({
      where: {
        company_id: company_id,
      },
    });
    let imagePathPattern = path.join(
      __dirname,
      `../../uploads/company/${result.image}`
    );

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
    const result = await prisma.company.findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
    });

    const getAdress = await prisma.address.findMany();
    result.map((item) => {
      getAdress.map((item2) => {
        if (parseInt(item.district) === parseInt(item2.TambonID)) {
          item.district = item2.TambonThai;
          item.amphoe = item2.AmphoeThai;
          item.province = item2.ProvinceThai;
          item.zipcode = item2.PostCodeMain;
          item.TambonID = item2.TambonID;
          item.AmphoeID = item2.AmphoeID;
          item.ProvinceID = item2.ProvinceID;
        }
      });
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

const getCompanyById = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const result = await prisma.company.findUnique({
      where: {
        id: id,
      },
    });
    const getAdress = await prisma.address.findMany();
    getAdress.map((item) => {
      if (parseInt(result.district) === parseInt(item.TambonID)) {
        result.district = item.TambonThai;
        result.amphoe = item.AmphoeThai;
        result.province = item.ProvinceThai;
        result.zipcode = item.PostCodeMain;
        result.TambonID = item.TambonID;
        result.AmphoeID = item.AmphoeID;
        result.ProvinceID = item.ProvinceID;
      }
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
const changeStatusCompany = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let status = parseInt(req.body.status);
    const result = await prisma.company.update({
      where: {
        id: id,
      },
      data: {
        status: status,
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

const fixStart = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let star = parseInt(req.body.star);
    const result = await prisma.company.update({
      where: {
        id: id,
      },
      data: {
        star: star,
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
const getDataComIDImage = async (req, res) => {
  try {
    const company_id = req.params.company_id;
    const result = await prisma.companyImage.findMany({
      where: {
        company_id: company_id,
      },
    });
    result.sort((a, b) => a.id - b.id);
    result.sort((a, b) => a.order - b.order);

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
const getDataLogoImage = async (req, res) => {
  try {
    const result = await prisma.companyImage.findMany();
    //sort image by id
    result.sort((a, b) => a.company_id - b.company_id);
    result.sort((a, b) => a.id - b.id);
    result.sort((a, b) => a.order - b.order);

    //remove duplicate by company_id
    let distinct = [];
    let distinctCompany = [];
    for (let i = 0; i < result.length; i++) {
      if (distinctCompany.indexOf(result[i].company_id) === -1) {
        distinctCompany.push(result[i].company_id);
        distinct.push(result[i]);
      }
    }

    let datasend = [];
    const getCompany = await prisma.company.findMany();
    getCompany.map((item) => {
      distinct.map((item2) => {
        if (item.company_id === item2.company_id) {
          datasend.push({
            ...item2,
            ...item,
          });
        }
      });
    });

    //sort image by id
    datasend.sort((a, b) => b.id - a.id);

    res.json({
      status: true,
      message: "Success",
      data: datasend,
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

const changeHire = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let hire = parseInt(req.body.hire);
    const result = await prisma.company.update({
      where: {
        id: id,
      },
      data: {
        hire: hire,
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

const getCompanyClient = async (req, res) => {
  try {
    const result = await prisma.companyImage.findMany();
    //sort image by id
    result.sort((a, b) => a.company_id - b.company_id);
    result.sort((a, b) => a.id - b.id);
    result.sort((a, b) => a.order - b.order);

    //remove duplicate by company_id
    let distinct = [];
    let distinctCompany = [];
    for (let i = 0; i < result.length; i++) {
      if (distinctCompany.indexOf(result[i].company_id) === -1) {
        distinctCompany.push(result[i].company_id);
        distinct.push(result[i]);
      }
    }

    let datasend = [];
    const getCompany = await prisma.company.findMany({
      where: {
        status: 1,
      },
    });
    getCompany.map((item) => {
      distinct.map((item2) => {
        if (item.company_id === item2.company_id) {
          datasend.push({
            ...item2,
            ...item,
          });
        }
      });
    });

    const address = await prisma.address.findMany();

    datasend.map((item) => {
      address.map((item2) => {
        if (parseInt(item.district) === parseInt(item2.TambonID)) {
          item.fullAddress = `${item.address} ${item2.TambonThai} ${item2.AmphoeThai} ${item2.ProvinceThai} ${item2.PostCodeMain}`;
        }
      });
    });

    //sort image by id
    datasend.sort((a, b) => b.star - a.star);
    // console.log(datasend);
    //เอาเฉพาะ 20 อันดับแรก
    datasend = datasend.slice(0, 20);

    res.json({
      status: true,
      message: "Success",
      data: datasend,
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

const toptenCompany = async (req, res) => {
  try {
    const result = await prisma.companyImage.findMany();
    //sort image by id
    result.sort((a, b) => a.company_id - b.company_id);
    result.sort((a, b) => a.id - b.id);
    result.sort((a, b) => a.order - b.order);

    //remove duplicate by company_id
    let distinct = [];
    let distinctCompany = [];
    for (let i = 0; i < result.length; i++) {
      if (distinctCompany.indexOf(result[i].company_id) === -1) {
        distinctCompany.push(result[i].company_id);
        distinct.push(result[i]);
      }
    }

    let datasend = [];
    const getCompany = await prisma.company.findMany({
      take: 10,
      orderBy: {
        visited: "desc",
      },
      where: {
        status: 1,
      },
    });
    getCompany.map((item) => {
      distinct.map((item2) => {
        if (item.company_id === item2.company_id) {
          datasend.push({
            ...item2,
            ...item,
          });
        }
      });
    });

    //sort image by id
    datasend.sort((a, b) => b.visited - a.visited);

    res.json({
      status: true,
      message: "Success",
      data: datasend,
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
  changeStatusCompany,
  fixStart,
  getImageByCompanyId,
  getDataComIDImage,
  getDataLogoImage,
  changeHire,
  getCompanyClient,
  toptenCompany,
};
