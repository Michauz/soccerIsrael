import React, {useEffect,useState} from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}]);

  useEffect(()=>{
    fetch("http://localhost:5000").then(
      response => response.json()
    ).then(
      data => {
        console.log("tt");
        setBackendData(data);
      }
    )
  }, []);

  return (
    <div>
      {(typeof backendData.users  === "undefined") ? (<p>Loading...</p>) : (backendData.users.map((user,i)=>(<p key={i}>{user}</p>)))}
    </div>
  )
}

export default App