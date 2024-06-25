// import React, { createContext, useContext } from 'react'
// import { io } from 'socket.io-client';

// const socketContext=createContext(null);

// export const useSocket=()=> useContext(socketContext);


// export const SocketProvider = ({children}) => {
//     const socket = io("http://localhost:3000", {
//         withCredentials: true, // Make sure this matches your server's CORS configuration
//         extraHeaders: {
//             "my-custom-header": "abcd"
//         }
//     });
//     // socket.on("connected to the server")

//   return (
//     <socketContext.Provider value={socket}>
//         {children}
//     </socketContext.Provider>
//   )
// }

// export default {useSocket,SocketProvider};  

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';

const socketContext = createContext(null);

export const useSocket = () => useContext(socketContext);

export const SocketProvider = ({ children }) => {
    const socket = useMemo(() => {
        const newSocket = io("http://localhost:3000", {
            withCredentials: true, // Ensure this matches your server's CORS configuration
            extraHeaders: {
                "my-custom-header": "abcd"
            }
        });
        return newSocket;
    }, []);

    useEffect(() => {
        console.log("Socket initialized");
        
        // Cleanup on unmount
        return () => {
            socket.disconnect();
            console.log("Socket disconnected");
        };
    }, [socket]);

    return (
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    );
};

export default { useSocket, SocketProvider };

