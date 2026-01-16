import React from "react";
import { Download, Eye } from "lucide-react";

interface HeaderProps {
  onDownload: () => void;
  onPreview: () => void;
  filteredCount: number;
}

const Header: React.FC<HeaderProps> = ({ onDownload, onPreview, filteredCount }) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white py-8 shadow-xl">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2">
          🔥 JavaScript Interview Hub
        </h1>
        <p className="text-center text-purple-100 text-lg mb-8">
          Master Async, Arrays & React Concepts
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={onDownload}
            className="flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <Download size={20} />
            Download PDF ({filteredCount})
          </button>
          <button
            onClick={onPreview}
            className="flex items-center gap-2 bg-purple-800 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-purple-400"
          >
            <Eye size={20} />
            Preview PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
