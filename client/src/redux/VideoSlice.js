import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    createVideo: {
        isFetching: false,
        error: false,
        success: false
    },
    getAllVideo: {
        currentVideo: [],
        isFetching: false,
        error: false,
        success: false
    },
    deleteVideo: {
        isFetching: false,
        error: false,
        success: false,
        deletedVideoId: null
    }
};

const videoSlice = createSlice({
    name: 'Video',
    initialState,
    reducers: {
        //createVideo
        createVideoStart: (state) => {
            if (state.createVideo) {
                state.createVideo.isFetching = true;
            }
        },
        createVideoSuccess: (state) => {
            if (state.createVideo) {
                state.createVideo.isFetching = false;
                state.createVideo.error = false;
                state.createVideo.success = true;
            }
        },
        createVideoFailed: (state) => {
            if (state.createVideo) {
                state.createVideo.isFetching = false;
                state.createVideo.error = true;
            }
        },
        // getVideo
        getAllVideoStart: (state) => {
            if (state.getAllVideo) {
                state.getAllVideo.isFetching = true;
            }
        },
        getAllVideoSuccess: (state, action) => {
            if (state.getAllVideo) {
                state.getAllVideo.isFetching = false;
                state.getAllVideo.currentVideo = action.payload;
                state.getAllVideo.success = true;
                state.getAllVideo.error = false;
            }
        },
        getAllVideoFailed: (state) => {
            if (state.getAllVideo) {
                state.getAllVideo.isFetching = false;
                state.getAllVideo.error = true;
                state.getAllVideo.success = false;
            }
        },
        // deleteVideo
        deleteVideoStart: (state) => {
            if (state.deleteVideo) {
                state.deleteVideo.isFetching = true;
                state.deleteVideo.error = false;
                state.deleteVideo.success = false;
            }
        },
        deleteVideoSuccess: (state, action) => {
            if (state.deleteVideo && state.getAllVideo) {
                state.deleteVideo.isFetching = false;
                state.deleteVideo.error = false;
                state.deleteVideo.success = true;
                state.deleteVideo.deletedVideoId = action.payload;
                // Xóa video khỏi danh sách
                state.getAllVideo.currentVideo = state.getAllVideo.currentVideo.filter(
                    video => video._id !== action.payload
                );
            }
        },
        deleteVideoFailed: (state) => {
            if (state.deleteVideo) {
                state.deleteVideo.isFetching = false;
                state.deleteVideo.error = true;
                state.deleteVideo.success = false;
            }
        }
    }
});

export const { 
    createVideoStart, 
    createVideoSuccess, 
    createVideoFailed, 
    getAllVideoStart, 
    getAllVideoSuccess, 
    getAllVideoFailed, 
    deleteVideoStart, 
    deleteVideoSuccess, 
    deleteVideoFailed 
} = videoSlice.actions;

export default videoSlice.reducer;