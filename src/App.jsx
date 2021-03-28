import React from "react";
import "./App.scss";
import AppRoutes from "./components/AppRoutes.jsx";
import ErrorBoundary from "./view/ErrorBoundary.jsx";

export default function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}
