import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createUser, updateUser } from "../../../redux/usersSlice/apiCalls";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";
import Button from "../../Button";
import TextField from "../../Inputs/TextField";
import Select from "../../Inputs/Select";
import Radio from "../../Inputs/Radio";
import PersonIcon from "@mui/icons-material/Person";
import styles from "./styles.module.scss";

const months = [
	{ name: "Janeiro", value: "01" },
	{ name: "Fevereiro", value: "02" },
	{ name: "Març", value: "03" },
	{ name: "Abril", value: "04" },
	{ name: "Maio", value: "05" },
	{ name: "Junho", value: "06" },
	{ name: "Julho", value: "07" },
	{ name: "Agosto", value: "08" },
	{ name: "Setembro", value: "09" },
	{ name: "Outubro", value: "10" },
	{ name: "Novembro", value: "11" },
	{ name: "Dezembro", value: "12" },
];

const genders = ["male", "female", "non-binary"];

const UserForm = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
		name: "",
		month: "",
		year: "",
		date: "",
		gender: "",
	});
	const { users, createUserProgress, updateUserProgress } = useSelector(
		(state) => state.users
	);
	const [errors, setErrors] = useState({});
	const { id } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const handleInputState = (name, value) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};

	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors((errors) => ({ ...errors, [name]: value }));
	};

	const schema = {
		email: Joi.string().email({ tlds: false }).required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		name: Joi.string().min(3).max(10).required().label("Name"),
	};

	useEffect(() => {
		if (id !== "new" && users) {
			const user = users.filter((user) => user._id === id);
			setData({
				email: user[0].email,
				name: user[0].name,
				month: user[0].month,
				year: user[0].year,
				date: user[0].date,
				gender: user[0].gender,
			});
		}
	}, [id, users]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			if (id !== "new") {
				const res = await updateUser(id, data, dispatch);
				res && history.push("/users");
			} else {
				const res = await createUser(data, dispatch);
				res && history.push("/users");
			}
		} else {
			console.log("Preencher Como deve Ser");
		}
	};

	return (
		<div className={styles.container}>
			<Paper className={styles.form_container}>
				<h1 className={styles.heading}>
					{id === "new" ? "Adicionar novo Usuário" : "Editar Usuário"} <PersonIcon />
				</h1>
				<form onSubmit={handleSubmit}>
					<div className={styles.input_container}>
						<TextField
							label="Qual é o seu email?"
							placeholder="Informe o email"
							name="email"
							handleInputState={handleInputState}
							schema={schema.email}
							handleErrorState={handleErrorState}
							value={data.email}
							error={errors.email}
							required={true}
						/>
					</div>
					{id === "new" && (
						<div className={styles.input_container}>
							<TextField
								label="Informe a password"
								placeholder="Informe a password"
								name="password"
								handleInputState={handleInputState}
								schema={schema.password}
								handleErrorState={handleErrorState}
								value={data.password}
								error={errors.password}
								type="password"
								required={true}
							/>
						</div>
					)}
					<div className={styles.input_container}>
						<TextField
							label="Como quer ser chamado?"
							placeholder="Informe o nome para o Perfil"
							name="name"
							handleInputState={handleInputState}
							schema={schema.name}
							handleErrorState={handleErrorState}
							value={data.name}
							error={errors.name}
							required={true}
						/>
					</div>
					<div className={styles.date_of_birth_container}>
						<p>Qual é a sua data de nascimento?</p>
						<div className={styles.date_of_birth}>
							<div className={styles.month}>
								<Select
									name="month"
									handleInputState={handleInputState}
									label="Mês"
									placeholder="Mês"
									options={months}
									value={data.month}
									required={true}
								/>
							</div>
							<div className={styles.date}>
								<TextField
									label="Dia"
									placeholder="Dia"
									name="date"
									value={data.date}
									handleInputState={handleInputState}
									required={true}
								/>
							</div>
							<div className={styles.year}>
								<TextField
									label="Ano"
									placeholder="YYYY"
									name="year"
									value={data.year}
									handleInputState={handleInputState}
									required={true}
								/>
							</div>
						</div>
					</div>
					<div className={styles.input_container}>
						<Radio
							label="Qual ê o seu gênero?"
							name="gender"
							handleInputState={handleInputState}
							options={genders}
							value={data.gender}
							required={true}
						/>
					</div>
					<Button
						type="submit"
						label={id === "new" ? "Adicionar" : "Actualizar"}
						isFetching={id === "new" ? createUserProgress : updateUserProgress}
						style={{ marginLeft: "auto" }}
					/>
				</form>
			</Paper>
		</div>
	);
};

export default UserForm;
