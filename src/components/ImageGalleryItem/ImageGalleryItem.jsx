export const ImageGalleryItem = ({ src, alt, openModal,largeImg }) => {
  const handleImageClick = () => {
    openModal(largeImg);
  };

  return (
    <li className="ImageGalleryItem" onClick={handleImageClick}>
      <img className="ImageGalleryItem-image" src={src} alt={alt} />
    </li>
  );
};
