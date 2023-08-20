import React from 'react';
import { Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Container)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right:0.3,
  width: '100%',
  background: 'rgba(0, 0, 0, 0.1)', // Transparent black background
  padding: '1rem',
  color: '#fff', // White text color
  textAlign: 'center',
}));

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Typography variant="body2">
        Developed by Sahith Kocherla
      </Typography>
    </FooterContainer>
  );
};

export default Footer;
