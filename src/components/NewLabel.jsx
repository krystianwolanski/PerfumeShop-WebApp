import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import Box from "@material-ui/core/Box"

const useStyles = makeStyles((theme) => ({
  new: {
    background: "#d614cc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30px",
    padding: theme.spacing(0, 1), // "0 5px"
    color: theme.palette.common.white,
  },
}))

const NewLabel = () => {
  const classes = useStyles()
  return (
    <Box className={classes.new}>
      <Typography component="strong" style={{ fontWeight: "bold" }}>
        Nowy
      </Typography>
    </Box>
  )
}

export default NewLabel
