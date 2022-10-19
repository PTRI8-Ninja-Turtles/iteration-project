import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MainNav() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/main/home');
    }, 3000);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'white'
      }}
    >
      <img
        src="https://t3.ftcdn.net/jpg/04/48/35/42/360_F_448354204_33yPB12jtqzD31robpa85NoPctJ2thRd.jpg"
        alt=""
      />
    </Box>
  );
}

export default MainNav;