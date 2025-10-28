import React, { useState, useEffect } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  placeholder = "/placeholder.jpg",
}) => {
  const [imgSrc, setImgSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setIsLoaded(true);
    };
    img.onerror = () => {
      setImgSrc(placeholder);
      setIsLoaded(true);
    };
  }, [src, placeholder]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`${className} ${
        isLoaded ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
      loading="lazy"
    />
  );
};

export default LazyImage;