import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#112d55] text-[#f9f1f1] py-6 border-t border-[#ccd5ae] ml-4 mr-4 rounded-t-3xl">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center text-center md:text-left">
        <div className="mb-4 md:mb-0 flex flex-col items-center">
          <h4 className="font-semibold text-lg justify-center">ConnectWell</h4>
          <p className="text-sm">Empowering local support and care networks.</p>
        </div>
      </div>
      <div className="text-center mt-4 text-xs text-[#a3b18a]">
        © {new Date().getFullYear()} ConnectWell. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
