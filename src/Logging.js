import React, { useState } from 'react'
import LoginForm from "./LoginForm";


export default function Logging() {



    const adminUser = {
        email: "admin@admin.com",
        password: "admin123"
    }
    
      const [user, setUser] = useState({name: "", email: ""});
      const [error, setError] = useState("");
    
      const Login = details => {
        console.log(details);

        if (details.email == adminUser.email && details.password == adminUser.password){
            console.log("Logged in");
            setUser({
                name: details.name,
                email: details.email
            });
        } else {
            console.log("Details do not match!");
            setError("Details do not match!");
        }
      }
    
      const Logout = () => {
        setUser({name: "", email: ""});
        
      }
    return (
        
        <div className="bg-light">
            {(user.email != "") ? (
                <div>
                    <h2>welcome, <span>{user.name}</span></h2>
                    <button onClick={Logout}>Logout</button>
                </div>
            ) : (
                <LoginForm Login={Login} error={error}/>
            )}
        </div>
    
    )
}