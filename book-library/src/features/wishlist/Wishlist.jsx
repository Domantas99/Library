import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BookList } from '../../components';
import { getWishlist } from '../../store/wishlist/actions';
import ActionItem from '../../components/ActionItem';
import Modal from '../../components/Modal';
import WishForm from '../../components/WishForm';
import Panel from '../../components/Panel';

export default () => {
  const [modalState, setModalState] = useState(false);

  const actionButton = (
    <ActionItem
      linkTitle="Add new book request"
      onClickAction={() => setModalState(true)}
    />
  );

  return (
    <>
      <Panel title="Wishlist">
        <BookList
          dataSelector={useSelector((state) => state.wishlist.bookData)}
          dataAction={getWishlist()}
          addLink="/add-wishlist"
          actionButton={actionButton}
        />
      </Panel>
      <Modal
        modalState={modalState}
        exitAction={() => setModalState(false)}
        height="80%"
        width="56%"
      >
        <WishForm exitAction={() => setModalState(false)} />
      </Modal>
    </>
  );
};
