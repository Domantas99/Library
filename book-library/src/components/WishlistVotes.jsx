import React from 'react'

const WishListVotes = ({voteCount, hasVoted, onVote}) => (
    <button
        style={hasVoted ? { backgroundColor: "#4568FB" } : {}}
        onClick={onVote}
    >
    {voteCount}
  </button>
)

export default WishListVotes