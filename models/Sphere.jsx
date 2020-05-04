import {useState, useRef, useEffect} from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import next from 'next'

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
    if(props.path.length > 1){
      let path = props.path;
        if(parsex < path[0][0]) {
          mesh.current.position.x += .1
        }
        if(parsex > path[0][0]){
          mesh.current.position.x -= .1
        }
        if(parsey < path[0][1]) {
          mesh.current.position.z += .1
        }
        if(parsey > path[0][1]){
          mesh.current.position.z -= .1
        }
        if(parsex == x && parsey == y) {
          path.shift();
          console.log('next square: ', path.length + ' left')
        }
        else {
          console.log('??')
        }
        
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