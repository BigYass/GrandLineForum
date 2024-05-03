import { useState } from "react";

export default function (props) {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [name, setName] = useState("")
  const [formOK, setFormOK] = useState(false)

  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");

  const [message, SetMessage] = useState("")

  const getLogin = (evt) => {setLogin(evt.target.value)}
  const getFirstName = (evt) => {setFirstName(evt.target.value)}
  const getName = (evt) => {setName(evt.target.value)}
  const getPass = (evt) => {setPass(evt.target.value)}
  const getPassConfirm = (evt) => {setPassConfirm(evt.target.value)}
  
  const submissionHandler = (evt) => {
    let message = ""
    
    if (firstName.length < 3) message = "First Name too short!" 
    else if (name.length < 3) message = "Name too short!"
    else if (login.length < 3) message = "Login too short!" 
    else if (pass.length < 3) message = "Password too short!"
    else if (pass !== passConfirm) message = "Passwords does not match!"
    
    
    let ok = message === ""
      
    SetMessage(message)
    setFormOK(ok)
  }
  
  return (
    <div>
      <label htmlFor="firstname">First Name</label><label htmlFor="lastname"/>
      <input id="firstname" onChange={getFirstName}/>

      <label htmlFor="lastname">Last Name</label><label htmlFor="lastname"/>
      <input id="lastname" onChange={getName}/>

      <label htmlFor="signin_login">Login</label><label htmlFor="signin_login"/>
      <input id="signin_login" onChange={getLogin}/>

      <label htmlFor="signin_password">Password</label><label htmlFor="signin_password"/>
      <input id="signin_password" onChange={getPass}/>

      <label htmlFor="signin_password_confirm">Confirm Password</label><label htmlFor="signin_password_confirm"/>
      <input id="signin_password_confirm" onChange={getPassConfirm}/>

      <button onClick={submissionHandler}>Sign In</button>
      <button type="reset">Reset</button>

      {formOK ?
        <p></p>
        : <p className="error">{message}</p>
      }
    </div>
  )
}