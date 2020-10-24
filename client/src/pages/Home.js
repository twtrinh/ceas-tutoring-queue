import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import { useUser } from '../contexts/UserContext';

export default function Home() {
  const [requests, setRequests] = useState([]);
  const user = useUser();
  useEffect(() => {
    getRequests()
  }, [user]);

  const getRequests = () => {
    fetch("/api/requests")
      .then(res => res.json())
      .then(req => {
        setRequests(req.map((req, index) => ({ ...req, index })))
      });
  }

  const fulfillRequest = (id) => {
    user.getIdToken()
    .then(idToken => fetch("/api/requests/dequeue", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }, 
      body: JSON.stringify({requestID: id})
    }))
    .then(getRequests);
  }

  return (
    <List bordered={true}
      dataSource={requests}
      renderItem=
      {
        request =>
        user || !request.completed ?
          <List.Item>
            <p>
              {               
                `${request.index} ${request.firstName} ${request.lastName}`
              }
            </p>
            {
              user && !request.completed ?
                <button onClick={() => fulfillRequest(request.id)}>
                  Complete
                </button>
                :
                null
            }
          </List.Item>
          :
          null
      }
    />
  )
}