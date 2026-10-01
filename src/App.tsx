import React, { useEffect } from 'react';
import AdminPanelComponent from './Components/Admin panel/AdminPanelComponent';
import { useNavigate } from 'react-router-dom';

function App() {

  let navigate = useNavigate()

  useEffect(() => {
    navigate("/login")
  })
  
  return (
    <div className="App">

    </div>
  );
}

export default App;
