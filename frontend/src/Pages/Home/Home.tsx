import React from 'react'
import { useAuthUser } from 'react-auth-kit'


const Home = () => {

  const auth = useAuthUser()

  return (
      <div>
        Hello {auth()?.firstName}
      </div>
  )
}

export default Home