import { combineReducers } from "redux";
import BaseMapReducer from "./BaseMapReducer";
import UserReducer from "./UserReducer";
const RootReducer = combineReducers({
    baseMap: BaseMapReducer,
    user: UserReducer
})
export default RootReducer; 