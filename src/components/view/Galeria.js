import React, {useEffect, useState, useRef} from 'react'
import {useSprings, animated} from 'react-spring'
import VisibleGallery from '../VisibleGallery'
// showing overlay with image and navigation after image was clicked 


function Galeria() {
    const pictures = [];
    for(let i=0; i<6; i++) {
        pictures.push({id:i, link: require(`../../assets/pic${i+1}.jpg`), name:`pic${i+1}`})
    }
    // show list of images
    const [show, setShow] = useSprings(pictures.length, index => ({
        opacity: 0, transform: 'translateY(50px)'
    }))
    const [images, setImages] = useSprings(pictures.length, index => ({
        transform: 'scale(1) rotate(0deg)', boxShadow: '0px 0px 20px 2px black'
    }))
    const imageHoverHandler = (i) => {
        setImages(index => ({
            transform: index===i ? 'scale(1.1) rotate(4deg)' : 'scale(1) rotate(0deg)',
            boxShadow: index===i ? '4px 4px 24px 6px black' : '0px 0px 20px 2px black'
        }))
    }
    const imageLeaveHandler = () => {
        setImages(index => ({
            transform: 'scale(1) rotate(0deg)',
            boxShadow: '0px 0px 20px 2px black'
        }))
    }
    // toggle gallery 
    const [isVisible, setIsVisible] = useState(false)
    // clicked image
    const [currentImage, setCurrentImage] = useState("")
    const currentImageId = useRef(null)
    const imageClickedHandler = (image, id) => {
        currentImageId.current = id
        setIsVisible(true)
        setCurrentImage(image)
    }
    const gallery = pictures.map((item, index) => 
                <animated.div
                    style={show[item.id]}
                    key={index}
                    onMouseOver={() => imageHoverHandler(index)}
                    onMouseLeave={imageLeaveHandler}
                    onClick={() => imageClickedHandler(item.link, index)}
                >
                    <animated.img
                        style={images[index]} 
                        src={item.link} 
                        alt={item.name} 
                    />
                </animated.div>)
    useEffect(() => {
        setShow(index => ({
            opacity: 1, transform: 'translateY(0px)', delay: 100 * index
        }))
    })
    return (
        <main>
            <div className="gallery">
                {gallery}
            </div>
                {isVisible && 
                <VisibleGallery 
                    image={currentImage} 
                    currentImageId={currentImageId} 
                    setIsVisible={setIsVisible} 
                    setCurrentImage={setCurrentImage} 
                    pictures={pictures}
                />}
        </main>
    )
}

export default Galeria