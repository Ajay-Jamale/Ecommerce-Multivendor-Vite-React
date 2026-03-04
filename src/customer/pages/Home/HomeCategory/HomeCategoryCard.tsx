import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./HomeCategoryCard.css"

const HomeCategoryCard = ({ item }: any) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${item.categoryId}`)}
      className="
        w-[160px] lg:w-[230px]
        flex flex-col items-center
        rounded-2xl bg-white border border-gray-100
        shadow-sm hover:shadow-md 
        transition-all duration-300 cursor-pointer
        p-4 gap-3
        hover:-translate-y-1 
        active:scale-95     /* good for mobile click feedback */
      "
    >
      {/* Image Box */}
      <div className="
        w-full h-[130px] lg:h-[180px]
        rounded-xl overflow-hidden
        bg-gray-50 
        flex items-center justify-center
      ">
        <img
          src={item.image}
          alt={item.name}
          className="
            w-full h-full object-contain 
            transition-transform duration-500 
            group-hover:scale-105 
          "
        />
      </div>

      {/* Category Name */}
      <h2 className="font-medium text-gray-800 text-center text-sm lg:text-base tracking-wide">
        {item.name}
      </h2>
    </div>
  )
}

export default HomeCategoryCard
