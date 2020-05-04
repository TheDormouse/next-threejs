import {useState, useRef, useEffect} from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import Models from '../models'

export default (props) => {
    const [height, setHeight] = useState(null)
    const [width, setWidth] = useState(null)
    const [objects, setObjects] = useState([])
    const [showModal, setShowModal] = useState(false)

    function getRandomInt(allowNeg ,max) {
        let num =  Math.floor(Math.random() * Math.floor(max)) + 1;
        if(allowNeg){
            num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
        }
        return num
      }
    function createObject() {
        let type;
        let random = getRandomInt(false, 11);
        if(random <= 5){
            type = 'Sphere'
        } else {
            type = 'Box'
        }
        let obj = {
            type: type, 
            coords: [getRandomInt(true, 5), getRandomInt(true, 5), getRandomInt(true, 5)]
        }
        return obj
    }
    function init(){
        let generateObjects = []
        for(let i =0; i< 100; i++) {
            generateObjects.push(createObject())
        }
        return generateObjects;
    }
    function addObject() {
        setObjects([...objects, createObject()])
    }
    function removeObject() {
        setObjects(objects.splice(0, objects.length - 1))
    }
    useEffect(() => {
        function handleResize(){
            setHeight(window.innerHeight);
            setWidth(window.innerWidth);
        }
        setHeight(window.innerHeight)
        setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        
    
        setObjects(init());
    }, []
    )
    return( 
    
    <div>
        <style jsx>{`
        .overlay {
            background-color: blue;
            width: 100%;
            position: absolute;
            bottom: 0px;
            z-index: 2;
            color: white;
        }
        .modal {
            width: 400px;
            height: 400px;
            border-radius: 10px;
            z-index: 2;
            position: absolute;
            right: 0px;
            visibility: ${showModal ? 'visible' : 'hidden'};
            background-color: blue;
            display: flex;
        }
        .modal .col {
            height: 200px;
            padding: 5px;
            margin: 5px;
            flex: 1;
            background-color: white;
            align-content: center;
        }
        `}</style>
        <style jsx global> {`
        body {
          margin: 0px;
        }
      `}</style>
      <div className='modal'>
            <div className='col'><Canvas style={{height: 100, width: 100}}><ambientLight /><pointLight position={[10, 10, 10]} />{React.createElement(Models.Box, {position: [0, 0, 0]})}</Canvas> <p>Cube</p></div>
            <div className='col'><Canvas style={{height: 100, width: 100}}><ambientLight /><pointLight position={[10, 10, 10]} />{React.createElement(Models.Sphere, {position: [0, 0, 0]})}</Canvas><p>Sphere</p></div>
      </div>
        <div className='overlay'>
            <button onClick={() => addObject()}>Add Object</button>
            <button onClick={() => removeObject()}>Remove Object</button>
            <button onClick={() => setShowModal(!showModal)}>Show Modal</button>
            <p>Number of objects: {objects.length}</p>
            <p><a href='/room'>Room demo</a></p>
            </div>
        <Canvas style={{height:height,width:width}}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {objects && objects.map((object, i) => {

            return React.createElement(Models[object.type], {
                position: object.coords,
                key: i
            })
        })}
      </Canvas>
      </div>)
}