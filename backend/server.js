const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");

const loginRouter = require("./routes/LoginRouter");
const UserRouter = require("./routes/UserRouter");

// Website
const BannerRouter = require("./routes/website/BannerRouter");
const SubBannerRouter = require("./routes/website/SubBannerRouter");
const LogoRouter = require("./routes/website/LogoRouter");
const NewsRouter = require("./routes/website/NewsRouter");
const SliderRouter = require("./routes/website/SliderRouter");
const NavbarRouter = require("./routes/website/NavbarRouter");
const TitleRouter = require("./routes/website/TitleRouter");
const TitleBarRouter = require("./routes/website/TitleBarRouter");
const ButtonRouter = require("./routes/website/ButtonRouter");

const ArticleRouter = require("./routes/Article_route/Article_route");

// Promotion
const HotpackRouter = require("./routes/Promotion/HotpackRouter");
const LevelPromotionRouter = require("./routes/Promotion/LevelPromotionRouter");
const WeekPromotionRouter = require("./routes/Promotion/WeekPromotionRouter");
const MonthPromotionRouter = require("./routes/Promotion/MonthPromotionRouter");

const CompanyRouer = require("./routes/Company_router/CompanyRouter");
const ContactRouter = require("./routes/Contact_route/ContactRouter");
const ContactInterested_route = require("./routes/Contact_route/ContactInterested_route");


//member
const LoginMemberRouter = require("./routes/Member/LoginRouter");
const MemberRouter = require("./routes/Member/RegisterRouter");

//Address
const AddressRouter = require("./routes/Address_route/Address_router");

dotenv.config();

const app = express();

// Middleware สำหรับตรวจสอบความถูกต้องของ API key
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers["api-key"]; // รับค่า API key จาก header

  if (!apiKey || apiKey !== "f7d1e7d8a794d925d2bfe5a13b25a6a4") {
    return res.status(401).json({ message: "Invalid API key" });
  }

  next(); // ให้ middleware ถัดไปดำเนินการต่อ
};

app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(express.static(path.join(__dirname, "uplaods")));

app.get("/", validateApiKey, (req, res) => {
  res.send("Hello World!");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/login", loginRouter);
app.use("/api/users", UserRouter);

// Website
app.use("/api/banner", BannerRouter);
app.use("/api/subbanner", SubBannerRouter);
// app.use("/api/logo", LogoRouter);
// app.use("/api/v1/news", NewsRouter);
// app.use("/api/v1/slider", SliderRouter);
// app.use("/api/v1/navbar", NavbarRouter);
// app.use("/api/v1/title", TitleRouter);
// app.use("/api/v1/titlebar", TitleBarRouter);
// app.use("/api/v1/button", ButtonRouter);

// Promotion
// app.use("/api/v1/hotpack", HotpackRouter);
// app.use("/api/v1/levelpromotion", LevelPromotionRouter);
// app.use("/api/v1/weekpromotion", WeekPromotionRouter);
// app.use("/api/v1/monthpromotion", MonthPromotionRouter);

app.use("/api/v1/company", CompanyRouer);
app.use("/api/v1/contact", ContactRouter);
app.use("/api/v1/contact_in", ContactInterested_route);

//member
app.use("/api/v1/member/login", LoginMemberRouter);
app.use("/api/v1/member/register", MemberRouter);

//Address
app.use("/api/v1/address", AddressRouter);

// Article
app.use("/api/v1/article", ArticleRouter);


app.listen(process.env.PORT, () => {
  console.log(
    `Server is Running at http://localhost:${process.env.PORT}/api-docs`
  );
});
