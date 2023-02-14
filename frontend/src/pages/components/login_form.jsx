import React from "react";
import { Link, Outlet } from "react-router-dom";

function Login_Form() {
    return (
        <>
        
      <form>
        <label>Lietotājvārds:
          <input type="text" />
        </label>
      </form>

      <form>
        <label>Parole:
          <input type="text" />
        </label>
      </form>
      <button>Informācija ir ievadīta!</button>
      </>
      
    )
  }
  



export default Login_Form;
