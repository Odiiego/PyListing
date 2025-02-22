import React from 'react';

export default function Home() {
  React.useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('token')!));
  }, []);
  return <div>home</div>;
}
