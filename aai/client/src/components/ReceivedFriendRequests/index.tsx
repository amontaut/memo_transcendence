import { useEffect, useState } from 'react'
import axios from 'axios'

function ReceivedFriendRequests() {
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState(true)
    const [allReceivedFriendRequests, getReceivedFriendRequests] =
        useState<any>('')

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
                .get(`users/1/get_friend_requests_received`, config)
                .then((response) => {
                    getReceivedFriendRequests(response.data)
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

    function ConfirmButton(user: any) {
        const [error, setError] = useState<any>('')
        const [loading, setLoading] = useState(true)
        const [confirmRequest, setConfirmRequest] = useState(true)
        const [Userblocked, setUserblocked] = useState(true)

        function confirmFriend() {
            setConfirmRequest(!confirmRequest)
            // // enlever l'ID des friend request
            const fetchData = async () => {
                setLoading(true)
                await axios
                    .delete(`/users/` + 1 + `/remove_friend_request`, {
                        headers: {
                            //Token de celui qui a envoye la friend request (ici, 4)
                            Authorization:
                                `Bearer ` +
                                `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWQ0MiI6ImFhYSIsImlhdCI6MTY3OTMwMTIyMywiZXhwIjoxNjc5MzM3MjIzfQ.aBBdjdBIHcYRu0PUvxy7iA2eACc7oVPWuefUzclbtO4`,
                        },
                    })
                    .then((response) => {
                        setLoading(false)
                    })
                    .catch((err) => {
                        console.log(err.message)
                        setError(err.message)
                    })
            }
            fetchData()
            //ajouter dans la liste d'amis
            const fetchData2 = async () => {
                setLoading(true)
                await axios
                    .post(
                        `users/ ` + user.id + `/add_friend`,
                        { withCredentials: true },
                        config
                    )
                    .then((response) => {
                        setLoading(false)
                    })
                    .catch((err) => {
                        console.log(err.message)
                        setError(err.message)
                    })
            }
            fetchData2()
        }

        function blockUser() {
            setUserblocked(!Userblocked)
            const addId = user.id
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
                {/* dans friend req received : colomn A = a celui qui receive // B: celui qui a sent*/}
                {/* dans friend req sent : colomn A = a celui qui send // B: celui qui a receive*/}

                {error && <p>{error}</p>}
                {!error && confirmRequest && (
                    <button onClick={confirmFriend}>
                        Confirm friend request
                    </button>
                )}
                {!error && !confirmRequest && <p>Friend added !</p>}
                {!error && Userblocked ? (
                    <button onClick={blockUser}>
                        Block user
                    </button>
                ) : (
                    <p>User blocked!</p>
                )}
            </div>
        )
    }

    function ConfirmAndAdd() {
        return (
            <div>
                RECEIVED: (confirmed button marche only avec users 4 et 1 car il faut changer token du 4)
                <ul>{loading && <p>Loading ... </p>}
                {!loading && error && <p>{error}</p>}
                {!loading &&
                    !error &&
                    allReceivedFriendRequests.friend_requests_received?.map(
                        (request: any) => (
                            <li key={request.username}>
                                {request.username}, {request.id}
                                {ConfirmButton(request)}
                            </li>
                        )
                        )}
                    </ul>
            </div>
        )
    }

    return <ConfirmAndAdd />
}

export default ReceivedFriendRequests
