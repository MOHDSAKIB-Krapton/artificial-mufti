import React from "react";
import Header from "./header/page";
import { CenteredWithLogo } from "../blocks/footer/centered-with-logo";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <div>{children}</div>
      <CenteredWithLogo />
    </div>
  );
};

export default Layout;
