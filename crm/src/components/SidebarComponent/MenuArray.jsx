import {
  ControlOutlined,
  DatabaseOutlined,
  HomeOutlined,
  TeamOutlined
} from "@ant-design/icons";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const MenuArray = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "Home",
  },
  getItem('ข้อมูลบริษัท', 'companydetail', <ControlOutlined />, [
    getItem('เกี่ยวกับบริษัท', 'company'),
    getItem('ผู้สนใจบริษัท', 'interestedcompany'),
  ]),
  getItem('จัดการหน้าเว็บไซต์', 'website', <ControlOutlined />, [
    getItem('Banner', 'banner'),
    // getItem('Logo', 'logo'),
    // getItem('Button Click', 'button'),
    // getItem('Title Bar', 'titlebar'),
    // getItem('Title', 'title'),
    // getItem('News-Event', 'news'),
    // getItem('Slider', 'slider'),
    // getItem('Navbar', 'navbar'),
  ]),
  {
    key: "contact_me",
    icon: <HomeOutlined />,
    label: "ข้อมูลการติดต่อ",
  },
  {
    key: "member",
    icon: <HomeOutlined />,
    label: "ข้อมูลสมาชิก",
  },
  // getItem('จัดการผู้เล่น', 'user', <DatabaseOutlined />, [
  //   getItem('Player Detail', 'playerdetail'),
  //   getItem('Guild Detail', 'guilddetail'),
  // ]),
  // getItem('จัดการโปรโมชั่น', 'promo', <DatabaseOutlined />, [
  //   getItem('โปรโมชั่นเลเวล', 'levelpromo'),
  //   getItem('โปรโมชั่นมาแรง', 'hotpromo'),
  //   getItem('โปรโมชั่นรายเดือน', 'monthpromo'),
  //   getItem('โปรโมชั่นรายสัปดาห์', 'weekpromo'),
  //   getItem('โปรโมชั่นลดราคา', 'discountpromo'),
  //   getItem('โปรโมชั่นสะสม', 'accumulationpromo'),
  // ]),
  // getItem('จัดการร้านค้า', 'shop', <DatabaseOutlined />, [
  //   getItem('Cash Shop', 'cashshop'),
  //   getItem('ร้านค้าจำกัดเวลา', 'timeshop'),
  //   getItem('ร้านค้าสะสม', 'accumulationshop'),
  //   getItem('ร้านค้าลำดับขั้น', 'rankshop'),    
  // ]),
  {
    key: "users",
    icon: <TeamOutlined />,
    label: "จัดการผู้ใช้งาน",
  },
];





