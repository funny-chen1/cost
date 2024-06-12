import TabBar from "../components/TabBar/TabBar";
import Form from "../components/Form/Form";
import { AddOutline } from "antd-mobile-icons";
import { getCategory, getList } from "../utils/service";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  Dropdown,
  Space,
  CalendarPicker,
  Button,
  Divider,
  Dialog,
} from "antd-mobile";


function Home() {
  const ref = useRef(null);
  const now = new Date();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState({
    list1: [],
    list2: [],
    selectedItem: {},
    billList: [],
    totalExpense: 0,
    totalIncome: 0,
  });
  const [params, setParams] = useState({
    page_size: 99,
    page: 1,
    type_id: "all",
    date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`,
  });
  let className = "";

  const getBillList = async () => {
    const res = await getList(params);
    res.data.list.forEach(value => {
      let expense = 0;
      let income = 0;
      parseFloat(expense);
      parseFloat(income);
      value.bills.forEach(v => {
        if (v.pay_type === 1) {
          expense = expense + parseFloat(v.amount);
        } else {
          income = income + parseFloat(v.amount);
        }
      });
      value["expense"] = expense;
      value["income"] = income;
    });
    setState((pre) => ({
      ...pre,
      billList: res.data.list,
      totalExpense: res.data.totalExpense,
      totalIncome: res.data.totalIncome,
    }));
    console.log(res);
  };
  const init = async () => {
    const res = await getCategory();
    if (res.code === 200) {
      const list1 = res.data.list.filter((item) => item.type === 1);
      const list2 = res.data.list.filter((item) => item.type === 2);
      setState((pre) => ({ ...pre, list1: list1, list2: list2 }));
    }
  };
  const select = (item) => {
    ref.current?.close();
    setState((pre) => ({ ...pre, selectedItem: item }));
    setParams((pre) => ({ ...pre, type_id: item.id }));
  };

  const selectDate = (val) => {
    const data =
      val.getFullYear() + "-" + String(val.getMonth() + 1).padStart(2, "0");
    setParams((pre) => ({ ...pre, date: data }));
  };

  const goPath = (obj) => {
    navigate(`/detail/${obj.id}`);
  };

  useEffect(() => {
    getBillList();
    init();
  }, []);

  useEffect(() => {
    getBillList();
  }, [params.type_id]);

  useEffect(() => {
    getBillList();
  }, [params.date]);

  return (
    <div className="container">
      <TabBar></TabBar>
      <div
        className="add-btn"
        onClick={() =>
          Dialog.show({
            content: <Form list1={state.list1} list2={state.list2}></Form>,
            onConfirm: () => {},
            footer: [],
          })
        }
      >
        <AddOutline />
      </div>
      <Space align="center">
        <Dropdown ref={ref}>
          <Dropdown.Item key="more" title="全部类型">
            <div style={{ padding: 12 }}>
              <h3>支出</h3>
              <div className="box">
                {state.list1 &&
                  state.list1.map((item) => {
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

              <h3>收入</h3>
              <div className="box">
                {state.list2 &&
                  state.list2.map((item) => {
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
            </div>
          </Dropdown.Item>
        </Dropdown>
        <Button color="primary" onClick={() => setVisible(true)}>
          选择日期
        </Button>
        <span>{params.date}</span>
      </Space>

      <CalendarPicker
        visible={visible}
        selectionMode="single"
        min={new Date(2024, 0, 1)}
        defaultValue={new Date()}
        onClose={() => setVisible(false)}
        onMaskClick={() => setVisible(false)}
        onConfirm={(val) => {
          selectDate(val);
        }}
      />
      <Divider />
      <div>
        <span className="mr40">总支出：{state.totalExpense}</span>
        <span>总收入：{state.totalIncome}</span>
      </div>
      <div className="content">
        {state.billList &&
          state.billList.map((item) => {
            return (
              <div className="item-box" key={item.date}>
                <div className="item-header">
                  <span className="date">{item.date}</span>
                  <div>
                    <span className="mr20">支：{item.expense}</span>
                    <span>收：{item.income}</span>
                  </div>
                </div>
                {item.bills.map((val) => {
                  return (
                    <div
                      className="item-main"
                      key={val.id}
                      onClick={() => goPath(val)}
                    >
                      <h3>{val.type_name}</h3>
                      {val.pay_type === 2 && (
                        <span className="amount red">+{val.amount}</span>
                      )}
                      {val.pay_type === 1 && (
                        <span className="amount green">-{val.amount}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
