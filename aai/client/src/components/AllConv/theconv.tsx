import DisplayConv from '.'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { redirect } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import * as socketIO from "socket.io-client";

// const socket = socketIO.connect('http://localhost:4000');
// const socket = socketIO.connect('http://host.docker.internal:4000');
function TheConv(give: any) {
    // const navigate = useNavigate()
    // navigate('/Chat/conv')
    console.log(give)
	return <p>salut {give}</p>
    // return <p>salut</p>
	
}

export default TheConv
