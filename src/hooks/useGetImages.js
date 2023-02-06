import { useState, useEffect } from 'react';
import fetchImages from 'services/images-api';

const useGetImages = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query !== '') {
      setIsLoading(prevIsLoading => !prevIsLoading);

      fetchImages(query, page)
        .then(({ hits: images, totalHits: total }) => {
          const imagesArray = images.map(
            ({
              id,
              tags,
              webformatURL,
              largeImageURL,
            }) => ({
              id: id,
              description: tags,
              smallImage: webformatURL,
              largeImage: largeImageURL,
            })
          );
          setTotalImages(total);
          return imagesArray;
        })
        .then(imagesArray => {
          if (page === 1) {
            setImages(imagesArray);
          }
          return imagesArray;
        })
        .then(imagesArray => {
          if (page !== 1) {
            setImages(prevImages => [...prevImages, ...imagesArray]);
          }
        })
        .catch(error => setError(error))
        .finally(() => setIsLoading(prevIsLoading => !prevIsLoading));
    }
  }, [page, query]);

  const getSearchRequest = query => {
    setQuery(query);
    setPage(1);
  };

  const onNextFetch = () => setPage(prevPage => prevPage + 1);

  return {
    getSearchRequest,
    onNextFetch,
    totalImages,
    isLoading,
    images,
    error,
  };
};

export default useGetImages;