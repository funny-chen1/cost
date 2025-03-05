import { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./router/router";
import { getUserInfo } from "./utils/service";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { setUser } from "./store/actions";
import Login from './views/LoginView'
import { getLocal } from "./utils/public";

function App() {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.data);
  const [state, setState] = useState({
    isLogin: false,
  });


  const Authentication = ({children}) => {
    if (!getLocal('token')) {
      return <Navigate to="/login" />
    }
    return children
  }

  const init = async () => {
    const res = await getUserInfo();
    if (res.code === 200) {
      dispatch(setUser(res.data))
      setState((pre) => ({ ...pre, isLogin: true }));
    } else if (res.code === 401 && res.msg === 'token已过期，请重新登录') {
      localStorage.removeItem('token')
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Suspense>
        <Routes>
          <Route key="/login" path="/login" element={<Login />}></Route>
          {routes.map((route) => {
            const Compoent = route.element
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Authentication><Compoent /></Authentication>}
              />
            );
          })}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
