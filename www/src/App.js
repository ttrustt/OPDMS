import './App.css';
import Dashboard from './components/Dashboard'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <div style={{height:'100vh',alignItems:"center" ,alignSelf:"center", alignContent:"center"}}>
    <Dashboard></Dashboard>
    </div>
    </BrowserRouter>
  );
}

export default App;
