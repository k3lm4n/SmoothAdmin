import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from "./index";

export const createVideo = async (video, dispatch) => {
	dispatch(actions.createVideoStart());
	try {
		const { data } = await axiosInstance.post("/videos", video);
		dispatch(actions.createVideoSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.createVideoFailure());
		return false;
	}
};

export const getAllVideos = async (dispatch) => {
	dispatch(actions.getAllVideosStart());
	try {
		const { data } = await axiosInstance.get("/videos");
		dispatch(actions.getAllVideosSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getAllVideosFailure());
		return false;
	}
};

export const updateVideo = async (id, video, dispatch) => {
	dispatch(actions.updateVideoStart());
	try {
		const { data } = await axiosInstance.put(`/videos/${id}`, video);
		dispatch(actions.updateVideoSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.updateVideoFailure());
		return false;
	}
};

export const deleteVideo = async (id, dispatch) => {
	dispatch(actions.deleteVideoStart());
	try {
		const { data } = await axiosInstance.delete(`/videos/${id}`);
		dispatch(actions.deleteVideoSuccess(id));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.deleteVideoFailure());
		return false;
	}
};
