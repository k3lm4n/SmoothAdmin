import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { createVideo, updateVideo } from "../../../redux/videosSlice/apiCalls";
import { toast } from "react-toastify";
import Joi from "joi";
import TextField from "../../Inputs/TextField";
import FileInput from "../../Inputs/FileInput";
import Button from "../../Button";
import { Paper } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ImageIcon from "@mui/icons-material/Image";
import styles from "./styles.module.scss";

const VideoForm = () => {
	const [data, setData] = useState({
		name: "",
		artist: "",
		img: null,
		video: null,
		duration: 0,
	});
	const [errors, setErrors] = useState({ name: "", artist: "" });
	const { videos, createSongProgress, updateSongProgress } = useSelector(
		(state) => state.videos
	);
	const { id } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const video = videos.filter((video) => video._id === id);
		if (id !== "new" && video[0]) {
			setData({
				name: video[0].name,
				artist: video[0].artist,
				video: video[0].video,
				img: video[0].img,
			});
		}
	}, [id, videos]);

	const schema = {
		name: Joi.string().required().label("Name"),
		artist: Joi.string().required().label("Artist"),
		img: Joi.string().required().label("Image"),
		video: Joi.string().required().label("Video"),
		duration: Joi.number().required(),
	};

	const handleInputState = (name, value) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};

	const handleErrorState = (name, value) => {
		setErrors((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { error } = Joi.object(schema).validate(data);
		if (!error) {
			if (id === "new") {
				const res = await createSong(data, dispatch);
				res && history.push("/videos");
			} else {
				const res = await updateSong(id, data, dispatch);
				res && history.push("/videos");
			}
		} else {
			toast.error(error.message);
		}
	};

	return (
		<div className={styles.container}>
			<Paper className={styles.form_container}>
				<h1 className={styles.heading}>
					{id === "new" ? "Adicionar nova Música" : "Editar Música"} <MusicNoteIcon />
				</h1>
				<form onSubmit={handleSubmit}>
					<div className={styles.input_container}>
						<TextField
							name="name"
							label="Título da Música"
							handleInputState={handleInputState}
							handleErrorState={handleErrorState}
							schema={schema.name}
							error={errors.name}
							value={data.name}
							required={true}
						/>
					</div>
					<div className={styles.input_container}>
						<TextField
							name="artist"
							label="Nome do Artista"
							handleInputState={handleInputState}
							required={true}
							value={data.artist}
							handleErrorState={handleErrorState}
							schema={schema.artist}
							error={errors.artist}
						/>
					</div>
					<div className={styles.file_container}>
						<FileInput
							label="Escolha a Música"
							icon={<MusicNoteIcon />}
							type="audio"
							name="video"
							handleInputState={handleInputState}
							value={data.video}
						/>
					</div>
					<div className={styles.file_container}>
						<FileInput
							label="Escolha a imagem"
							icon={<ImageIcon />}
							type="image"
							name="img"
							value={data.img}
							handleInputState={handleInputState}
						/>
					</div>
					<Button
						type="submit"
						label={id === "new" ? "Adcionar" : "Actualizar"}
						isFetching={id === "new" ? createSongProgress : updateSongProgress}
						style={{ marginLeft: "auto" }}
					/>
				</form>
			</Paper>
		</div>
	);
};

export default VideoForm;
