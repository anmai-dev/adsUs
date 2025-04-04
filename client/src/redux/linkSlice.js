import { createSlice } from '@reduxjs/toolkit';

const linkSlice = createSlice({
    name: 'link',
    initialState: {
       Link: {
        links: [],
        loading: false,
        error: null
       }
    },
    reducers: {
        getLinkStart: (state) => {
            state.getLink.loading = true
        },
        getLinkSuccess: (state, action) => {
            state.getLink.loading = false
            state.getLink.links = action.payload
        },
        getLinkFailure: (state, action) => {
            state.getLink.loading = false       
            
        }
    }
})

export const { getLinkStart, getLinkSuccess, getLinkFailure } = linkSlice.actions
export default linkSlice.reducer

