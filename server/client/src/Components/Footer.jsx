import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const Footer = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();

  return (
    <>
      {/* adding the footer */}
      <footer className="relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between sm:px-20 text-white bg-gray-800">
        {/* adding copyright section */}
        <section className="text-lg">
          Copyright {year} | All Rights Reserved
        </section>

        {/* adding the social media section */}
        <section className="flex items-center justify-center gap-5 text-2xl text-white">
          <a
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
            href="#"
          >
            <BsFacebook />
          </a>
          <a
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
            href="#"
          >
            <BsInstagram />
          </a>
          <a
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
            href="#"
          >
            <BsTwitter />
          </a>
          <a
            className="hover:text-yellow-500 transition-all ease-in-out duration-300"
            href="#"
          >
            <BsLinkedin />
          </a>
        </section>
      </footer>
    </>
  );
};

export default Footer;
