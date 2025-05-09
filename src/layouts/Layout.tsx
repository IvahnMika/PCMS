
import '../index.css';

import Header from './Header';
import Footer from './Footer';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="gridmain">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;