import './App.css';
import AdminTab from './Components/AdminTab';
import BrandManagement from './Components/BrandManagement';
import CategoryManagement from './Components/CategoryManagement';
import { ThemeProvider } from './Components/ThemeContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import TabManager from './Components/TabManager';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ThemeProvider>
        <AdminTab />
        <TabManager>
          <Routes>
            <Route 
              path="/products/category" 
              element={<CategoryManagement />} 
            />
            <Route 
              path="/products/brand" 
              element={<BrandManagement />} 
            />
            <Route 
              path="/" 
              element={
                <div className="welcome-container">
                  <h2>Welcome to Admin Dashboard</h2>
                  <p>Select an option from the sidebar to get started.</p>
                </div>
              } 
            />
          </Routes>
        </TabManager>
         </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;