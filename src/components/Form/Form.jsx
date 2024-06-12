import { Tabs } from "antd-mobile";
import { useState, RefObject } from "react";
import {
  DatePicker,
  Form,
  NumberKeyboard,
  TextArea,
  Button,
  Toast,
} from "antd-mobile";
import dayjs from "dayjs";
import { add } from "../../utils/service";

function form(props) {
  let className = "";
  const [myForm] = Form.useForm();
  const [state, setState] = useState({
    selectedItem: {},
  });
  const [obj, setObj] = useState({
    amount: "",
    date: null,
    remark: "",
    pay_type: null,
    type_id: null,
    type_name: "",
  });
  const [pickerVisible, setPickerVisible] = useState(false);
  const [keyBoardVisible, setkeyBoardVisible] = useState(false);

  const select = (item) => {
    setState((pre) => ({ ...pre, selectedItem: item }));
    setObj((pre) => ({
      ...pre,
      pay_type: item.type,
      type_id: item.id,
      type_name: item.name,
    }));
  };

  const keyDown = (value) => {
    setObj((pre) => ({ ...pre, amount: pre.amount + value }));
  };

  const clear = () => {
    setObj((pre) => ({ ...pre, amount: pre.amount.slice(0, -1) }));
  };

  const submit = async () => {
    if (obj.amount !== "" && obj.date !== null && obj.pay_type !== null) {
      const res = await add(obj);
      if (res.code === 200) {
        Toast.show({
          content: "添加成功",
        });
        window.location.reload();
      }
    } else {
      Toast.show({
        content: "请填写相关信息",
      });
    }
  };

  return (
    <>
      <Tabs>
        <Tabs.Tab title="支出" key="1">
          <div className="box">
            {props.list1 &&
              props.list1.map((item) => {
                if (item === state.selectedItem) {
                  className = "select-item active";
                } else {
                  className = "select-item";
                }
                return (
                  <span
                    key={item.id}
                    className={className}
                    onClick={() => {
                      select(item);
                    }}
                  >
                    {item.name}
                  </span>
                );
              })}
          </div>
        </Tabs.Tab>
        <Tabs.Tab title="收入" key="2">
          <div className="box">
            {props.list2 &&
              props.list2.map((item) => {
                if (item === state.selectedItem) {
                  className = "select-item active";
                } else {
                  className = "select-item";
                }
                return (
                  <span
                    key={item.id}
                    className={className}
                    onClick={() => {
                      select(item);
                    }}
                  >
                    {item.name}
                  </span>
                );
              })}
          </div>
        </Tabs.Tab>
      </Tabs>
      <div className="amount" onClick={() => setkeyBoardVisible(true)}>
        <h3>金额：{obj.amount}</h3>
      </div>
      <Form form={myForm}>
        <Form.Item
          name="date"
          label="日期"
          trigger="onConfirm"
          onClick={() => {
            setPickerVisible(true);
          }}
        >
          <DatePicker
            visible={pickerVisible}
            onClose={() => {
              setPickerVisible(false);
            }}
            onConfirm={(val) => {
              setObj((pre) => ({ ...pre, date: val.getTime() }));
            }}
          >
            {(value) =>
              value ? dayjs(value).format("YYYY-MM-DD") : "请选择日期"
            }
          </DatePicker>
        </Form.Item>
        <Form.Item name="remark" label="备注">
          <TextArea
            maxLength={100}
            rows={2}
            onChange={(value) => setObj((pre) => ({ ...pre, remark: value }))}
          />
        </Form.Item>
      </Form>
      <Button block color="primary" onClick={submit}>
        提交
      </Button>
      <NumberKeyboard
        visible={keyBoardVisible}
        onClose={() => setkeyBoardVisible(false)}
        customKey={["-", "."]}
        confirmText="确定"
        onInput={(value) => {
          keyDown(value);
        }}
        onDelete={clear}
      />
    </>
  );
}

export default form;
