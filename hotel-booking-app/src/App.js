import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  const handleLogin = () => {
    // Implement your login logic here (e.g., validate user)
    // For simplicity, we'll just set loggedIn to true if email and password are not empty
    if (user.email && user.password) {
      setLoggedIn(true);
    }
  };

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {loggedIn ? (
                <>
                  <li>
                    <Link to="/rooms">Room Selection</Link>
                  </li>
                  <li>
                    <Link to="/food">Food Cuisines</Link>
                  </li>
                </>
              ) : null}
              <li>
                <Link to="/login">{loggedIn ? 'Logout' : 'Login'}</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Switch>
          <Route path="/login">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <div>
                <h2>Login</h2>
                <input
                  type="text"
                  placeholder="Name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <button onClick={handleLogin}>Login</button>
              </div>
            )}
          </Route>
          <PrivateRoute path="/rooms" component={RoomSelection} />
          <PrivateRoute path="/food" component={FoodCuisines} />
          <Route path="/">
            <h2>Welcome to the Hotel Booking App</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function RoomSelection() {
  return <h2>Room Selection Page</h2>;
}

function FoodCuisines() {
  return <h2>Food Cuisines Page</h2>;
}

export default App;
