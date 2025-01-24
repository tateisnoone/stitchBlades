import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CategoryType } from "@/supabase/posts/index.types";
import { categories } from "@/pages/create-post/components/categories";
interface CategoriesProps {
  selectedCategory: CategoryType | undefined;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<CategoryType | undefined>
  >;
}

const CategoriesFilter: React.FC<CategoriesProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full mt-4 px-4 sm:w-[170px] sm:border-r md:w-[250px]"
    >
      <AccordionItem value="item-1" className="w-full">
        <AccordionTrigger className="font-title text-2xl flex gap-1 mr-5">
          Categories
        </AccordionTrigger>
        {categories.map((category) => (
          <AccordionContent key={category}>
            <button
              onClick={() => setSelectedCategory(category)}
              className={`font-body category-button ${
                selectedCategory === category ? "text-[#6A0DAD] font-bold" : ""
              }`}
            >
              {category}
            </button>
          </AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
  );
};

export default CategoriesFilter;
