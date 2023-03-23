import { useEffect, useState, useRef } from "react"
import axios from 'axios';

const FieldInput = (props:any) => {
	const { label, errorMessage, type, ...inputProps } = props;
	return (
			<div>
			<label>{label}</label>
			<input
			type={type}
			{...inputProps}
			/>
			<span className="error-msg">{errorMessage}</span>
			</div>
		   );
};

const inputs = [
{
	id: 1,
	name: "username",
	label: "New userame: ",
	type: "text",
	placeholder: "Enter new username here",
	pattern: "^[A-Za-z0-9]{3,50}$",
	required: true,
	errorMessage:
		"Username should be 3 to 50 characters, only alphanumeric characters",
}
];

function ChangeUsername() {
	const [error, setError] = useState<any>('');
	const [loading, setLoading] = useState(true);
	let [allUsers, getAllUser] = useState<any>('');

	useEffect(() => {
		const fetchData = async () => {
		setLoading(true);
		await axios.get(`/users/`)
		.then((response) => {
				getAllUser(response.data);
				setLoading(false);
				})
		.catch((err) => {
				console.log(err.message);
				setError(err.message)
				})
		}
		fetchData();
		}, [])

	const onSubmit = (event: any) =>
	{
		let dbPath = `/users/` + `1`
		let newUsername: string = event.target.username.value
		if (allUsers) {
			for (var i = 0; i < allUsers.length; i++)
			{
				if (allUsers[i].username == newUsername)
				{
					alert("Username already in use or same as the previous one. Try again.")
						return
				}
			}
		}
		//Small bug : when we enter a valid username (not in double) then we enter a username already in use we got 500 error. Any other case works well
	event.preventDefault()
		axios
		.patch(dbPath, { username: newUsername})
		.then((response) => {
				getAllUser(response.data);
				setLoading(false);
				alert("Username changed")
				})
	.catch((err) => {
			console.log(err.message);
			setError(err.message)
			})
	};

	return (
		<div >
    		{loading && <p>Loading ... </p>}
			{!loading && error && <p>{error}</p>}
			
			<form onSubmit={onSubmit}>
			{!loading && !error && inputs.map((input:any) => (
						<FieldInput
						key={input.id}  {...input} value={input[input.name]}
						/>
						))}
			<button type="submit">Change it!</button>
			</form>
			</div>
		   );
}

export default ChangeUsername
