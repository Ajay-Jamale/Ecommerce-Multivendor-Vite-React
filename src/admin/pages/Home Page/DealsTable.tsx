import React, { useState } from 'react'
import {
    Alert, Box, Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, IconButton, Modal, Paper,
    Skeleton, Snackbar, styled, Table, TableBody, TableCell,
    tableCellClasses, TableContainer, TableHead, TableRow,
    Tooltip, Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store'
import { deleteDeal } from '../../../Redux Toolkit/Admin/DealSlice'
import UpdateDealForm from './UpdateDealForm'
import type { Deal } from '../../../types/dealTypes'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

const PAGE_SIZE = 14

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#232F3E',
        color: '#fff',
        fontFamily: '"Amazon Ember", Arial, sans-serif',
        fontWeight: 700,
        fontSize: 12,
        letterSpacing: '0.6px',
        textTransform: 'uppercase',
        borderBottom: '3px solid #FF9900',
        padding: '14px 18px',
        whiteSpace: 'nowrap',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
        fontFamily: '"Amazon Ember", Arial, sans-serif',
        color: '#0F1111',
        padding: '12px 18px',
        borderBottom: '1px solid #f0f0f0',
    },
}))

const StyledTableRow = styled(TableRow)(() => ({
    transition: 'background-color 0.15s ease',
    '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
    '&:nth-of-type(even)': { backgroundColor: '#ffffff' },
    '&:hover': { backgroundColor: '#fff8e7' },
    '&:last-child td': { border: 0 },
}))

