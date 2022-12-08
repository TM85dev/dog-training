import React, { useEffect, useState } from 'react'
import { useSpring, useSprings, animated } from 'react-spring'
import { Link } from 'react-router-dom'
import OfertaMenu from '../OfertaMenu'

function Oferta({list, setList}) {
    
    const nameList = [
        'psie przedszkole', 'kurs podstawowy', 'kurs rozszerzony', 'kurs zaawansowany', 
        'kurs tropienia', 'kurs obronny', 'kurs przedwystawowy', 'egzaminy', 'co daje szkolenie'
    ]
    const links = [
        '/oferta/psie-przedszkole','/oferta/kurs-podstawowy', '/oferta/kurs-rozszerzony', 
        '/oferta/kurs-zaawansowany', '/oferta/kurs-tropienia', '/oferta/kurs-obronny', 
        '/oferta/kurs-przedwystawowy', '/oferta/egzaminy', '/oferta/co-daje-szkolenie'
    ]

    const [fadeIn, setFadeIn] = useSpring(() => ({
        opacity: 0,
        transform: "translateY(50px)"
    }))
    const [blurBox, setBlurBox] = useSprings(list.length, index => ({
        filter: "blur(0px)"
    }))
    const [displayBlockText, setDisplayBlockText] = useSprings(list.length, index => ({
        height: "40px", bottom: "44px", color: "white", opacity: 1
    }))
    const [displayText, setDisplayText] = useSprings(list.length, index => ({
        opacity: 1
    }))
    const [showBox] = useSprings(list.length, index => ({
        from: {opacity: 0},
        to: {opacity: 1},
        delay: 1000 + (index * 200)
    }))
    // on hover box
    const hoveredImage = (i) => {
        setBlurBox(index => ({
            filter: index === i ? "blur(4px)" : "blur(0px)"
        }))
        setDisplayBlockText(index => ({
            height: index === i ? "0px" : "40px",
            bottom: index === i ? "0px" : "44px",
            opacity: index === i ? 0 : 1
        }))
        setDisplayText(index => ({
            from: {opacity: index===i ? 0 : 1},
            opacity: index === i ? 0 : 1,
            config: {duration: 400}
        }))
        setTimeout(() => {
            let newList = []
            list.filter((item, index) => {
                if (index === i) {
                    item.name = "zobacz więcej"
                }
                return newList.push(item)
            })
            setList(() => {
                return newList
            })
            setDisplayBlockText(index => ({
                height: "40px",
                bottom: "44px",
                color: index === i ? "#f0ece7" : "white",
                opacity: 1
            }))
            setDisplayText(index => ({
                opacity: 1
            }))
        }, 400)
    }
    // on unhover box
    const unhoverImage = (i) => {
        setBlurBox(index => ({
            filter: "blur(0px)"
        }))
        setDisplayBlockText(index => ({
            height: index === i ? "0px" : "40px",
            bottom: index === i ? "0px" : "44px",
            color: "white",
            opacity: index === i ? 0 : 1
        }))
        setDisplayText(index => ({
            opacity: index === i ? 0 : 1
        }))
        setTimeout(() => {
            let newList = []
            list.filter((item, index) => {
                if (index === i) {
                    item.name = nameList[i]
                }
                return newList.push(item)
            })
            setList(() => {
                return newList
            })
            setDisplayBlockText(index => ({
                height: "40px",
                bottom: "44px",
                opacity: 1
            }))
            setTimeout(() => {
                setDisplayText(index => ({
                    opacity: 1
                }))
            }, 200)
        }, 400)
    }
    useEffect(() => {
        // show component at first
        setFadeIn(() => ({
            opacity: 1,
            transform: "translateY(0px)"
        }))
    })
    const row = list.map((item, index) => {
        return (
            <animated.div style={showBox[index]} className="oferta-box" key={index}>
                <animated.img
                    style={blurBox[index]}
                    src={item.link}
                />
                <animated.div style={displayBlockText[index]}>
                    <animated.span style={displayText[index]}>{item.name}</animated.span>
                </animated.div>
                <Link to={links[index]}>
                    <div id="box-cover"
                        onMouseOver={() => hoveredImage(index)}
                        onMouseLeave={() => unhoverImage(index)}
                        
                    ></div>
                </Link>
            </animated.div>
        )
    })

    return (
        <animated.main style={fadeIn}>
            <div>
                <OfertaMenu list={list} setList={setList} />
                <h1>OFERTA</h1>
                <div className="oferta-row">
                    {row.slice(0, 3)}
                </div>
                <div className="oferta-row">
                    {row.slice(3, 6)}
                </div>
                <div className="oferta-row">
                    {row.slice(6)}
                </div>
            </div>
        </animated.main>
    )
}

export default Oferta