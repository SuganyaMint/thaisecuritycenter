export const ApiRouter = {
  // login admin
  login: "/api/login",
  authen: "/api/login/authen",

  users: "/api/users",
  register: "/api/users/register",

  //banner
  Banner: "/api/banner/",
  BannerImage: "/api/banner/image",
  UpdateBannerImage: "/api/banner/update/image/",

  //Contact
  ContactMe: "/api/v1/contact/",
  ContactInterested: "/api/v1/contact_in/",
  //Member
  Member: "/api/v1/member/register/",
  ChangeTypeMember: "/api/v1/member/register/type/",

  //company
  Company: "/api/v1/company/",
  CompanyImage: "/api/v1/company/image",
  CompanyImageComID: "/api/v1/company/imageComID/company/",
  ChangeStatusCompany: "/api/v1/company/status/",
  ChangeStartCompany: "/api/v1/company/star/",
  ChangeHireCompany: "/api/v1/company/hire/",
  CompanyLogo: "/api/v1/company/image/logo",

  CompanyClient: "/api/v1/company/show/to/client",

  //Address
  Pronvinces: "/api/v1/address/pronvinces",
  Amphoe: "/api/v1/address/amphoe/",
  Tambon: "/api/v1/address/tambon/",
  Geo : "/api/v1/address/geo/",
  NearBKK: "/api/v1/address/nearbkk",
  AmphoeInBKK: "/api/v1/address/amphoeinbkk",

  //logo
  Logo: "/api/v1/logo/",
  LogoImage: "/api/v1/logo/image",

  //promotion
  Hotpack: "/api/v1/hotpack/",
  HotpackImage: "/api/v1/hotpack/image",
  HotpackItem: "/api/v1/hotpack/items",
  UpdateStatusHotPack: "/api/v1/hotpack/items/updatestatus",
  EditAllItem: "/api/v1/hotpack/items/edit/all",
  UpdatePicureLevelHotpack: "/api/v1/hotpack/picture/",
  //level promotion
  LevelPromotion: "/api/v1/levelpromotion", //for get , put ,detete , post
  LevelPromotionImage: "/api/v1/levelpromotion/image", //for post image
  UpdateStatusLevelPromotion: "/api/v1/levelpromotion/status/",
  UpdateLockLevelPromotion: "/api/v1/levelpromotion/lock/",
  UpdatePicureLevelPromotion: "/api/v1/levelpromotion/picture/",

  // news-event
  NewsEvent: "/api/v1/news/",
  NewsEventImage: "/api/v1/news/image",
};
