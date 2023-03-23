import { useEffect, useState } from 'react'
import axios from 'axios'
import TheConv from './theconv'
import { redirect } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function DisplayConv() {
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState(true)
    const [ownChannels, getOwnChannels] = useState<any>('')
    const [memberChannels, getMemberChannels] = useState<any>('')
    const [bannedChannels, getBannedChannels] = useState<any>('')
    const [adminChannels, getAdminChannels] = useState<any>('')
    const [allChannels, getAllChannels] = useState<any>('')
    const [oneChannel, getOneChannel] = useState<any>('')
    const [myArray, setMyArray] = useState<any>([])
    const [openOne, setOpenOne] = useState(false)

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
                .get(`/users/1/get_own_channels`, config)
                .then((response) => {
                    getOwnChannels(response.data)
                    let i = 0
                    while (i < response.data.own_channels.length) {
                        if (
                            !myArray.some((row: any) =>
                                row.includes(response.data.own_channels[i].id)
                            )
                        ) {
                            myArray.push([
                                response.data.own_channels[i].id,
                                response.data.own_channels[i].name,
                                response.data.own_channels[i].access,
                            ])
                        }
                        i++
                    }
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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await axios
                .get(`/users/1/get_admin_channels`, config)
                .then((response) => {
                    getAdminChannels(response.data)
                    let i = 0
                    while (i < response.data.admin_channels.length) {
                        if (
                            !myArray.some((row: any) =>
                                row.includes(response.data.admin_channels[i].id)
                            )
                        ) {
                            myArray.push([
                                response.data.admin_channels[i].id,
                                response.data.admin_channels[i].name,
                                response.data.admin_channels[i].access,
                            ])
                        }
                        i++
                    }
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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await axios
                .get(`/users/1/get_member_channels`, config)
                .then((response) => {
                    getMemberChannels(response.data)
                    let i = 0
                    while (i < response.data.member_channels.length) {
                        if (
                            !myArray.some((row: any) =>
                                row.includes(
                                    response.data.member_channels[i].id
                                )
                            )
                        ) {
                            myArray.push([
                                response.data.member_channels[i].id,
                                response.data.member_channels[i].name,
                                response.data.member_channels[i].access,
                            ])
                        }
                        i++
                    }
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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await axios
                .get(`/users/1/get_banned_channels`, config)
                .then((response) => {
                    getBannedChannels(response.data.banned_channels)
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

    // console.log(myArray)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await axios
                .get(`/channels`, config)
                .then((response) => {
                    getAllChannels(response.data)
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

    const [listId, setListId] = useState(true)
    const [give, setGive] = useState<any>('')
    const navigate = useNavigate()

    function TheConv2() {
        // console.log(give)
        // TheConv(give)
        // return <p>salut {give}</p>
        return TheConv(give)
    }

    function openConv(conv: any) {
        setListId(!listId)
        setGive(conv)
    }

    function LeaveButton(user: any) {
        const [error, setError] = useState<any>('')
        const [loading, setLoading] = useState(true)
        const [hasLeft, getHasLeft] = useState(false)

        //only works with 5 because need to change token
        // useEffect(() => {}, [])
        function addFriend() {
            getHasLeft(!hasLeft)
            const fetchData = async () => {
                setLoading(true)
                await axios
                    .delete(`users/` + user + `/remove_own_channel`, config) //2 got the friend request from the current user, e.g. 1.
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

            const fetchData2 = async () => {
                setLoading(true)
                await axios
                    .delete(`users/` + user + `/remove_member_channel`, config) //2 got the friend request from the current user, e.g. 1.
                    .then((response) => {
                        //     getAllUser(response.data)
                        setLoading(false)
                    })
                    .catch((err) => {
                        console.log(err.message)
                        setError(err.message)
                    })
            }
            fetchData2()

            const fetchData3 = async () => {
                setLoading(true)
                await axios
                    .delete(`users/` + user + `/remove_admin_channel`, config) //2 got the friend request from the current user, e.g. 1.
                    .then((response) => {
                        //     getAllUser(response.data)
                        setLoading(false)
                    })
                    .catch((err) => {
                        console.log(err.message)
                        setError(err.message)
                    })
            }
            fetchData3()
        }

        return (
            <div>
                {error && <p>{error}</p>}
                {!error && !hasLeft && (
                    <button onClick={addFriend}>Leave conv</button>
                )}
                {!error && hasLeft && <p>You left the conv !</p>}
            </div>
        )
    }

    function ViewAndCancel() {
        if (!allChannels) return null
        if (!ownChannels) return null
        if (!adminChannels) return null
        if (!memberChannels) return null
        if (!bannedChannels) return null
        return (
            <div>
                <p>Display all convs you are in here</p>
                {loading && <p>Loading ... </p>}
                {!loading && error && <p>{error}</p>}
                {!loading &&
                    !error &&
                    myArray.map((conv: any) => (
                        <li key={conv} onClick={() => openConv(conv)}>
                            Conv name: {conv[1]}, acces: {conv[2]}, you are:
                            {loading && <p>Loading ... </p>}
                            {!loading && error && <p>{error}</p>}
                            {!loading &&
                                !error &&
                                ownChannels.own_channels.map((conv2: any) => (
                                    <p key={conv2.name}>
                                        {conv[1] == conv2.name && (
                                            <span>OWNER</span>
                                        )}
                                    </p>
                                ))}
                            {loading && <p>Loading ... </p>}
                            {!loading && error && <p>{error}</p>}
                            {!loading &&
                                !error &&
                                adminChannels.admin_channels.map(
                                    (conv3: any) => (
                                        <p key={conv3.name}>
                                            {conv[1] == conv3.name && (
                                                <span>ADMIN</span>
                                            )}
                                        </p>
                                    )
                                )}
                            {loading && <p>Loading ... </p>}
                            {!loading && error && <p>{error}</p>}
                            {!loading &&
                                !error &&
                                memberChannels.member_channels.map(
                                    (conv4: any) => (
                                        <p key={conv4.name}>
                                            {conv[1] == conv4.name && (
                                                <span>MEMBER</span>
                                            )}
                                        </p>
                                    )
                                )}
                            {loading && <p>Loading ... </p>}
                            {!loading && error && <p>{error}</p>}
                            {!loading &&
                                !error &&
                                bannedChannels?.map((conv5: any) => (
                                    <p key={conv5.name}>
                                        {conv[1] == conv5.name && (
                                            <span>You are banned</span>
                                        )}
                                    </p>
                                ))}
                            {LeaveButton(conv[0])}
                        </li>
                    ))}
                {!listId && (
                    <span>
                        <TheConv2 />
                        ajouter le bouton close + cacher toutes les conv quand
                        on a clicke sur une
                    </span>
                )}
            </div>
        )
    }

    // function DisplayOneConv() {
    //     return <div>{openOne && <p>coucou</p>}</div>
    // }
    return (
        <div>
            <ViewAndCancel />
            {/* <DisplayOneConv /> */}
        </div>
    )
}

export default DisplayConv
