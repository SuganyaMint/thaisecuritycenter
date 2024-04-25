const pool = require("../../configs/dbconfig");

const ChangePass = async (req, res) => {
  try {
    console.log(req.body);
    const { userid, account_id, email, user_pass, new_pass } = req.body;

    // check email
    const [checkEmail] = await pool.execute(
      `SELECT * FROM login WHERE account_id = ?`,
      [account_id]
    );

    if (checkEmail[0].email != email) {
      res.json({
        status: false,
        message: "อีเมลไม่ถูกต้อง",
      });
      return;
    }

    // check password
    if (checkEmail[0].user_pass != user_pass) {
      res.json({
        status: false,
        message: "รหัสผ่านเดิม ไม่ถูกต้อง",
      });
      return;
    }
    // update password
    const [updatePass] = await pool.execute(
      `UPDATE login SET user_pass = ? WHERE account_id = ?`,
      [new_pass, account_id]
    );

    res.json({
      status: true,
      message: "เปลี่ยนรหัสผ่านสำเร็จ",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "เปลี่ยนรหัสผ่านไม่สำเร็จ",
    });
  }
};

module.exports = {
  ChangePass,
};
