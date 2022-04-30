import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import PeopleDashboard from "./pages/PeopleDashboard";
import { QueryClient, QueryClientProvider } from "react-query";



export default function App() {  
  const queryClient = new QueryClient();
  const access = true

    return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/log-in" element={<LogInPage />}/>
            <Route path="/people-dashboard" element={<PeopleDashboard />} />
              
            <Route path="/" element={<LogInPage />}/>
              
          </Routes>
        </Router>
      </QueryClientProvider>
      
    );
}