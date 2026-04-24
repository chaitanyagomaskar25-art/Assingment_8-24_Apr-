import React from 'react'
import { useEffect, useState } from 'react'
import "./App.css"

const App = () => {
  const [person, setPerson] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoadig] = useState(false);

  useEffect(()=>{
    const userData = async () => {
      setLoadig(true)
      try {
      const responce = await fetch('https://randomuser.me/api/');
      if(!responce.ok){
        throw new Error("Your responce is not ok.");
      }
      const data = await responce.json();
      
      setPerson(data.results);
      } catch (error) {
        setError(true)
      } finally{
        setLoadig(false)
      }
    }
userData()
  }, [])

 useEffect(() => {
    if (person.length > 0) {
      const user = person[0];
      document.title = `${user.name.title} ${user.name.first} ${user.name.last}`;
    }
  }, [person]);

  return (
  <div className="page-wrapper">
  {loading && <p>Loading Profile...</p>}
  {error && <p>Error while loading data...</p>}
  
  {person.map((user) => {
    return (
      <div className="user-card" key={user.login.uuid}>
        <img src={user.picture.large} alt="User" className="img" />

        <h2 className="name">
          {user.name.title} {user.name.first} {user.name.last}
        </h2>

        <div className="card-content">
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Cell:</strong> {user.cell}</p>

          <h3>Location</h3>
          <p><strong>Address:</strong> {user.location.street.number}, {user.location.street.name}</p>
          <p><strong>City/State:</strong> {user.location.city}, {user.location.state}</p>
          <p><strong>Country:</strong> {user.location.country} - {user.location.postcode}</p>

          <h3>Coordinates</h3>
          <p><strong>Latitude:</strong> {user.location.coordinates.latitude}</p>
          <p><strong>Longitude:</strong> {user.location.coordinates.longitude}</p>

          <h3>Timezone</h3>
          <p><strong>Offset:</strong> {user.location.timezone.offset}</p>
          <p><strong>Description:</strong> {user.location.timezone.description}</p>

          <h3>Login Info</h3>
          <p><strong>UUID:</strong> {user.login.uuid}</p>
          <p><strong>Username:</strong> {user.login.username}</p>
          <p><strong>Password:</strong> {user.login.password}</p>
          <p><strong>Salt:</strong> {user.login.salt}</p>
          <p><strong>MD5:</strong> {user.login.md5}</p>
          <p><strong>SHA1:</strong> {user.login.sha1}</p>
          <p><strong>SHA256:</strong> {user.login.sha256}</p>

          <h3>Date of Birth</h3>
          <p><strong>Date:</strong> {user.dob.date}</p>
          <p><strong>Age:</strong> {user.dob.age}</p>

          <h3>Registered</h3>
          <p><strong>Date:</strong> {user.registered.date}</p>
          <p><strong>Age:</strong> {user.registered.age}</p>

          <h3>ID</h3>
          <p><strong>Name:</strong> {user.id.name}</p>
          <p><strong>Value:</strong> {user.id.value}</p>
          <p><strong>Nationality:</strong> {user.nat}</p>
        </div>
      </div>
    );
  })}
</div>
  )
}

export default App
