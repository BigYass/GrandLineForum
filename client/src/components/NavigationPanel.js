import Login from "./nav/Login";
import Logout from "./nav/Logout";

export default function NavigationPanel(props) {
  return (
    <nav id="navigation_pan">
      {(props.isConnected) ? <Logout logout={props.logout}/> : <Login login={props.login}/>}
    </nav>
  )
}