import { useEffect, useState } from "react";
import Login from "./Login/Login";

// import { writeUserData, loadInitialData } from "./helpers/base";

function App() {
  const [auth, setAuth] = useState(false);

  // const [initialData, setInitialData] = useState({});

  useEffect(() => {
    // writeUserData({ 1: 4 });
    // loadInitialData(setInitialData);
    // console.log(initialData);
  }, []);

  if (!auth) return <Login setAuth={setAuth} />;

  return [...Array(30).keys()].map((x) => <div key={x}>main</div>);
}

export default App;
