import clsx from "clsx"
import { makeStyles, Typography } from "@material-ui/core"
import Box from "@material-ui/core/Box"
import { calculateDiscountPercent } from "../utils/math"

const useStyle = makeStyles((theme) => ({
  promotionDiscount: {
    backgroundColor: theme.palette.warning.main,
    alignSelf: "flex-start",
    padding: theme.spacing(0, 2),
    color: theme.palette.warning.contrastText,
  },
}))

const DiscountLabel = ({ basePrice, promotionPrice, className }) => {
  const classes = useStyle()
  return (
    <Box className={clsx(classes.promotionDiscount, className)}>
      <Typography component="strong" style={{ fontWeight: "bold" }}>
        -{calculateDiscountPercent(basePrice, promotionPrice)}%
      </Typography>
    </Box>
  )
}

export default DiscountLabel
