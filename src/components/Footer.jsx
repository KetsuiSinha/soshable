
import { WhatsApp, Telegram, Instagram, LinkedIn } from "@mui/icons-material";
const Footer = () => {
  return (
    <footer className="bg-white text-center py-8 shadow-md">
      <div className="flex flex-col items-center space-y-6">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-2 text-black-600">
          <span className="text-lg font-semibold justify-center">Soshable</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-black-600 font-medium">
          <a href="#" className="hover:underline">Home</a>
          <a href="#about" className="hover:underline">About</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6 text-black-600 text-2xl">
          <a href="#" className="hover:text-black-400"><WhatsApp fontSize="inherit" /></a>
          <a href="#" className="hover:text-black-400"><Telegram fontSize="inherit" /></a>
          <a href="#" className="hover:text-black-400"><Instagram fontSize="inherit" /></a>
          <a href="#" className="hover:text-black-400"><LinkedIn fontSize="inherit" /></a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">&copy; 2025 Soshable all rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;