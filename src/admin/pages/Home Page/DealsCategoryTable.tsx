import React from 'react'
import { useAppSelector } from '../../../Redux Toolkit/Store'
import HomeCategoryTable from './HomeCategoryTable'
import { Box, Typography } from '@mui/material'
import CategoryIcon from '@mui/icons-material/Category'

const DealsCategoryTable = () => {
    const { homePage } = useAppSelector(store => store)
    const categories = homePage.homePageData?.dealCategories ?? []

    return (
        <Box>
            {/* Stat card */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2.5 }}>
                <Box sx={{
                    backgroundColor: '#fff', border: '1px solid #e0e0e0',
                    borderTop: '4px solid #131921', borderRadius: '4px',
                    px: 2.5, py: 1.5, minWidth: 150,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
                }}>
                    <Typography sx={{ fontSize: 24, fontWeight: 800, color: '#131921', lineHeight: 1.1, fontFamily: '"Amazon Ember", Arial, sans-serif' }}>
                        {categories.length}
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: '#565959', fontFamily: '"Amazon Ember", Arial, sans-serif', mt: 0.3 }}>
                        Deal Categories
                    </Typography>
                </Box>
            </Box>

            {categories.length === 0 ? (
                <Box sx={{
                    textAlign: 'center', py: 7,
                    backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px',
                }}>
                    <CategoryIcon sx={{ fontSize: 44, color: '#ddd', mb: 1.5 }} />
                    <Typography sx={{ fontFamily: '"Amazon Ember", Arial, sans-serif', fontSize: 14, fontWeight: 600, color: '#565959' }}>
                        No deal categories found
                    </Typography>
                </Box>
            ) : (
                <HomeCategoryTable categories={categories} />
            )}
        </Box>
    )
}

export default DealsCategoryTable