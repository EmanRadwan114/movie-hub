import { ToastContainer } from "react-toastify";
import "./App.css";
import type { ReactNode } from "react";

function Layout({ children }: { children?: ReactNode }) {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}

export default Layout;
