import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-5">
      <h1 className="text-4xl font-bold">MaileHereko</h1>
      <nav>
        <Link href="/movies" className="mx-2 text-lg">
          Movies
        </Link>
        <Link href="#" className="mx-2 text-lg">
          TV Shows
        </Link>
        <Link href="#" className="mx-2 text-lg">
          Suggest me
        </Link>
      </nav>
    </header>
  );
};

export default Header;
