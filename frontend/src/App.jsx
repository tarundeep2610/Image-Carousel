// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Header from "./components/Header";
// import MyCarousel from "./components/MyCarousel";
// import Modal from "./components/Modal";
// import ImageUploadForm from "./components/ImageUploadForm";

// function App() {
//   const [images, setImages] = useState([]);
//   const [interval, setIntervalValue] = useState(3000); // default interval 3000ms
//   const baseUrl = "http://127.0.0.1:3000";

//   const [isOpen, setIsOpen] = useState(false);
//   const [modalBody, setModalBody] = useState(<></>);
//   const [modalHead, setModalHead] = useState(
//     <>
//       <h1>Add Image:</h1>
//     </>
//   );

//   async function fetchImages() {
//     try {
//       const response = await axios.get(`${baseUrl}/api/images`);
//       console.log(response, "data");
//       console.log(response.data, "data");
//       setImages(response.data);
//     } catch (error) {
//       console.error("Error fetching images:", error);
//     }
//   }
//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const deleteImage = (id) => {
//     console.log(id);
//     console.log("clicke");
//     fetch(`http://localhost:3000/api/images/${id}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (response.ok) {
//           setImages(images.filter((image) => image._id !== id));
//         } else {
//           console.error("Error deleting image");
//         }
//       })
//       .catch((error) => console.error("Error deleting image:", error));
//   };

//   const handleIntervalChange = (e) => {
//     setIntervalValue(Number(e.target.value));
//   };

//   return (
//     <div className="">
//       <Modal
//         isOpen={isOpen}
//         setIsOpen={setIsOpen}
//         modalHead={modalHead}
//         size={"sm"}
//       >
//         {modalBody}
//       </Modal>
//       <Header />
//       <div className="px-4 pb-4 flex justify-center items-center flex-col">
//         <MyCarousel
//           data={images}
//           setData={setImages}
//           deleteImage={deleteImage}
//           interval={interval}
//         />
//         <div className="mt-10 items-center flex w-full px-4">
//           <div className="pr-20">
//             <button
//               className="btn btn-primary ms-2"
//               onClick={() => {
//                 setIsOpen(true);
//                 setModalBody(
//                   <div>
//                     <ImageUploadForm
//                       setIsOpen={setIsOpen}
//                       fetchImages={fetchImages}
//                     />
//                   </div>
//                 );
//               }}
//             >
//               Add
//             </button>
//           </div>
//           <div>
//             <label htmlFor="intervalRange" className="form-label">
//               Slide Interval (ms): {interval}
//             </label>
//             <input
//               type="range"
//               className="form-range"
//               id="intervalRange"
//               min="1000"
//               max="10000"
//               step="500"
//               value={interval}
//               onChange={handleIntervalChange}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import MyCarousel from "./components/MyCarousel";
import Modal from "./components/Modal";
import ImageUploadForm from "./components/ImageUploadForm";

function App() {
  // State variables
  const [images, setImages] = useState([]); // State to hold images
  const [interval, setIntervalValue] = useState(3000); // State for carousel interval (default: 3000ms)
  const baseUrl = "http://127.0.0.1:3000"; // Base URL for API requests

  // Modal state variables
  const [isOpen, setIsOpen] = useState(false); // State for modal visibility
  const [modalBody, setModalBody] = useState(<></>); // State for modal body content
  const [modalHead, setModalHead] = useState(
    // State for modal header content
    <>
      <h1>Add Image:</h1>
    </>
  );

  // Function to fetch images from the server
  async function fetchImages() {
    try {
      const response = await axios.get(`${baseUrl}/api/images`); // GET request to fetch images
      setImages(response.data); // Set images state with fetched data
    } catch (error) {
      console.error("Error fetching images:", error); // Log error if fetching fails
    }
  }

  // useEffect to fetch images on component mount
  useEffect(() => {
    fetchImages(); // Fetch images when component mounts
  }, []);

  // Function to delete an image
  const deleteImage = (id) => {
    fetch(`${baseUrl}/api/images/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setImages(images.filter((image) => image._id !== id));
        } else {
          console.error("Error deleting image");
        }
      })
      .catch((error) => console.error("Error deleting image:", error));
  };

  // Event handler to update carousel interval
  const handleIntervalChange = (e) => {
    setIntervalValue(Number(e.target.value));
  };

  return (
    <div className="">
      {/* Modal component for image upload form */}
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalHead={modalHead}
        size={"sm"}
      >
        {modalBody}
      </Modal>
      {/* Header component */}
      <Header />
      {/* Main content */}
      <div className="px-2 md:px-4 pb-4 flex justify-center items-center flex-col">
        {/* Carousel component */}
        <MyCarousel
          data={images}
          setData={setImages}
          deleteImage={deleteImage}
          interval={interval}
        />
        {/* Controls for adding images and adjusting interval */}
        <div className="mt-10 md:items-center flex w-full px-4 flex-col md:flex-row">
          {/* Button to open modal for image upload */}
          <div className="pr-20 mb-4 md:mb-0">
            <button
              className="btn btn-primary ms-2"
              onClick={() => {
                setIsOpen(true); // Set modal visibility to true
                setModalBody(
                  // Set modal body content to image upload form
                  <div>
                    <ImageUploadForm
                      setIsOpen={setIsOpen}
                      fetchImages={fetchImages}
                    />
                  </div>
                );
              }}
            >
              Add
            </button>
          </div>
          {/* Slider to adjust carousel interval */}
          <div>
            <label htmlFor="intervalRange" className="form-label">
              Slide Interval (ms): {interval}
            </label>
            <input
              type="range"
              className="form-range"
              id="intervalRange"
              min="1000"
              max="10000"
              step="500"
              value={interval}
              onChange={handleIntervalChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
