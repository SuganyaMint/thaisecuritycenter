import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotfoundPage from "../pages/NotfoundPage";
import UserManagePage from "../pages/UserManagePage";
import ContactMePage from "../pages/Contact/ContactMePage";
import MemberPage from "../pages/Member/MemberPage";
import InterestedCompanyPage from "../pages/Company/InterestedCompanyPage";
import CompanyPage from "../pages/Company/CompanyPage";
import MainDetailCompanyPage from "../pages/Company/MainDetailCompanyPage";
import SearchCompanyPage from "../pages/SearchCompanyPage";

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
    routerName: "Users",
    routerPath: "/users",
    routerComponent: <UserManagePage />,
  },

  {
    id: 5,
    routerName: "Contact_Me",
    routerPath: "/contact_me",
    routerComponent: <ContactMePage />,
  },
  {
    id: 7,
    routerName: "Member",
    routerPath: "/member",
    routerComponent: <MemberPage />,
  },
  {
    id: 8,
    routerName: "Company",
    routerPath: "/company",
    routerComponent: <CompanyPage />,
  },
  {
    id: 9,
    routerName: "InterestedCompany",
    routerPath: "/interestedcompany",
    routerComponent: <InterestedCompanyPage />,
  },
  {
    id: 10,
    routerName: "SearchCompany",
    routerPath: "/searchcompany",
    routerComponent: <SearchCompanyPage />,
  },
  
];
