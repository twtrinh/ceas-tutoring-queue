import React, { useState, useEffect } from 'react';
import { List } from 'antd';

export default function Home() {
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
  )
}