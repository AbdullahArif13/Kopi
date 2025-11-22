import React, { useState } from 'react'
import Registrasi from './Registrasi';
import Login from './Login';

const AuthPage = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => setToggle(prev => !prev);

  return (
    <div className="w-full">
      {toggle ? (
        <Registrasi setToggle={handleToggle} />
      ) : (
        <Login setToggle={handleToggle} />
      )}
    </div>
  );
};

export default AuthPage;
