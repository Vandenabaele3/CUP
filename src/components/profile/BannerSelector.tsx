import React from "react";
import "./BannerSelector.css";

interface BannerSelectorProps {
  banners: { file: string; label: string }[];
  onSelect: (banner: string) => void;
}

const BannerSelector: React.FC<BannerSelectorProps> = ({ banners, onSelect }) => {
  return (
    <div className="banner-selector">
      {banners.map(({ file, label }) => (
        <div key={file} className="banner-item" onClick={() => onSelect(file)}>
          <img
            src={`/images/backgrounds/${file}`}
            alt={label}
            className="banner-thumbnail"
          />
          <div className="banner-label">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default BannerSelector;
