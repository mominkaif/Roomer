import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//pages and components
import Listings from './pages/Listings'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import ProfileForm from './components/ProfileForm'

function App() {

  const { user } = useAuthContext()
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            
            <Route 
              path="/"
              element={user ? <Listings /> : <Navigate to="/login"/>}
            />

            <Route 
              path="/profile"
              element={<ProfileForm/>}
            />

            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />

            <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;