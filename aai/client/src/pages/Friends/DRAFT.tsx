import SearchFriends from '../../components/SearchAddFriends/index'
import AllFriends from '../../components/AllFriends'
import { useEffect, useState } from 'react'
import axios from 'axios'
// import DOMPurify from 'dompurify'

//Training on table User because table Friends is not created yet, but in the end I will use the table friends ofc
function Friends() {
    ///
    /// GET
    ///
    const [users, getUser] = useState<any>('')
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await axios
                .get(`/users/1`)
                .then((response) => {
                    getUser(response.data)
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

    if (!users) return null
    return (
        <div>
            Here a search bar to search friends and add then <SearchFriends />
            Here display all friends <AllFriends />
            {loading && <p>Loading ... </p>}
            {!loading && error && <p>{error}</p>}
            {!loading && !error && <p>{users.id42}</p>}
        </div>
    )

    // /
    // /PATCH (update) (works with GET)
    // /
    //      function updateUser() {
    //          axios
    //            .patch(`/users/1`, {
    //              id42: "bonjour",
    //              password: "new pwd"
    //            })
    //            .then((response) => {
    //              getUser(response.data);
    //            });
    //      }

    // if (!users) return null;
    // return (
    //      <div>
    //      {loading && <p>Loading ... </p>}
    //      {!loading && error && <p>{error}</p>}
    //      {!loading && !error &&
    //          <button onClick={updateUser}>Update User</button>}
    //      </div>
    //     );

    //  ///
    //  ///DELETE (works with GET)
    //  ///
    //  function deleteUser() {
    //      axios
    //        .delete(`/users/3`)
    //        .then((response) => {
    //          getUser(response.data);
    //        });
    //  }

    // if (!users) return null;
    // return (
    //  <div>
    //  {loading && <p>Loading ... </p>}
    //  {!loading && error && <p>{error}</p>}
    //  {!loading && !error &&
    //      <button onClick={deleteUser}>Delete User</button>}
    //  </div>
    //    );
}

export default Friends
