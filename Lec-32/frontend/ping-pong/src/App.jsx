import { useEffect, useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [ws,setWs]=useState(null);
  let inputRef=useRef(null);

  useEffect(()=>{
    const socket=new WebSocket("ws://localhost:8080");
    socket.onmessage = (e)=>{
      console.log(e.data);
    }
    setWs(socket);
  },[])

  function sendMessage(){
    let message=inputRef.current.value;
    ws.send(message);
    inputRef.current.value="";
  }

  return (
    <>
      <h1>Ping Pong</h1>
      <input ref={inputRef} type="text"></input>
      <button onClick={sendMessage}>Send</button>
    </>
  )
}

export default App
