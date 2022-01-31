import { Box, Container, Grid, Typography, Button } from "@material-ui/core"
import FavoriteIcon from "@material-ui/icons/Favorite"
import Rating from "@material-ui/lab/Rating"
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles"
import { useEffect, useState } from "react"
import SwipeableViews from "react-swipeable-views"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

import RadioButton from "../../components/RadioButton"
import BestsellerLabel from "../../components/BestsellerLabel"
import TabPanel from "../../components/TabPanel"
import PerfumeCard from "../products/components/PerfumeCard"
import perfumeDataService from "../../services/perfumeDataService"
import { formatToTwoDecimals } from "../../utils/math"

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating)

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: `${theme.spacing(3)}px`,
    paddingBottom: `${theme.spacing(3)}px`,
  },
  notesTable: {
    borderCollapse: "separate",
    borderSpacing: `${0}px ${theme.spacing(2)}px`,
  },
  notesFlex: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
  },

  noteWrapper: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },

  noteHeader: {
    whiteSpace: "nowrap",
    verticalAlign: "top",
    fontWeight: 500,
    paddingRight: theme.spacing(2),
  },

  primaryProductImgWrapper: {
    height: "60vh",
  },
  productImg: {
    maxWidth: "100%",
    maxHeight: "100%",
  },

  verticalMiddle: {
    verticalAlign: "middle",
  },

  test: {
    height: "82px",
    maxWidth: "130px",

    "&:hover": {
      cursor: "pointer",
    },
  },
}))

function a11yProps(index) {
  return {
    id: `product-tab-${index}`,
    "aria-controls": `product-tabpanel-${index}`,
  }
}

