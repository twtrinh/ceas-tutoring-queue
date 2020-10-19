import React, { useState, useEffect } from 'react';
import './App.css';
import { List, Typography, Divider } from 'antd';
import RequestForm from "./components/RequestForm";

function App() {
  const [requests, setRequests] = useState([]);
  
  useEffect(() => {
    getRequests()
  }, []);

  const getRequests = () => {
    fetch("/api/requests")
      .then(res => res.json())
      .then(req => {
        console.log(req);
        setRequests(req.map((req, index) => ({ ...req, index })))
      });
  }

  return (
    <div>
      <List bordered={true}
        dataSource={requests}
        renderItem=
        {
          request =>
            <List.Item>
              <p>
                {
                  `${request.index} ${request.firstName} ${request.lastName}`
                }
              </p>
            </List.Item>
        }
      />
      <RequestForm onSubmit={getRequests} />
    </div>
  );
}

export default App;
