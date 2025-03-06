import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Components from "./Components/Components.jsx";
import * as Env from "./environments.js";
import Parse from "parse";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

/*const Env = {
  App id= ...
}
*/

export default function App() {
  return <Components />;
}