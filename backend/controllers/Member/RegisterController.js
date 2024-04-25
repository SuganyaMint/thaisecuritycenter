const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");
const bcrypt = require("bcrypt");

const register_member = async (req, res) => {
  try {
    const { email, password, name, surname, ip, phone } = req.body;
    let hashPassword = await bcrypt.hash(password, 10);
    let checkUserName = await prisma.member.findMany({
      where: {
        email: email,
      },
    });
    if (checkUserName.length > 0) {
      res.json({
        status: false,
        message: "User name already exists",
      });
      return;
    }
    const member_id =
      "MEM" +
      moment().format("YYYYMMDDHHmm") +
      "-" +
      Math.floor(1000 + Math.random() * 9000);
    let user = await prisma.member.create({
      data: {
        member_id: member_id,
        email: email,
        password: hashPassword,
        name: name,
        surname: surname,
        ip: ip == undefined ? "" : ip,
        phone: phone == undefined ? "" : phone,
        memberType: "free",
      },
    });
    if (user) {
      res.json({
        status: true,
        message: "User created successfully",
        data: user,
      });
    } else {
      console.log(error);
      res.json({
        status: false,
        message: "User creation failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

const get_member = async (req, res) => {
  try {
    const user = await prisma.member.findMany({
      orderBy: {
        id: "desc",
      },
    });
    const formattedData = user.map((item) => ({
      ...item,
      createdAt: moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss"), // เปลี่ยนรูปแบบวันที่
    }));
    res.json({
      status: true,
      data: formattedData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

const delete_member = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.member.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({
      status: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: error.message,
    });
  }
}

const updateTypeMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberType } = req.body;
    const user = await prisma.member.update({
      where: {
        id: parseInt(id),
      },
      data: {
        memberType: memberType,
      },
    });
    res.json({
      status: true,
      message: "Update member type successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: error.message,
    });
  }
}
module.exports = {
  register_member,
  get_member,
  delete_member,
  updateTypeMember
};
