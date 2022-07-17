import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PeopleIcon from "@mui/icons-material/People";
import ExitToApp from "@mui/icons-material/ExitToApp";
import styles from "./styles.module.scss";

const options = [
	{ name: "Dashboard", path: "/", icon: <DashboardIcon /> },
	{ name: "Usuários", path: "/users", icon: <PeopleIcon /> },
	{ name: "Músicas", path: "/songs", icon: <MusicNoteIcon /> },
	{ name: "Videos", path: "/videos", icon: <MusicNoteIcon /> },
];

const Sidebar = () => {
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logout());
		window.location = "/login";
	};

	return (
		<div className={styles.sidebar}>
			<h1 className={styles.logo}>Painel Admin</h1>
			<ul>
				{options.map((option) => (
					<li
						className={option.name === "logout" ? styles.logout_link : ""}
						key={option.name}
					>
						<NavLink
							className={styles.option}
							exact={option.path === "/" ? true : false}
							to={option.path}
							activeClassName={styles.sidebar_active}
						>
							{option.icon}
							<span>{option.name}</span>
						</NavLink>
					</li>
				))}
				<li className={styles.logout_link} onClick={logoutHandler}>
					<div className={styles.option}>
						<ExitToApp />
						<span>logout</span>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
