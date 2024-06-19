const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");

const createContact_me = async (req, res) => {
  try {
    let ip = req.clientIp;
    // Check if the IP address is IPv6 loopback and convert to IPv4 loopback
    if (ip === "::1") {
      ip = "127.0.0.1";
    }


    const result = await prisma.contact_me.create({
      data: {
        company: req.body.company,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        detail: req.body.detail,
        ip: ip
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

const getContact_me = async (req, res) => {
  try {
    const result = await prisma.contact_me.findMany();
    const formattedData = result.map(item => ({
      ...item,
      createdAt: moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") // เปลี่ยนรูปแบบวันที่
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

const getContact_meById = async (req, res) => {
  try {
    const result = await prisma.contact_me.findUnique({
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
}

module.exports = {
  createContact_me,
  getContact_me,
  getContact_meById,
};
