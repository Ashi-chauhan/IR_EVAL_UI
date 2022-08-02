import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { MyRoutes } from './routes';

function App() {
  return (
    <Router>
      <MyRoutes />
    </Router>
  );
}

export default App;
