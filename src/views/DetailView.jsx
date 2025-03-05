import { useParams } from "react-router-dom";
import { getDetail } from "../utils/service";
import { useState, useEffect } from "react";
import TabBar from "../components/TabBar/TabBar";
import { Card } from "antd-mobile";

function Detail() {
  const { id } = useParams();
  const [obj, setObj] = useState({});

  const init = async () => {
    const res = await getDetail(id);
    setObj(res.data);
  };

  function formatDate(date) {
    const data = new Date(date)
    const year = data.getFullYear();
    const month = ('0' + (data.getMonth() + 1)).slice(-2);
    const day = ('0' + data.getDate()).slice(-2);

    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="container">
        <TabBar></TabBar>
      <Card title="账单详情">
        <div>
            <span>{obj.type_name}</span>
            <h3>{obj.pay_type === 1 ? '-': '+'}{obj.amount}</h3>
            <p>日期：{formatDate(obj.date)}</p>
            <p>备注：{obj.remark}</p>
        </div>
      </Card>
    </div>
  );
}

export default Detail;
