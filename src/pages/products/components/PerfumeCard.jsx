import { Icon } from "@iconify/react"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import Box from "@material-ui/core/Box"

import { sexType, additionalLabel } from "../constants"
import { calculateDiscountPercent, formatToTwoDecimals } from "../../../utils/math"
import BestsellerLabel from "../../../components/BestsellerLabel"
import NewLabel from "../../../components/NewLabel"
import DiscountLabel from "../../../components/DiscountLabel"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    boxSizing: "border-box",
    padding: theme.spacing(4, 4, 2, 4),
    cursor: "pointer",
    boxShadow: "none",

    "&:hover": {
      boxShadow: "0px 0px 4px 3px rgba(0, 0, 0, 0.09)",
    },
  },
  labels: {
    display: "flex",
    flexDirection: "column",
    left: 0,
    position: "absolute",
    top: "18px",
    gap: "8px",
  },

  sex: {
    background: theme.palette.secondary.main,
    position: "absolute",
    top: 0,
    right: "12px",
    height: "49px",
    width: "29px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.common.white,
    fontSize: "1.3rem",
  },
  labelSpace: {
    position: "absolute",
    top: "33px",
  },
  perfumeBg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f1f1",
  },
  productImg: {
    width: "100%",
  },
  companyAndName: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(1),
  },
  priceWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    justifyContent: "flex-end",
    margin: theme.spacing(2, 0, 0, 0),
  },
  basePriceLineThrough: {
    textDecoration: "line-through",
    color: theme.palette.info.main,
  },
  price: {
    color: theme.palette.success.main,
    fontWeight: "bolder",
  },
}))

const PerfumeCard = ({
  perfumeName,
  company,
  urlPhoto,
  sex,
  basePrice,
  price,
  additonalLabel,
}) => {
  const classes = useStyles()

  const renderPrice = () => {
    if (basePrice !== price) {
      return (
        <>
          <Typography component="span" className={classes.basePriceLineThrough}>
            {formatToTwoDecimals(basePrice)} PLN
          </Typography>
          <Typography component="strong" className={classes.price}>
            {formatToTwoDecimals(price)} PLN
          </Typography>
        </>
      )
    }
    return (
      <>
        <Typography component="strong" className={classes.price}>
          {formatToTwoDecimals(price)} PLN
        </Typography>
      </>
    )
  }

  const renderSexIcon = () => {
    switch (sex) {
      case sexType.forMen:
        return <Icon icon="bi:gender-male" />

      case sexType.forWomen:
        return <Icon icon="bi:gender-female" />

      case sexType.unisex:
        return <Icon icon="ion:male-female-outline" />

      default:
        return ""
    }
  }

  const renderPromotionDiscount = () => {
    return (
      <DiscountLabel
        className={additionalLabel && classes.labelSpace}
        basePrice={basePrice}
        promotionPrice={price}
      />
    )
  }

  const renderAdditionalLabel = () => {
    if (additonalLabel === additionalLabel.bestseller) {
      return <BestsellerLabel />
    }
    if (additonalLabel === additionalLabel.new) {
      return <NewLabel />
    }

    return ""
  }

  return (
    <Paper className={classes.root}>
      <Box className={classes.sex}>{renderSexIcon()}</Box>

      <Box className={classes.labels}>
        {additonalLabel != null && renderAdditionalLabel()}
        {basePrice !== price && renderPromotionDiscount()}
      </Box>

      <Box className={classes.perfumeBg}>
        <img src={urlPhoto} alt="" className={classes.productImg} />
      </Box>
      <Box className={classes.companyAndName}>
        <Typography variant="overline">{company}</Typography>
        <Typography variant="body1" style={{ fontWeight: "bolder" }}>
          {perfumeName}
        </Typography>
      </Box>

      <Box className={classes.priceWrapper}>{renderPrice()}</Box>
    </Paper>
  )
}

export default PerfumeCard
