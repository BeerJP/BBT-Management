import { createContext } from 'react';
 
// Wi-Fi
// const ipContext = React.createContext('192.168.10.124');

// Lan
const ipContext = createContext('localhost');

 
export default ipContext;