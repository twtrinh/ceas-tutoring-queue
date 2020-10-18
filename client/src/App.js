import React, { useState, useEffect } from 'react';
import './App.css';
import { List, Typography, Divider } from 'antd';

function App() {
  const [requests, setRequests] = useState([])
  useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(req => setRequests(req.map((req, index)=>({...req, index}))))
  }, [])
  return (
    <div>
      <List bordered={true} 
        dataSource={requests}
        renderItem={request => <List.Item><p>{request.index + " " + request.name}</p></List.Item>}
      />
    </div>
  );
}

export default App;
