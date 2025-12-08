export default function usePembayaran(paymentData = {}) {
  const {
    subtotal = 0,
    serviceCharge = 0,
    otherFees = 0,
    discount = 0,
    total = subtotal + serviceCharge + otherFees - discount,
    customer = {},
  } = paymentData;

  return {
    subtotal,
    serviceCharge,
    otherFees,
    discount,
    total,
    customer,
  };
}
