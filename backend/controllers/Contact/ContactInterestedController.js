const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");

const createContact_In = async (req, res) => {
  try {
    const result = await prisma.register_log.create({
      data: {
        company_id: req.body.company_id,
        type: req.body.type,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        detail: req.body.detail,
        ip: req.body.ip == undefined ? "" : req.body.ip,
        status: 'รอติดต่อกลับ',
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

const getContact_In = async (req, res) => {
  try {
    const result = await prisma.register_log.findMany();
    const formattedData = result.map((item) => ({
      ...item,
      createdAt: moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss"), // เปลี่ยนรูปแบบวันที่
    }));
    res.json({
      status: true,
      message: "Success",
      data: formattedData,
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

const getContact_InById = async (req, res) => {
  try {
    const result = await prisma.register_log.findUnique({
      where: {
        id: parseInt(req.params.id),
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


const deleteContact_In = async (req, res) => {
  try {
    const result = await prisma.register_log.delete({
      where: {
        id: parseInt(req.params.id),
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
  createContact_In,
  getContact_In,
  getContact_InById,
  deleteContact_In
};
