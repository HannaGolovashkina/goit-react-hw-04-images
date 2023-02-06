import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState(null);
  const [title, setTitle] = useState(null);
  const [views, setViews] = useState(null);
  const [downloads, setDownloads] = useState(null);
  const [likes, setLikes] = useState(null);

  const toggleModal = () => setShowModal(prevShowModal => !prevShowModal);

  const openModal = e => {
    if (e.target.nodeName === 'IMG') {
      setShowModal(prevShowModal => !prevShowModal);
      setUrl(e.target.dataset.large);
      setTitle(e.target.alt);
      setTitle(e.target.dataset.description);
      setViews(e.target.dataset.views);
      setDownloads(e.target.dataset.downloads);
      setLikes(e.target.dataset.likes);

      // console.log(e.target.nodeName);
    }
  };

  return {
    openModal,
    toggleModal,
    showModal,
    url,
    title
  };
};

export default useModal;