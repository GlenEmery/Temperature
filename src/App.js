import React, { useState, useEffect } from 'react';
import GeoLocation from './GeoLocation';
import './App.css';


function App() {

  const [ longInput, setLongInput] = useState('');
  const [ latInput, setLatInput] = useState('');
  const [ tempi, setTempi] = useState('');
  const [forci, setForci] = useState('');

  const [ location, setLocation ] = useState({ lat: "", lon: "" });

  // const api = "https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={long}&current=temperature_2m"

  useEffect(() => {
    if (location.lat && location.lon) {
      setLatInput(location.lat);
      setLongInput(location.lon);
    }
  }, [location]);

  const temp = async (long, lat) => {

    
   try { const data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m`);
         if (!data.ok) {
          throw new Error(`Error: ${data.status} ${data.statusText}`)
        }
       
       
       const result =  await data.json();
      
      setTempi(result.current.temperature_2m)
      setForci(result.current_units.temperature_2m)
   } catch (e) {
    console.log("error" + e.message)
   }
  };

// Add parameter validation
// Add a Unit Test
// Would you like to store this temp info? User says yes or no.
// Extract behaviour into other files. Not everything on the App
 
  function handleSubmit(e) {
    e.preventDefault()
    temp(longInput, latInput);
  }

  let coat = "";
  if (tempi <= 16) {
    coat = "you need a coat"
  } else {
    coat = "it is warm"
  }
    
 
  return (
    
    <div className="App">
      
        <input 
        value={longInput}
        type="text"
        placeholder="Longitude"
        onChange={(e) => setLongInput(e.target.value)}></input>

        <input 
        value={latInput}
        type="text"
        placeholder="Longitude"
        onChange={(e) => setLatInput(e.target.value)}></input>

        <button
        type="submit"
        onClick={handleSubmit}>Submit</button>
      
      <h1>the temperature is {tempi} {forci} </h1>
      <p> {coat}</p>

      <GeoLocation
        setLocation={setLocation}
        location={location}
        />
    </div>
  );
}

export default App;
