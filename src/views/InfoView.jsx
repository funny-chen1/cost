import { Avatar, Button, List, Toast, Space, Input } from "antd-mobile";
import { FilePicker } from "zarm";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { upload, editUserInfo } from "../utils/service";
import { getLocal } from "../utils/public";

function Info() {
  const userInfo = useSelector((state) => state.data.userInfo);
  const token = getLocal("token");
    const [state, setState] = useState({
        signature: '',
        avatar: '',
        username: ''
    })

  useEffect(() => {
    setState((pre) => ({...pre, avatar: userInfo.avatar, signature: userInfo.signature, username: userInfo.username}));
  }, []);

  const handleSelect = async (file) => {
    console.log(file.file);
    if (file && file.file.size > 200 * 1024) {
      Toast.show({
        content: "上传的头像不得超过200KB",
      });
      return;
    }
    let formData = new FormData();
    formData.append("file", file.file);
    const res = await upload(formData);
    setState((pre) => ({...pre, avatar: "http://172.18.3.125:7009" + res.data}))
  };

  const submit = async () => {
    const res = editUserInfo(state);
    if (res.code === 200) {
        Toast.show({
            content: '修改成功'
        })
    }
  }

  return (
    <div className="container">
      <List mode="card" header="个人资料">
        <List.Item>
          <Space align="center" style={{ "--gap": "34px" }}>
            <Avatar src={state.avatar} style={{ "--size": "64px" }} />
            <FilePicker onChange={handleSelect} accept="image/*">
              <Button className="btn">
                点击上传
              </Button>
            </FilePicker>
          </Space>
        </List.Item>
        <List.Item>
          昵称：
          <Input
            placeholder="请输入内容"
            value={state.username}
            disabled={true}
            onChange={(val) => {
              setState((pre) => ({...pre, username: val}));
            }}
          />
        </List.Item>
        <List.Item>
          个性签名：
          <Input
            placeholder="请输入内容"
            value={state.signature}
            onChange={(val) => {
              setState((pre) => ({...pre, signature: val}));
            }}
          />
        </List.Item>
      </List>
      <Button className="mt20" block color="primary" onClick={submit}>
        保存
      </Button>
    </div>
  );
}

export default Info;
