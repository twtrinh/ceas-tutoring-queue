import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { useLocation } from 'react-router';

export default function Layout({ children }) {
  const location = useLocation();
  
  return (
    <div>
      <Menu mode="horizontal" selectedKeys={[location.pathname]}>
        <Menu.Item key="/" >
          <Link to="/">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="/form">
          <Link to="/form">
            Submit Request
          </Link>
        </Menu.Item>
      </Menu>
      {children}
    </div>
  );
}