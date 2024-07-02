import React, { createContext, useContext } from 'react'
import { io } from 'socket.io-client';

const socketContext=createContext(null);

export const useSocket=()=> useContext(socketContext);


export const SocketProvider = ({children}) => {
    const socket = io("http://localhost:3000", {
        withCredentials: true,
        extraHeaders: {
            "my-custom-header": "abcd"
        }
    });

  return (
    <socketContext.Provider value={socket}>
        {children}
    </socketContext.Provider>
  )
}

export default {useSocket,SocketProvider};  
