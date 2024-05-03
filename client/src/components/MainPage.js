import { useState } from "react";
import Signin from "./Signin";
import NavigationPanel from "./NavigationPanel";

export default function MainPage(props) {
  const [isConnected, setConnected] = useState(false)
  const [page, setPage] = useState("signin_page")

  const getConnected = () => {
    setConnected(true)
    setPage("message_page")
  }

  const setLogout = () => {
    setConnected(false)
    setPage("signin_page")
  }

  return (
    <div>
      {page==="signin_page" ? 
        <Signin /> 
        : <NavigationPanel login={getConnected} logout={setLogout} isConnected={isConnected}/>
      }
    </div>
  )
}