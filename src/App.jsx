import { useState } from "react";

import Login from "./Login/Login";
import Content from "./Content/Content";

function App() {
  const [auth, setAuth] = useState(false);
  return (
    <>
      {!auth && <Login setAuth={setAuth} />}
      {auth && <Content />}
    </>
  );
}

export default App;
