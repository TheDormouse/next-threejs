import React, {Component} from "react";
import * as client from '../scripts/client' 

class Client extends Component {
    constructor(props) {
        super(props)
        this.color = "#FF5733";
    }
    componentDidMount() {    
        client.client(this)
        
    }
    render() {
        return (<div>

            <style jsx global> {`
        body {
          margin: 0px;
        }
      `}</style>
            <style jsx> {`
      .chatbar {
        width: 100%;
        height: 20px;
        position: absolute;
        bottom: 0;
  left: 0;
        background-color: blue;
        z-index: 2;
      }`}</style>
            <div className='chatbar'><button onClick={console.log('clicked')}>Change cube color</button></div>
            <div className='client'
                ref={
                    ref => (this.mount = ref)
                }/>

        </div>)
    }
}

export default Client
