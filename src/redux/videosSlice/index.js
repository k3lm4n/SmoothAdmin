import { createSlice } from "@reduxjs/toolkit";

export const videosSlice = createSlice({
	name: "videos",
	initialState: {
		videos: [],
		createVideoProgress: false,
		getAllVideosProgress: false,
		updateVideoProgress: false,
		deleteVideoProgress: false,
		error: false,
	},
	reducers: {
		createVideoStart: (state) => {
			state.createVideoProgress = true;
		},
		createVideoSuccess: (state, action) => {
			state.videos.push(action.payload);
			state.createVideoProgress = false;
		},
		createVideoFailure: (state) => {
			state.error = true;
			state.createVideoProgress = false;
		},

		getAllVideosStart: (state) => {
			state.getAllVideosProgress = true;
		},
		getAllVideosSuccess: (state, action) => {
			state.videos = action.payload;
			state.getAllVideosProgress = false;
		},
		getAllVideosFailure: (state) => {
			state.error = true;
			state.getAllVideosProgress = false;
		},

		updateVideoStart: (state) => {
			state.updateVideoProgress = true;
		},
		updateVideoSuccess: (state, action) => {
			const index = state.videos.findIndex(
				(video) => video._id === action.payload._id
			);
			state.videos[index] = action.payload;
			state.updateVideoProgress = false;
		},
		updateVideoFailure: (state) => {
			state.error = true;
			state.updateVideoProgress = false;
		},

		deleteVideoStart: (state) => {
			state.deleteVideoProgress = true;
		},
		deleteVideoSuccess: (state, action) => {
			state.videos = state.videos.filter((video) => video._id !== action.payload);
			state.deleteVideoProgress = false;
		},
		deleteVideoFailure: (state) => {
			state.error = true;
			state.deleteVideoProgress = false;
		},
	},
});

export const {
	createVideoStart,
	createVideoSuccess,
	createVideoFailure,
	getAllVideosStart,
	getAllVideosSuccess,
	getAllVideosFailure,
	updateVideoStart,
	updateVideoSuccess,
	updateVideoFailure,
	deleteVideoStart,
	deleteVideoSuccess,
	deleteVideoFailure,
} = videosSlice.actions;

export default videosSlice.reducer;
