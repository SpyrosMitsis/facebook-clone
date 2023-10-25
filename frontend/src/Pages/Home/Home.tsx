import React, { useEffect, useState } from 'react';
import { Header, SideBar, Feed, Widget } from '../../components';

import './Home.scss';

function Home(): React.ReactElement {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    (
      async() => {

        const response = await fetch("http://localhost:5112/api/user", {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })

        const content = await response.json()

        setUserName(content.name)
      }
    )();
  });

  return (
    <>
      <div className='homeBody'>
        <Feed username={userName}/>
        <Widget />
      </div>
    </>
  );
}

export default Home;