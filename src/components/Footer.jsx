/* eslint-disable jsx-a11y/anchor-is-valid */
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { Container, Typography } from "@material-ui/core"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Link from "@material-ui/core/Link"

const useStyles = makeStyles((theme) => ({
  gutters: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  hr: {
    width: "33%",
    border: 0,
    height: 0,
    borderTop: "1px solid rgba(0,0,0,0.1)",
    backgroundColor: theme.palette.common.white,
  },
  textCenter: {
    textAlign: "center",
  },
}))

const Footer = () => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Box
      component="footer"
      bgcolor={theme.palette.grey[900]}
      color={theme.palette.common.white}
    >
      <Container maxWidth="md">
        <Box clone py={2}>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Typography component="h6" variant="body1">
                Pomoc
              </Typography>
              <Typography component="hr" className={classes.hr} />
              <List dense>
                <ListItem disableGutters>
                  <Link href="#" variant="body2" color="inherit">
                    Single-line item
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link href="#" variant="body2" color="inherit">
                    Single-line item
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link href="#" variant="body2" color="inherit">
                    Single-line item
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography component="h6" variant="body1">
                Ważne linki
              </Typography>
              <Typography component="hr" className={classes.hr} />
              <List dense>
                <ListItem disableGutters>
                  <Link href="#" variant="body2" color="inherit">
                    Single-line item
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link href="#" variant="body2" color="inherit">
                    Single-line item
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link href="#" variant="body2" color="inherit">
                    Single-line item
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography component="h6" variant="body1">
                Kontakt
              </Typography>
              <Typography component="hr" className={classes.hr} />
              <List dense>
                <ListItem disableGutters>
                  <Link href="#" variant="body2" color="inherit">
                    Single-line item
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link href="#" variant="body2" color="inherit">
                    Single-line item
                  </Link>
                </ListItem>
                <ListItem disableGutters>
                  <Link href="#" variant="body2" color="inherit">
                    Single-line item
                  </Link>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Box py={1} textAlign="center" bgcolor={theme.palette.grey[800]} clone>
        <Typography variant="body2">
          &reg; {new Date().getFullYear()} Copyright: impreso.com
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer
