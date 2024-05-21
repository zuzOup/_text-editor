import { useState } from "react";

import Login from "./Login/Login";
import Content from "./Content/Content";

function App() {
  const [auth, setAuth] = useState(false);

  if (!auth) return <Login setAuth={setAuth} />;

  return <Content />;
}

export default App;
