"use client";

import Image from "next/image";

import logo from "@/assets/logo.png";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex items-center justify-center">
      <Link href="/">
        <Image src={logo} alt="Logo" height={50} width={50} />
      </Link>
    </div>
  );
};

export default NavBar;
