import React from 'react';
import Button, { BUTTON_APPEARANCE } from './Button';

const WishListVotes = ({ voteCount, hasVoted, onVote }) => {
  let appearance = BUTTON_APPEARANCE.MINI | BUTTON_APPEARANCE;

  if (!hasVoted) {
    appearance |= BUTTON_APPEARANCE.SECONDARY;
  }

  return (
    <Button buttonAppearance={appearance} onClick={onVote}>
      <i className="btn__icon btn__icon--thumb_up" />
      {voteCount}
    </Button>
  );
};

export default WishListVotes;
