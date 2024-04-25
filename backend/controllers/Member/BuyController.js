const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const pool = require("../../configs/dbconfig");

const buyItemLevel = async (req, res) => {
  try {
    const { userid, account_id, item_group_id, amount, package_name, level } =
      req.body;

    const fetchMoney = await prisma.cp_e_money.findMany({
      where: {
        account_id: String(account_id),
      },
    });

    if (fetchMoney.length == 0) {
      res.json({
        status: false,
        message: "ไม่มีเงิน กรุณาเติมเงิน",
      });
      return;
    } else {
      const money = fetchMoney[0].amount;
      if (money * 1 < amount * 1) {
        res.json({
          status: false,
          message: "เงินไม่พอ กรุณาเติมเงิน",
        });
        return;
      }
    }

    const fetchGroup = await prisma.cp_level_promotion_group.findMany({
      where: {
        group_id: item_group_id,
      },
    });

    const item_id = fetchGroup.map((item) => item.item_id);
    const item_amount = fetchGroup.map((item) => item.item_amount);

    // convert array to string
    const item_id_string = item_id.toString();
    const item_amount_string = item_amount.toString();

    try {
      const [rows, fields] = await pool.execute(
        `INSERT INTO donate (userid, account_id, package, itemid, amount, status, added_time) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          userid,
          account_id,
          package_name,
          item_id_string,
          item_amount_string,
          1,
          new Date(),
        ]
      );

      if (rows.affectedRows == 1) {
        // update money in cp_e_money pirma
        const updateMoney = await prisma.cp_e_money.updateMany({
          where: {
            account_id: String(account_id),
          },
          data: {
            amount: {
              decrement: amount,
            },
          },
        });

        // check cp_exchange_lv table
        const checkExchange = await prisma.cp_exchange_lv.findMany({
          where: {
            account_id: String(account_id),
          },
        });

        if (checkExchange.length == 0) {
          // insert cp_exchange_lv table
          const insertExchange = await prisma.cp_exchange_lv.create({
            data: {
              account_id: String(account_id),
              userid: userid,
              lv: level,
            },
          });
        } else {
          // update cp_exchange_lv table
          if (level * 1 === 9) {
            level = 0;
          }
          const updateExchange = await prisma.cp_exchange_lv.updateMany({
            where: {
              account_id: String(account_id),
            },
            data: {
              account_id: String(account_id),
              userid: userid,
              lv: level,
            },
          });
        }
        res.json({
          status: true,
          message: "ซื้อสำเร็จ กรุณารอสักครู่",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: "เกิดข้อผิดพลาด",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "เกิดข้อผิดพลาด",
    });
  }
};

const buyHotItem = async (req, res) => {
  try {
    const { userid, account_id, item_group_id, amount, package_name, pack_id } =
      req.body;

    const fetchMoney = await prisma.cp_e_money.findMany({
      where: {
        account_id: String(account_id),
      },
    });

    if (fetchMoney.length == 0) {
      res.json({
        status: false,
        message: "ไม่มีเงิน กรุณาเติมเงิน",
      });
      return;
    } else {
      const money = fetchMoney[0].amount;
      if (money * 1 < amount * 1) {
        res.json({
          status: false,
          message: "เงินไม่พอ กรุณาเติมเงิน",
        });
        return;
      }
    }

    const fetchLimit = await prisma.cp_hotpackage.findMany({
      where: {
        id: pack_id,
      },
    });

    if (fetchLimit[0].limit == 0) {
      res.json({
        status: false,
        message: "สินค้าหมด",
      });
      return;
    }
    // -1 limit in table cp_hotpackage
    const changeLimit = await prisma.cp_hotpackage.update({
      where: {
        id: pack_id,
      },
      data: {
        limit: {
          decrement: 1,
        },
      },
    });

    const fetchGroup = await prisma.cp_hotpackage_group.findMany({
      where: {
        group_id: item_group_id,
      },
    });

    const item_id = fetchGroup.map((item) => item.item_id);
    const item_amount = fetchGroup.map((item) => item.amount);

    // convert array to string
    const item_id_string = item_id.toString();
    const item_amount_string = item_amount.toString();

    const [rows, fields] = await pool.execute(
      `INSERT INTO donate (userid, account_id, package, itemid, amount, status, added_time) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        userid,
        account_id,
        package_name,
        item_id_string,
        item_amount_string,
        1,
        new Date(),
      ]
    );

    if (rows.affectedRows == 1) {
      // update money in cp_e_money pirma
      const updateMoney = await prisma.cp_e_money.updateMany({
        where: {
          account_id: String(account_id),
        },
        data: {
          amount: {
            decrement: amount * 1,
          },
        },
      });

      res.json({
        status: true,
        message: "ซื้อสำเร็จ กรุณารอสักครู่",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "เกิดข้อผิดพลาด",
    });
  }
};

const buyWeekItem = async (req, res) => {
  try {
    const { userid, account_id, item_group_id, amount, package_name, pack_id } =
      req.body;

    const fetchMoney = await prisma.cp_e_money.findMany({
      where: {
        account_id: String(account_id),
      },
    });

    if (fetchMoney.length == 0) {
      res.json({
        status: false,
        message: "ไม่มีเงิน กรุณาเติมเงิน",
      });
      return;
    } else {
      const money = fetchMoney[0].amount;
      if (money * 1 < amount * 1) {
        res.json({
          status: false,
          message: "เงินไม่พอ กรุณาเติมเงิน",
        });
        return;
      }
    }

    const fetchLimit = await prisma.cp_week_promotion.findMany({
      where: {
        id: pack_id,
      },
    });

    if (fetchLimit[0].limit == 0) {
      res.json({
        status: false,
        message: "สินค้าหมด",
      });
      return;
    }
    // -1 limit in table cp_weekpackage
    const changeLimit = await prisma.cp_week_promotion.update({
      where: {
        id: pack_id,
      },
      data: {
        limit: {
          decrement: 1,
        },
      },
    });

    const fetchGroup = await prisma.cp_week_promotion_group.findMany({
      where: {
        group_id: item_group_id,
      },
    });

    const item_id = fetchGroup.map((item) => item.item_id);
    const item_amount = fetchGroup.map((item) => item.amount);

    // convert array to string
    const item_id_string = item_id.toString();
    const item_amount_string = item_amount.toString();

    const [rows, fields] = await pool.execute(
      `INSERT INTO donate (userid, account_id, package, itemid, amount, status, added_time) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        userid,
        account_id,
        package_name,
        item_id_string,
        item_amount_string,
        1,
        new Date(),
      ]
    );

    if (rows.affectedRows == 1) {
      // update money in cp_e_money
      const updateMoney = await prisma.cp_e_money.updateMany({
        where: {
          account_id: String(account_id),
        },
        data: {
          amount: {
            decrement: amount * 1,
          },
        },
      });

      res.json({
        status: true,
        message: "ซื้อสำเร็จ กรุณารอสักครู่",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "เกิดข้อผิดพลาด",
    });
  }
};

const buyMonthItem = async (req, res) => {
  try {
    const { userid, account_id, item_group_id, amount, package_name, pack_id } =
      req.body;

    const fetchMoney = await prisma.cp_e_money.findMany({
      where: {
        account_id: String(account_id),
      },
    });

    if (fetchMoney.length == 0) {
      res.json({
        status: false,
        message: "ไม่มีเงิน กรุณาเติมเงิน",
      });
      return;
    } else {
      const money = fetchMoney[0].amount;
      if (money * 1 < amount * 1) {
        res.json({
          status: false,
          message: "เงินไม่พอ กรุณาเติมเงิน",
        });
        return;
      }
    }

    const fetchLimit = await prisma.cp_month_promotion.findMany({
      where: {
        id: pack_id,
      },
    });

    if (fetchLimit[0].limit == 0) {
      res.json({
        status: false,
        message: "สินค้าหมด",
      });
      return;
    }
    // -1 limit in table cp_month_promotion
    const changeLimit = await prisma.cp_month_promotion.update({
      where: {
        id: pack_id,
      },
      data: {
        limit: {
          decrement: 1,
        },
      },
    });

    const fetchGroup = await prisma.cp_month_promotion_group.findMany({
      where: {
        group_id: item_group_id,
      },
    });

    const item_id = fetchGroup.map((item) => item.item_id);
    const item_amount = fetchGroup.map((item) => item.amount);

    // convert array to string
    const item_id_string = item_id.toString();
    const item_amount_string = item_amount.toString();

    const [rows, fields] = await pool.execute(
      `INSERT INTO donate (userid, account_id, package, itemid, amount, status, added_time) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        userid,
        account_id,
        package_name,
        item_id_string,
        item_amount_string,
        1,
        new Date(),
      ]
    );

    if (rows.affectedRows == 1) {
      // update money in cp_e_money
      const updateMoney = await prisma.cp_e_money.updateMany({
        where: {
          account_id: String(account_id),
        },
        data: {
          amount: {
            decrement: amount * 1,
          },
        },
      });

      res.json({
        status: true,
        message: "ซื้อสำเร็จ กรุณารอสักครู่",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "เกิดข้อผิดพลาด",
    });
  }
};

module.exports = {
  buyItemLevel,
  buyHotItem,
  buyWeekItem,
  buyMonthItem,
};
