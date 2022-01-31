import { useState, useEffect } from "react"
import { alpha, makeStyles } from "@material-ui/core/styles"
import InputBase from "@material-ui/core/InputBase"
import SearchIcon from "@material-ui/icons/Search"
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  searchLayout: {
    position: "fixed",
    width: "100vw",
    height: "100%",
    backgroundColor: alpha(theme.palette.common.black, 0.2),
    zIndex: 9000,
    left: 0,
    visibility: "hidden",
    opacity: 0,
    transition: "visibility 0.2s linear, opacity 0.2s linear",
  },
  searchLayoutVisible: {
    opacity: 1,
    visibility: "visible",
  },
  searchModal: {
    top: "5px",
    left: "50%",
    zIndex: 2,
    position: "fixed",
    transform: "translate(-50%, 0%)",
    padding: theme.spacing(1, 2),
    opacity: 0,
    transition: "top 0.2s linear, opacity 0.2s linear",

    background: theme.palette.common.white,
    borderRadius: "10px",
    minWidth: "30%",
    boxShadow: "0px 0px 4px 3px rgba(0, 0, 0, 0.09)",
  },
  searchModalVisible: {
    top: "40px",
    opacity: 1,
  },
}))

const SearchModal = ({ visible, handleCancel }) => {
  const [inputValue, setInputValue] = useState("")

  const classes = useStyles()

  useEffect(() => {
    if (visible) {
      setInputValue("")
    }
  }, [visible])

  const handleClick = (event) => {
    if (
      event.target.className ===
      clsx(classes.searchLayout, classes.searchLayoutVisible)
    ) {
      handleCancel()
    }
  }

  const handleOnChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={
        visible
          ? clsx(classes.searchLayout, classes.searchLayoutVisible)
          : classes.searchLayout
      }
      onKeyDown={() => {}}
      onClick={(event) => {
        handleClick(event)
      }}
    >
      <div
        className={
          visible
            ? clsx(classes.searchModal, classes.searchModalVisible)
            : classes.searchModal
        }
      >
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={inputValue}
            onChange={handleOnChange}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchModal
