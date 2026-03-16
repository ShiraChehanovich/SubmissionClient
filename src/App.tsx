import React from "react";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage/HomePage";

export const App: React.FC = () => (
  <>
    <Toaster position="top-center" />
    <HomePage />
  </>
);
