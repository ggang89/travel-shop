import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

//서로 다른 리듀싱 함수들을 값으로가지는 객체를 받아서
// createStore에 넘길 수 있는 하나의 리듀싱 함수로 변환
export const rootReducer = combineReducers({
  user: userReducer
});

//리덕스 스토어 안에 있는 데이터를 어디에 저장할지(localStorage or sectionStorage )
const persistConfig = {
  key: "root", //key 이름
  storage,    // localStorage에 저장한다.
  // whitelist:[], // 여러 reducer 중에 해당 reducer만 localStorage에 저장
  // blacklist:[]  // blacklist => 그것만 제외.
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      //{ serializableCheck: false })
      {
        serializableCheck: {
          ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      }
      // getDefaultMiddleware: 리덕스 툴킷에서 가지고 있는 기본 미들웨어
      // 리덕스 미들웨어에서는 들어오는 값이 직렬화할 수 있는 값인지 체크한다
      // serialize(직렬화) : object 값을 string 값으로 변환(JSON.stringify)
      // deserialize(역직렬화) :string 값을 object 값으로 변환(JSON.parse)
    )
})

export const persistor = persistStore(store);
