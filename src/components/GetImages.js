import axios from 'axios';
export async function getImages(query, page) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=38354710-a3d6b3af700cce2a78ac34292&page=${page}&q=${query}&image_type=photo&pretty=true&per_page=12`
  );

  return response.data.hits;
}
