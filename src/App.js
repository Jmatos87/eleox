import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import LogInPage from "./pages/LogIn";
import PeopleDashboard from "./pages/PeopleDashboard";

import COLORS from "./constants/colors.js";

export default function App() {
  const queryClient = new QueryClient();
  const theme = createTheme({
    palette: {
      primary: {
        main: COLORS.primary,
      },
      secondary: {
        main: COLORS.secondary,
      },
      background: {
        default: COLORS.background,
      },
      text: {
        primary: "#272932",
        secondary: "#272932",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/log-in" element={<LogInPage />} />
            <Route path="/people-dashboard" element={<PeopleDashboard />} />
            <Route path="*" element={<LogInPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
