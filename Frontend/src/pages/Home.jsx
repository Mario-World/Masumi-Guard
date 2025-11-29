import React from 'react';
import { Navigate } from 'react-router-dom';

function Home() {
  return <Navigate to="/agents" replace />;
}

export default Home;
