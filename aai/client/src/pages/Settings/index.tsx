import Settings from "../../components/Settings"
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios';

function usersSettings() {
	return (
		<div>
			<h1>&lsaquo;username&rsaquo;</h1>
			<Settings/>
		</div>
	)

}

export default usersSettings