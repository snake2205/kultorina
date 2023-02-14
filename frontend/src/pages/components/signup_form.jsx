import React from "react";
import { Link, Outlet } from "react-router-dom";

function Signup_Form() {
    return (
        <>
      <form>
        <label>Elektroniskā pasta adrese:
          <input type="text" />
        </label>
      </form>

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
  



export default Signup_Form;
