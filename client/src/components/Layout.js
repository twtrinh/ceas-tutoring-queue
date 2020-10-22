import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { useLocation } from 'react-router';
import { useUser, signIn } from '../contexts/UserContext';
import firebase, { auth } from '../firebase';


export default function Layout({ children }) {
  const location = useLocation();
  const user = useUser();

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
        {
          user ?
            <>
              <Menu.Item>
                {user.displayName}
              </Menu.Item>
              <Menu.Item onClick={() => auth.signOut()}>
                Sign Out
              </Menu.Item>
            </> :
            <>
              <Menu.Item key="/login">
                <Link to="/login">
                  Sign In
                </Link>
              </Menu.Item>
            </>
        }
      </Menu>
      {children}
    </div>
  );
}