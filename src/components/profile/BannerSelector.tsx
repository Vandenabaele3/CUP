import React from "react";

interface BannerSelectorProps {
  banners: { file: string; label: string }[];
  onSelect: (banner: string) => void;
}

const BannerSelector: React.FC<BannerSelectorProps> = ({ banners, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3 p-3 bg-white/5 rounded-xl justify-center">
      {banners.map(({ file, label }) => (
        <button
          key={file}
          type="button"
          onClick={() => onSelect(file)}
          className="flex flex-col items-center cursor-pointer focus:outline-none"
          aria-label={label}
        >
          <img
            src={`/images/backgrounds/${file}`}
            alt={label}
            className="w-40 h-20 object-cover rounded-lg transition-transform duration-200 hover:scale-105 shadow hover:shadow-lg"
          />
          <span className="mt-2 text-sm text-white/85">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default BannerSelector;
