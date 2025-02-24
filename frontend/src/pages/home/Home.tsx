import React from 'react';

export default function Home() {
  React.useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('token')!));
  }, []);
  return (
    <div>
      <a href="/auth/signin">Sign In</a>
      <br />
      <a href="/auth/signup">Sign Up</a>
    </div>
  );
}
