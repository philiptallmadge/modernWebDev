import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkUser } from "./AuthService";
import { getCurrentUser } from "../../Services/Auth.js";
import { getById } from "../../Services/Bands.js";
import { getById as getVenueById } from "../../Services/Venues.js";
// import the necessary components and icons from material UI
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Box,
  Card,
  CardContent,
  Divider,
  Grid
} from "@mui/material";
import { 
  Login as LoginIcon, 
  PersonAdd as RegisterIcon,
  MusicNote as MusicIcon
} from "@mui/icons-material";

const AuthModule = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check user and fetch their band/venue info
  useEffect(() => {
    const checkUserAndFetchInfo = async () => {
      if (checkUser()) {
        try {
          const currentUser = getCurrentUser();
          const userType = currentUser.get("userType");
          let entityInfo = null;

          if (userType === "band") {
            const bandPointer = currentUser.get("band_pointer");
            if (bandPointer) {
              const band = await getById(bandPointer.id);
              entityInfo = {
                type: "Band",
                name: band.get("BandName"),
                genre: band.get("Genre")
              };
            }
          } else if (userType === "venue") {
            const venuePointer = currentUser.get("venue_pointer");
            if (venuePointer) {
              const venue = await getVenueById(venuePointer.id);
              entityInfo = {
                type: "Venue",
                name: venue.get("Name"),
                location: venue.get("Address")
              };
            }
          }

          setUserInfo({
            username: currentUser.get("username"),
            userType,
            entityInfo
          });
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
      setLoading(false);
    };

    checkUserAndFetchInfo();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h5" align="center">Loading...</Typography>
      </Container>
    );
  }

  // styling
  if (userInfo) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <MusicIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Welcome, {userInfo.username}!
            </Typography>
          </Box>
          
          {userInfo.entityInfo && (
            <Card sx={{ mb: 3, bgcolor: "background.default" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Your {userInfo.entityInfo.type}:
                </Typography>
                <Typography>Name: {userInfo.entityInfo.name}</Typography>
                {userInfo.entityInfo.genre && (
                  <Typography>Genre: {userInfo.entityInfo.genre}</Typography>
                )}
                {userInfo.entityInfo.location && (
                  <Typography>Location: {userInfo.entityInfo.location}</Typography>
                )}
              </CardContent>
            </Card>
          )}

          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                startIcon={<RegisterIcon />}
                size="large"
              >
                Register
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                startIcon={<LoginIcon />}
                size="large"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <MusicIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Welcome to BandConnect
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Connect with bands and venues in your area
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              startIcon={<RegisterIcon />}
              size="large"
            >
              Register
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              startIcon={<LoginIcon />}
              size="large"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AuthModule;
