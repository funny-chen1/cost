import TabBar from "../components/TabBar/TabBar";
import { Form, Input, Button, Toast } from "antd-mobile";
import { changePass } from "../utils/service";

function Account() {
  const submit = async (value) => {
    if (value.new_pass === value.new_pass2) {
      const res = await changePass(value);
      if (res.code === 200) {
        Toast.show({
          content: "修改成功",
        });
      }
    } else {
      Toast.show({
        content: "确认密码与密码不一致",
      });
    }
  };

  return (
    <>
      <TabBar></TabBar>
      <Form
        layout="horizontal"
        onFinish={submit}
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
      >
        <Form.Header>重置密码</Form.Header>
        <Form.Item
          name="old_pass"
          label="旧密码"
          rules={[{ required: true, message: "旧密码不能为空" }]}
        >
          <Input type="password" placeholder="请输入旧密码" />
        </Form.Item>
        <Form.Item
          name="new_pass"
          label="新密码"
          rules={[{ required: true, message: "新密码不能为空" }]}
        >
          <Input type="password" placeholder="请输入新密码" />
        </Form.Item>
        <Form.Item
          name="new_pass2"
          label="确认密码"
          rules={[{ required: true, message: "确认密码不能为空" }]}
        >
          <Input type="password" placeholder="请输入确认密码" />
        </Form.Item>
      </Form>
    </>
  );
}

export default Account;
