import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import UserDetail from './components/UserDetail';
import { getUsers } from './redux/actions/user';

function App() {
  const dispatch = useDispatch();

  const [pageNo, setPageNo] = useState(0);
  const [user, setUser] = useState(null);
  const [UserError, setUserError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getUsers({ pageNo }));
    setUser(null);
    setUserError(false);
    setLoading(false);
  }, [pageNo]);

  const users = useSelector((state) => state.user.users);
  const error = useSelector((state) => state.user.error);
  const isLoading = useSelector((state) => state.user.loading);

  const handleClick = (e) => {
    const { nodeName, textContent } = e.target;
    if (nodeName === 'BUTTON') {
      setLoading(true);
      axios
        .get(`https://reqres.in/api/users/${textContent}`)
        .then((res) => {
          setUser(res?.data?.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setUserError(true);
          console.log(error);
        });
    }
  };

  const handelNext = () => {
    setPageNo(!pageNo);
  };

  if (isLoading) {
    return (
      <div className='page_cont'>
        <div className='center_box'>
          <h2 className='info'>Loading.....</h2>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className='page_cont'>
        <div className='center_box'>
          <h2 className='info error'>
            Somthing Went wrong, Please try after some time
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className='page_cont'>
      <h2 className='info'>Convin Assignment</h2>
      <h2 className='info'>Name : Deepak Meena</h2>
      <h2 className='info'>Email : memarsahab@gamil.com</h2>
      <h2 className='info'>
        Resume Link :
        <a
          target='_blank'
          href='https://drive.google.com/file/d/1QObBvBUKPuhOfrTzrv5nhTaMlODdtxfO/view?usp=sharinghttps://drive.google.com/file/d/1QObBvBUKPuhOfrTzrv5nhTaMlODdtxfO/view?usp=sharing'
          className='link'
        >
          Resume
        </a>
      </h2>

      <div className='center_box'>
        <UserDetail user={user} error={UserError} loading={loading} />

        <div className='btn_group_cont' onClick={handleClick}>
          {users?.map((user, ind) => {
            return (
              <button className='btn' key={user?.id}>
                {user?.id}
              </button>
            );
          })}
        </div>
        {pageNo == 0 ? (
          <button className='next_btn' onClick={handelNext}>
            next batch
          </button>
        ) : (
          <button className='next_btn' onClick={handelNext}>
            pre batch
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
