import { makeStyles, Typography } from "@material-ui/core"

const useStyle = makeStyles((theme) => ({
  inputContainer: {
    display: "inline-flex",
  },
  customRadio: {
    display: "none",

    "&:checked + label": {
      backgroundColor: theme.palette.common.white,
    },
  },
  customLabel: {
    cursor: "pointer",
    padding: theme.spacing(1),
    border: "1px solid",
    backgroundColor: theme.palette.grey[200],
    borderColor: theme.palette.grey[200],

    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    },
  },
}))

const RadioButton = ({ children, name, value, onChange, checked }) => {
  const classes = useStyle()

  return (
    <div className={classes.inputContainer}>
      <input
        className={classes.customRadio}
        type="radio"
        id={value}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label className={classes.customLabel} htmlFor={value}>
        <Typography variant="body1">{children}</Typography>
      </label>
    </div>
  )
}

export default RadioButton
