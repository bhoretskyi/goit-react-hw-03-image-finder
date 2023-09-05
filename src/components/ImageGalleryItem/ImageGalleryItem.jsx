export const ImageGalleryItem = ({ src, alt, openModal }) => {
  const handleImageClick = () => {
    openModal(src);
  };

  return (
    <li className="ImageGalleryItem" onClick={handleImageClick}>
      <img className="ImageGalleryItem-image" src={src} alt={alt} />
    </li>
  );
};
