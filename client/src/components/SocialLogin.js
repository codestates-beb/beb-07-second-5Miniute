import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/LoginContext';

const SocialLogin = () => {
    const {accessToken, setAccessToken, isLoggedIn, setIsLoggedIn} =
    useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
      const url = new URL(window.location.href);
      const hash = url.hash;
      if (!hash) return;
      const token = hash.split("=")[1].split("&")[0];


      setAccessToken(token);
      setIsLoggedIn(true);
      navigate("/");


    }, [accessToken, navigate]);
    
    return<div className="loading-container">
        <div className="loading"></div>
        <div id="loading-text">loading</div>
    </div>
};

export default SocialLogin;