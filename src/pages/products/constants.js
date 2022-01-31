const additionalLabel = Object.freeze({
  bestseller: 0,
  new: 1,
})

export { additionalLabel }

const capacity = Object.freeze({ "50ml": 0, "100ml": 1, "200ml": 2 })

const capacityOptions = [
  { id: capacity["50ml"], value: "50 ml" },
  { id: capacity["100ml"], value: "100 ml" },
  { id: capacity["200ml"], value: "200 ml" },
]

export { capacity, capacityOptions }

const filtersPriceRange = [0, 2000]

export { filtersPriceRange }

const filterType = Object.freeze({
  brands: "brands",
  fragranceNotes: "fragranceNotes",
  genderTypes: "genderTypes",
  capacity: "capacity",
  priceRange: "priceRange",
})

export { filterType }

const sortDirection = Object.freeze({ ASC: 0, DESC: 1 })

export { sortDirection }

const orderBy = Object.freeze({ popularity: 0, lowestPrice: 1, highestPrice: 2 })

const orderByOptions = [
  { id: orderBy.popularity, value: "Popularność" },
  { id: orderBy.lowestPrice, value: "Cena najniższa" },
  { id: orderBy.highestPrice, value: "Cena najwyższa" },
]

export { orderBy, orderByOptions }

const sexType = Object.freeze({
  forMen: 0,
  forWomen: 1,
  unisex: 2,
})

const sexTypeOptions = [
  { id: sexType.forMen, value: "Meskie" },
  { id: sexType.forWomen, value: "Kobiece" },
  { id: sexType.unisex, value: "Unisex" },
]

export { sexType, sexTypeOptions }
