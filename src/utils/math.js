const calculateDiscountPercent = (basePrice, promotionPrice) => {
  return Math.floor((promotionPrice / basePrice) * 100)
}

const formatToTwoDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

export { calculateDiscountPercent, formatToTwoDecimals }
