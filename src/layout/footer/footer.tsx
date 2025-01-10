export const Footer: React.FC = () => {
  return (
    <footer className="p-4 text-center bg-gray-100 h-20 font-sans text-gray-500 flex items-center justify-center">
      © {new Date().getFullYear()} BitBlogs. All Rights Reserved
    </footer>
  );
};
