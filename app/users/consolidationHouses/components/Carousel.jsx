import { images } from "../data/images";

const Slider = () => {
  const imageCount = images.length;
  const duplicatedImages = [...images, ...images, ...images]; // Duplica las imágenes según sea necesario

  return (
    <div className="overflow-hidden w-full relative">
      <div className="flex animate-scroll">
        {duplicatedImages.map((image, index) => (
          <img
            key={index}
            src={image.ref}
            className="h-64 w-full"
            alt="..."
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;