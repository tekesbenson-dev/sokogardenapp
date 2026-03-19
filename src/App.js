import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetProducts from './components/Getproducts';
import Addproducts from './components/Addproducts';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Sokogarden</h1>
        </header>

        <Routes>
          <Route path="/" element={<GetProducts />} />
          <Route path="/addproducts" element={<Addproducts />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
         <Route path="/makepayment" element={<Makepayment />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
