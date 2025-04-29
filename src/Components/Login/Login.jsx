import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Services/Auth.js";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userType: "band" // default to band
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
      const user = await loginUser(formData.username, formData.password);
      
      // check if the logged-in user's type matches the selected type
      if (user.get("userType") !== formData.userType) {
        alert("Invalid user type. Please select the correct type.");
        return;
      }

      // redirect based on user type
      if (formData.userType === "band") {
        navigate("/bands");
      } else {
        navigate("/venues");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login; 