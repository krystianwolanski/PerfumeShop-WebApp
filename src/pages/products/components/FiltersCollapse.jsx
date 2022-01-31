import Collapse from "@material-ui/core/Collapse"

const FiltersCollapse = ({ openIn, changeFiltersPosition, classes, children }) => (
  <Collapse
    in={openIn}
    timeout="auto"
    unmountOnExit
    onExited={changeFiltersPosition}
    onEnter={changeFiltersPosition}
    classes={classes}
  >
    {children}
  </Collapse>
)

FiltersCollapse.muiName = "Collapse"

export default FiltersCollapse
