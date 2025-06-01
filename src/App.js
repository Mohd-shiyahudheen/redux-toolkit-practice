import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './ReduxToolKit/store';
import CartView from './Pages/CartView';  

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Provider store={store}>
        <Router>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartView />} />
            </Routes>
          </Router>
        </Provider>
      </header>
    </div>
  );
}

export default App;
