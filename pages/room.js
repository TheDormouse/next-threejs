import {useState, useRef, useEffect} from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import Models from '../models'
import Floor from '../models/Floor'
import { OrthographicCamera } from 'three'

export default (props) => {
    const [height, setHeight] = useState(null)
    const [width, setWidth] = useState(null)
    const [floor, setFloor] = useState([])
    const { camera } = useThree();

    const matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0], 
]

    useEffect(() => {
        setHeight(window.innerHeight)
        setWidth(window.innerWidth)
        window.addEventListener('resize', () => {
            setHeight(window.innerHeight)
            setWidth(window.innerWidth)
        })
    }, [])

    //- d * aspect, d * aspect, d, - d, 1, 1000
    return(
        <Canvas style={{height:height,width:width}} orthographic camera={
            {
                position:[20, 20, 20], 
                rotation: { 
                    order: "YXZ", 
                    y: - Math.PI / 4, 
                    x: Math.atan( - 1 / Math.sqrt( 2 ) )
                },
                zoom: 50,
                left: -1 * (width / height),
                right: 1 * (width / height),
                top: 1,
                bottom: -1,
                near: 1,
                far: 1000,
                    }
                    }>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {matrix.map((row, x) => {
            return row.map((col, y) => {
                return React.createElement(Models.Floor, {
                    position: [x - 3, 0, y - 3]
                })
            })
                
        })}
        {React.createElement(Models.Sphere, {
            position: [0, 1, 0]
        })}
        </Canvas>
    )
}