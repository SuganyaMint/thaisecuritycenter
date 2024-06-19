import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotfoundPage from "../pages/NotfoundPage";
import RegisterPage from "../pages/RegisterPage";
import CompanyPage from "../pages/Company/CompanyPage";
import MainDetailCompanyPage from "../pages/Company/MainDetailCompanyPage";
import DetailCompanyPage from "../pages/Company/DetailCompanyPage";
import CompanyMap from "../pages/Company/CompanyMap";
import DescriptionCompanyPage from "../pages/Company/DescriptionCompanyPage";
import ImageCompanyPage from "../pages/Company/ImageCompanyPage";

export const RouterModel = [
  {
    id: 0,
    routerName: "NotFound",
    routerPath: "*",
    routerComponent: <NotfoundPage />,
  },
  {
    id: 1,
    routerName: "Home",
    routerPath: "/",
    routerComponent: <HomePage />,
  },
  {
    id: 2,
    routerName: "Login",
    routerPath: "/login",
    routerComponent: <LoginPage />,
  },
  {
    id: 3,
    routerName: "CompanyPage",
    routerPath: "/mycompany",
    routerComponent: <CompanyPage />,
  },
  {
    id: 4,
    routerName: "MainDetailCompany",
    routerPath: "/company/:company_id",
    routerComponent: <MainDetailCompanyPage />,
  },
  {
    id: 5,
    routerName: "DetailCompany",
    routerPath: "/mycompany/detail",
    routerComponent: <DetailCompanyPage />,
  },
  {
    id: 6,
    routerName: "MapCompany",
    routerPath: "/mycompany/map",
    routerComponent: <CompanyMap />,
  },

  {
    id: 7,
    routerName: "DescriptionCompany",
    routerPath: "/mycompany/description",
    routerComponent: <DescriptionCompanyPage />,
  },
  {
    id: 8,
    routerName: "ImageCompany",
    routerPath: "/mycompany/image",
    routerComponent: <ImageCompanyPage />,
  },  {
    id: 9,
    routerName: "Register",
    routerPath: "/register",
    routerComponent: <RegisterPage />,
  },
];
