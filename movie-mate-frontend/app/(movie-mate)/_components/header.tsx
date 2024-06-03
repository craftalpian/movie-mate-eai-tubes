"use client";

import { getUser } from "../_hooks/detail";

const Header = () => {
  const { data } = getUser();
  return (
    <div className="navbar bg-base-100 border-b shadow-sm absolute top-0 max-w-sm z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="https://github.com/craftalpian">Github</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl" href="/">
          MovieMate👻
        </a>
      </div>
      <div className="navbar-end">
        {!data?.full_name ? (
          <a
            href="http://localhost:3000/oauth/login?callback_url=http://localhost:3000/callback&client_id=o8auyha97d87hadias"
            className="btn btn-primary"
          >
            Masuk
          </a>
        ) : (
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt={data?.full_name} src={data?.image_url} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
