import "./app.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useRef } from "react"
import Products from "./pages/products/Products"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Product from "./pages/product/Product"

function App() {
  const navBarRef = useRef()

  return (
    <>
      <Navbar navBarRef={navBarRef} />
      <Router>
        <Switch>
          <Route
            path="/products"
            exact
            component={(props) => <Products {...props} navBarRef={navBarRef} />}
          />
          <Route path="/products/:id" exact component={Product} />
        </Switch>
      </Router>
      <Footer />
    </>
  )
}

export default App
