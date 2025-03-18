import './App.css';
import Login from '../Login';
import { useState } from 'react';
import TrackInfo from '../TrackInfo';

function App() {
const [token, setToken] = useState<string | null>(null);
const auth = !token ? <Login></Login> : <TrackInfo></TrackInfo>
  return (
    <>
     { auth }
    </>
  )
}
export default App
