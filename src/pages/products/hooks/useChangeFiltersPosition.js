/* eslint-disable no-param-reassign */
import React from "react"

const useChangeFiltersPosition = (
  productsRef,
  filtersCollapseRef,
  navBarRef,
  rootRef,
  filtersTitleRef,
  boxRef
) => {
  const [filtersOffSetTop, setFiltersOffSetTop] = React.useState(0)

  const getScrollTopPosition = () => window.pageYOffset
  const getScrollBottomYPosition = () => getScrollTopPosition() + window.innerHeight

  const getFiltersBottomYPosition = () =>
    filtersOffSetTop + filtersCollapseRef.current.offsetHeight

  const filtersOutOfScreen = () => getFiltersBottomYPosition() > window.innerHeight
  const scrollAfterFilters = () =>
    getScrollBottomYPosition() > getFiltersBottomYPosition()

  const scrollAfterProducts = () =>
    getScrollBottomYPosition() >=
    productsRef.current.offsetHeight + productsRef.current.offsetTop

  // const scrollAfterProducts = () => {
  //   return getScrollBottomYPosition() >= boxRef.current.offsetHeight
  // }

  const filtersShouldBeFixedBottom = () => {
    // console.log("filtersOutOfScreen()", filtersOutOfScreen())
    // console.log("scrollAfterFilters()", scrollAfterFilters())
    // console.log("!scrollAfterProducts()", scrollAfterProducts())
    return filtersOutOfScreen() && scrollAfterFilters() && !scrollAfterProducts()
  }

  const filtersShouldBeFixedTop = () =>
    !filtersOutOfScreen() &&
    getScrollTopPosition() + navBarRef.current.offsetHeight >= filtersOffSetTop &&
    !scrollAfterProducts()

  const setFiltersToFixedTop = () => {
    filtersCollapseRef.current.style.position = "fixed"
    filtersCollapseRef.current.style.bottom = "auto"
    filtersCollapseRef.current.style.width = `${rootRef.current.offsetWidth}px`
    filtersCollapseRef.current.style.top = `${navBarRef.current.offsetHeight}px`

    rootRef.current.style.position = "relative"
  }

  const filtersIsSetFixedBottom = () => {
    return (
      (filtersCollapseRef.current.style.position === "fixed" ||
        filtersCollapseRef.current.style.position === "absolute") &&
      filtersCollapseRef.current.style.bottom === "0px"
    )
  }

  const filtersIsSetFixedTop = () => {
    return (
      (filtersCollapseRef.current.style.position === "fixed" ||
        filtersCollapseRef.current.style.position === "absolute") &&
      filtersCollapseRef.current.style.top === `${navBarRef.current.offsetHeight}px`
    )
  }

  const getProductsHeight = () => {
    const productsBounding = productsRef.current.getBoundingClientRect()
    return productsBounding.height + productsRef.current.offsetTop
  }

  const productsIsHeigherThanFilters = () => {
    const productsBounding = productsRef.current.getBoundingClientRect()
    const filtersBounding = filtersCollapseRef.current.getBoundingClientRect()

    return (
      productsBounding.height + productsBounding.top >=
      filtersBounding.height + filtersBounding.top
    )
  }

  const setFiltersToFixedBottom = () => {
    filtersCollapseRef.current.style.position = "fixed"
    filtersCollapseRef.current.style.top = "auto"
    filtersCollapseRef.current.style.bottom = "0"
    filtersCollapseRef.current.style.width = `${rootRef.current.offsetWidth}px`

    rootRef.current.style.position = "relative"
  }

  const setFiltersToAbsoluteBottomFixed = () => {
    rootRef.current.style.position = "relative"

    filtersCollapseRef.current.style.position = "absolute"
    filtersCollapseRef.current.style.bottom = "0"
    filtersCollapseRef.current.style.top = "auto"

    filtersCollapseRef.current.style.width = `${rootRef.current.offsetWidth}px`
  }

  const setPositionAbsoluteTopFixed = () => {
    const topPosition =
      productsRef.current.offsetHeight +
      productsRef.current.offsetTop -
      filtersCollapseRef.current.offsetHeight -
      (window.innerHeight -
        filtersCollapseRef.current.offsetHeight -
        navBarRef.current.offsetHeight)

    rootRef.current.style.position = "static"
    filtersCollapseRef.current.style.top = `${topPosition}px`

    filtersCollapseRef.current.style.position = "absolute"
    filtersCollapseRef.current.style.bottom = "auto"
    filtersCollapseRef.current.style.width = `${rootRef.current.offsetWidth}px`
  }

  const changePosition = () => {
    if (filtersShouldBeFixedBottom()) {
      setFiltersToFixedBottom()
    } else if (filtersShouldBeFixedTop()) {
      setFiltersToFixedTop()
    } else if (
      !filtersOutOfScreen() &&
      scrollAfterProducts() &&
      filtersIsSetFixedTop()
    ) {
      setPositionAbsoluteTopFixed()
    } else if (
      scrollAfterProducts() &&
      filtersOutOfScreen() &&
      getFiltersBottomYPosition() <= getProductsHeight()
      // getProductsHeight() >= window.innerHeight
    ) {
      setFiltersToAbsoluteBottomFixed()
    } else if (filtersOutOfScreen()) {
      filtersCollapseRef.current.style.position = "static"
      filtersCollapseRef.current.style.width = `${rootRef.current.offsetWidth}px`
    } else if (
      getScrollTopPosition() + navBarRef.current.offsetHeight <
      filtersOffSetTop
    ) {
      filtersCollapseRef.current.style.position = "static"
      filtersCollapseRef.current.style.width = `${rootRef.current.offsetWidth}px`
    }
  }

  React.useEffect(() => {
    const { top, height } = filtersTitleRef.current.getBoundingClientRect()
    setFiltersOffSetTop(top + height)

    // setProductsIsHigherThanFilters(productsIsHeigherThanFilters())
  }, [])

  React.useEffect(() => {
    window.addEventListener("scroll", changePosition, { passive: true })

    return () => {
      window.removeEventListener("scroll", changePosition)
    }
  }, [filtersOffSetTop])

  return changePosition
}

export default useChangeFiltersPosition
