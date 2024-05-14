import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { FaTrash } from "react-icons/fa";

const MyCarousel = ({ data, setData, deleteImage, interval }) => {
  const baseUrl = "http://127.0.0.1:3000";
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize); // Add event listener to update screenWidth on resize

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const minElement = screenWidth > 1000 ? 3 : screenWidth < 500 ? 1 : 2;

  const settings = {
    dots: true,
    infinite: data.length > 1,
    speed: 1000,
    slidesToShow: Math.min(data?.length, minElement),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: interval,
  };

  // Function to handle moving images within the carousel
  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = data[dragIndex];
    const newData = [...data];
    newData.splice(dragIndex, 1);
    newData.splice(hoverIndex, 0, draggedImage);
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].rank !== i + 1) {
        updateRank(newData[i], i);
      }
    }
    setData(newData);
  };

  // Function to update the rank of an image in the database
  const updateRank = async (item, index) => {
    const formData = new FormData();
    formData.append("rank", index + 1);

    try {
      const response = await axios.patch(
        `${baseUrl}/api/update-rank/${item._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Image rank updated successfully");
      } else {
        console.error("Failed to update image rank");
      }
    } catch (error) {
      console.error("Error updating image rank:", error);
    }
  };

  // Component to render each image in the carousel
  const Image = ({ image, index }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "IMAGE",
      item: { id: image._id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: "IMAGE",
      hover(item) {
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        moveImage(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
      <div
        className="mx-2 relative"
        ref={(node) => drag(drop(node))}
        style={{ opacity }}
      >
        <div className="absolute w-full h-full"></div>
        <img
          className="carousel-image"
          src={`http://localhost:3000/${image.filePath}`}
          alt={`Slide ${index}`}
        />
        <div className="image-info absolute bottom-0 text-white text-center w-full py-2">
          <h3 className="text-bolder text-xl shadow-md">
            {image.title.toUpperCase()}
          </h3>
          <p>{image.description}</p>
        </div>
        <button
          className="btn btn-danger absolute top-4 right-4"
          onClick={() => deleteImage(image._id)}
        >
          <FaTrash />
        </button>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full px-4">
        <Slider {...settings}>
          {data &&
            data.map((image, index) => (
              <Image key={index} image={image} index={index} />
            ))}
        </Slider>
      </div>
    </DndProvider>
  );
};

export default MyCarousel;
