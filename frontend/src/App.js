import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthContext } from "./context";
import AppRouter from "./components/AppRouter/AppRouter";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      <Router>
        <AppRouter />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
