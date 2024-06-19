const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getPronvinces = async (req, res) => {
  try {
    const provinces = await prisma.address.findMany();
    const data = provinces.filter(
      (v, i, a) => a.findIndex((t) => t.ProvinceID === v.ProvinceID) === i
    );

    data.sort((a, b) => {
      const nameA = a.ProvinceThai.replace(/[^ก-ฮ]/g, "");
      const nameB = b.ProvinceThai.replace(/[^ก-ฮ]/g, "");
      return nameA.localeCompare(nameB);
    });

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

const getAmphoeByProvinceID = async (req, res) => {
  try {
    const ProvinceID = req.params.ProvinceID;
    const amphoes = await prisma.address.findMany({
      where: {
        ProvinceID: ProvinceID,
      },
    });
    const data = amphoes.filter(
      (v, i, a) => a.findIndex((t) => t.AmphoeID === v.AmphoeID) === i
    );
    data.sort((a, b) => {
      const nameA = a.AmphoeThai.replace(/[^ก-ฮ]/g, "");
      const nameB = b.AmphoeThai.replace(/[^ก-ฮ]/g, "");
      return nameA.localeCompare(nameB);
    });
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

const getTambonByAmphoeID = async (req, res) => {
  try {
    const AmphoeID = req.params.AmphoeID;
    const tambons = await prisma.address.findMany({
      where: {
        AmphoeID: AmphoeID,
      },
    });
    const data = tambons.filter(
      (v, i, a) => a.findIndex((t) => t.TambonID === v.TambonID) === i
    );
    data.sort((a, b) => {
      const nameA = a.TambonThai.replace(/[^ก-ฮ]/g, "");
      const nameB = b.TambonThai.replace(/[^ก-ฮ]/g, "");
      return nameA.localeCompare(nameB);
    });
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

const getAddressesByGeo = async (req, res) => {
  try {
    const { geocode } = req.params;
    const addresses = await prisma.address.findMany({
      where: {
        geocode: geocode,
      },
    });
    //remove duplicate by ProvinceID
    const data = addresses.filter(
      (v, i, a) => a.findIndex((t) => t.ProvinceID === v.ProvinceID) === i
    );
    const getCompany = await prisma.company.findMany({
      where: {
        status: 1,
      },
    });
    data.map((item) => {
      const count = getCompany.filter((v) => v.province === item.ProvinceID);
      item.count = count.length;
    });
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

const getNearBKK = async (req, res) => {
  try {
    const addresses = await prisma.address.findMany({
      where: {
        nearBKK: "1",
      },
    });

    //remove duplicate by ProvinceID
    const data = addresses.filter(
      (v, i, a) => a.findIndex((t) => t.ProvinceID === v.ProvinceID) === i
    );
    const getCompany = await prisma.company.findMany({
      where: {
        status: 1,
      },
    });
    data.map((item) => {
      const count = getCompany.filter((v) => v.province === item.ProvinceID);
      item.count = count.length;
    });
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

const getAmphoeInBKK = async (req, res) => {
  try {
    const addresses = await prisma.address.findMany({
      where: {
        ProvinceID: "10",
      },
    });
    //remove duplicate by AmphoeID
    const data = addresses.filter(
      (v, i, a) => a.findIndex((t) => t.AmphoeID === v.AmphoeID) === i
    );

    const getCompany = await prisma.company.findMany({
      where: {
        province: "10",
        status: 1,
      },
    });

    // console.log(getCompany);

    // นับ getCompany ตาม  AmphoeID  ใน data เช่น AmphoeID : 1 มี 5 บริษัท
    data.map((item) => {
      const count = getCompany.filter((v) => v.amphoe === item.AmphoeID);
      item.count = count.length;
    });
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

const getNameDetail = async (req, res) => {
  try {
    const TambonID = req.params.TambonID;
    const getAddress = await prisma.address.findMany({
      where: {
        TambonID: TambonID,
      },
    });

    const data = {
      TambonID: getAddress[0].TambonID,
      TambonThai: getAddress[0].TambonThai,
      AmphoeID: getAddress[0].AmphoeID,
      AmphoeThai: getAddress[0].AmphoeThai,
      ProvinceID: getAddress[0].ProvinceID,
      ProvinceThai: getAddress[0].ProvinceThai,
      PostCodeMain: getAddress[0].PostCodeMain,
    }

    res.json({
      status: true,
      message: "Success",
      data: data,
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
  getPronvinces,
  getAmphoeByProvinceID,
  getTambonByAmphoeID,
  getAddressesByGeo,
  getNearBKK,
  getAmphoeInBKK,
  getNameDetail
};
