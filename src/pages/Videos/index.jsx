import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import VideoTable from "../../components/Tables/VideoTable";
import Button from "../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import styles from "./styles.module.scss";

const Videos = () => {
  const { videos } = useSelector((state) => state.videos);

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h1>
          Videos <MusicNoteIcon />
        </h1>
        <Link to="/videos/new">
          <Button startIcon={<AddIcon />} label="Adicionar novo video" />
        </Link>
      </div>
      <VideoTable videos={videos} />
    </div>
  );
};

export default Videos;
