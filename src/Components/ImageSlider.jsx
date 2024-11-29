import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import Person from '../assets/images/person2.png'
import Person from '../assets/images/person3.png'
import Person2 from '../assets/images/person23.png'

const ImageSlider = ({
    data = [Person],// this is changing constantly,
    currentImage = 0,
    removePreviousUser,
}) => {
    // const [images, setImages] = useState(data);
    // const [currentImage1, setCurrentImage1] = useState(currentImage);


    return (
        <div className="w-full h-full">
            <Carousel
                selectedItem={currentImage}
                axis="vertical"
                showArrows={false}
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                centerMode
                onChange={(index) => {
                    // console.log(index);
                    // if (index === 1) {
                    //     setTimeout(() => {
                    //         removePreviousUser()
                    //     }, 5000)
                    // }
                }}
                infiniteLoop={false}
                autoPlay={false}
                interval={5000}
            >
                {data.map((img, index) => (
                    <div key={index}>
                        <img src={img} alt={`Slide ${index}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ImageSlider;
