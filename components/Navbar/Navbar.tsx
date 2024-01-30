"use client";

import React from "react";
import "./Navbar.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathName = usePathname();

  return (
    <div className="navbar">
      <li className="link">
        <Link href="/">Weather HUB</Link>
      </li>
      <li className="link">
        {pathName && pathName === "/" ? (
          <Link href="/collection">Collection</Link>
        ) : (
          <Link href="/">Home</Link>
        )}
      </li>
    </div>
  );
};

export default Navbar;
