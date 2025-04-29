import Parse from "parse";

// used in auth register component
export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.username); //added username
  user.set("bandName", newUser.bandName); //added bandname
  user.set("genre", newUser.genre);       //added gener
  user.set("password", newUser.password);
  user.set("email", newUser.email);
  user.set("venue_pointer", newUser.venue_pointer);
  user.set("band_pointer", newUser.band_pointer);

  console.log("User: ", user);
  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// used in auth login component
export const loginUser = (currUser) => {
  const user = new Parse.User();

  user.set("password", currUser.password);
  user.set("username", currUser.email);
  user.set("venue_pointer", currUser.venue_pointer);
  user.set("band_pointer", currUser.band_pointer);
  console.log("User: ", user);
  console.log();
  return user
    .logIn(user.email, user.password)
    .then((currUserSaved) => {
      return currUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const checkUser = () => {
  const user = Parse.User.current();
  return user !== null; // just check if there is a current user
};
