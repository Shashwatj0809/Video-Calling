import React, { useCallback, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSocket } from '../context/Socket';
import { useNavigate } from 'react-router-dom';

const Room = () => {
    const [email,setEmail]=useState("");
    const [Room,setRoom]=useState('');
    // const [count,setCount]=useState(0);

    const socket=useSocket();
    const nav=useNavigate();


    const handleSubmit= (e)=>{
        // const data=(email,Room);
        e.preventDefault();
        console.log(email,Room);
        socket.emit("JOIN",{email,Room})
    }

    const handleRoom = (data) => {
        const { email, Room } = data;
        if(email && Room){
            nav('/room')
            // setCount(count+1);
        }
        else{
            nav('/')
        }

        console.log("hello");
    }


    useEffect(()=>{
        socket.on("JOIN",handleRoom);
        console.log('hi');
        return()=>{
            socket.off("JOIN",handleRoom);
        }
    },[socket])


  return (
    <div className='form-container'>
        <Form>
            <h1>Join Room</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='EmailHeading'>Email address:</Form.Label>
                <Form.Control type="email"
                 placeholder="Enter email" 
                 className='EmailBox' 
                 value={email} 
                 onChange={(e)=>setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='RoomHeading'>Room Id:</Form.Label>
                <Form.Control type="password" 
                placeholder="Enter Room Id" 
                className='RoomBox' 
                value={Room} 
                onChange={(e)=>setRoom(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>

      
    </div>
  )
}

export default Room


