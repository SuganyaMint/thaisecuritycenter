import { Layout } from 'antd';
import React from 'react';
const { Footer } = Layout;

function FooterComponent() {
  return (
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      Version 1.0.0 ©2023 Created by <a href="https://www.facebook.com/subtawee.subannajuy">Sabtawee.s</a>
    </Footer>
  );
}

export default FooterComponent;
