const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getNavbar = async (req, res) => {
  try {
    const navbar = await prisma.cp_navbar.findMany({
      orderBy: {
        order: "asc",
      },
    });
    res.json({
      message: "Get Navbar Success",
      data: navbar,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

const createNavbar = async (req, res) => {
  try {
    const navbar = await prisma.cp_navbar.create({
      data: {
        title: req.body.title,
        order: parseInt(req.body.order),
        link: req.body.link,
        status: 1,
      },
    });
    res.json({
      message: "Create Navbar Success",
      status: true,
    });
  } catch (error) {
    console.log(error);

    res.json({ error: error.message });
  }
};
const updateNavbar = async (req, res) => {
  try {
    const navbar = await prisma.cp_navbar.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        title: req.body.title,
        order: req.body.order,
        link: req.body.link,
        status: parseInt(req.body.status),
      },
    });
    res.json({
      message: "Update Navbar Success",
      status: true,
    });
  } catch (error) {
    console.log(error);

    res.json({ error: error.message });
  }
};

const deleteNavbar = async (req, res) => {
  try {
    const navbar = await prisma.cp_navbar.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json({
      message: "Delete Navbar Success",
      status: true,
    });
  } catch (error) {
    console.log(error);

    res.json({ error: error.message });
  }
};
module.exports = {
  getNavbar,
  createNavbar,
  updateNavbar,
  deleteNavbar
};
