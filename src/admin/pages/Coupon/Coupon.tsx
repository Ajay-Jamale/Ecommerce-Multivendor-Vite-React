import React, { useEffect } from 'react'
import CouponTable from './CouponTable'
import { useAppDispatch } from '../../../Redux Toolkit/Store'
import { fetchAllCoupons } from '../../../Redux Toolkit/Admin/AdminCouponSlice'
import { Box, Typography } from '@mui/material'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'

const Coupon = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchAllCoupons(localStorage.getItem("jwt") || ""))
    }, [])

    return (
        <Box sx={{ backgroundColor: '#f3f3f3', minHeight: '100vh', p: 3 }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 3,
                pb: 2,
                borderBottom: '2px solid #FF9900',
            }}>
                <LocalOfferIcon sx={{ color: '#FF9900', fontSize: 28 }} />
                <Typography variant="h5" sx={{
                    fontFamily: '"Amazon Ember", "Arial", sans-serif',
                    fontWeight: 700,
                    color: '#131921',
                    letterSpacing: '-0.3px',
                }}>
                    Coupon Management
                </Typography>
                <Typography variant="body2" sx={{
                    color: '#565959',
                    fontFamily: '"Amazon Ember", "Arial", sans-serif',
                    ml: 'auto',
                    fontSize: '12px',
                }}>
                    Amazon Seller Central › Promotions › Coupons
                </Typography>
            </Box>

            <CouponTable />
        </Box>
    )
}

export default Coupon