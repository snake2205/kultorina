import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToken } from "../hooks/useToken";
import { useState, useEffect } from "react";
import { return_error } from "../errors/errorHandling";
import { Navigate } from "react-router-dom";

function Sigma() {
    const [inputFields, setInputFields] = useState([
      { name: '', age: '' }
    ])
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
     }
     const addFields = () => {
        let data = [...inputFields];
        let newfield = { name: data[data.length - 1].name, age: data[data.length - 1].age }
    
        setInputFields([...inputFields, newfield])
    }
    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }
    const submit = (e) => {
        e.preventDefault();
        console.log(inputFields)
    }
    return (
      <div className="App">
        <form onSubmit={submit}>
          {inputFields.map((input, index) => {
            return (
              <div key={index}>
                <input
                  name='name'
                  placeholder='Name'
                  value={input.name}
                  onChange={event => handleFormChange(index, event)}
                />
                <input
                  name='age'
                  placeholder='Age'
                  value={input.age}
                  onChange={event => handleFormChange(index, event)}
                />
                <button onClick={() => removeFields(index)}>Lauks tiek atņemts!</button>
                
                
              </div>
            )
          })}
          <button onClick={addFields}>Pievieno jaunu lauku beigās!</button>
          <button onClick={submit}>Informācijas nodeve!</button>
          
        </form>
      </div>
    );
  }
  
  export default Sigma;

