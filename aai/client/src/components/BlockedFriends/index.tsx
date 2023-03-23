import { useEffect, useState } from 'react'
import axios from 'axios'

function BlockedFriends() {
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState(true)
    const [allBlockedFriends, getBlockedFriends] = useState<any>('')

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
                .get(`/users/1/get_blocked`, config)
                .then((response) => {
                    getBlockedFriends(response.data)
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

    function UnblockButton() {
        const [error, setError] = useState<any>('')
        const [loading, setLoading] = useState(true)
        const [unblockFriend, setUnblockFriend] = useState(true)
        function UnblockFriend() {
            setUnblockFriend(!unblockFriend)
            const fetchData = async () => {
                setLoading(true)
                await axios
                    .delete(`/users/` + 1 + `/remove_blocked`, {
                        headers: {
                            //Token de celui qu'on veut deblock (comme pour delete friend request) (ici, 5)
                            Authorization:
                                `Bearer ` +
                                `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWQ0MiI6ImJsb2JsbyIsImlhdCI6MTY3OTMwMTI1MSwiZXhwIjoxNjc5MzM3MjUxfQ.0mF-5onrxT4_Nlq-A_PCDacLIXCAKGua6MpDBkaevjI`,
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
        }

        return (
            <div>
                {/* dans blocked : colomn A = a celui qui a bloqué // B: celui qui a ete bloqué par A*/}

                {error && <p>{error}</p>}
                {!error && unblockFriend && (
                    <button onClick={UnblockFriend}>Unblock Friend</button>
                )}
                {!error && !unblockFriend && (
                    <p>Friend Unblocked (reload page)</p>
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
                        allBlockedFriends.blocked?.map((request: any) => (
                            <li key={request.username}>
                                {request.username}, {request.id}
                                {UnblockButton()}
                            </li>
                        ))}
                </ul>
            </div>
        )
    }

    return <ViewAndCancel />
}

export default BlockedFriends
