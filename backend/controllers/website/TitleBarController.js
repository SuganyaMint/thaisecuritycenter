const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getTitleBar = async (req, res) => {
  try {
    const Title = await prisma.cp_title_bar.findMany();
    res.json({
      message: "Get Title Success",
      data: Title,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

const createTitleBar = async (req, res) => {
  try {
    const Title = await prisma.cp_title_bar.create({
      data: {
        title: req.body.title,
        subTitle: req.body.subTitle,
        status: 0,
      },
    });
    res.json({
      message: "Create Title Success",
      status: true,
    });
  } catch (error) {
    console.log(error);

    res.json({ error: error.message });
  }
};
const updateTitleBar = async (req, res) => {
  try {
    if (parseInt(req.body.status) === 1)
    {
      const TitleStatus = await prisma.cp_title_bar.updateMany({
        where: {
          status: 1,
        },
        data: {
          status: 0,
        },
      });
    }

    const Title = await prisma.cp_title_bar.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        title: req.body.title,
        subTitle: req.body.subTitle,
        status: parseInt(req.body.status),
      },
    });
    res.json({
      message: "Update Title Success",
      status: true,
    });
  } catch (error) {
    console.log(error);

    res.json({ error: error.message });
  }
};

const deleteTitleBar = async (req, res) => {
  try {
    const Title = await prisma.cp_title_bar.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json({
      message: "Delete Title Success",
      status: true,
    });
  } catch (error) {
    console.log(error);

    res.json({ error: error.message });
  }
};
module.exports = {
  getTitleBar,
  createTitleBar,
  updateTitleBar,
  deleteTitleBar,
};
