import React from "react";

function Footer() {
  return (
      <div>
          <hr />
          <footer
              style={{ padding: "2px" }}
              className="flex m-2 gap-2 flex-col justify-center items-center p-10 text-base-content rounded "
          >
              <nav className="flex items-center justify-center gap-6">
                  <a className="link link-hover" href="/about">
                      About us
                  </a>
                  <a className="link link-hover" href="/contact">
                      Contact
                  </a>
              </nav>
              <aside>
                  <p className="text-xs">
                      Copyright © 2024 - All right reserved by ComicVerse (Aman
                      Singh)
                  </p>
              </aside>
          </footer>
      </div>
  );
}

export default Footer;
