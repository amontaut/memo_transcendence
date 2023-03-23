import ChangeUsername from "./changeUsername";
import ChangeAvatar from "./changeAvatar";

function Settings()
{
	return (
		<div>
			<ChangeUsername />
			<p>File upload needs to be reviewed :</p>
			<ChangeAvatar />
		</div>
		
	)
}

export default Settings
