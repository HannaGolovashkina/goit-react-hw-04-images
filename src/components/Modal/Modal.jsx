import PropTypes from 'prop-types';
// import App from 'components/App';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BsXLg } from 'react-icons/bs';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, title, url  }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // static propTypes = {
  //   title: PropTypes.string,
  //   onClose: PropTypes.func.isRequired,
  //   currentImageUrl: PropTypes.string,
  //   currentImageDescription: PropTypes.string,
  // };


  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
      <div className={css.backdrop} onClick={handleClickBackdrop}>
        <div className={css.modal}>
          <div className={css.wrapper}>
            {title && <h1 className={css.title}>{title}</h1>}
            <button className={css.button} type="button" onClick={onClose}>
              <BsXLg className={css.icon} />
            </button>
          </div>
          <img
            src={url}
            alt={title}
            loading="lazy"
          />
        </div>
      </div>,
      modalRoot
    );
  }

export default Modal;

Modal.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  alt: PropTypes.string,
};