const DealsTable = () => {
    const { deal } = useAppSelector(store => store)
    const dispatch = useAppDispatch()

    const [page, setPage] = useState(1)
    const [editTarget, setEditTarget] = useState<number | null>(null)
    const [deleteTarget, setDeleteTarget] = useState<{ id: number; category: string } | null>(null)
    const [deletingId, setDeletingId] = useState<number | null>(null)
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false, message: '', severity: 'success',
    })

    const allDeals: Deal[] = deal.deals ?? []
    const totalPages = Math.max(1, Math.ceil(allDeals.length / PAGE_SIZE))
    const pagedDeals = allDeals.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return
        const { id, category } = deleteTarget
        setDeletingId(id)
        setDeleteTarget(null)
        const result = await dispatch(deleteDeal(id))
        setDeletingId(null)
        // if deleted item was last on this page, go back one page
        const newTotal = allDeals.length - 1
        if ((page - 1) * PAGE_SIZE >= newTotal && page > 1) setPage(p => p - 1)
        if (deleteDeal.fulfilled.match(result)) {
            setSnackbar({ open: true, message: `Deal for "${category}" deleted successfully`, severity: 'success' })
        } else {
            setSnackbar({ open: true, message: 'Failed to delete deal. Please try again.', severity: 'error' })
        }
    }

    return (
        <>
            {/* Stat cards */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2.5, flexWrap: 'wrap' }}>
                {[
                    { label: 'Total Deals', value: allDeals.length, color: '#131921', bg: '#fff' },
                    { label: 'This Page', value: pagedDeals.length, color: '#FF9900', bg: '#fffbf2' },
                ].map(stat => (
                    <Box key={stat.label} sx={{
                        backgroundColor: stat.bg,
                        border: '1px solid #e0e0e0',
                        borderTop: `4px solid ${stat.color}`,
                        borderRadius: '4px',
                        px: 2.5, py: 1.5, minWidth: 130,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
                    }}>
                        {deal.loading
                            ? <Skeleton width={40} height={32} />
                            : <Typography sx={{ fontSize: 24, fontWeight: 800, color: stat.color, lineHeight: 1.1, fontFamily: '"Amazon Ember", Arial, sans-serif' }}>
                                {stat.value}
                            </Typography>
                        }
                        <Typography sx={{ fontSize: 11, color: '#565959', fontFamily: '"Amazon Ember", Arial, sans-serif', mt: 0.3 }}>
                            {stat.label}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Table */}
            <TableContainer component={Paper} sx={{
                border: '1px solid #ddd', borderRadius: '4px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)', overflow: 'hidden',
            }}>
                <Table sx={{ minWidth: 700 }} aria-label="deals table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell>Image</StyledTableCell>
                            <StyledTableCell>Category</StyledTableCell>
                            <StyledTableCell>Discount</StyledTableCell>
                            <StyledTableCell align="center">Edit</StyledTableCell>
                            <StyledTableCell align="center">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deal.loading
                            ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                                <StyledTableRow key={i}>
                                    {Array.from({ length: 6 }).map((_, j) => (
                                        <StyledTableCell key={j}><Skeleton height={22} /></StyledTableCell>
                                    ))}
                                </StyledTableRow>
                            ))
                            : pagedDeals.map((item: Deal, index: number) => {
                                const globalIndex = (page - 1) * PAGE_SIZE + index + 1
                                const isDeleting = deletingId === item.id
                                return (
                                    <StyledTableRow key={item.id} sx={{ opacity: isDeleting ? 0.4 : 1, transition: 'opacity 0.3s' }}>
                                        {/* # */}
                                        <StyledTableCell>
                                            <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#565959', fontFamily: '"Amazon Ember", Arial, sans-serif' }}>
                                                {globalIndex}
                                            </Typography>
                                        </StyledTableCell>

                                        {/* Image */}
                                        <StyledTableCell>
                                            <Box sx={{
                                                width: 72, height: 56, borderRadius: '4px',
                                                overflow: 'hidden', border: '1px solid #e0e0e0',
                                                backgroundColor: '#f7f7f7',
                                            }}>
                                                <img
                                                    src={item.category.image}
                                                    alt={item.category.categoryId}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </Box>
                                        </StyledTableCell>

                                        {/* Category */}
                                        <StyledTableCell>
                                            <Box>
                                                <Typography sx={{ fontFamily: '"Amazon Ember", Arial, sans-serif', fontSize: 13, fontWeight: 600, color: '#0F1111' }}>
                                                    {item.category.categoryId}
                                                </Typography>
                                                <Typography sx={{ fontFamily: '"Amazon Ember", Arial, sans-serif', fontSize: 11, color: '#565959', mt: 0.2 }}>
                                                    ID: {item.category.id}
                                                </Typography>
                                            </Box>
                                        </StyledTableCell>

                                        {/* Discount */}
                                        <StyledTableCell>
                                            <Box sx={{
                                                display: 'inline-block',
                                                background: 'linear-gradient(135deg, #FF9900, #e88b00)',
                                                color: '#fff', fontWeight: 800, fontSize: 13,
                                                px: 1.2, py: 0.4, borderRadius: '3px',
                                                fontFamily: '"Amazon Ember", Arial, sans-serif',
                                                boxShadow: '0 1px 3px rgba(255,153,0,0.4)',
                                            }}>
                                                {item.discount}% OFF
                                            </Box>
                                        </StyledTableCell>

                                        {/* Edit */}
                                        <StyledTableCell align="center">
                                            <Tooltip title="Edit deal" arrow>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => setEditTarget(item.id ?? null)}
                                                    sx={{
                                                        color: '#FF9900', border: '1px solid #FF9900',
                                                        borderRadius: '4px', p: 0.7,
                                                        transition: 'all 0.15s ease',
                                                        '&:hover': { backgroundColor: '#FF9900', color: '#fff' },
                                                    }}
                                                >
                                                    <EditIcon sx={{ fontSize: 16 }} />
                                                </IconButton>
                                            </Tooltip>
                                        </StyledTableCell>

                                        {/* Delete */}
                                        <StyledTableCell align="center">
                                            <Tooltip title="Delete deal" arrow>
                                                <span>
                                                    <IconButton
                                                        size="small"
                                                        disabled={isDeleting}
                                                        onClick={() => setDeleteTarget({ id: item.id!, category: item.category.categoryId })}
                                                        sx={{
                                                            color: '#CC0C39', border: '1px solid #CC0C39',
                                                            borderRadius: '4px', p: 0.7,
                                                            transition: 'all 0.15s ease',
                                                            '&:hover': { backgroundColor: '#CC0C39', color: '#fff' },
                                                            '&.Mui-disabled': { opacity: 0.4, border: '1px solid #ccc' },
                                                        }}
                                                    >
                                                        <DeleteIcon sx={{ fontSize: 16 }} />
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>

                {/* Empty state */}
                {!deal.loading && allDeals.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 7 }}>
                        <LocalOfferIcon sx={{ fontSize: 44, color: '#ddd', mb: 1.5 }} />
                        <Typography sx={{ fontFamily: '"Amazon Ember", Arial, sans-serif', fontSize: 14, fontWeight: 600, color: '#565959' }}>
                            No deals found
                        </Typography>
                        <Typography sx={{ fontFamily: '"Amazon Ember", Arial, sans-serif', fontSize: 12, color: '#999', mt: 0.5 }}>
                            Switch to "Create Deal" to add your first deal.
                        </Typography>
                    </Box>
                )}
            </TableContainer>

            {/* Pagination */}
            {totalPages > 1 && (
                <Box sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    mt: 2, px: 0.5,
                }}>
                    <Typography sx={{ fontSize: 12, color: '#565959', fontFamily: '"Amazon Ember", Arial, sans-serif' }}>
                        Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, allDeals.length)} of {allDeals.length} deals
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <IconButton
                            size="small"
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            sx={{
                                border: '1px solid #ddd', borderRadius: '3px', p: 0.5,
                                color: '#0F1111',
                                '&:hover': { backgroundColor: '#fff8e7', borderColor: '#FF9900' },
                                '&.Mui-disabled': { color: '#ccc', border: '1px solid #eee' },
                            }}
                        >
                            <NavigateBeforeIcon sx={{ fontSize: 18 }} />
                        </IconButton>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <Button
                                key={i}
                                size="small"
                                onClick={() => setPage(i + 1)}
                                sx={{
                                    minWidth: 34, px: 0, py: 0.4,
                                    fontFamily: '"Amazon Ember", Arial, sans-serif',
                                    fontSize: 12, textTransform: 'none',
                                    borderRadius: '3px',
                                    border: page === i + 1 ? '1px solid #FF9900' : '1px solid #ddd',
                                    backgroundColor: page === i + 1 ? '#FF9900' : '#fff',
                                    color: page === i + 1 ? '#131921' : '#0F1111',
                                    fontWeight: page === i + 1 ? 700 : 400,
                                    '&:hover': { backgroundColor: page === i + 1 ? '#e88b00' : '#fff8e7', borderColor: '#FF9900' },
                                }}
                            >
                                {i + 1}
                            </Button>
                        ))}

                        <IconButton
                            size="small"
                            disabled={page === totalPages}
                            onClick={() => setPage(p => p + 1)}
                            sx={{
                                border: '1px solid #ddd', borderRadius: '3px', p: 0.5,
                                color: '#0F1111',
                                '&:hover': { backgroundColor: '#fff8e7', borderColor: '#FF9900' },
                                '&.Mui-disabled': { color: '#ccc', border: '1px solid #eee' },
                            }}
                        >
                            <NavigateNextIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Box>
                </Box>
            )}

            {/* Edit Modal */}
            {editTarget !== null && (
                <Modal open onClose={() => setEditTarget(null)}>
                    <Box sx={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 460, backgroundColor: '#fff',
                        border: '1px solid #ddd', borderRadius: '6px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                    }}>
                        <Box sx={{
                            backgroundColor: '#232F3E', px: 3, py: 2,
                            borderBottom: '3px solid #FF9900',
                            display: 'flex', alignItems: 'center', gap: 1,
                        }}>
                            <EditIcon sx={{ color: '#FF9900', fontSize: 18 }} />
                            <Typography sx={{ color: '#fff', fontFamily: '"Amazon Ember", Arial, sans-serif', fontWeight: 700, fontSize: 15 }}>
                                Update Deal
                            </Typography>
                        </Box>
                        <Box sx={{ p: 3 }}>
                            <UpdateDealForm
                                id={editTarget}
                                onSuccess={() => {
                                    setEditTarget(null)
                                    setSnackbar({ open: true, message: 'Deal updated successfully', severity: 'success' })
                                }}
                            />
                        </Box>
                    </Box>
                </Modal>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                PaperProps={{ sx: { borderRadius: '6px', border: '1px solid #ddd', maxWidth: 400 } }}
            >
                <DialogTitle sx={{
                    fontFamily: '"Amazon Ember", Arial, sans-serif',
                    fontWeight: 700, fontSize: 16,
                    backgroundColor: '#232F3E', color: '#fff',
                    borderBottom: '3px solid #FF9900',
                    display: 'flex', alignItems: 'center', gap: 1,
                }}>
                    <WarningAmberIcon sx={{ color: '#FF9900', fontSize: 20 }} />
                    Confirm Delete
                </DialogTitle>
                <DialogContent sx={{ pt: 2.5 }}>
                    <DialogContentText sx={{ fontFamily: '"Amazon Ember", Arial, sans-serif', fontSize: 13, color: '#0F1111' }}>
                        Are you sure you want to delete the deal for{' '}
                        <Box component="span" sx={{ fontWeight: 700, color: '#131921' }}>
                            {deleteTarget?.category}
                        </Box>
                        ? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 2.5, pb: 2, gap: 1 }}>
                    <Button
                        onClick={() => setDeleteTarget(null)}
                        sx={{
                            fontFamily: '"Amazon Ember", Arial, sans-serif',
                            fontSize: 13, textTransform: 'none',
                            color: '#0F1111', border: '1px solid #ccc',
                            borderRadius: '20px', px: 2.5,
                            '&:hover': { backgroundColor: '#f5f5f5' },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        variant="contained"
                        sx={{
                            fontFamily: '"Amazon Ember", Arial, sans-serif',
                            fontSize: 13, textTransform: 'none', fontWeight: 700,
                            backgroundColor: '#CC0C39', borderRadius: '20px', px: 2.5,
                            '&:hover': { backgroundColor: '#a30a2e' },
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={() => setSnackbar(s => ({ ...s, open: false }))}
            >
                <Alert
                    onClose={() => setSnackbar(s => ({ ...s, open: false }))}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{
                        fontFamily: '"Amazon Ember", Arial, sans-serif',
                        fontWeight: 600, fontSize: 13,
                        backgroundColor: snackbar.severity === 'success' ? '#067D62' : '#CC0C39',
                        '& .MuiAlert-icon': { fontSize: 20 },
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default DealsTable