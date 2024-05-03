import { useState } from "react";

export default function Login (props) {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("");

  const getLogin = (evt) => {setLogin(evt.target.value)}
  const getPassword = (evt) => {setPassword(evt.target.value)}

  return (
    <form method="POST" action="">
      <label htmlFor="login">Login</label> <input id="login" onChange={getLogin}/>
      <label htmlFor="mdp">Password</label> <input id="password" type="password" onChange={getPassword}/>
      <button type="submit">Log In</button> <button type="reset">Annuler</button>
    </form>
  )

}