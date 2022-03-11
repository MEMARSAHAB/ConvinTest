import React from 'react';

import './UserDetail.css';

function UserDetail({ user, loading, error }) {
  return (
    <div className='detail_cont'>
      {loading ? (
        <h2 className='info'>Loading..</h2>
      ) : error ? (
        <h2 className='info error'>Error..</h2>
      ) : user ? (
        <div className='user_info'>
          <img className='avatar' src={`${user?.avatar}`} />
          <h2 className='info'>First Name : {user?.first_name}</h2>
          <h2 className='info'>Last Name : {user?.last_name}</h2>
          <h2 className='info'>Email : {user?.email}</h2>
        </div>
      ) : (
        <h2 className='info'>
          Please Click on any of the button bellow for user details.
        </h2>
      )}
    </div>
  );
}

export default UserDetail;
