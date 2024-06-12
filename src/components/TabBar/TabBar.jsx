import { useState } from "react";
import { Badge, TabBar } from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";

function Tab(params) {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const tabs = [
    {
      key: "/",
      title: "首页",
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: "/todo",
      title: "待办",
      icon: <UnorderedListOutline />,
      badge: "5",
    },
    {
      key: "/user",
      title: "我的",
      icon: <UserOutline />,
    },
  ];


  return (
    <>
      <div className="tabbar">
        <TabBar activeKey={pathname} onChange={(value) => navigate(value)}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </>
  );
}

export default Tab;
