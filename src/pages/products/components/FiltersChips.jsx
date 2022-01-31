import Chip from "@material-ui/core/Chip"
import { Typography, Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { filterType, filtersPriceRange } from "../constants"

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}))

const FiltersChips = ({
  checkedFilters,
  setCheckedFilters,
  filterProducts,
  ...others
}) => {
  const classes = useStyles()

  const handleDelete = (key, value) => () => {
    const newFilters = { ...checkedFilters }

    const currentIndex = checkedFilters[key].findIndex((obj) => obj === value)

    newFilters[key].splice(currentIndex, 1)

    setCheckedFilters(newFilters)

    filterProducts()
  }

  const priceRangeLabel = (prop) => {
    return `${prop[0]} PLN - ${prop[1]} PLN`
  }

  const handlePriceRangeDelete = () => {
    const newFilters = { ...checkedFilters }

    newFilters.priceRange = filtersPriceRange
    setCheckedFilters(newFilters)
  }

  const renderChips = () => {
    const result = []

    Object.keys(checkedFilters).forEach((key) => {
      const prop = checkedFilters[key]

      const checkBoxesKeys = [
        filterType.brands,
        filterType.capacity,
        filterType.fragranceNotes,
        filterType.genderTypes,
      ]

      if (checkBoxesKeys.includes(key)) {
        prop.forEach((v) => {
          if (key === filterType.capacity) {
            result.push(
              <Chip
                label={`${v} ml`}
                onDelete={handleDelete(key, v)}
                variant="outlined"
              />
            )
          } else {
            result.push(
              <Chip label={v} onDelete={handleDelete(key, v)} variant="outlined" />
            )
          }
        })
      } else if (key === filterType.priceRange && prop !== filtersPriceRange) {
        result.push(
          <Chip
            label={priceRangeLabel(prop)}
            onDelete={handlePriceRangeDelete}
            variant="outlined"
          />
        )
      }
    })

    return result
  }

  return (
    <Box {...others} clone>
      <Typography component="div" variant="body1" className={classes.root}>
        {renderChips()}
      </Typography>
    </Box>
  )
}

export default FiltersChips
