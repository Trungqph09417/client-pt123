import { Routes, Route } from "react-router-dom";
import { path } from "./ultils/constain";
import {
  Header,
  Home,
  Login,
  Rental,
  HomePage,
  DetailPost,
  Connect,
} from "./containers/Public";
import SearchDetail from "./containers/Public/SearchDetail";
import { EditUser, ManagePost, System } from "./containers/System";
import CreatePost from "./containers/System/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from "./store/actions";
import PayPost from "./containers/System/PayPost";
function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(actions.getPrice());
    dispatch(actions.getArea());
    dispatch(actions.getProvince());
  }, []);
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrentUser());
    }, 1000);
  }, [isLoggedIn]);
  return (
    <div className="overflow-hidden bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path="*" element={<HomePage />} />

          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route path={path.CONNECT} element={<Connect />} />
          <Route
            path={path.DETAIL_POST_TITLE_POSTID}
            element={<DetailPost />}
          />
          <Route path={path.DETAIL_All} element={<DetailPost />} />
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.EDIT_USER} element={<EditUser />} />
          <Route path={path.PAY_POST} element={<PayPost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
