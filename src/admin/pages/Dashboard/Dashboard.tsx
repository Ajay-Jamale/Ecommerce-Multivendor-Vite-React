import React, { useEffect, useState } from 'react'
import AdminRoutes from '../../../routes/AdminRoutes'   // <-- updated routes file
import Navbar from '../../../admin seller/components/navbar/Navbar'
import AdminDrawerList from '../../components/DrawerList'
import { Alert, Box, Snackbar } from '@mui/material'
import { useAppSelector } from '../../../Redux Toolkit/Store'

const AdminDashboard = () => {
  const { deal, admin } = useAppSelector(store => store)
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  useEffect(() => {
    if (deal.dealCreated || deal.dealUpdated || deal.error || admin.categoryUpdated) {
      setOpenSnackbar(true)
    }
  }, [deal.dealCreated, deal.dealUpdated, deal.error, admin.categoryUpdated])

  return (
    <>
      {/* Amazon dark navy background for full shell */}
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f3f3f3' }}>
        <Navbar DrawerList={AdminDrawerList} />

        <section className="lg:flex lg:h-[90vh]">
          {/* Sidebar */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
              height: '100%',
              backgroundColor: '#131921',
              boxShadow: '2px 0 8px rgba(0,0,0,0.18)',
              borderRight: '2px solid #FF9900',
            }}
          >
            <AdminDrawerList />
          </Box>

          {/* Main content area – now renders the updated routes */}
          <Box
            sx={{
              p: { xs: 3, lg: 4 },
              width: { lg: '80%' },
              flex: 1,
              overflowY: 'auto',
              backgroundColor: '#f3f3f3',
            }}
          >
            <AdminRoutes />
          </Box>
        </section>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={deal.error ? "error" : "success"}
          variant="filled"
          sx={{
            width: '100%',
            fontFamily: '"Amazon Ember", Arial, sans-serif',
            fontWeight: 600,
            fontSize: 13,
            backgroundColor: deal.error ? '#CC0C39' : '#067D62',
            '& .MuiAlert-icon': { fontSize: 20 },
          }}
        >
          {deal.error
            ? deal.error
            : deal.dealCreated
              ? "Deal created successfully"
              : deal.dealUpdated
                ? "Deal updated successfully"
                : admin.categoryUpdated
                  ? "Category updated successfully"
                  : ""}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AdminDashboard