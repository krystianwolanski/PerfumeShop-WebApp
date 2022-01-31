import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    ...theme.typography.body2,
    padding: theme.spacing(0, 2),
  },
}))

const FiltersSearch = () => {
  const classes = useStyles()

  return (
    <Input
      id="input-with-icon-adornment"
      placeholder="Szukaj..."
      classes={{ root: classes.inputRoot }}
      startAdornment={
        <InputAdornment position="start">
          <SearchOutlinedIcon />
        </InputAdornment>
      }
    />
  )
}

export default FiltersSearch
