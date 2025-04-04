import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import matchReducer from "./matchSlice";
import PostReducer from "./PostSlice"
import VideoReducer from "./VideoSlice"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Cấu hình persist
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth'], // Chỉ lưu trữ auth state
    blacklist: ['Video', 'user', 'match', 'Post'] // Không lưu trữ các state khác
};

// Kết hợp các reducers
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    match: matchReducer,
    Post: PostReducer,
    Video: VideoReducer
});

// Áp dụng persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Tạo persistor
export let persistor = persistStore(store);