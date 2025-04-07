import React from "react";
import RootLayout from "./Layout";
import Navbar from "./components/Navbar";
import Dashboard from "./components/pages/Dashboard";

function App() {
  return (
    <RootLayout>
      <div className="min-h-screen">
        <Navbar />
        <Dashboard />
      </div>
    </RootLayout>
  );
}

export default App;
