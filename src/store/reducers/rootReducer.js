import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";
import postReducer from "./postReducer";
import appReducer from "./appReducer";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
// persist ==> lưu giá trị reducer ==> trong localStored

// commonConfig ==> là config chung
const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};
//- whitelist : để chọn ra những state của reducer có thể được lưu dưới localStorage
// backlist : chọn ra những state nào không lưu dưới localStorage
const authConfig = {
  ...commonConfig,
  key: "auth",
  whitelist: ["isLoggedIn", "token"],
};
const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  user: userReducer,
  post: postReducer,
  app: appReducer,
});

export default rootReducer;
