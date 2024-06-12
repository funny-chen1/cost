
import { Form, Input, Button, Toast } from "antd-mobile";
import { login } from "../utils/service";
import { setLocal } from "../utils/public";

function Login() {
  const submit = async (value) => {
    const res = await login(value);
    if (res.data) {
      setLocal("token", res.data.token);
      window.location.reload();
    } else {
      Toast.show({
        content: res.msg,
      });
    }
  };

  return (
    <>
      <Form
        layout="horizontal"
        onFinish={submit}
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
      >
        <Form.Header>登录</Form.Header>
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: "用户名不能为空" }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: "密码不能为空" }]}
        >
          <Input type="password" placeholder="请输入密码" />
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;
