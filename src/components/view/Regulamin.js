import React, { useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

function Regulamin() {
    const [show, setShow] = useSpring(() => ({
        opacity: 0, transform: "translateY(50px)"
    }))
    const data = [
        {id: 0, text: "Nunc lacus dui, sagittis facilisis commodo non, interdum sed turpis. Nullam eu vulputate justo, vitae lobortis urna. Etiam id ante suscipit, blandit eros sit amet, faucibus risus."},
        {id: 1, text: "Fusce dictum odio eu justo pharetra ornare. Nam et interdum tortor, sit amet semper sem. Curabitur sollicitudin et sapien ut congue. Etiam pellentesque in tellus sed faucibus. Quisque tempor mollis auctor."},
        {id: 2, text: "Cras sed euismod diam, sit amet sagittis justo. Suspendisse dignissim diam vel odio imperdiet, posuere finibus eros commodo. Nunc aliquam in dui tincidunt rhoncus. Donec pretium odio vel ex sodales, sit amet ultricies sapien convallis. Suspendisse potenti. "},
        {id: 3, text: "Aliquam arcu tellus, semper ut velit non, feugiat tempus quam. Aenean sed augue ac augue mattis finibus. In velit libero, commodo eu sollicitudin eget, rutrum vel nisl. Duis sed felis diam. Aliquam et est varius, vehicula magna vitae, placerat risus."},
        {id: 4, text: "Duis commodo quis nisi vitae convallis. Cras fermentum elementum ligula, quis ultrices elit posuere eu."},
        {id: 5, text: "Vivamus pharetra, eros vitae semper lacinia, nulla sem fermentum purus, sed hendrerit eros augue id nisi. Cras eu venenatis magna. Nulla ornare volutpat magna sit amet maximus. Vestibulum dolor est, fringilla sit amet egestas non, semper vitae dolor."},
        {id: 6, text: "Vestibulum nec laoreet mauris, sodales congue lacus. Curabitur bibendum aliquam nisi, in vehicula nulla semper sit amet."},
        {id: 7, text: "Aenean tincidunt pharetra ornare. In non condimentum erat, non ultrices tortor. Praesent scelerisque volutpat massa, porta sollicitudin nulla tristique vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur cursus quis dui in iaculis."},
        {id: 8, text: "Curabitur id rutrum leo, eget semper sapien. Nunc purus mi, porttitor vel ultricies eget, suscipit eget mauris. Cras vitae fringilla tortor. Morbi varius nibh eu nunc commodo facilisis."},
        {id: 9, text: "Aliquam ut nunc eu leo tempor tempor vel ac orci. Donec aliquam ornare venenatis. Aliquam porttitor condimentum nunc eget ornare. Praesent efficitur hendrerit erat non posuere. Donec vitae commodo tellus. "}
    ]
    const list = data.map((item, index) => {
        return (
        <li key={index}>{item.text}</li>
        )
    })
    useEffect(() => {
        setShow(() => ({
            opacity: 1, transform: "translateY(0px)" 
        }))
    })
    return (
        <main>
            <animated.div style={show}>
                <h1>REGULAMIN</h1>
                <ol>
                    {list}
                </ol>
            </animated.div>
        </main>
    )
}

export default Regulamin