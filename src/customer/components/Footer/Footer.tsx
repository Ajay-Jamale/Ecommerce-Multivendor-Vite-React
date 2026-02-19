import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold tracking-wide mb-4">
              <strong>Shopzy</strong>
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Discover premium quality fashion, electronics, and home essentials.
              We bring modern lifestyle products with trusted delivery and
              secure checkout.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <div className="p-2 border border-gray-300 hover:bg-gray-100 cursor-pointer">
                <FaFacebookF size={14} />
              </div>
              <div className="p-2 border border-gray-300 hover:bg-gray-100 cursor-pointer">
                <FaTwitter size={14} />
              </div>
              <div className="p-2 border border-gray-300 hover:bg-gray-100 cursor-pointer">
                <FaInstagram size={14} />
              </div>
              <div className="p-2 border border-gray-300 hover:bg-gray-100 cursor-pointer">
                <FaLinkedinIn size={14} />
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-black cursor-pointer">Men</li>
              <li className="hover:text-black cursor-pointer">Women</li>
              <li className="hover:text-black cursor-pointer">Electronics</li>
              <li className="hover:text-black cursor-pointer">Furniture</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-black cursor-pointer">Help Center</li>
              <li className="hover:text-black cursor-pointer">Shipping</li>
              <li className="hover:text-black cursor-pointer">Returns</li>
              <li className="hover:text-black cursor-pointer">Order Tracking</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Subscribe
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Get updates about new products and special offers.
            </p>

            <div className="flex border border-gray-300">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 text-sm outline-none"
              />
              <button className="px-4 text-sm bg-black text-white">
                Join
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">

          <p>© {new Date().getFullYear()}<strong>Shopzy</strong>. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-black cursor-pointer">Privacy Policy</span>
            <span className="hover:text-black cursor-pointer">Terms of Service</span>
            <span className="hover:text-black cursor-pointer">Cookies</span>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
