import { useState, useRef, useEffect } from "react"
import { stringify } from "qs"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Checkbox from "@material-ui/core/Checkbox"
import { Paper, Typography } from "@material-ui/core"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import Collapse from "@material-ui/core/Collapse"
import Slider from "@material-ui/core/Slider"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import clsx from "clsx"
import perfumeDataService from "../../../services/perfumeDataService"

import FiltersSearch from "./FiltersSearch"
import {
  filterType as filterTypeConstant,
  filtersPriceRange,
  sexTypeOptions,
  capacityOptions,
  orderByOptions,
  orderBy as orderByConstant,
} from "../constants"

import useChangeFiltersPosition from "../hooks/useChangeFiltersPosition"
import FiltersCollapse from "./FiltersCollapse"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,
    minWidth: 230,
    position: "relative",
  },
  filtersList: {},
  wrapperInner: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },

  wrapperInnerColumnDirection: {
    flexDirection: "column",
    alignItems: "unset",
  },

  listRoot: {
    overflow: "auto",
    maxHeight: 300,
  },

  gutters: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },

  guttersMargin: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },

  body2: {
    "& > *": {
      ...theme.typography.body2,
    },
  },

  showHideFilters: {
    paddingBottom: theme.spacing(2),
    width: "fit-content",

    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
      textUnderlineOffset: "4px",
    },
  },
}))

function rangePriceValueText(value) {
  return `${value} PLN`
}

