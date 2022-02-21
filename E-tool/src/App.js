import './App.css'
import './style/style.css'
import BaseMap from './component/BaseMap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './component/Login'
import Register from './component/Register'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

function App () {
  return (
    <div className='App position-relative h-100'>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<BaseMap />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
