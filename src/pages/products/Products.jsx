import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Pagination from "@material-ui/lab/Pagination"
import React, { useEffect, useState } from "react"
import PerfumeCard from "./components/PerfumeCard"
import {
  filterType,
  filtersPriceRange,
  sortDirection as SortDirection,
} from "./constants"
import Filters from "./components/Filters"
import FiltersChips from "./components/FiltersChips"
import perfumeDataService from "../../services/perfumeDataService"

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    gap: "20px",
  },
  gridItem: {
    // "&:hover": {
    //   boxShadow: "0px 0px 4px 3px rgba(0, 0, 0, 0.09)",
    // },
  },
}))

const queryString = require("query-string")

const Products = ({ navBarRef, location, history }) => {
  const [checkedFilters, setCheckedFilters] = useState({
    [filterType.brands]: [],
    [filterType.capacity]: [],
    [filterType.fragranceNotes]: [],
    [filterType.genderTypes]: [],
    [filterType.priceRange]: filtersPriceRange,
  })

  const classes = useStyles()
  const productsRef = React.useRef()

  const [perfumes, setPerfumes] = useState([])

  const orderOptions = [
    {
      display: "Cena najniższa",
      sortBy: "Price",
      sortDirection: SortDirection.ASC,
    },

    {
      display: "Cena najwyższa",
      sortBy: "Price",
      sortDirection: SortDirection.DESC,
    },
  ]

  const [pager, setPager] = useState({
    pageNumber: 1,
    pageSize: 10,
    // sortBy: orderOptions[0].sortBy,
    sortDirection: orderOptions[0].sortDirection,
  })

  const renderCards = () => {
    return perfumes.map((perfume) => {
      const { id, name, price, basePrice, perfumeBrandName, sexType } = perfume

      return (
        <Grid
          onClick={() => history.push(`products/${id}`)}
          className={classes.gridItem}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
        >
          <PerfumeCard
            company={perfumeBrandName}
            perfumeName={name}
            basePrice={basePrice}
            price={price}
            urlPhoto="../images/perfume1png.png"
            sex={sexType}
            additonalLabel={0}
          />
        </Grid>
      )
    })
  }

  const getPerfumeQueryFilters = () => {
    return {
      capacities: checkedFilters[filterType.capacity],
      fragranceNotesNames: checkedFilters[filterType.fragranceNotes],
      perfumeBrandsNames: checkedFilters[filterType.brands],
      perfumeGendersNames: checkedFilters[filterType.genderTypes],
      minimumPrice: checkedFilters[filterType.priceRange][0],
      maximumPrice: checkedFilters[filterType.priceRange][1],
    }
  }

  const getPagerQuery = () => {
    return {
      sortBy: pager.sortBy,
      sortDirection: pager.sortDirection,
    }
  }

  const pushPerfumeQueryFilters = () => {
    const queryFilters = getPerfumeQueryFilters()
    const pagerQuery = getPagerQuery()

    history.push(
      `#${queryString.stringify(queryFilters)}&${queryString.stringify(pagerQuery)}`
    )
  }

  const setFiltersAndPagerFromUrlParams = () => {
    const parsedUrlFiltersAndPager = queryString.parse(location.hash, {
      parseNumbers: true,
    })

    if (parsedUrlFiltersAndPager) {
      const newFilters = { ...checkedFilters }
      if (parsedUrlFiltersAndPager.capacities) {
        newFilters[filterType.capacity] = [
          parsedUrlFiltersAndPager.capacities,
        ].flat()
      }
      if (parsedUrlFiltersAndPager.fragranceNotesNames) {
        newFilters[filterType.fragranceNotes] = [
          parsedUrlFiltersAndPager.fragranceNotesNames,
        ].flat()
      }
      if (parsedUrlFiltersAndPager.perfumeBrandsNames) {
        newFilters[filterType.brands] = [
          parsedUrlFiltersAndPager.perfumeBrandsNames,
        ].flat()
      }
      if (parsedUrlFiltersAndPager.perfumeGendersNames) {
        newFilters[filterType.genderTypes] = [
          parsedUrlFiltersAndPager.perfumeGendersNames,
        ].flat()
      }
      if (parsedUrlFiltersAndPager.minimumPrice) {
        newFilters[filterType.priceRange][0] = parsedUrlFiltersAndPager.minimumPrice
      }
      if (parsedUrlFiltersAndPager.maximumPrice) {
        newFilters[filterType.priceRange][1] = parsedUrlFiltersAndPager.maximumPrice
      }

      if (parsedUrlFiltersAndPager.sortBy) {
        const newPager = { ...pager }

        newPager.sortBy = parsedUrlFiltersAndPager.sortBy

        if (parsedUrlFiltersAndPager.sortDirection) {
          newPager.sortDirection = parsedUrlFiltersAndPager.sortDirection
        }

        setPager(newPager)
      }

      setCheckedFilters(newFilters)
    }
  }

  useEffect(() => {
    setFiltersAndPagerFromUrlParams()
  }, [])

  const boxRef = React.useRef()

  const filterProducts = () => {
    perfumeDataService.getAll(getPerfumeQueryFilters(), pager).then((response) => {
      console.log(response.data.items)
      setPerfumes(response.data.items)
    })
  }

  useEffect(() => {
    filterProducts()

    pushPerfumeQueryFilters()
  }, [pager, checkedFilters])

  return (
    <>
      <Box pb={20} clone>
        <Container ref={boxRef} maxWidth={false}>
          <FiltersChips
            py={2}
            checkedFilters={checkedFilters}
            setCheckedFilters={setCheckedFilters}
            filterProducts={filterProducts}
          />
          <main className={classes.root}>
            <Filters
              checkedFilters={checkedFilters}
              setCheckedFilters={setCheckedFilters}
              productsRef={productsRef}
              navBarRef={navBarRef}
              boxRef={boxRef}
              filterProducts={filterProducts}
              pager={pager}
              setPager={setPager}
              orderOptions={orderOptions}
            />
            <Box
              ref={productsRef}
              mt={5}
              display="flex"
              alignItems="center"
              flexDirection="column"
              flexGrow={1}
              height="100%"
            >
              <Grid container justifyContent="center" spacing={5}>
                {renderCards()}
              </Grid>

              <Box pt={7}>
                <Pagination count={10} variant="outlined" />
              </Box>
            </Box>
          </main>
        </Container>
      </Box>
    </>
  )
}

export default Products
