import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        getAllUser: {
            currentUser: [], // Thay null bằng mảng rỗng
            isFetching: false,
            error: false,
        },
        deleteUser: {
            // isFetching: false,
            // error: false,
        },


    },
    reducers: {
        getAllUserStart: (state) => {
            state.getAllUser.isFetching = true;
        },
        getAllUserSuccess: (state, action) => {
            state.getAllUser.isFetching = false;
            state.getAllUser.currentUser = action.payload; // Cập nhật dữ liệu người dùng
            state.getAllUser.error = false;
        },
        getAllUserFailed: (state) => {
            state.getAllUser.isFetching = false;
            state.getAllUser.error = true;
        },
        // deleteUserStart: (state) => {
        //     state.deleteUser.isFetching = true;
        // },
        deleteUserSuccess: (state, action) => {
            // state.deleteUser.isFetching = false;
            state.deleteUser.error = false;

            // Cập nhật lại danh sách người dùng sau khi xóa
            if (state.getAllUser.currentUser && Array.isArray(state.getAllUser.currentUser)) {
                state.getAllUser.currentUser = state.getAllUser.currentUser.filter(
                    (currentUser) => currentUser._id !== action.payload // payload là id của người dùng đã xóa
                );
            }
        },
        updateUserSuccess: (state, action) => {
            state.getAllUser.currentUser = action.payload;
        }
        // deleteUserFailed: (state) => {
        //     // state.deleteUser.isFetching = false;
        //     state.deleteUser.error = true;
        // },
    },
});

export const {
    getAllUserStart,
    getAllUserSuccess,
    getAllUserFailed,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed,
    updateUserSuccess
} = userSlice.actions;

export default userSlice.reducer;