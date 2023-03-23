import StartConv from "../../components/StartConv"
import DisplayConv from "../../components/AllConv"
import { useEffect, useState, useRef } from "react"

function Chat()
{
	return (
		<div>
			{/* <p>Display all conv / one conv / public, private, protected chans / owner / admin / mute / blocked / invite to play a pong</p> */}
			<StartConv />
			<DisplayConv />
		</div>
	)
}

export default Chat

