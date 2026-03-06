import React from 'react'
import {
    Box, Button, CircularProgress, FormControl, FormHelperText,
    InputAdornment, InputLabel, MenuItem, Select, TextField, Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store'
import { createDeal } from '../../../Redux Toolkit/Admin/DealSlice'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import PercentIcon from '@mui/icons-material/Percent'
import CategoryIcon from '@mui/icons-material/Category'

const amazonTextField = {
    '& label.Mui-focused': { color: '#232F3E' },
    '& .MuiOutlinedInput-root': {
        fontFamily: '"Amazon Ember", Arial, sans-serif', fontSize: 13,
        '&:hover fieldset': { borderColor: '#FF9900' },
        '&.Mui-focused fieldset': { borderColor: '#FF9900', borderWidth: 2 },
    },
    '& label': { fontFamily: '"Amazon Ember", Arial, sans-serif', fontSize: 13 },
    '& .MuiFormHelperText-root': { fontFamily: '"Amazon Ember", Arial, sans-serif', fontSize: 11 },
}

interface Props {
    onSuccess?: () => void
}

const CreateDealForm = ({ onSuccess }: Props) => {
    const { homePage, deal } = useAppSelector(store => store)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: { discount: '' as unknown as number, category: '' },
        validationSchema: Yup.object({
            discount: Yup.number()
                .typeError('Enter a valid number')
                .required('Discount is required')
                .min(1, 'Discount must be at least 1%')
                .max(100, 'Discount cannot exceed 100%'),
            category: Yup.string().required('Please select a category'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const result = await dispatch(createDeal({
                discount: values.discount,
                category: { id: values.category },
            }))
            if (createDeal.fulfilled.match(result)) {
                resetForm()
                onSuccess?.()
            }
        },
    })

    return (
        <Box sx={{
            width: 500,
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
            {/* Header */}
            <Box sx={{
                backgroundColor: '#232F3E', px: 3, py: 2,
                display: 'flex', alignItems: 'center', gap: 1.5,
                borderBottom: '3px solid #FF9900',
            }}>
                <LocalOfferIcon sx={{ color: '#FF9900', fontSize: 20 }} />
                <Typography sx={{ color: '#fff', fontFamily: '"Amazon Ember", Arial, sans-serif', fontWeight: 700, fontSize: 15 }}>
                    Create New Deal
                </Typography>
            </Box>

            <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {/* Discount */}
                <TextField
                    fullWidth
                    id="discount"
                    name="discount"
                    label="Discount Percentage"
                    type="number"
                    value={formik.values.discount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.discount && Boolean(formik.errors.discount)}
                    helperText={formik.touched.discount && formik.errors.discount}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PercentIcon sx={{ fontSize: 16, color: '#565959' }} />
                            </InputAdornment>
                        ),
                        inputProps: { min: 1, max: 100 },
                    }}
                    sx={amazonTextField}
                />

                {/* Category */}
                <FormControl
                    fullWidth
                    error={formik.touched.category && Boolean(formik.errors.category)}
                    sx={{
                        '& label.Mui-focused': { color: '#232F3E' },
                        '& .MuiOutlinedInput-root': {
                            fontFamily: '"Amazon Ember", Arial, sans-serif', fontSize: 13,
                            '&:hover fieldset': { borderColor: '#FF9900' },
                            '&.Mui-focused fieldset': { borderColor: '#FF9900', borderWidth: 2 },
                        },
                        '& label': { fontFamily: '"Amazon Ember", Arial, sans-serif', fontSize: 13 },
                    }}
                >
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="Category"
                        startAdornment={
                            <InputAdornment position="start">
                                <CategoryIcon sx={{ fontSize: 16, color: '#565959' }} />
                            </InputAdornment>
                        }
                    >
                        {homePage.homePageData?.dealCategories.map((item) => (
                            <MenuItem key={item.id} value={item.id} sx={{ fontSize: 13, fontFamily: '"Amazon Ember", Arial, sans-serif' }}>
                                {item.categoryId}
                            </MenuItem>
                        ))}
                    </Select>
                    {formik.touched.category && formik.errors.category && (
                        <FormHelperText sx={{ fontFamily: '"Amazon Ember", Arial, sans-serif', fontSize: 11 }}>
                            {formik.errors.category}
                        </FormHelperText>
                    )}
                </FormControl>

                {/* Note */}
                <Box sx={{ backgroundColor: '#FFF3CD', border: '1px solid #FFEAA7', borderRadius: '3px', px: 2, py: 1 }}>
                    <Typography sx={{ fontSize: 12, color: '#856404', fontFamily: '"Amazon Ember", Arial, sans-serif' }}>
                        <strong>Note:</strong> The deal will appear on the homepage for the selected category. After creating, you'll be redirected to the Deals list.
                    </Typography>
                </Box>

                {/* Submit */}
                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    disabled={deal?.loading}
                    sx={{
                        backgroundColor: '#FF9900', color: '#0F1111',
                        fontFamily: '"Amazon Ember", Arial, sans-serif',
                        fontWeight: 700, fontSize: 14, textTransform: 'none',
                        borderRadius: '20px', py: 1.2,
                        border: '1px solid #e88b00',
                        boxShadow: '0 1px 0 rgba(255,255,255,.4) inset, 0 -1px 0 rgba(0,0,0,.15) inset',
                        '&:hover': { backgroundColor: '#e88b00', boxShadow: 'none' },
                        '&:active': { backgroundColor: '#d47f00' },
                        '&.Mui-disabled': { backgroundColor: '#f7ca7d', color: '#9d9d9d' },
                    }}
                >
                    {deal?.loading
                        ? <CircularProgress size={22} sx={{ color: '#0F1111' }} />
                        : 'Create Deal'
                    }
                </Button>
            </Box>
        </Box>
    )
}

export default CreateDealForm