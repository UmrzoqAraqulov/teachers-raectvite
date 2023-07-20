import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  SolutionOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

<UserAddOutlined />;
<UsergroupAddOutlined />;

import { Layout, Menu, Button, theme} from "antd";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
const { Sider, Content } = Layout;

const AdminLayout = () => {
  const {pathname} = useLocation()
  const [collapsed, setCollapsed] = useState(false);
  const [path,setPath] = useState(pathname)

  
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "18px",
            color:"white",
            margin:"0px 0px 10px 25px",
            width: 30,
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[path]}
          onClick={({key})=>{
            setPath(key);
          }}
          items={[
            {
              key: "/teachers",
              icon: <TeamOutlined />,
              label: <Link to="/teachers">Teachers</Link>,
            },
            {
              key: "/students",
              icon: <SolutionOutlined />,
              label: <Link to="/students">Students</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        {/* <Header
          style={{
            padding: 0,
            display: "flex",
            alignItems: "center",
            background: colorBgContainer,
          }}></Header> */}

        <Content
          style={{
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
