import { useState } from 'react';
import './SkeletonImage.css';

interface SkeletonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export default function SkeletonImage({ src, alt, className = '', ...rest }: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className={`skeleton-image-wrapper ${className}`}>
      {!loaded && !errored && <div className="skeleton-image-shimmer" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`skeleton-image-img ${loaded ? 'skeleton-image-img--loaded' : ''}`}
        {...rest}
      />
    </div>
  );
}