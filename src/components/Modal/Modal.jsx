// import { BasicLightBox } from "basiclightbox"



export const Modal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;
  const closeModal = () => {
    onClose();
  };

    return (
        <div className="Overlay" onClick={closeModal}>
  <div className="Modal">
    <img src={imageUrl} alt="" />
  </div>
</div>
    )
}

