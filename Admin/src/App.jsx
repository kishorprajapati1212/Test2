import React from "react";
import Sidebars from "./Global_Component/Sidebar";
import Approutes from "./Approutes";
import Theme from "./Theme";

function App() {
  return (
    <div style={{ display: "flex", height: "100vh", width: "100%", backgroundColor: Theme.primary[100] }}>
      {/* Sidebar */}
      <Sidebars />

      {/* Main Content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <Approutes />
      </div>
    </div>
  );
}

export default App;