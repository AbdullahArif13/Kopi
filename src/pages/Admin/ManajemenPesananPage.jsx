"use client"

import PesananCard from "./components/PesananCard"
import PesananDetail from "./components/PesananDetail"
import useManajemenPesanan from "./useManajemenPesanan"

export default function ManajemenPesananPage() {
  const {
    orders,
    selectedOrder,
    expandedOrder,
    toggleOrder,
    handleSelesai,
    handleSudahDibayar,
    handleBack,
    notes,
    setNotes,
    calculatePayment
  } = useManajemenPesanan()

  return (
    <>
      {!selectedOrder ? (
        <PesananCard
          orders={orders}
          expandedOrder={expandedOrder}
          toggleOrder={toggleOrder}
          handleSelesai={handleSelesai}
        />
      ) : (
        <PesananDetail
          selectedOrder={selectedOrder}
          calculatePayment={calculatePayment}
          handleSudahDibayar={handleSudahDibayar}
          handleBack={handleBack}
          notes={notes}
          setNotes={setNotes}
        />
      )}
    </>
  )
}
