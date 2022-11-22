import Login from "./components/Login/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((res) => setData(res.message));
  }, []);

  console.log(data);

  return (
    <Router>
      <div className="App">
        <Login data={data} />
      </div>
    </Router>
  );
}

export default App;
