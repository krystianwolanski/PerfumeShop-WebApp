import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import Box from "@material-ui/core/Box"

const useStyles = makeStyles((theme) => ({
  bestseller: {
    background: theme.palette.error.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30px",
    padding: theme.spacing(0, 1), // "0 5px"
    color: theme.palette.error.contrastText,
  },
}))

const BestsellerLabel = () => {
  const classes = useStyles()
  return (
    <Box className={classes.bestseller}>
      <Typography component="strong" style={{ fontWeight: "bold" }}>
        Bestseller
      </Typography>
    </Box>
  )
}

export default BestsellerLabel
