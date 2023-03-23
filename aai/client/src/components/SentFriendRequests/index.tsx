import { useEffect, useState } from 'react'
import axios from 'axios'

function SentFriendRequests() {
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState(true)
    const [allSentFriendRequests, getSentFriendRequests] =
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
                .get(`users/1/get_friend_requests_sent`, config)
                .then((response) => {
                    getSentFriendRequests(response.data)
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

    function CancelButton(user: any) {
        const [error, setError] = useState<any>('')
        const [loading, setLoading] = useState(true)
        const [cancelRequest, setCancelRequest] = useState(true)
        function cancelFriend() {
            setCancelRequest(!cancelRequest)
            const fetchData = async () => {
                setLoading(true)
                await axios
                    .delete(`/users/` + user.id + `/remove_friend_request`, config 
                    )
                    .then((response) => {
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
                {!error && cancelRequest && (
                    <button onClick={cancelFriend}>
                        Cancel friend request
                    </button>
                )}
                {!error && !cancelRequest && <p>Request cancelled</p>}
            </div>
        )
    }

    function ViewAndCancel() {
        return (
            <div>
                SENT:
            <ul>
                {loading && <p>Loading ... </p>}
                {!loading && error && <p>{error}</p>}
                {!loading &&
                    !error &&
                    allSentFriendRequests.friend_requests_sent?.map(
                        (request: any) => (
                            <li key={request.username}>
                                {request.username}, {request.id}
                                {CancelButton(request)}
                            </li>
                        )
                        )}
                    </ul>
            </div>
        )
    }

    return <ViewAndCancel />
}

export default SentFriendRequests
