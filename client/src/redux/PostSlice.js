import { createSlice } from "@reduxjs/toolkit";


const PostSlice = createSlice({
    name: "Post",
    initialState: {
        getAllPost: {
            currentPost: [],
            isFetching: false,
            Error: false
        }
    },
    reducers: {
        getAllPostStart: (state) => {
            state.getAllPost.isFetching = true
        },
        getAllPostSuccess: (state, action) => {
            state.getAllPost.currentPost = action.payload
            state.getAllPost.isFetching = false
            state.getAllPost.Error = false
        },
        getAllPostFailed: (state) => {
            state.getAllPost.isFetching = false
            state.getAllPost.Error = true
        },
        deletePostStart: (state) => {
            state.getAllPost.isFetching = true
        },
        deletePostSuccess: (state, action) => {
            state.getAllPost.isFetching = false
        },  
        deletePostFailed: (state) => {
            state.getAllPost.isFetching = false
            state.getAllPost.Error = true
        },
        
    }

})
export const {
    getAllPostStart,
    getAllPostSuccess,
    getAllPostFailed,
    deletePostStart,
    deletePostSuccess,
    deletePostFailed

} = PostSlice.actions

export default PostSlice.reducer;