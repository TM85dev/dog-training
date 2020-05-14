import React, { useEffect } from 'react'
import { useSprings, animated } from 'react-spring'


function OfertaMenu(props) {

    // set animation
    const [animationLink, setAnimationLink] = useSprings(props.list.length, index => ({
        transform: "translateX(0px)",
        filter: "saturate(40%)",
        opacity: 0
    }))

    // hovered icon link
    const hoverHandler = (i) => {
        setAnimationLink(index => ({
            transform: index === i ? "translateX(220px)" : props.list[index].active ? "translateX(40px)" : "translateX(30px)",
            filter: (index === i || (index === 0 && props.list[0].active)) ? "saturate(100%)" : "saturate(40%)",
            opacity: (index === i || (index === 0 && props.list[0].active)) ? 1 : 0.8
        }))
    }
    // unhovered icon link
    const unhoverHandler = (i) => {
        setAnimationLink(index => ({
            transform: props.list[index].active ? "translateX(40px)" : "translateX(30px)",
            filter: index === 0 && props.list[0].active ? "saturate(100%)" : "saturate(40%)",
            opacity: (index === !i || (index === 0 && props.list[0].active)) ? 1 : 0.8
        }))
    }
    // click icon link
    const clickHandler = (i) => {
        setAnimationLink(index => ({
            transform: "translateX(0px)",
            filter: "saturate(40%)",
            opacity: 0,
            delay: 100 * index
        }))
        setTimeout(() => {
            let newList = props.list.slice(i, i + 1)
            props.list.filter((item, index) => {
                item.active = false
                if (index === i) {
                    item.active = true
                }
                if (index !== i) {
                    newList.push(item)
                }
                return newList
            })
            props.setList(() => {
                return newList
            })
            setAnimationLink(index => ({
                transform: "translateX(30px)",
                filter: index === 0 && props.list[0].active ? "saturate(100%)" : "saturate(40%)",
                opacity: 1,
                delay: 100 * index
            }))
        }, 1000)
    }
    //list of links
    const pictures = props.list.map((item, index) => {
        return (
            <animated.div
                style={animationLink[index]}
                onMouseEnter={() => hoverHandler(index)}
                onMouseLeave={() => unhoverHandler(index)}
                onClick={() => clickHandler(index)}
                className="oferta-link"
                key={index}
            >
                <span>{item.name}</span>
                <img src={item.link} alt={item.name} />
            </animated.div>
        )
    })
    useEffect(() => {
        setTimeout(() => {
            setAnimationLink(index => ({
                transform: props.list[index].active ? "translateX(40px)" : "translateX(30px)",
                opacity: props.list[index].active ? 1 : 0.6,
                delay: 100 * index
            }))
        }, 1000)
    })
    return (
        <div className="oferta-menu">
            {pictures}
        </div>
    )
}

export default OfertaMenu