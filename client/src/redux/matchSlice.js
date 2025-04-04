import { createSlice } from "@reduxjs/toolkit";

const matchSlice = createSlice({
    name: "match",
    initialState: {
        Schedule: {
            currentMatch: [],
            isFetching: false,
            error: false
        },
        delete: {
            isFetching: false,
            error: false,
            success: false
        }
    },
    reducers: {
        ScheduleStart: (state) => {
            state.Schedule.isFetching = true
        },
        ScheduleSuccess: (state, action) => {
            state.Schedule.isFetching = false
            state.Schedule.currentMatch = action.payload
            state.Schedule.error = false
        },
        ScheduleFailed: (state) => {
            state.Schedule.isFetching = false
            state.Schedule.error = true
        },
        getAllScheduleStart: (state) => {
            state.Schedule.isFetching = true
        },
        getAllScheduleSuccess: (state, action) => {
            state.Schedule.isFetching = false
            state.Schedule.currentMatch = action.payload
            state.Schedule.error = false
        },
        getAllScheduleFailed: (state) => {
            state.Schedule.isFetching = false
            state.Schedule.error = true
        },
        deleteScheduleStart: (state) => {
            state.delete.isFetching = true
        },
        deleteScheduleSuccess: (state) => {
            state.delete.success = true
            state.delete.isFetching = false
            state.delete.error = false
        },
        deteteScheduleFailed: (state) => {
            state.delete.error = true
            state.delete.isFetching = false
            state.delete.success = false
        }


    }
});
export const {
    ScheduleStart,
    ScheduleSuccess,
    ScheduleFailed,
    getAllScheduleStart,
    getAllScheduleSuccess,
    getAllScheduleFailed,
    deleteScheduleStart,
    deleteScheduleSuccess,
    deteteScheduleFailed

} = matchSlice.actions
export default matchSlice.reducer;