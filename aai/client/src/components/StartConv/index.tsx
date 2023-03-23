import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

function StartConv() {
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState(true)
    let [allUsers, getAllUser] = useState<any>('')
    const [NewConv, isNewConvOn] = useState(true)
    const [accessType, setUserChoice] = useState('')
    const [Pwd, pwd] = useState<any>('')
    const [ConfirmPwd, confirmPwd] = useState<any>('')

    const FieldInput = () => {
        return (
            <div>
                <div>
                    <label>"Enter a topic/name for your conv: "</label>
                    <input
                        type="text"
                        name="topic"
                        placeholder="Enter topic/name here"
                        pattern="^[A-Za-z0-9]{3,50}$"
                        required
                    />
                    <span className="error-msg">
                        {
                            'Topic/name should be 3 to 50 characters, only alphanumeric characters'
                        }
                    </span>
                </div>

                <div>
                    <label htmlFor="access_type">
                        Chose the level of acces - public is public - protected
                        is with a password - private is on invite
                    </label>
                    <select
                        name="access"
                        id="access_type"
                        onChange={(e) => setUserChoice(e.target.value)}
                        required
                    >
                        <option value="">--Please choose an option--</option>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                        <option value="Protected">Protected</option>
                    </select>
                    <span className="error-msg">
                        {'Choose bewteen public, protected or private'}
                    </span>
                </div>

                <div>
                    {accessType === 'Protected' && (
                        <div>
                            <label htmlFor="convPass">
                                Password (8 characters minimum):
                            </label>
                            <input
                                type="password"
                                id="convPass"
                                name="convPass"
                                placeholder="Enter the conversation's password here"
                                pattern="^(?=.*[!@#$%^&*()_+\-=[\]{};':&quot;\\|,.<>/?])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).[^\s]{8,}$"
                                onChange={(e) => pwd(e.target.value)}
                                required
                            />
                            <span className="error-msg">
                                {
                                    'minimum 8 char, 1 special char, 1 lower case, 1 uppercase, 1 digit, no space'
                                }
                            </span>
                            Please confirm password :
                            <label htmlFor="confirmPwd">
                                Password (8 characters minimum):
                            </label>
                            <input
                                type="password"
                                id="confirmPwd"
                                name="confirmPwd"
                                placeholder="Confirm the conversation's password here"
                                pattern="^(?=.*[!@#$%^&*()_+\-=[\]{};':&quot;\\|,.<>/?])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).[^\s]{8,}$"
                                onChange={(e) => confirmPwd(e.target.value)}
                                required
                            />
                            {Pwd !== ConfirmPwd && (
                                <span className="error-msg">
                                    {'Passwords are not the same'}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await axios
                .get(`/channels/`)
                .then((response) => {
                    getAllUser(response.data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err.message)
                    setError(err.message)
                })
        }
        fetchData()
    }, [])

    const onSubmit = (event: any) => {
        event.preventDefault()
        let dbPath = `/channels/` + `1`
        const url = `/channels/`
        let data
        if (event.target.access.value == 'Protected') {
            data = {
                name: event.target.topic.value,
                access: event.target.access.value,
                password: event.target.convPass.value,
            }
        } else {
            data = {
                name: event.target.topic.value,
                access: event.target.access.value,
            }
        }

        console.log(data)
        const config = {
            headers: {
                Authorization:
                    `Bearer ` +
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWQ0MiI6ImFtb250YXV0IiwiaWF0IjoxNjc5NTgyMjk0LCJleHAiOjE2Nzk2MTgyOTR9.Ms7q2nRVIbxOvTb2-KDZpmmEKTRMszi6PTsOpeahbWE',
            },
        }
        // let newUsername: string = event.target.topic.value
        // console.log(event.target.convPass.value)
        axios
            .post(url, data, config)
            .then((response) => {
                // getAllUser(response.data)
                setLoading(false)
                alert('created')
            })
            .catch((err) => {
                console.log(err.message)
                setError(err.message)
            })
    }

    return (
        <div>
            {loading && <p>Loading ... </p>}
            {!loading && error && <p>{error}</p>}

            <button onClick={() => isNewConvOn(false)}>
                Start a new conversation
            </button>

            {!NewConv && (
                <form onSubmit={onSubmit}>
                    {!loading && !error && FieldInput()}
                    {Pwd === ConfirmPwd && (
                        <button type="submit">Create the conv</button>
                    )}
                </form>
            )}
        </div>
    )
}

export default StartConv
