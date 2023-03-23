import SearchInviteFriends from '../../components/SearchAddFriends/index'
import AllFriends from '../../components/AllFriends'
import ReceivedFriendRequests from '../../components/ReceivedFriendRequests'
import SentFriendRequests from '../../components/SentFriendRequests'
import BlockedFriends from '../../components/BlockedFriends'

// import DOMPurify from 'dompurify'

function Friends() {
    return (
        <div>
            <b>Here a search bar to search friends and add them </b>{' '}
            <SearchInviteFriends />
            <b>Here all friend requests (sent and received) </b>
            <ReceivedFriendRequests />
            <SentFriendRequests />
            <b>Here display all friends</b> <AllFriends />
            <b>Here display all blocked friends</b> <BlockedFriends />
        </div>
    )
}

export default Friends
