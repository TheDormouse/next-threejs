import {useState, useRef, useEffect} from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'

export default (props) => {
      // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [nextmove, setNextmove] = useState([])
  // Rotate mesh every frame, this is outside of React without overhead
  let moveset = [[1, 2], [2,2], [2, 3]];
  useFrame(() => 
  {
    let x = mesh.current.position.x
    let y = mesh.current.position.z
    let parsex = Number.parseFloat(x).toFixed(2)
    let parsey = Number.parseFloat(y).toFixed(2)
    
    if(parsex < props.newX) {
      mesh.current.position.x += .1
    }
    if(parsex > props.newX){
      mesh.current.position.x -= .1
    }
    if(parsey < props.newY) {
      mesh.current.position.z += .1
    }
    if(parsey > props.newY){
      mesh.current.position.z -= .1
    }
  }
  )
  
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      //onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}>
      <sphereBufferGeometry attach="geometry" args={[1, 20, 20]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}