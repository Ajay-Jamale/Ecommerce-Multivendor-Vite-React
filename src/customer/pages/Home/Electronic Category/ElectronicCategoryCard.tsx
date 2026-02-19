import React from 'react'
import { useNavigate } from 'react-router-dom'

interface ElectronicItem {
  categoryId: string
  name: string
  image: string
}

const ElectronicCategoryCard = ({ item }: { item: ElectronicItem }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/products/${item.categoryId}`)}
      className='flex w-20 flex-col items-center gap-3 cursor-pointer'
    >
      <img
        className='object-contain h-10'
        src={item.image}
        alt={item.name || 'Electronic Item'}
      />
      <h2 className='font-semibold text-sm text-center'>{item.name}</h2>
    </div>
  )
}

export default ElectronicCategoryCard
