import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteVideo } from "../../../redux/videosSlice/apiCalls";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Paper,
	IconButton,
	CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles.module.scss";

const VideoTable = ({ videos }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	setTimeout(() => setLoading(false), 1000);

	const handleDelete = (id) => {
		deleteVideo(id, dispatch);
	};

	return (
		<TableContainer component={Paper} className={styles.table_container}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Capa</TableCell>
						<TableCell align="center">Título</TableCell>
						<TableCell align="center">Artista</TableCell>
						<TableCell align="center">Açōes</TableCell>
					</TableRow>
				</TableHead>
				{loading && (
					<TableBody>
						<TableRow>
							<TableCell align="center"></TableCell>
							<TableCell align="center"></TableCell>
							<TableCell align="left">
								<CircularProgress
									style={{ color: "#1ed760", margin: "2rem 0" }}
								/>
							</TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</TableBody>
				)}
				{!loading && (
					<TableBody>
						{videos.length !== 0 &&
							videos.map((video, index) => (
								<TableRow key={video._id}>
									<TableCell align="center">
										<img className={styles.video_img} src={video.img} alt="" />
									</TableCell>
									<TableCell align="center">{video.name}</TableCell>
									<TableCell align="center">{video.artist}</TableCell>
									<TableCell align="center">
										<Link to={`/videos/${video._id}`}>
											<IconButton className={styles.edit_btn}>
												<EditIcon />
											</IconButton>
										</Link>
										<IconButton
											className={styles.delete_btn}
											onClick={() => handleDelete(video._id)}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						{videos.length === 0 && (
							<TableRow>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center">
									<img
										className={styles.no_data_img}
										src="./noData.svg"
										alt=""
									/>
								</TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						)}
					</TableBody>
				)}
			</Table>
		</TableContainer>
	);
};

export default VideoTable;
