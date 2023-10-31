import React, { useEffect, useState } from 'react'
import axios from 'axios';

type Props = {
  name: string
}

const Home = (props: Props) => {

  const [name, setName] = useState('');

  axios.get("http://localhost:5112/api/user", {

    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // To include credentials
})
.then((response) => {
  const content = response.data
  setName(content.firstName);

})
.catch((error) => {
    // Handle any errors here
});
  
  return (
    <div>Hi {name}</div>
  )
}

export default Home