import React from 'react';
import {

  Typography,
  Container,
  CssBaseline,
  Card,
  CardContent,
  styled,
} from '@mui/material';


const HomePageContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0, 6),
}));

const CardContainer = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
  backgroundColor: '#f5f5f5', // Customize the background color
  textAlign: 'center',
}));

const HomePage = () => {
  return (
    <div style={{ backgroundImage: "url('/CBIT_IMG.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <CssBaseline />
      <HomePageContainer>
        <Container maxWidth="md">
          <CardContainer>
            <CardContent>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                Chaitanya Bharathi Institute of Technology
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                Our students have achieved remarkable placement success across various industries.
              </Typography>
              <Typography variant="body2" color="textSecondary">
                With a dedicated placement cell and industry connections, our students are well-prepared for
                rewarding careers.
              </Typography>
            </CardContent>
          </CardContainer>
        </Container>
      </HomePageContainer>
    </div>
  );
};

export default HomePage;