const Filters = ({
  checkedFilters,
  setCheckedFilters,
  productsRef,
  navBarRef,
  boxRef,
  pager,
  setPager,
  orderOptions,
}) => {
  const [openOrderBy, setOpenOrderBy] = useState(true)
  const [openBrand, setOpenBrand] = useState(false)
  const [openFragranceNotes, setOpenFragranceNotes] = useState(false)
  const [openSex, setOpenSex] = useState(false)
  const [openCapacity, setOpenCapacity] = useState(false)
  const [openPrice, setOpenPrice] = useState(false)

  // const [orderBy, setorderBy] = useState(orderByConstant.lowestPrice)

  const [toggleShowFilters, setToggleShowFilters] = useState(true)
  const classes = useStyles({ toggleShowFilters })

  const rootRef = useRef()
  const filtersCollapseRef = useRef()
  const filtersTitleRef = useRef()

  const [filtersOptions, setFiltersOptions] = useState({
    brands: [],
    fragranceNotes: [],
    capacities: [],
    perfumeGenderTypes: [],
  })

  const [priceRangeValue, setPriceRangeValue] = useState([0, filtersPriceRange[1]])

  useEffect(() => {
    perfumeDataService.getFiltersOptions().then((response) => {
      setFiltersOptions(response.data)
    })
  }, [])

  const changeFiltersPosition = useChangeFiltersPosition(
    productsRef,
    filtersCollapseRef,
    navBarRef,
    rootRef,
    filtersTitleRef,
    boxRef
  )

  const handleCheckboxChecked = (filterType, value) => {
    return checkedFilters[filterType].findIndex((obj) => value === obj) !== -1
  }

  const handleOnCheckboxClick = (filterType, value) => () => {
    const currentIndex = checkedFilters[filterType].findIndex((obj) => obj === value)

    const newFilters = { ...checkedFilters }

    if (currentIndex === -1) {
      newFilters[filterType].push(value)
    } else {
      newFilters[filterType].splice(currentIndex, 1)
    }
    setCheckedFilters(newFilters)
  }

  const onPriceSliderChange = (event, newValue) => {
    setPriceRangeValue(newValue)
  }

  const onPriceSliderChangeCommited = (event, newValue) => {
    const newFilters = { ...checkedFilters }
    newFilters.priceRange = newValue
    setCheckedFilters(newFilters)
  }

  const handleOrderByChange = (event) => {
    const { value } = event.target

    const newPager = { ...pager }
    const selectedOption = JSON.parse(value)

    newPager.sortBy = selectedOption.sortBy
    newPager.sortDirection = selectedOption.sortDirection

    setPager(newPager)
  }

  const getSortValue = (el) => {
    return JSON.stringify({ sortBy: el.sortBy, sortDirection: el.sortDirection })
  }

  return (
    <Paper ref={rootRef} className={classes.root} elevation={0}>
      <Typography
        variant="body2"
        className={clsx(classes.gutters, classes.showHideFilters)}
        onClick={() => setToggleShowFilters(!toggleShowFilters)}
        ref={filtersTitleRef}
      >
        {toggleShowFilters ? "Ukryj filtry" : "Pokaż filtry"}
      </Typography>
      <Collapse
        ref={filtersCollapseRef}
        in={toggleShowFilters}
        timeout="auto"
        style={{ willChange: "position" }}
        onExited={() => {
          rootRef.current.style.position = "absolute"
        }}
        onEnter={() => {
          rootRef.current.style.position = "relative"
        }}
        unmountOnExit
      >
        <List className={classes.filtersList}>
          <ListItem button onClick={() => setOpenOrderBy(!openOrderBy)}>
            <ListItemText primary="Sortuj według" />
            {openOrderBy ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <FiltersCollapse
            openIn={openOrderBy}
            changeFiltersPosition={changeFiltersPosition}
            classes={{
              wrapperInner: clsx(
                classes.wrapperInner,
                classes.wrapperInnerColumnDirection
              ),
            }}
          >
            <RadioGroup
              aria-label="order by"
              value={getSortValue(pager)}
              onChange={handleOrderByChange}
              className={classes.gutters}
            >
              {orderOptions.map((option) => {
                return (
                  <FormControlLabel
                    value={getSortValue(option)}
                    control={<Radio />}
                    label={option.display}
                    className={classes.body2}
                  />
                )
              })}
            </RadioGroup>
          </FiltersCollapse>
          <ListItem button onClick={() => setOpenBrand(!openBrand)}>
            <ListItemText primary="Marka" />
            {openBrand ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <FiltersCollapse
            openIn={openBrand}
            changeFiltersPosition={changeFiltersPosition}
            classes={{
              wrapperInner: clsx(
                classes.wrapperInner,
                classes.wrapperInnerColumnDirection
              ),
            }}
          >
            <FiltersSearch />
            <List disablePadding classes={{ root: classes.listRoot }}>
              {filtersOptions.brands.map((brand) => {
                const labelId = `checkbox-list-label-${brand.name}`

                return (
                  <ListItem
                    key={brand.name}
                    role={undefined}
                    dense
                    button
                    onClick={handleOnCheckboxClick(
                      filterTypeConstant.brands,
                      brand.name
                    )}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={handleCheckboxChecked(
                          filterTypeConstant.brands,
                          brand.name
                        )}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${brand.name}`} />
                  </ListItem>
                )
              })}
            </List>
          </FiltersCollapse>
          <ListItem
            button
            onClick={() => setOpenFragranceNotes(!openFragranceNotes)}
          >
            <ListItemText primary="Nuty zapachowe" />
            {openFragranceNotes ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <FiltersCollapse
            openIn={openFragranceNotes}
            changeFiltersPosition={changeFiltersPosition}
            classes={{
              wrapperInner: clsx(
                classes.wrapperInner,
                classes.wrapperInnerColumnDirection
              ),
            }}
          >
            <FiltersSearch />
            <List disablePadding classes={{ root: classes.listRoot }}>
              {filtersOptions.fragranceNotes.map((fragranceNote) => {
                const labelId = `checkbox-list-label-${fragranceNote.name}`

                return (
                  <ListItem
                    key={fragranceNote.name}
                    role={undefined}
                    dense
                    button
                    onClick={handleOnCheckboxClick(
                      filterTypeConstant.fragranceNotes,
                      fragranceNote.name
                    )}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={handleCheckboxChecked(
                          filterTypeConstant.fragranceNotes,
                          fragranceNote.name
                        )}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${fragranceNote.name}`} />
                  </ListItem>
                )
              })}
            </List>
          </FiltersCollapse>
          <ListItem button onClick={() => setOpenSex(!openSex)}>
            <ListItemText primary="Rodzaj zapachu" />
            {openSex ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <FiltersCollapse
            openIn={openSex}
            changeFiltersPosition={changeFiltersPosition}
            classes={{
              wrapperInner: clsx(
                classes.wrapperInner,
                classes.wrapperInnerColumnDirection
              ),
            }}
          >
            <List disablePadding classes={{ root: classes.listRoot }}>
              {filtersOptions.perfumeGenderTypes.map((gender) => {
                const labelId = `checkbox-list-label-${gender.name}`

                return (
                  <ListItem
                    key={gender.name}
                    role={undefined}
                    dense
                    button
                    onClick={handleOnCheckboxClick(
                      filterTypeConstant.genderTypes,
                      gender.name
                    )}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={handleCheckboxChecked(
                          filterTypeConstant.genderTypes,
                          gender.name
                        )}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${gender.name}`} />
                  </ListItem>
                )
              })}
            </List>
          </FiltersCollapse>
          <ListItem button onClick={() => setOpenCapacity(!openCapacity)}>
            <ListItemText primary="Pojemność" />
            {openCapacity ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <FiltersCollapse
            openIn={openCapacity}
            changeFiltersPosition={changeFiltersPosition}
            classes={{
              wrapperInner: clsx(
                classes.wrapperInner,
                classes.wrapperInnerColumnDirection
              ),
            }}
          >
            <List disablePadding classes={{ root: classes.listRoot }}>
              {filtersOptions.capacities.map((capacity) => {
                const labelId = `checkbox-list-label-${capacity}`

                return (
                  <ListItem
                    key={capacity}
                    role={undefined}
                    dense
                    button
                    onClick={handleOnCheckboxClick(
                      filterTypeConstant.capacity,
                      capacity
                    )}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={handleCheckboxChecked(
                          filterTypeConstant.capacity,
                          capacity
                        )}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${capacity} ml`} />
                  </ListItem>
                )
              })}
            </List>
          </FiltersCollapse>
          <ListItem button onClick={() => setOpenPrice(!openPrice)}>
            <ListItemText primary="Cena" />
            {openPrice ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <FiltersCollapse
            openIn={openPrice}
            changeFiltersPosition={changeFiltersPosition}
            classes={{
              wrapperInner: clsx(classes.wrapperInner),
            }}
          >
            <Slider
              value={priceRangeValue}
              onChange={onPriceSliderChange}
              onChangeCommitted={onPriceSliderChangeCommited}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={rangePriceValueText}
              max={filtersPriceRange[1]}
              step={10}
              className={classes.guttersMargin}
              defaultValue={[0, 1000]}
            />
          </FiltersCollapse>
        </List>
      </Collapse>
    </Paper>
  )
}

export default Filters
