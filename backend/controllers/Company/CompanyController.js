const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");
const glob = require("glob");
const fs = require("fs");
const moment = require("moment");

// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "uploads/company/");
//   },
//   filename: function (req, file, callback) {
//     callback(
//       null,
//       file.originalname.split(".")[0] +
//       "-" +
//       Date.now() +
//       path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage: storage });

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/company/');
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname)
    );
  }
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
  try {

    const company_id = "COMPANY-" + moment().format("YYYYMMDDHHmm") + "-" + Math.floor(1000 + Math.random() * 9000);

    const result = await prisma.company.create({
      data: {
        company_id: company_id,
        company_name: req.body.company_name,
        status: 0,
        star: 0,
        description: "",
        detail: "",
        keyword: req.body.keyword,
        address: req.body.address,
        district: req.body.district,
        amphoe: req.body.amphoe,
        province: req.body.province,
        zipcode: req.body.zipcode,
        laditude: "",
        longitude: "",
        phone: req.body.phone,
        mobile: req.body.mobile,
        visited: 0,
        fax: req.body.fax,
        email: req.body.email,
        website: req.body.website,
        facebook: req.body.facebook,
        line: req.body.line,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        tiktok: req.body.tiktok,
        youtube: req.body.youtube,
        ip: req.body.ip,
        IFrame_Google: "",
        hire: 0,
        approveDate: '',
        member_id: req.body.member_id,
        statusApprove: "0"
      },
    });

    res.json({
      status: true,
      message: "Success",
      data: result,
    });
  }
  catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });


  }
};

const updateMap = async (req, res) => {
  try {
    let company_id = req.params.company_id
    const result = await prisma.company.update({
      where: {
        company_id: company_id,
      },
      data: {
        laditude: String(req.body.laditude),
        longitude: String(req.body.longitude),
      },
    });
    console
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

}

const getCompanyByMemberId = async (req, res) => {
  try {
    let member_id = req.params.member_id
    const result = await prisma.company.findMany({
      where: {
        member_id: member_id,
      },
    });
    res.json({
      status: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });
  }

}


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

const getCompanyByAmphoe = async (req, res) => {
  try {
    let amphoe = req.params.amphoe;
    const result = await prisma.company.findMany({
      where: {
        amphoe: amphoe,
        status: 1,
      },
    });


    const getImage = await prisma.companyImage.findMany();
    let dataArr = [];

    result.map((item) => {
      getImage.map((item2) => {
        if (item.company_id === item2.company_id) {
          dataArr.push({
            ...item,
            ...item2,
          })
        }
      });
    }
    );


    let dataSend = []
    const getAdress = await prisma.address.findMany();
    dataArr.map((item) => {
      getAdress.map((item2) => {
        if (item.amphoe === item2.AmphoeID) {
          dataSend.push({
            ...item,
            TambonID: item2.TambonID,
            TambonThai: item2.TambonThai,
            TambonEng: item2.TambonEng,
            AmphoeID: item2.AmphoeID,
            AmphoeThai: item2.AmphoeThai,
            AmphoeEng: item2.AmphoeEng,
            ProvinceID: item2.ProvinceID,
            ProvinceThai: item2.ProvinceThai,
            ProvinceEng: item2.ProvinceEng,
            Region: item2.Region,
            PostCodeMain: item2.PostCodeMain,
            geocode: item2.geocode,
            geoName: item2.geoName,
            nearBKK: item2.nearBKK,

          })
        }
      });
    }
    );

    //remove duplicate by company_id
    const data = dataSend.filter(
      (v, i, a) => a.findIndex((t) => t.company_id === v.company_id) === i
    );


    res.json({
      status: true,
      message: "Success",
      data: data,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });
  }
};

const getCompanyByProvince = async (req, res) => {
  try {
    let province = req.params.province;
    const result = await prisma.company.findMany({
      where: {
        province: province,
        status: 1,
      },
    });

    const getImage = await prisma.companyImage.findMany();


    let dataArr = [];

    result.map((item) => {
      getImage.map((item2) => {
        if (item.company_id === item2.company_id) {
          dataArr.push({
            ...item,
            ...item2,
          })
        }
      });
    }
    );

    //remove duplicate by company_id
    const data = dataArr.filter(
      (v, i, a) => a.findIndex((t) => t.company_id === v.company_id) === i
    );
    res.json({
      status: true,
      message: "Success",
      data: data,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });
  }
}


const getCompany_COMPANYID = async (req, res) => {
  try {
    let company_id = req.params.company_id;
    const
      result = await prisma.company.findUnique({
        where: {
          company_id: company_id,
        },
      });
    res.json({
      status: true,
      message: "Success",
      data: result,
    });

  } catch (error) {
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });

  }
}

const updateDescription = async (req, res) => {
  try {
    let company_id = req.params.company_id;
    const result = await prisma.company.update({
      where: {
        company_id: company_id,
      },
      data: {
        description: req.body.description,
        detail: req.body.detail,

      },
    });
    res.json({
      status: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Error",
      error: error.message,
    });
  }
};
const updateAllImage = async (req, res) => {
  try {
    upload.array('files', 10)(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.json({
          status: false,
          message: 'Error',
          error: err.message
        });
      } else {
        const results = [];

        for (const file of req.files) {
          const result = await prisma.companyImage.create({
            data: {
              image: file.originalname,
              link: file.path,
              order: parseInt(req.body.order),
              status: parseInt(req.body.status),
              company_id: req.params.company_id // Assuming company_id is passed as a parameter
            }
          });
          results.push(result);
        }

        res.json({
          status: true,
          message: 'Success',
          data: results
        });
      }


    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: 'Error',
      error: error.message
    });
  }
};


const deleteImageByID = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const result = await prisma.companyImage.delete({
      where: {
        id: id,
      },
    });
    const path = result.link;
    fs.unlinkSync(path);

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

const updateOneImageCompany = async (req, res) => {
  try {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        console.log(err);
        res.json({
          status: false,
          message: "Error",
          error: err.message,
        });
      } else {
        const getOld = await prisma.companyImage.findUnique({
          where: {
            id: parseInt(req.params.id),

          },
        });
        const path = getOld.link;
        fs.unlinkSync(path);

        const result = await prisma.companyImage.update({
          where: {
            id: parseInt(req.params.id),
          },
          data: {
            title: req.body.title,
            image: req.file.originalname,
            link: req.file.path,
          },
        });
        res.json({
          status: true,
          message: "Success",
          data: result,
        });
      }
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

const updateDetail = async (req, res) => {
  try {
    const company_id = req.params.company_id;
    const result = await prisma.company.update({
      where: {
        company_id: company_id,
      },
      data: {
        company_name: req.body.company_name,
        keyword: req.body.keyword,
        address: req.body.address,
        province: req.body.province,
        amphoe: req.body.amphoe,
        district: req.body.district,
        zipcode: req.body.zipcode,
        phone: req.body.phone,
        mobile: req.body.mobile,
        fax: req.body.fax,
        email: req.body.email,
        website: req.body.website,
        facebook: req.body.facebook,
        line: req.body.line,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        tiktok: req.body.tiktok,
        youtube: req.body.youtube,
        ip: req.body.ip,
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
}




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
  getCompanyByAmphoe,
  getCompanyByProvince,
  updateMap,
  getCompanyByMemberId,
  getCompany_COMPANYID,
  updateDescription,
  updateAllImage,
  deleteImageByID,
  updateOneImageCompany,
  updateDetail
};
