import TabBar from "../components/TabBar/TabBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Toast, Button, Avatar, List, Space } from "antd-mobile";

function User() {
  const userInfo = useSelector((state) => state.data.userInfo);
  console.log(userInfo)
  const navigate = useNavigate()

  const goPath = (path) => {
    navigate(path)
  }

  const logout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <>
      <TabBar></TabBar>
      <div className="container">
        <List mode="card">
          <List.Item>
            <Avatar src={userInfo.avatar} />
          </List.Item>
          <List.Item>用户名：{userInfo.username}</List.Item>
          <List.Item>个性签名：{userInfo.signature}</List.Item>
        </List>

        <List mode="card" header="个人操作">
          <List.Item onClick={() => {goPath('/info')}}>修改用户信息</List.Item>
          <List.Item onClick={() => {goPath('/account')}}>重置密码</List.Item>
        </List>

        <div className="mt40 text-center">
          <Button color='primary' size='middle' onClick={logout}>
            退出登录
          </Button>
        </div>
      </div>
    </>
  );
}

export default User;
