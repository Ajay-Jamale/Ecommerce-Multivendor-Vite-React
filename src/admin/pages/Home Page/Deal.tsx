import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import TableChartIcon from '@mui/icons-material/TableChart'
import CategoryIcon from '@mui/icons-material/Category'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DealsTable from './DealsTable'
import DealsCategoryTable from './DealsCategoryTable'
import CreateDealForm from './CreateDealForm'
import { useAppDispatch } from '../../../Redux Toolkit/Store'
import { getAllDeals } from '../../../Redux Toolkit/Admin/DealSlice'

const tabs = [
    { name: 'Deals',       icon: <TableChartIcon sx={{ fontSize: 15 }} /> },
    { name: 'Categories',  icon: <CategoryIcon sx={{ fontSize: 15 }} /> },
    { name: 'Create Deal', icon: <AddCircleOutlineIcon sx={{ fontSize: 15 }} /> },
]

const Deal = () => {
    const [activeTab, setActiveTab] = useState(tabs[0].name)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllDeals())
    }, [])

    return (
        <Box sx={{ backgroundColor: '#f3f3f3', minHeight: '100vh', p: 3 }}>
            {/* Page header */}
            <Box sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                mb: 3, pb: 2, borderBottom: '2px solid #FF9900',
            }}>
                <LocalOfferIcon sx={{ color: '#FF9900', fontSize: 28 }} />
                <Typography variant="h5" sx={{
                    fontFamily: '"Amazon Ember", Arial, sans-serif',
                    fontWeight: 700, color: '#131921', letterSpacing: '-0.3px',
                }}>
                    Deals Management
                </Typography>
                <Typography variant="body2" sx={{
                    color: '#565959', ml: 'auto', fontSize: 12,
                    fontFamily: '"Amazon Ember", Arial, sans-serif',
                }}>
                    Seller Central › Promotions › Deals
                </Typography>
            </Box>

            {/* Tab bar */}
            <Box sx={{
                display: 'flex',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                overflow: 'hidden',
                mb: 3,
                width: 'fit-content',
            }}>
                {tabs.map((tab, i) => {
                    const isActive = activeTab === tab.name
                    return (
                        <Box
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            sx={{
                                display: 'flex', alignItems: 'center', gap: 0.8,
                                px: 2.5, py: 1.2, cursor: 'pointer',
                                fontFamily: '"Amazon Ember", Arial, sans-serif',
                                fontSize: 13, fontWeight: isActive ? 700 : 400,
                                color: isActive ? '#131921' : '#565959',
                                backgroundColor: isActive ? '#FF9900' : 'transparent',
                                borderRight: i < tabs.length - 1 ? '1px solid #ddd' : 'none',
                                borderBottom: isActive ? '3px solid #e88b00' : '3px solid transparent',
                                transition: 'all 0.15s ease',
                                userSelect: 'none',
                                '&:hover': { backgroundColor: isActive ? '#e88b00' : '#f7f7f7' },
                            }}
                        >
                            {tab.icon}
                            {tab.name}
                        </Box>
                    )
                })}
            </Box>

            {/* Tab content */}
            <Box>
                {activeTab === 'Deals'       && <DealsTable />}
                {activeTab === 'Categories'  && <DealsCategoryTable />}
                {activeTab === 'Create Deal' && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                        <CreateDealForm onSuccess={() => setActiveTab('Deals')} />
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default Deal