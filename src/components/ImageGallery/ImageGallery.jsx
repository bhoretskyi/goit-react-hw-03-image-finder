import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ data, openModal }) => {
  return (
    <ul className="ImageGallery">
      {data.map(image => (
        <ImageGalleryItem
          key={image.id}
          src={image.previewURL}
          alt={image.tags}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};
