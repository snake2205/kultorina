import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToken } from "../hooks/useToken";
import { useState, useEffect } from "react";
import { return_error } from "../errors/errorHandling";
import { Navigate } from "react-router-dom";


function Report_Form() {
  const [data, setData] = useState('');
  const [error, setError] = useState(null); {/* js hook, basically variable error, kuru var definēt izmantojot funkciju setError() */ }

   const reload = () => {
   window.location.reload();
   };

   const Fast = () => {
        const payload = new FormData();
        payload.append('id', data['report id']); 
        axios.post("http://127.0.0.1:8000/admin/delete_report", payload) 
            .then((res) => {axios.post('http://127.0.0.1:8000/admin/reported_questions')
      .then(response => setData(response.data))
      .catch(error => console.log(error));})};
 
    const Furious = () => {
        const payload = new FormData();
        payload.append('id', data['report id']);
        payload.append('data_id', data['data id']);
        axios.post("http://127.0.0.1:8000/admin/delete_question", payload) 
            .then((res) => {axios.post('http://127.0.0.1:8000/admin/reported_questions')
      .then(response => setData(response.data))
      .catch(error => console.log(error)); })};

  
  useEffect(() => {
    axios.post('http://127.0.0.1:8000/admin/reported_questions')
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
     <td style={{ border: '1px solid black' }}>
                <img src={data['image']} alt="Image" style={{ maxWidth: '1000px' }} />
              </td>
      {data && (
        <table style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', textAlign: 'center' }}>Report ID</th>
              <th style={{ border: '1px solid black', textAlign: 'center' }}>Votes</th>
              <th style={{ border: '1px solid black', textAlign: 'center' }}>Name</th>
              <th style={{ border: '1px solid black', textAlign: 'center' }}>URL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', textAlign: 'center' }}>{data['report id']}</td>
              <td style={{ border: '1px solid black', textAlign: 'center' }}>{data['votes']}</td>
              <td style={{ border: '1px solid black', textAlign: 'center' }}>{data['name']}</td>
              <td style={{ border: '1px solid black', textAlign: 'center' }}>{data['url']}</td>
            </tr>
          </tbody>
        </table>
      )}
          <button onClick={Fast}>Izdzēst reportu</button>
          <button onClick={Furious}>Izdzēst jautājumu</button>
    </div>
  );
}

export default Report_Form; 



