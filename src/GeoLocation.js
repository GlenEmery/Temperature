import { useEffect, useState } from "react";
import { React } from "react"

const GeoLocation = ({ setLocation, location }) => {


    // const [location, setLocation] = useState({lat: null, lon: null});
    const [error, setError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (error) => {
                    setError(error.message)
                }
            );
        } else {
            setError("not supported")
        }
    }, [setLocation]);

    return (
        <div>
          <h2>User Location</h2>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <div>
              <p>Latitude: {location.lat}</p>
              <p>Longitude: {location.lon}</p>
            </div>
          )}
        </div>
      );
    };
    export default GeoLocation;