import {
  ControlOutlined,
  DatabaseOutlined,
  HomeOutlined,
  TeamOutlined,
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
  // {
  //   key: "home",
  //   icon: <HomeOutlined />,
  //   label: "Home",
  // },
  { key: "mycompany", icon: <HomeOutlined />, label: "My Company" },

  // {
  //   key: "users",
  //   icon: <TeamOutlined />,
  //   label: "จัดการผู้ใช้งาน",
  // },
];
