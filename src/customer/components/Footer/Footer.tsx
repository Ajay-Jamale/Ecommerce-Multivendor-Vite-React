import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaApple,
  FaGooglePay,
  FaArrowRight,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaHeadset,
} from "react-icons/fa";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "Men's Collection", path: "/products/men" },
      { name: "Women's Collection", path: "/products/women" },
      { name: "Electronics", path: "/products/electronics" },
      { name: "Furniture", path: "/products/furniture" },
      { name: "New Arrivals", path: "/new-arrivals" },
      { name: "Best Sellers", path: "/best-sellers" },
    ],
    support: [
      { name: "Help Center", path: "/help" },
      { name: "Shipping Information", path: "/shipping" },
      { name: "Returns & Exchanges", path: "/returns" },
      { name: "Order Tracking", path: "/track-order" },
      { name: "FAQs", path: "/faqs" },
      { name: "Contact Us", path: "/contact" },
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Blog", path: "/blog" },
      { name: "Press", path: "/press" },
      { name: "Affiliates", path: "/affiliates" },
      { name: "Sustainability", path: "/sustainability" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
      { name: "GDPR Compliance", path: "/gdpr" },
      { name: "Security", path: "/security" },
    ],
  };

  const features = [
    { icon: <FaTruck />, title: "Free Shipping", desc: "On orders" },
    { icon: <FaUndo />, title: "Easy Returns", desc: "10-day return policy" },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payment",
      desc: "100% secure checkout",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Dedicated customer service",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t-2 border-black mt-20">
      {/* Features Bar */}
      <div className="border-b-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="font-bold text-sm uppercase tracking-wider mb-1">
                  {feature.title}
                </h4>
                <p className="text-xs text-gray-600 category">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-16">
        {/* Top Section with Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand - Wider on large screens */}
          <div className="lg:col-span-2">
            <div
              onClick={() => navigate("/")}
              className="cursor-pointer flex items-center gap-3 mb-6 group"
            >
              <div className="w-12 h-12 border-2 border-black flex items-center justify-center group-hover:bg-black transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <StorefrontIcon
                  sx={{
                    color: "#000000",
                    fontSize: 26,
                    transition: "all 0.3s ease",
                  }}
                  className="group-hover:text-white"
                />
              </div>
              <span className="text-2xl font-extrabold tracking-wide">
                Shopzy
              </span>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed max-w-md mb-6 category">
              Discover premium quality fashion, electronics, and home
              essentials. We bring modern lifestyle products with trusted
              delivery and secure checkout since 2024.
            </p>

            {/* Social Icons with hover effects */}
            <div className="flex gap-3 mb-8">
              {[
                {
                  icon: <FaFacebookF size={16} />,
                  color: "#1877f2",
                  name: "Facebook",
                },
                {
                  icon: <FaTwitter size={16} />,
                  color: "#1da1f2",
                  name: "Twitter",
                },
                {
                  icon: <FaInstagram size={16} />,
                  color: "#e4405f",
                  name: "Instagram",
                },
                {
                  icon: <FaLinkedinIn size={16} />,
                  color: "#0077b5",
                  name: "LinkedIn",
                },
              ].map((social, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  title={social.name}
                >
                  <div className="absolute inset-0 bg-black scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                  <div
                    className="w-10 h-10 border-2 border-black flex items-center justify-center hover:text-white transition-all duration-300 group-hover:border-transparent z-10 relative"
                    style={{ transition: "all 0.3s ease" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = social.color;
                      e.currentTarget.style.borderColor = social.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.borderColor = "#000000";
                    }}
                  >
                    {social.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* App Store Badges */}
            <div className="flex gap-3">
              <div className="border-2 border-black px-4 py-2 flex items-center gap-2 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer group">
                <FaApple size={20} />
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold uppercase">
                    Download on
                  </span>
                  <span className="text-sm font-bold -mt-1">App Store</span>
                </div>
              </div>
              <div className="border-2 border-black px-4 py-2 flex items-center gap-2 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer group">
                <FaGooglePay size={20} />
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold uppercase">
                    Get it on
                  </span>
                  <span className="text-sm font-bold -mt-1">Google Play</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider mb-6 relative inline-block group">
              <span className="relative z-10">Shop</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li
                  key={link.name}
                  className="text-sm text-gray-700 cursor-pointer group flex items-center gap-2"
                  onClick={() => navigate(link.path)}
                >
                  <FaArrowRight
                    size={10}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                  />
                  <span className="category group-hover:font-bold group-hover:translate-x-1 transition-all duration-300">
                    {link.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider mb-6 relative inline-block group">
              <span className="relative z-10">Support</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li
                  key={link.name}
                  className="text-sm text-gray-700 cursor-pointer group flex items-center gap-2"
                  onClick={() => navigate(link.path)}
                >
                  <FaArrowRight
                    size={10}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                  />
                  <span className="category group-hover:font-bold group-hover:translate-x-1 transition-all duration-300">
                    {link.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300">
            <h3 className="text-sm font-black uppercase tracking-wider mb-3">
              Subscribe Now
            </h3>
            <p className="text-xs text-gray-700 mb-4 category">
              Get 10% off your first order and exclusive offers!
            </p>

            <div className="flex flex-col gap-3">
              <div className="flex border-2 border-black">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-3 text-sm outline-none bg-white category"
                />
                <button className="px-4 bg-black text-white font-bold hover:bg-white hover:text-black border-l-2 border-black transition-all duration-300 group">
                  <span className="group-hover:scale-110 inline-block transition-transform duration-300">
                    →
                  </span>
                </button>
              </div>

              {/* Trust Badge */}
              <p className="text-[10px] text-gray-500 category flex items-center gap-1">
                <FaShieldAlt size={10} />
                No spam. Unsubscribe anytime.
              </p>

              {/* Payment Methods */}
              <div className="mt-4 pt-4 border-t-2 border-black">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-3">
                  We Accept
                </p>
                <div className="flex gap-2 flex-wrap">
                  <FaCcVisa
                    size={28}
                    className="hover:scale-110 transition-transform duration-200"
                  />
                  <FaCcMastercard
                    size={28}
                    className="hover:scale-110 transition-transform duration-200"
                  />
                  <FaCcPaypal
                    size={28}
                    className="hover:scale-110 transition-transform duration-200"
                  />
                  <FaCcAmex
                    size={28}
                    className="hover:scale-110 transition-transform duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-y-2 border-black">
          {/* Company */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li
                  key={link.name}
                  className="text-xs text-gray-600 cursor-pointer hover:font-bold hover:pl-2 transition-all duration-200 category"
                  onClick={() => navigate(link.path)}
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li
                  key={link.name}
                  className="text-xs text-gray-600 cursor-pointer hover:font-bold hover:pl-2 transition-all duration-200 category"
                  onClick={() => navigate(link.path)}
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-2 border-black p-4 hover:bg-black hover:text-white transition-all duration-300 group">
                <p className="text-xs font-bold mb-1">Email Us</p>
                <p className="text-xs category group-hover:text-white">
                  support@shopzy.com
                </p>
                <p className="text-xs category group-hover:text-white">
                  careers@shopzy.com
                </p>
              </div>
              <div className="border-2 border-black p-4 hover:bg-black hover:text-white transition-all duration-300 group">
                <p className="text-xs font-bold mb-1">Call Us</p>
                <p className="text-xs category group-hover:text-white">
                  +1 (800) 123-4567
                </p>
                <p className="text-xs category group-hover:text-white">
                  Mon-Fri 9am-6pm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-black bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs">
            <p className="category text-gray-300">
              © {currentYear}{" "}
              <span className="font-bold text-white">SHOPZY</span>. All rights
              reserved. Crafted with ♥ for modern shopping
            </p>

            <div className="flex gap-6 mt-4 md:mt-0">
              {["Privacy", "Terms", "Cookies", "Accessibility"].map((item) => (
                <span
                  key={item}
                  className="text-gray-300 cursor-pointer hover:text-white hover:border-b hover:border-white transition-all duration-200 category text-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
