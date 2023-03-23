import { useEffect, useState } from 'react'
import axios from 'axios'

function SearchInviteFriends() {
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState(true)
    const [allUsers, getAllUser] = useState<any>('')
    const [state, setstate] = useState<any>({
        query: '',
        list: [],
    })

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
                .get(`/users/`)
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

    // console.log(allBlocked)
    // // console.log(allBlocked[0].id)
    // console.log('1 ' + isBlocked)
    // console.log('2 ' + isBlocked)
    // useEffect(() => {
    //     if (!loading && allBlocked && allBlocked[0].id == 1) {
    //         setIsBlocked(true)
    //         console.log('passe 2')
    //     }
    // }, [])

    const handleChange = (e: any) => {
        const results = allUsers.filter((post: any) => {
            if (e.target.value === '') return allUsers
            return post.username
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        })
        setstate({
            query: e.target.value,
            list: results,
        })
    }

    //find string
    function findId(usr: string) {
        for (let i = 0; i < allUsers.length; i++) {
            if (usr === allUsers[i].username) {
                return allUsers[i].id
            }
        }
    }

    function AddFriendButton(user: any) {
        const [error, setError] = useState<any>('')
        const [loading, setLoading] = useState(true)
        const [sendFriendRequest, setSendFriendRequest] = useState(true)
        const [isBlocked, setIsBlocked] = useState(false)
        const [allBlocked, getAllBlocked] = useState<any>('')
        const [allFriends, getAllFriends] = useState<any>('')
        const [isFriend, setIsFriend] = useState(false)

        const config5 = {
            headers: {
                Authorization:
                    `Bearer ` +
                    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWQ0MiI6ImJsb2JsbyIsImlhdCI6MTY3OTMwMTI1MSwiZXhwIjoxNjc5MzM3MjUxfQ.0mF-5onrxT4_Nlq-A_PCDacLIXCAKGua6MpDBkaevjI`,
            },
        }

        //only works with 5 because need to change token
        useEffect(() => {
            const fetchData = async () => {
                setLoading(true)
                await axios
                    .get(`/users/` + user.id + `/get_blocked`, config5)
                    .then((response) => {
                        getAllBlocked(response.data.blocked)
                        setLoading(false)
                    })
                    .catch((err) => {
                        console.log(err.message)
                        setError(err.message)
                    })
            }
            fetchData()
        }, [])

        useEffect(() => {
            const fetchData = async () => {
                setLoading(true)
                await axios
                    .get(`users/1/get_friends`, config)
                    .then((response) => {
                        getAllFriends(response.data.friends)
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

        function addFriend() {
            setSendFriendRequest(!sendFriendRequest)
            //only works with user 5 because token du 5
            for (let i = 0; i < allBlocked.length; i++) {
                if (allBlocked[i].id == 1) {
                    setIsBlocked(!isBlocked)
                }
            }
            for (let i = 0; i < allFriends.length; i++) {
                if (allFriends[i].id == user.id) {
                    setIsFriend(!isFriend)
                }
            }
            //remplacer find id par user.id ?
            if (isBlocked && isFriend) {
                const addId = findId(user.username)
                const fetchData = async () => {
                    setLoading(true)
                    await axios
                        .post(
                            `/users/` + addId + `/add_friend_request`,
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
        }

        return (
            <div>
                {error && <p>{error}</p>}
                {!error && sendFriendRequest && (
                    <button onClick={addFriend}>
                        Send friend request/Add friend
                    </button>
                )}
                {!error && !sendFriendRequest && !isBlocked && !isFriend && (
                    <p>Request sent !</p>
                )}

                {!error && !sendFriendRequest && isBlocked && (
                    <p>5 blocked you</p>
                )}

                {!error && !sendFriendRequest && isFriend && (
                    <p>You are already friends</p>
                )}
            </div>
        )
    }

    function BlockUserButton(user: any) {
        const [error, setError] = useState<any>('')
        const [loading, setLoading] = useState(true)
        const [Userblocked, setUserblocked] = useState(true)

        function blockUser() {
            setUserblocked(!Userblocked)
            const addId = findId(user)
            const fetchData = async () => {
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
                    {!loading && !error && state.query === ''
                        ? ''
                        : state.list?.map((post: any) => {
                              return (
                                  <li key={post.username}>
                                      {post.username}, {post.id}
                                      {AddFriendButton(post)}
                                      {BlockUserButton(post.username)}
                                  </li>
                              )
                          })}
                </ul>
            </div>
        )
    }

    return (
        <div>
            <div>
                <form>
                    <input
                        onChange={handleChange}
                        value={state.query}
                        type="search"
                    />
                </form>
            </div>
            <ViewAndCancel />
        </div>
    )
}

export default SearchInviteFriends
