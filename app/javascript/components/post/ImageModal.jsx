import React from "react";

function ImageModal({ image, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <img src={image.url} alt={`Image ${image.id}`} />
      <button className="absolute top-4 right-4 text-white" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ImageModal;