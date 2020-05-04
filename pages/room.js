import {useState, useRef, useEffect} from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import Models from '../models'
import * as PF from 'pathfinding'
import * as THREE from 'three'

export default (props) => {
    const [height, setHeight] = useState(null)
    const [width, setWidth] = useState(null)
    const [floor, setFloor] = useState([])
    const [playerPos, setPlayerPos] = useState([1, 1])
    const [playerPath, setPlayerPath] = useState([])
    const { camera } = useThree();
    const canvasref = useRef(null);

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
var grid = new PF.Grid(matrix);



    useEffect(() => {
        setHeight(window.innerHeight)
        setWidth(window.innerWidth)
        window.addEventListener('resize', () => {
            setHeight(window.innerHeight)
            setWidth(window.innerWidth)
        })

    }, [])

    function movePlayer(pos){
        var finder = new PF.AStarFinder();
        let gridclone = grid.clone()
        let path = finder.findPath(playerPos[0] + 3, playerPos[1] + 3, pos[0] + 3, pos[1] + 3, gridclone)
        console.log(path)
        setPlayerPath(path)
        setPlayerPos(pos)
    }

    //- d * aspect, d * aspect, d, - d, 1, 1000
    return(
        <Canvas ref={canvasref} style={{height:height,width:width}} orthographic camera={
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
                    position: [x - 3, -1, y - 3],
                    key: [x, y],
                    color: col ? 'orange' : 'hotpink',
                    //this needs to be raycaster
                    onClick: (e) => {movePlayer([e.object.position.x, e.object.position.z]);}
                })
            })
                
        })}
        {React.createElement(Models.Sphere, {
            newX: playerPos[0],
            newY: playerPos[1],
            path: playerPath
        })}
        </Canvas>
    )
}