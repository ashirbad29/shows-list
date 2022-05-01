import { DetailedHTMLProps, ImgHTMLAttributes, useState } from 'react';

type IMGProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const Image = (props: IMGProps) => {
  const [error, setError] = useState(false);

  return !error ? (
    <img onError={() => setError(true)} {...props} />
  ) : (
    <div className="h-full min-h-[300px] w-[200px] bg-blue-400/20 flex items-center justify-center shadow-md">
      Unable to load image!
    </div>
  );
};

export default Image;
