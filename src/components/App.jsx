// import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import fetchImages from '../services/images-api';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import useModal from '../hooks/useModal';
import useGetImages from '../hooks/useGetImages';
import Modal from '../components/Modal/Modal';

function App () {

    const { onNextFetch, totalImages, isLoading, images, getSearchRequest } =
    useGetImages();

  const {
    openModal,
    toggleModal,
    showModal,
    url,
    title
  } = useModal();

    return (
      <>
      <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={getSearchRequest} />

        {images && <ImageGallery images={images} openModal={openModal} />}

        {isLoading && <Loader />}

        {images && (
          <Button onNextFetch={onNextFetch} />
        )}

        {showModal && (
          <Modal
            onClose={toggleModal}
            url={url}
            title={title}
          />
        )}
      </>
    );
  }

export default App;