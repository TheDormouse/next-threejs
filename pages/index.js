import {useState, useRef, useEffect} from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import Box from '../models/Box';
import Sphere from '../models/Sphere'
import Models from '../models'

export default (props) => {
    const [height, setHeight] = useState(null)
    const [width, setWidth] = useState(null)
    const [objects, setObjects] = useState([])
    useEffect(() => {
        function handleResize(){
            setHeight(window.innerHeight);
            setWidth(window.innerWidth);
        }
        setHeight(window.innerHeight)
        setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        function init(){
            let generateObjects = []
            for(let i =0; i< 100; i++) {
                function getRandomInt(allowNeg ,max) {
                    let num =  Math.floor(Math.random() * Math.floor(max)) + 1;
                    if(allowNeg){
                        num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
                    }
                    return num
                  }
                let type;
                let random = getRandomInt(false, 11);
                if(random <= 5){
                    type = 'Sphere'
                } else {
                    type = 'Box'
                }
                generateObjects.push({type: type, coords: [getRandomInt(true, 5), getRandomInt(true, 5), getRandomInt(true, 5)]})
            }
            return generateObjects;
        }
    
        setObjects(init());
    }, []
    )

    return( <Canvas style={{height:height,width:width}}>
        <style jsx global> {`
        body {
          margin: 0px;
        }
      `}</style>
      
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {objects.map((object, i) => {

            return React.createElement(Models[object.type], {
                position: object.coords,
                key: i
            })
        })}
      </Canvas>)
}