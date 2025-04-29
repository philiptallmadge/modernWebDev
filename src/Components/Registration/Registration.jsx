import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/Auth.js";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    userType: "band", // default to band
    name: "",
    genre: "",
    location: "",
    genrePreferred: ""
  });

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
      console.log("Starting registration with data:", formData);
      const additionalInfo = {
        name: formData.name,
        genre: formData.genre,
        location: formData.location,
        genrePreferred: formData.genrePreferred
      };

      const result = await registerUser(
        formData.username,
        formData.password,
        formData.email,
        formData.userType,
        additionalInfo
      );
      console.log("Registration successful:", result);

      // redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>I am a:</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
          >
            <option value="band">Band</option>
            <option value="venue">Venue</option>
          </select>
        </div>

        {formData.userType === "band" ? (
          <>
            <div>
              <label>Band Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Genre:</label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label>Venue Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Preferred Genre:</label>
              <input
                type="text"
                name="genrePreferred"
                value={formData.genrePreferred}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration; 