import React, { useEffect, useState } from 'react'
import { useSocket } from '../context/Socket';
import peerService from '../P2P/peerConnection';
import { CiVideoOn } from "react-icons/ci";
import ReactPlayer from 'react-player'

const Confernce = () => {
  const [remoteId,setRemoteId]=useState(null);
  const [Stream,setStream]=useState(null);

  const socket=useSocket()

  const connection=(data)=>{
    const { email, id } = data;
    console.log(`Email${email} joined the room`);
    setRemoteId(id);
  }


  const SendCall=async()=>{
    const stream=await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const sendOffer=peerService.makeOffer();
    socket.emit("make-call", {to:remoteId,sendOffer})
    setStream(stream);
  }

  const reciving=async(from,sendOffer)=>{
    console.log(from,sendOffer);
    setRemoteId(sendOffer);
    const stream=await navigator.mediaDevices.getUserMedia({
      audio:true,
      video:true,
    });
    const ans=await peerService.acceptoffer(sendOffer);
    socket.emit("accept-call",{to:from,ans});
    setStream(stream);

  }

  const acceptCall=async(from,ans)=>{
    peerService.settingOffer(ans);
    console.log("Call accepted");
  }

  useEffect(()=>{
    socket.on("JOINED",connection);
    socket.on("recieve-call",reciving)
    socket.on("accepted",acceptCall)
    return () => {
      socket.off("JOINED", connection);
      socket.off("recieve-call",reciving);
      socket.off("accepted",acceptCall)
    }

  })

  return (
    <div>
      <div className="VideoConference">
        <h1>Video calling</h1>
        <h2>{remoteId ? "Connected" : "No one in room"}</h2>
        {remoteId && <button onClick={SendCall}><CiVideoOn className='callButton' /></button>}
        {Stream && <ReactPlayer playing muted height="400px" width="400px" url={Stream} />}
        

      </div>
      
    </div>
  )
}

export default Confernce
