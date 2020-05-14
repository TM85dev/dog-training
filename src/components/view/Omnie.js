import React, { useEffect } from 'react'
import { useSpring, useSprings, animated } from 'react-spring'

function Omnie() {
    const text = [
        { title: "Jane Meldrum", description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores " },
        { title: "Verona Blair", description: "Quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. " },
        { title: "Andrew Kazantzis", description: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. " },
        { title: "Eugenia Anders", description: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat." },
        { title: "Trevor Virtue", description: "Maecenas interdum risus urna, id pharetra velit venenatis in. Sed volutpat lorem eget sapien faucibus ornare. Praesent ac fringilla justo, eu posuere mi. Fusce vel suscipit felis. Interdum et malesuada fames ac ante ipsum primis in faucibus." },
        { title: "Salome Simoes", description: "Aliquam suscipit sed lacus eget euismod. Suspendisse vulputate metus lorem, a rhoncus dolor consectetur ut. Sed pellentesque vitae elit commodo congue. " },
        { title: "Ruveni Ellawala", description: "Pellentesque aliquam, sem eget placerat sollicitudin, augue ipsum vehicula ipsum, nec consectetur elit tortor ultricies ante. Maecenas eleifend tempus purus eget venenatis. Etiam consectetur ipsum lacus, nec suscipit lacus condimentum ac." },
    ]
    const [show, setShow] = useSpring(() => ({
        opacity: 0, transform: "translateY(50px)"
    }))
    const [isHovered, setIsHovered] = useSprings(text.length, index => ({
        opacity: 0.7, transform: "scale(1)"
    }))
    const hoverHandler = (i) => {
        setIsHovered(index => ({
            opacity: i === index ? 1 : 0.7,
            transform: i === index ? "scale(1.02)" : "scale(1)"
        }))
    }
    const unhoverHandler = () => {
        setIsHovered(index => ({
            opacity: 0.7,
            transform: "scale(1)"
        }))
    }

    useEffect(() => {
        setShow(() => ({
            opacity: 1,
            transform: "translateY(0px)"
        }))
    })

    const list = text.map((item, index) => {
        return (
            <animated.li
                key={index}
                style={isHovered[index]}
                onMouseOver={() => hoverHandler(index)}
                onMouseLeave={unhoverHandler}
            >
                <strong>{item.title}</strong> - {item.description}
            </animated.li>
        )
    })

    return (
        <main>
            <animated.div style={show}>
                <h1>O MNIE</h1>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. </p>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit:</p>
                <ul>
                    {list}
                </ul>
            </animated.div>
        </main>
    )
}

export default Omnie