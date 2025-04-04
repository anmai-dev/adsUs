import axios from 'axios'
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from './authSlice'
import { getAllUserStart, getAllUserSuccess, getAllUserFailed, deleteUserSuccess, updateUserSuccess } from './userSlice';
import { ScheduleStart, ScheduleSuccess, ScheduleFailed, getAllScheduleStart, getAllScheduleSuccess, getAllScheduleFailed, deleteScheduleSuccess } from "./matchSlice"
import { getAllPostStart, getAllPostSuccess, getAllPostFailed, deletePostStart, deletePostSuccess, deletePostFailed } from "./PostSlice"
import { 
    createVideoStart, 
    createVideoSuccess, 
    createVideoFailed, 
    getAllVideoStart, 
    getAllVideoSuccess, 
    getAllVideoFailed, 
    deleteVideoStart, 
    deleteVideoSuccess, 
    deleteVideoFailed 
} from "./VideoSlice"
import { getLinkStart, getLinkSuccess, getLinkFailure } from "./linkSlice"

// Configure axios to use the correct base URL
axios.defaults.baseURL = 'http://localhost:8000';

export const loginCall = async (User, dispatch, Navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/api/auth/login", User);
        dispatch(loginSuccess(res.data));
        Navigate("/")
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const registerCall = async (user, dispatch, Navigate) => {
    dispatch(registerStart());
    try {
        await axios.post("/api/auth/register", user);
        dispatch(registerSuccess());
        Navigate("/login");
    } catch (error) {
        dispatch(registerFailed());
    }
};

export const getAllUser = async (dispatch) => {
    dispatch(getAllUserStart());
    try {
        const res = await axios.get("/api/user/getall");
        dispatch(getAllUserSuccess(res.data));
    } catch (error) {
        dispatch(getAllUserFailed());
    }
};

export const deleteUser = async (accessToken, id, dispatch) => {
    dispatch(getAllUserStart());
    try {
        const res = await axios.delete(`/api/user/delete/${id}`, {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(deleteUserSuccess(id));
        dispatch(getAllUser(dispatch));
    } catch (error) {
        dispatch(getAllUserFailed());
    }
}

export const upDateUser = async (id, accessToken, user, dispatch) => {
    try {
        const res = await axios.put(`/api/user/${id}`, user, {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(updateUserSuccess(res.data));
        dispatch(getAllUser(dispatch));
    } catch (error) {
        console.log(error);
    }
}

export const ScheduleMatch = async (formData, accessToken, dispatch) => {
    dispatch(ScheduleStart());
    try {
        const res = await axios.post('/api/match/create', formData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(ScheduleSuccess(res.data));
        return res.data;
    } catch (error) {
        console.error("Error scheduling match:", error);
        dispatch(ScheduleFailed());
        throw error;
    }
};

export const getAllMatch = async (dispatch) => {
    dispatch(getAllScheduleStart());
    try {
        const res = await axios("/api/match/");
        dispatch(getAllScheduleSuccess(res.data));
    } catch (error) {
        dispatch(getAllScheduleFailed());
    }
}

export const deleteMatch = async (id, accessToken, dispatch) => {
    dispatch(getAllUserStart());
    try {
        const res = await axios.delete(`/api/match/${id}`, {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(deleteScheduleSuccess(res.data));
        dispatch(getAllMatch(dispatch));
    } catch (error) {
        dispatch(getAllUserFailed());
    }
}

export const creatNewPost = async (formData, dispatch, accessToken) => {
    dispatch(getAllPostStart());
    try {
        const headers = {};
        
        if (accessToken) {
            headers.token = `Bearer ${accessToken}`;
        }
        
        console.log("Sending FormData with files:", formData.has('imageTitle'));
        
        const res = await axios.post("/api/post/create", formData, { 
            headers,
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload progress: ${percentCompleted}%`);
            }
        });
        
        console.log("Upload thành công:", res.data);
        dispatch(getAllPostSuccess(res.data));
        return res.data;
    } catch (error) {
        console.error("Lỗi khi tạo bài viết:", error.response?.data || error.message);
        dispatch(getAllPostFailed());
        throw error;
    }
};

export const CreateVideo = async (formData, accessToken, dispatch) => {
    dispatch(createVideoStart());
    try {
        const res = await axios.post("/api/video/", formData, {
            headers: {
                token: `Bearer ${accessToken}`,
            }
        });
        dispatch(createVideoSuccess(res.data));
        return res.data;
    } catch (error) {
        console.error("Lỗi khi tạo video:", error);
        dispatch(createVideoFailed());
        throw error;
    }
};

export const getAllVideo = async (dispatch) => {
    dispatch(getAllVideoStart());
    try {
        const res = await axios.get("/api/video/");
        dispatch(getAllVideoSuccess(res.data));
    } catch (error) {
        dispatch(getAllVideoFailed());
    }
}

export const deleteVideo = async (id, accessToken, dispatch) => {
    dispatch(deleteVideoStart());
    try {
        const res = await axios.delete(`/api/video/${id}`, {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(deleteVideoSuccess(res.data));
    } catch (error) {
        dispatch(deleteVideoFailed());
    }
}
export const getAllPost = async (dispatch) => {
    dispatch(getAllPostStart());
    try {
        const res = await axios.get("/api/post");
        dispatch(getAllPostSuccess(res.data));
    } catch (error) {
        dispatch(getAllPostFailed());
    }
}
export const deletePost = async (id, dispatch) => {
    
    dispatch(deletePostStart())
    try {
       await axios.delete(`/api/post/${id}`) 
       dispatch(deletePostSuccess())
       dispatch(getAllPost(dispatch))
    } catch (error) {
        dispatch(deletePostFailed())
    }
}
export const createLink = async (formData, dispatch) => {
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }
    
    dispatch(getLinkStart())
    try {
        const res = await axios.post("/api/links/create", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        dispatch(getLinkSuccess(res.data))
        return res.data;
    } catch (error) {
        console.error("Error creating link:", error);
        dispatch(getLinkFailure())
        throw error;
    }
}   
// export const getAllLink = async (dispatch) => {
//     dispatch(getLinkStart())
//     try {
//         const res = await axios.get("/api/links")
//         dispatch(getLinkSuccess(res.data))
//     } catch (error) {
//         dispatch(getLinkFailure())
//     }
// }   

