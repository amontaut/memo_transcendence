import { useEffect, useState } from 'react'
import axios, { all } from 'axios'

function MatchHistory() {
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState(true)
    const [allGames, getAllGames] = useState<any>('')

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
                .get(`game`)
                .then((response) => {
                    getAllGames(response.data)
                    // console.log(response.data)
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

    return (
        <div>
            <b>
                <u>Component User's History</u>
                <br />
            </b>
            <b>Ongoing games: (newest first)</b>
            <ul>
                {loading && <p>Loading ... </p>}
                {!loading && error && <p>{error}</p>}
                {!loading &&
                    !error &&
                    Object.values(allGames)
                        .sort((a: any, b: any) =>
                            a.craetedAt < b.craetedAt ? 1 : -1
                        )
                        .map(
                            (game: any, i) =>
                                game.status == 'GOING' &&
                                (game.player_twoId == 1 ||
                                    game.player_oneId == 1) && (
                                    <li key={i}>
                                        Player one: {game.player_one.username}{' '}
                                        (id: {game.player_oneId})
                                        <br />
                                        Player two: {
                                            game.player_two.username
                                        }{' '}
                                        (id: {game.player_twoId})
                                        <br />
                                        Current score: {game.player_one.username}'s score :{' '}
                                        {game.player_onePoints}pts, {game.player_two.username}'s score:
                                        {game.player_twoPoints}
                                        pts
                                        <br />
                                        Started on: {game.craetedAt}
                                        <br />
                                        Mode: {game.mode}
                                    </li>
                                )
                        )}
            </ul>
            <b>Games you won: (newest first)</b>
            <ul>
                {loading && <p>Loading ... </p>}
                {!loading && error && <p>{error}</p>}
                {!loading &&
                    !error &&
                    Object.values(allGames)
                        .sort((a: any, b: any) =>
                            a.craetedAt < b.craetedAt ? 1 : -1
                        )
                        .map(
                            (game: any, i) =>
                                game.status == 'ENDED' &&
                                game.winnerId == 1 &&
                                (game.player_twoId == 1 ||
                                    game.player_oneId == 1) && (
                                    <li key={i}>
                                        Player one: {game.player_one.username}{' '}
                                        (id: {game.player_oneId})
                                        <br />
                                        Player two: {
                                            game.player_two.username
                                        }{' '}
                                        (id: {game.player_twoId})
                                        <br />
                                        Final score: {game.player_one.username}'s score :{' '}
                                        {game.player_onePoints}pts, {game.player_two.username}'s score:
                                        {game.player_twoPoints}
                                        pts
                                        <br />
                                        Started on: {game.craetedAt}
                                        <br />
                                        Mode: {game.mode}
                                    </li>
                                )
                        )}
            </ul>
            <b>Games you lost: (newest first)</b>
            <ul>
                {loading && <p>Loading ... </p>}
                {!loading && error && <p>{error}</p>}
                {!loading &&
                    !error &&
                    Object.values(allGames)
                        .sort((a: any, b: any) =>
                            a.craetedAt < b.craetedAt ? 1 : -1
                        )
                        .map(
                            (game: any, i) =>
                                game.status == 'ENDED' &&
                                game.winnerId !== 1 &&
                                (game.player_twoId == 1 ||
                                    game.player_oneId == 1) && (
                                    <li key={i}>
                                        Player one: {game.player_one.username}{' '}
                                        (id: {game.player_oneId})
                                        <br />
                                        Player two: {
                                            game.player_two.username
                                        }{' '}
                                        (id: {game.player_twoId})
                                        <br />
                                        Final score: {game.player_one.username}'s score :{' '}
                                        {game.player_onePoints}pts, {game.player_two.username}'s score:
                                        {game.player_twoPoints}
                                        pts
                                        <br />
                                        Started on: {game.craetedAt}
                                        <br />
                                        Mode: {game.mode}
                                    </li>
                                )
                        )}
            </ul>

            <b>
                All played games by date: (newest first)(maybe add a filter/sort
                by)
            </b>
            <ul>
                {loading && <p>Loading ... </p>}
                {!loading && error && <p>{error}</p>}
                {!loading &&
                    !error &&
                    Object.values(allGames)
                        .sort((a: any, b: any) =>
                            a.craetedAt < b.craetedAt ? 1 : -1
                        )
                        .map(
                            (game: any, i) =>
                                game.status == 'ENDED' &&
                                (game.player_twoId == 1 ||
                                    game.player_oneId == 1) && (
                                    <li key={i}>
                                        Player one: {game.player_one.username}{' '}
                                        (id: {game.player_oneId})
                                        <br />
                                        Player two: {
                                            game.player_two.username
                                        }{' '}
                                        (id: {game.player_twoId})
                                        <br />
                                        Final score: {game.player_one.username}'s score :{' '}
                                        {game.player_onePoints}pts, {game.player_two.username}'s score:
                                        {game.player_twoPoints}
                                        pts
                                        <br />
                                        Started on: {game.craetedAt}
                                        <br />
                                        Mode: {game.mode}
                                        <br />
                                        Winner : {game.winner.username}
                                    </li>
                                )
                        )}
            </ul>
        </div>
    )
}

export default MatchHistory
