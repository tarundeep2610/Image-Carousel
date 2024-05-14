import React from "react";

// Modal component for displaying a popup dialog
const Modal = ({
  size, // Size of the modal (xxl, xl, lg, sm, modal)
  modalHead = "", // Header text for the modal
  children, // Content of the modal
  isOpen, // Boolean indicating whether the modal is open or not
  setIsOpen, // Function to toggle modal open/close state
  closeButton = false, // Boolean to display close button
}) => {
  // Object containing different sizes for the modal
  const sizeType = {
    xxl: "w-[90%] h-[90%] ",
    xl: "w-[96vw] h-[96vh] md:w-[75vw] md:h-[86vh]",
    lg: "w-[94vw] h-[90vh] md:w-[60vw] md:h-[86vh]",
    sm: "w-[92vw]  md:w-[36vw]",
    modal: "w-[94vw] h-[38vh] md:w-[48vw] h-[28vh]",
  };

  return (
    <div
      // Conditional rendering of modal based on isOpen state
      className={
        isOpen
          ? "z-[4000] flex justify-around place-items-center bg-blue-600 fixed rm-scroll overflow-hidden top-0 bottom-0 right-0 left-0"
          : "hidden"
      }
      style={{ background: "rgba(6, 6, 6, 0.9)" }}
      onClick={() => {
        // Toggling modal state when clicking outside the modal content
        setIsOpen((prev) => !prev);
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        // Applying styles based on sizeType and other properties
        className={`relative bg-white ${sizeType[size]} rounded-md overflow-scroll modal-inner`}
      >
        {/* Modal header */}
        <div className="sticky bg-primaryLine h-10 top-0 right-0 border-b border-b-blue-600 bg-blue-600">
          <h1 className="text-white font-bold text-lg pt-2 pl-4">
            {modalHead}
          </h1>
          {/* Close button */}
          <div
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
            className="absolute ml-auto w-fit font-bold text-white top-1 right-3 p-1 hover:bg-main bg-transparent cursor-pointer rounded-md transition-all duration-300"
          >
            X
          </div>
        </div>
        {/* Modal content */}
        <div className="overflow-scroll p-2">{children}</div>
        {/* Close button at the bottom of the modal */}
        {closeButton && (
          <div className="w-24 absolute bottom-4 right-4">
            <button
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
