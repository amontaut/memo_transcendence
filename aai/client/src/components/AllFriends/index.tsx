import { useEffect, useState } from 'react'
import axios from 'axios'

function AllFriends() {
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState(true)
    const [allFriends, getAllFriends] = useState<any>('')

    const config = {
        headers: {
            Authorization:
                `Bearer ` +
                `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWQ0MiI6ImFtb250YXV0IiwiaWF0IjoxNjc5NTgyMjk0LCJleHAiOjE2Nzk2MTgyOTR9.Ms7q2nRVIbxOvTb2-KDZpmmEKTRMszi6PTsOpeahbWE`,
        },
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await axios
                .get(`users/1/get_friends`, config)
                .then((response) => {
                    getAllFriends(response.data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err.message)
                    setError(err.message)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
        fetchData()
    }, [])

    function BlockUserButton(user: any) {
        const [error, setError] = useState<any>('')
        const [loading, setLoading] = useState(true)
        const [sendFriendRequest, setSendFriendRequest] = useState(true)
        const [Userblocked, setUserblocked] = useState(true)
        function blockUser() {
            setUserblocked(!Userblocked)
            const addId = user
            const fetchData = async () => {
                console.log(addId)
                setLoading(true)
                await axios
                    .post(
                        `/users/` + addId + `/add_blocked`,
                        { withCredentials: true },
                        config
                    ) //2 got the friend request from the current user, e.g. 1.
                    .then((response) => {
                        //     getAllUser(response.data)
                        setLoading(false)
                    })
                    .catch((err) => {
                        console.log(err.message)
                        setError(err.message)
                    })
            }
            fetchData()
        }

        return (
            <div>
                {error && <p>{error}</p>}
                {!error && Userblocked ? (
                    <button onClick={blockUser}>Block user</button>
                ) : (
                    <p>User blocked!</p>
                )}
            </div>
        )
    }

    function ViewAndCancel() {
        return (
            <div>
                <ul>
                    {loading && <p>Loading ... </p>}
                    {!loading && error && <p>{error}</p>}
                    {!loading &&
                        !error &&
                        allFriends.friends?.map((request: any) => (
                            <li key={request.username}>
                                {request.username}, {request.id}
                                {BlockUserButton(request.id)}
                            </li>
                        ))}
                </ul>
            </div>
        )
    }

    return <ViewAndCancel />
}

export default AllFriends
