import { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TabBar from "./components/TabBar/TabBar";
import routes from "./router/router";
import { getLocal } from "./utils/public";
import LoginView from "./views/LoginView";
import { getUserInfo } from "./utils/service";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { setUser } from "./store/actions";

function App() {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    isLogin: false,
  });

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
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                Component={state.isLogin ? route.element : lazy(() => import('./views/LoginView'))}
              />
            );
          })}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
