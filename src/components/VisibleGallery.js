import React, { useEffect } from 'react'
import { useSprings, animated } from 'react-spring'

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
        to: {
            opacity: 1, 
            color: (props.currentImageId === 0 || props.currentImageId === props.pictures.length - 1) ? 
                "rgb(100, 100, 100)" : "rgb(200, 200, 200)"}, 
        delay: 600
    }))
    const hoverIconHandler = (i) => {
        // hover when left arrow is disabled
        if(props.currentImageId.current === 0) {
            setHoverIcon(index => ({
                color: index === i ? "rgb(255, 255, 255)" : 
                                    index === 1 ? "rgb(100, 100, 100)" : "rgb(200, 200, 200)"
            }))
        }
        else if(props.currentImageId.current === props.pictures.length - 1) {
            setHoverIcon(index => ({
                color: index === i ? "rgb(255, 255, 255)" : 
                                    index === 2 ? "rgb(100, 100, 100)" : "rgb(200, 200, 200)"
            }))
        }
        else {
            setHoverIcon(index => ({
                color: index === i ? "rgb(255, 255, 255)" : "rgb(200, 200, 200)"
            }))
        }
    }
    const unhoverIconHandler = (i) => {
        // unhover when left arrow is disabled
        if(props.currentImageId.current === 0) {
            setHoverIcon(index => ({
                color: index === 1 ? "rgb(100, 100, 100)" : "rgb(200, 200, 200)"
            }))
        }
        else if(props.currentImageId.current === props.pictures.length - 1) {
            setHoverIcon(index => ({
                color: index === 2 ? "rgb(100, 100, 100)" : "rgb(200, 200, 200)"
            }))
        }
        else {
            setHoverIcon(index => ({
                color: "rgb(200, 200, 200)"
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
        // when click left arrow
        else if(i===1) {
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
                if(props.currentImageId.current === 0) {
                    setHoverIcon(index => ({
                        color: index === 1 ? "rgb(100, 100, 100)" : "rgb(200, 200 ,200)"
                    }))
                }
                else {
                    // set id of image
                    props.currentImageId.current -= 1
                    // change image depends on current id
                    props.setCurrentImage(props.pictures[props.currentImageId.current].link)
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
        // when click right arrow
        if(i===2) {
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
                if(props.currentImageId.current === props.pictures.length - 1) {
                    setHoverIcon(index => ({
                        color: index === i ? "rgb(100, 100, 100)" : "rgb(200, 200, 200)"
                    }))
                }
                else {
                    // set id of image
                    props.currentImageId.current += 1
                    // change image depends on current id
                    props.setCurrentImage(props.pictures[props.currentImageId.current].link)
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

        useEffect(() => {
            // showing icons from gallery when first image was clicked
            if(props.currentImageId.current === 0) {
                document.querySelector(".left-arrow").style.pointerEvents = "none"
                setHoverIcon(index => ({
                    color: index===1 ? "rgb(100, 100, 100)" : "rgb(200, 200, 200)"
                }))
            }
            // showing icons from gallery when last image was clicked 
            else if(props.currentImageId.current === props.pictures.length - 1) {
                document.querySelector(".right-arrow").style.pointerEvents = "none"
                setHoverIcon(index => ({
                    color: index===2 ? "rgb(100, 100, 100)" : "rgb(200, 200, 200)"
                }))
            }
            // showing icons from gallery when other images was clicked
            else {
                document.querySelector(".right-arrow").style.pointerEvents = "auto"
                document.querySelector(".left-arrow").style.pointerEvents = "auto"
                setHoverIcon(index => ({
                    color: "rgb(200, 200, 200)"
                }))
            }
        })
    return (
        <animated.div 
            style={show[0]} 
            className='gallery-bg'>
                {navigation}
                <animated.img style={show[1]} src={props.image} />
        </animated.div>
    )
}

export default VisibleGallery