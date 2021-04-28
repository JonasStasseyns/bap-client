import openSocket from "socket.io-client";
import React from 'react'

export const socket = openSocket(process.env.REACT_APP_SOCKET);
export const SocketContext = React.createContext();
