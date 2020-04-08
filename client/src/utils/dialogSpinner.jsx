import {
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent
} from "@material-ui/core";

const DialogSpinner = (props) => {


    return (
      <Dialog
        open={props.open}
      >
      <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <div className={classes.root}>
          <LinearProgress />
        </div>
      </DialogContent>
    </Dialog>
    )
}

export { DialogSpinner }