const Product = ({ match }) => {
  const classes = useStyles()
  const { id } = match.params

  const [selectedCapacity, setSelectedCapacity] = useState(100)
  const theme = useTheme()

  const [value, setValue] = useState(0)

  const [product, setProduct] = useState({})

  const [currentImg, setCurrentImg] = useState("")

  useEffect(() => {
    perfumeDataService.get(id).then((response) => {
      const { data } = response

      setProduct(data)

      if (data.perfumeImgDtos) {
        setCurrentImg(data.perfumeImgDtos.find((p) => p.isPrimary).imgUrl)
      }
    })
  }, [])

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleSwipeableChangeIndex = (index) => {
    setValue(index)
  }

  const handleRadioCapacityChange = (event) => {
    setSelectedCapacity(Number(event.target.value))
  }

  const handleOnMouseOver = (event) => {
    setCurrentImg(event.target.currentSrc)
  }

  const renderProductImg = () => {
    return (
      product.images &&
      product.images.map((img) => (
        <Box className={classes.test}>
          <img
            height="100%"
            onFocus={handleOnMouseOver}
            onMouseOver={handleOnMouseOver}
            src={img.fullscreenUrl}
            alt="test"
          />
        </Box>
      ))
    )
  }

  return (
    <Container maxWidth="lg" className={classes.root}>
      <main>
        <Grid container justifyContent="center">
          <Grid item md={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              pb={3}
              px={4}
            >
              <Box className={classes.primaryProductImgWrapper}>
                <img className={classes.productImg} alt="test" src={currentImg} />
              </Box>
              <Box display="flex" gridGap={3}>
                {renderProductImg()}
              </Box>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box>
              <Typography variant="h5">{product.perfumeBrandName}</Typography>
              <Typography variant="subtitle1">
                Perfumiarz - {product.perfumerName}
              </Typography>
            </Box>

            <Box my={3} display="flex" flexDirection="column" gridGap={4}>
              <Box>
                <Typography
                  variant="h4"
                  display="inline"
                  className={classes.verticalMiddle}
                >
                  {product.name} / {product.year}
                </Typography>
                <Box display="inline-flex" className={classes.verticalMiddle} ml={2}>
                  <BestsellerLabel />
                </Box>
              </Box>
              <Box borderColor="transparent" display="flex" gridGap={8}>
                <StyledRating
                  name="customized-color"
                  defaultValue={2}
                  getLabelText={(value2) =>
                    `${value2} Heart${value2 !== 1 ? "s" : ""}`
                  }
                  precision={0.5}
                  icon={<FavoriteIcon fontSize="inherit" />}
                />

                <Typography variant="body1"> 4.7 / 10 (256)</Typography>
              </Box>
            </Box>

            <Box display="flex" gridGap={10} flexDirection="column" my={4}>
              <Box display="flex" gridGap={theme.spacing(1)}>
                <RadioButton
                  name="capacityOption"
                  value={50}
                  checked={selectedCapacity === 50}
                  onChange={handleRadioCapacityChange}
                >
                  50 ml
                </RadioButton>
                <RadioButton
                  name="capacityOption"
                  value={100}
                  checked={selectedCapacity === 100}
                  onChange={handleRadioCapacityChange}
                >
                  100 ml
                </RadioButton>
                <RadioButton
                  name="capacityOption"
                  value={200}
                  checked={selectedCapacity === 200}
                  onChange={handleRadioCapacityChange}
                >
                  200 ml
                </RadioButton>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Typography variant="h5">{selectedCapacity} ml</Typography>

                <Box display="flex" gridGap={10} alignItems="center">
                  <Typography variant="h3">
                    {formatToTwoDecimals(product.currentPrice)} zł
                  </Typography>
                  {product.basePrice !== product.currentPrice && (
                    <Typography color="secondary" component="s">
                      {product.basePrice} zł
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>

            <Box my={3}>
              <table className={classes.notesTable}>
                <tbody>
                  <tr align="left">
                    <Typography
                      className={classes.noteHeader}
                      scope="row"
                      component="th"
                      variant="body1"
                    >
                      Nuty głowy
                    </Typography>
                    <td className={classes.notesFlex}>
                      <div className={classes.noteWrapper}>
                        <img
                          src="https://img.parfumo.de/notes/3e/3e_8062c9b164d043894a2192b979532ff8f5697ddd_70.jpg"
                          alt="kutas"
                          width={22}
                          height={22}
                          className={classes.noteImg}
                        />
                        <Typography
                          className={classes.noteName}
                          display="inline"
                          variant="body1"
                        >
                          Mandarynka
                        </Typography>
                      </div>
                      <div className={classes.noteWrapper}>
                        <img
                          src="https://img.parfumo.de/notes/3e/3e_8062c9b164d043894a2192b979532ff8f5697ddd_70.jpg"
                          alt="test"
                          width={22}
                          height={22}
                        />
                        <Typography display="inline" variant="body1">
                          Mandarynka
                        </Typography>
                      </div>
                      <div className={classes.noteWrapper}>
                        <img
                          src="https://img.parfumo.de/notes/3e/3e_8062c9b164d043894a2192b979532ff8f5697ddd_70.jpg"
                          alt="test"
                          width={22}
                          height={22}
                        />
                        <Typography display="inline" variant="body1">
                          Mandarynka
                        </Typography>
                      </div>
                    </td>
                  </tr>
                  <tr align="left">
                    <Typography
                      className={classes.noteHeader}
                      scope="row"
                      component="th"
                      variant="body1"
                    >
                      Nuty serca
                    </Typography>

                    <td className={classes.notesFlex}>
                      <div className={classes.noteWrapper}>
                        <img
                          src="https://img.parfumo.de/notes/3e/3e_8062c9b164d043894a2192b979532ff8f5697ddd_70.jpg"
                          alt="kutas"
                          width={22}
                          height={22}
                          className={classes.noteImg}
                        />
                        <Typography
                          className={classes.noteName}
                          display="inline"
                          variant="body1"
                        >
                          Mandarynka
                        </Typography>
                      </div>
                      <div className={classes.noteWrapper}>
                        <img
                          src="https://img.parfumo.de/notes/3e/3e_8062c9b164d043894a2192b979532ff8f5697ddd_70.jpg"
                          alt="test"
                          width={22}
                          height={22}
                        />
                        <Typography display="inline" variant="body1">
                          Mandarynka
                        </Typography>
                      </div>
                      <div className={classes.noteWrapper}>
                        <img
                          src="https://img.parfumo.de/notes/3e/3e_8062c9b164d043894a2192b979532ff8f5697ddd_70.jpg"
                          alt="test"
                          width={22}
                          height={22}
                        />
                        <Typography display="inline" variant="body1">
                          Mandarynka
                        </Typography>
                      </div>
                    </td>
                  </tr>
                  <tr align="left">
                    <Typography
                      className={classes.noteHeader}
                      scope="row"
                      component="th"
                      variant="body1"
                    >
                      Nuty bazy
                    </Typography>

                    <td className={classes.notesFlex}>
                      <div className={classes.noteWrapper}>
                        <img
                          src="https://img.parfumo.de/notes/3e/3e_8062c9b164d043894a2192b979532ff8f5697ddd_70.jpg"
                          alt="kutas"
                          width={22}
                          height={22}
                          className={classes.noteImg}
                        />
                        <Typography
                          className={classes.noteName}
                          display="inline"
                          variant="body1"
                        >
                          Mandarynka
                        </Typography>
                      </div>
                      <div className={classes.noteWrapper}>
                        <img
                          src="https://img.parfumo.de/notes/3e/3e_8062c9b164d043894a2192b979532ff8f5697ddd_70.jpg"
                          alt="test"
                          width={22}
                          height={22}
                        />
                        <Typography display="inline" variant="body1">
                          Mandarynka
                        </Typography>
                      </div>
                      <div className={classes.noteWrapper}>
                        <img
                          src="https://img.parfumo.de/notes/3e/3e_8062c9b164d043894a2192b979532ff8f5697ddd_70.jpg"
                          alt="test"
                          width={22}
                          height={22}
                        />
                        <Typography display="inline" variant="body1">
                          Mandarynka
                        </Typography>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>

            <Box my={3}>
              <Button size="large" variant="outlined" color="primary">
                Dodaj do koszyka
              </Button>
            </Box>
          </Grid>
        </Grid>
        <section>
          <TabPanel>
            <Tabs
              value={value}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="product tabs"
            >
              <Tab label="Opis" {...a11yProps(0)} />
              <Tab label="Recenzje" {...a11yProps(1)} />
            </Tabs>
          </TabPanel>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleSwipeableChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
                ipsam quod asperiores atque nostrum velit vero odit nam ipsa
                assumenda distinctio itaque maxime! Illo sint, perspiciatis
                repudiandae deleniti id officiis. Ullam dolore sed porro ipsam
                pariatur veniam, magni dicta quam. Voluptate accusantium, placeat nam
                distinctio excepturi ab sed maxime, tempore vero ipsum corporis error
                nemo iusto facilis. Eligendi, iusto obcaecati! Suscipit delectus
                tempore odio! Fugit quidem neque, eius sapiente non, ducimus rerum
                vero quam, culpa vel quis odit. Reiciendis cumque necessitatibus
                minus sed unde temporibus atque provident officiis delectus ullam.
                Velit dolorum corrupti cumque magni aliquid architecto maxime. Quis
                ab ipsum inventore, at explicabo placeat accusamus aspernatur
                praesentium numquam ad porro voluptatibus non nihil unde doloremque
                suscipit impedit nisi sunt.
              </Typography>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              Item Two
            </TabPanel>
          </SwipeableViews>
        </section>
      </main>
      <Box component="section" my={4}>
        <Typography align="left" variant="h4" gutterBottom>
          Podobne produkty
        </Typography>
        <Grid container justifyContent="center" spacing={5}>
          <Grid item md={3}>
            <PerfumeCard
              company="Test"
              perfumeName="test"
              basePrice={200}
              price={120}
              urlPhoto="../images/perfume1png.png"
              sex={0}
              additonalLabel={0}
            />{" "}
          </Grid>
          <Grid item md={3}>
            <PerfumeCard
              company="Test"
              perfumeName="test"
              basePrice={200}
              price={120}
              urlPhoto="../images/perfume1png.png"
              sex={0}
              additonalLabel={0}
            />
          </Grid>
          <Grid item md={3}>
            <PerfumeCard
              company="Test"
              perfumeName="test"
              basePrice={200}
              price={120}
              urlPhoto="../images/perfume1png.png"
              sex={0}
              additonalLabel={0}
            />
          </Grid>
          <Grid item md={3}>
            <PerfumeCard
              company="Test"
              perfumeName="test"
              basePrice={200}
              price={120}
              urlPhoto="../images/perfume1png.png"
              sex={0}
              additonalLabel={0}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Product
