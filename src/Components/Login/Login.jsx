import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Services/Auth.js";
// import the necessary components and icons from material UI
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Divider,
  Alert
} from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userType: "band"
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(formData.username, formData.password);
      
      if (user.get("userType") !== formData.userType) {
        setError("Invalid user type. Please select the correct type.");
        return;
      }

      if (formData.userType === "band") {
        navigate("/bands");
      } else {
        navigate("/venues");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  // styling
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <LoginIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome back! Please sign in to continue
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>I am a</InputLabel>
                <Select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                  label="I am a"
                >
                  <MenuItem value="band">Band</MenuItem>
                  <MenuItem value="venue">Venue</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login; 