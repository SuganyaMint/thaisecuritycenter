const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getGuild = async (req, res) => {
  try {
    const guild = await prisma.guild_emblems.findMany();

    res.send(guild[0].file_data);
    // res.json(guild);
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  getGuild,
};
