const URL = 'https://pixabay.com/api/';
const KEY = '31893065-63c8c7d2f80c76dc2f47aa6fa';
const FILTER = '&image_type=photo&orientation=horizontal&per_page=12';

function fetchImages(query, page = 1) {
  return fetch(`${URL}?q=${query}&page=${page}&key=${KEY}${FILTER}`).then(
    response => response.json()
  );
}

export default fetchImages;