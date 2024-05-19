import { useState } from "react";

import Login from "./Login/Login";
import Editor from "./Editor";



function App() {
  const [auth, setAuth] = useState(false);

  if (!auth) return <Login setAuth={setAuth} />;

  return <Editor />;
}

export default App;
