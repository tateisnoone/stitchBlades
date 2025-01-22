import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ShareOutfitSection = () => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate("/create");
  };

  return (
    <section className="relative bg-gradient-to-t from-violet-100 via-violet-300 to-background py-20">
      <div className="container mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-black dark:text-black mb-4">
          Create Your Own Outfit Post
        </h2>

        {/* Description */}
        <p className="text-black dark:text-gray-900 text-lg mb-8">
          Unleash your creativity by sharing your favorite outfits with the
          community. Upload pictures, add details, and inspire others with your
          unique style!
        </p>

        {/* CTA Button */}
        <Button
          className="px-6 py-3 text-lg font-medium text-white dark:text-black
           rounded-lg shadow-md  focus:outline-none focus:ring-2 "
          onClick={handleCreatePost}
        >
          Start Creating
        </Button>
      </div>

      {/* Image */}
    </section>
  );
};

export default ShareOutfitSection;
