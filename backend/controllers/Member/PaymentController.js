const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");
const qs = require("qs");

const getPayment = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

const Payment = async (req, res) => {
  try {
    let amount = req.body.amount;
    let referenceNo = req.body.referenceNo;
    let detail = req.body.userid;
    let customerName = req.body.account_id;

    console.log(req.body);

    const donate_log = await prisma.cp_donate_log.create({
      data: {
        account_id: String(customerName),
        userid: detail,
        amount: amount,
        referenceno: referenceNo,
        gbpReferenceNo: "",
        isActived: false,
      },
    });
    let data = qs.stringify({
      amount: amount,
      backgroundUrl: "https://api.rag-m.com/api/payment/paymentcallback",
      referenceNo: referenceNo,
      detail: detail,
      customerName: customerName,
      customerAddress: "G%^4vO!L99EUX9scvhiXC^o770KV1J4WTosOsn",
      token:
        "q2hGATyNKJ0vxrX0CT42Ggpsi99F050pVZDBVI5LRtrBFIKtTNNiX/akAgbeA+WdI16tlrh/J6HPZLvU6kpNVkLvm7biIaJGSvUTafTybF2SUhn2j7vNfVskrtW5RGPTJi8+9jQac08tXwlZAiubIYXETxI=",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.gbprimepay.com/gbp/gateway/qrcode",
      responseType: "arraybuffer",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        res.json({
          status: true,
          data: Buffer.from(response.data, "binary").toString("base64"),
        });
      })
      .catch(function (error) {
        res.json({
          status: false,
          message: "error",
        });
      });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

const PaymentCallback = async (req, res) => {
  console.log(req.body);
  try {
    //check status
    if (
      req.body.resultCode != "00" &&
      req.body.customerAddress != "G%^4vO!L99EUX9scvhiXC^o770KV1J4WTosOsn"
    ) {
      return res.json({ message: "status not success" });
    } else {
      let referenceNo = req.body.referenceNo;
      let amount = req.body.amount;
      let detail = req.body.detail;
      let customerName = req.body.customerName;
      let gbpReferenceNo = req.body.gbpReferenceNo;

      const donate = await prisma.cp_donate_log.findFirst({
        where: {
          referenceno: referenceNo,
        },
      });
      if (donate != null) {
        if (donate.isActived == false) {
          const updateDonate = await prisma.cp_donate_log.update({
            where: {
              id: donate.id,
            },
            data: {
              gbpReferenceNo: gbpReferenceNo,
              isActived: true,
            },
          });

          if (donate) {
            const emoney = await prisma.cp_e_money.findFirst({
              where: {
                account_id: donate.account_id,
              },
            });
            if (emoney != null) {
              const updateEmoney = await prisma.cp_e_money.update({
                where: {
                  id: emoney.id,
                },
                data: {
                  amount: emoney.amount + parseInt(amount),
                },
              });
            } else {
              const createEmoney = await prisma.cp_e_money.create({
                data: {
                  account_id: donate.account_id,
                  userid: donate.userid,
                  amount: parseInt(amount),
                },
              });
            }
          }
          return res.json({ message: "success" });
        } else {
          return res.json({ message: "false" });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

const checkPayment = async (req, res) => {
  try {
    let referenceNo = req.body.referenceNo;
    let acc_id = req.body.acc_id;

    const donate = await prisma.cp_donate_log.findFirst({
      where: {
        referenceno: referenceNo,
      },
    });
    if (donate != null) {
      if(donate.account_id != acc_id){
        return res.json({
          status: false,
          message: "fail",
        });
      }
      if (donate.isActived === true) {
        return res.json({
          status: true,
          message: "Cashpoint เข้าสู่ระบบแล้ว",
        });
      }
    } else {
      return res.json({
        status: false,
        message: "fail",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

module.exports = {
  PaymentCallback,
  getPayment,
  Payment,
  checkPayment,
};
