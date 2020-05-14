import React, {useEffect, useState} from 'react'
import {useSprings, animated} from 'react-spring'

// showing overlay with image and navigation after image was clicked 
function VisibleGallery(props) {
    const data = [
        {name: 'close', text: 'x'},
        {name: 'left-arrow', text: <span>&lsaquo;</span>},
        {name: 'right-arrow', text: <span>&rsaquo;</span>},
    ]
    const [show, setShow] = useSprings(2, index => ({
        from: {opacity: 0, transform: 'translateX(0px)'},
        to: {opacity: 1, transform: 'translateX(0px)'},
        delay: 400 * index
    }))
    const [hoverIcon, setHoverIcon] = useSprings(3, index => ({
        from: {opacity:0, color: "rgb(200, 200, 200)"},
        to: {opacity: 1, color: "rgb(200, 200, 200)"}, 
        delay: 600
    }))
    const hoverIconHandler = (i) => {
        if(props.currentImageId === 0) {
            setHoverIcon(index => ({
                color: index === i ? "rgb(255, 255, 255)" : 
                                    index === 1 ? "rgb(100, 100, 100)" : "rgb(200, 200, 200)"
            }))
        }
    }
    const unhoverIconHandler = (i) => {
        if(props.currentImageId === 0) {
            setHoverIcon(index => ({
                color: index === 1 ? "rgb(100, 100, 100)" : "rgb(200, 200, 200)"
            }))
        }
    }
    const clickIconHandler = (i) => {
        // close gallery
        if(i===0) {
            setHoverIcon(index => ({
                opacity: 0
            }))
            setShow(index => ({
                opacity: 0,
                delay: index===0 ? 400 : 0
            }))
            setTimeout(() => {
                props.setIsVisible(false)
            },600)
        }
        // left
        else if(i===1) {
            document.querySelector('.left-arrow').style.pointerEvents = "none"
            document.querySelector('.right-arrow').style.pointerEvents = "none"
            setShow(index => ({
                from: {
                    opacity: index===1 ? 1 : 1, 
                    transform: index===1 ? 'translateX(0px)' : 'translateX(0px)'
                },
                to: {
                    opacity: index===1 ? 0 : 1, 
                    transform: index===1 ? 'translateX(-50px)' : 'translateX(0px)'
                }
            }))
            setTimeout(() => {
                document.querySelector('.left-arrow').style.pointerEvents = 'auto'
                document.querySelector('.right-arrow').style.pointerEvents = 'auto'
                if(props.currentImageId <= 1) {
                    // set id of image
                    props.setCurrentImageId(0)
                    // change image depends on current id
                    props.setCurrentImage(props.pictures[0].link)
                    setHoverIcon(index => ({
                        color: index === 1 ? "rgb(100, 100, 100)" : "rgb(200, 200 ,200)"
                    }))
                    document.querySelector('.left-arrow').style.pointerEvents = 'none'
                }
                else {
                    // set id of image
                    props.setCurrentImageId(props.currentImageId - 1)
                    // change image depends on current id
                    props.setCurrentImage(props.pictures[props.currentImageId - 1].link)
                }
                setShow(index => ({
                    from: {
                        opacity: index===1 ? 0 : 1, 
                        transform: index===1 ?'translateX(50px)' : 'translateX(0px)',
                    },
                    to: {
                        opacity: index===1 ? 1 : 1, 
                        transform: index===1 ? 'translateX(0px)' : 'translateX(0px)',
                    },
                    reset: true
                }))
            }, 600)
        }
        // right
        if(i===2) {
            document.querySelector('.left-arrow').style.pointerEvents = "none"
            document.querySelector('.right-arrow').style.pointerEvents = "none"
            setShow(index => ({
                from: {
                    opacity: index===1 ? 1 : 1, 
                    transform: index===1 ? 'translateX(0px)' : 'translateX(0px)'
                },
                to: {
                    opacity: index===1 ? 0 : 1, 
                    transform: index===1 ? 'translateX(50px)' : 'translateX(0px)'
                }
            }))
            setTimeout(() => {
                document.querySelector('.left-arrow').style.pointerEvents = 'auto'
                document.querySelector('.right-arrow').style.pointerEvents = 'auto'
                if(props.currentImageId >= props.pictures.length - 1) {
                    // set id of image
                    props.setCurrentImageId(props.pictures.length - 1)
                    // change image depends on current id
                    props.setCurrentImage(props.pictures[props.pictures.length - 1].link)
                }
                else {
                    // set id of image
                    props.setCurrentImageId(props.currentImageId + 1)
                    // change image depends on current id
                    props.setCurrentImage(props.pictures[props.currentImageId + 1].link)
                }
                setShow(index => ({
                    from: {
                        opacity: index===1 ? 0 : 1, 
                        transform: index===1 ?'translateX(-50px)' : 'translateX(0px)',
                    },
                    to: {
                        opacity: index===1 ? 1 : 1, 
                        transform: index===1 ? 'translateX(0px)' : 'translateX(0px)',
                    },
                    reset: true
                }))
            }, 600)
        }
    }
    const navigation = data.map((item,index) => 
        <animated.span 
            className={item.name} 
            key={index}
            style={hoverIcon[index]} 
            onMouseOver={() => hoverIconHandler(index)}
            onMouseLeave={() => unhoverIconHandler(index)}
            onClick={() => clickIconHandler(index)}>
                {item.text}
        </animated.span>)
    return (
        <animated.div 
            style={show[0]} 
            className='gallery-bg'>
                {navigation}
                <animated.img style={show[1]} src={props.image} />
        </animated.div>
    )
}

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
    const [currentImageId, setCurrentImageId] = useState("")
    const imageClickedHandler = (image, id) => {
        setIsVisible(true)
        setCurrentImage(image)
        setCurrentImageId(id)
    }
    const gallery = pictures.map(item => 
                <animated.div
                    style={show[item.id]}
                    key={item.id}
                    onMouseOver={() => imageHoverHandler(item.id)}
                    onMouseLeave={imageLeaveHandler}
                    onClick={() => imageClickedHandler(item.link, item.id)}
                >
                    <animated.img
                        style={images[item.id]} 
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
                    setCurrentImageId={setCurrentImageId} 
                    setIsVisible={setIsVisible} 
                    setCurrentImage={setCurrentImage} 
                    pictures={pictures}
                />}
        </main>
    )
}

export default Galeria