import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ data, openModal }) => {
  return (
    <ul className="ImageGallery">
      {data.map(image => (
        <ImageGalleryItem
          key={image.id}
          src={image.webformatURL}
          alt={image.tags}
          largeImg={image.largeImageURL}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};
