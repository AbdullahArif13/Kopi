import React, { useState } from 'react'
import Registrasi from '../Registrasi';
import Login from '../Login';

const AuthPage = () => {


    const [toggle, setToggle] = useState(false);

  return (
    <div className='w-full'>
        {
            toggle ? <Registrasi setToggle={() => setToggle(!toggle)} /> : <Login setToggle={() => setToggle(!toggle)} />
        }
    </div>
  )
}

export default AuthPage