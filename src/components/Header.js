import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const { isLoading, isAuthenticated, user } = useAuth0();
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <h1>Simple Tasks</h1>
      {isAuthenticated ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <div>User: {user.name}</div>
          <LogoutButton />
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>No user logged in</div>
          <LoginButton />
        </div>
      )}
    </>
  );
};

export default Header;
