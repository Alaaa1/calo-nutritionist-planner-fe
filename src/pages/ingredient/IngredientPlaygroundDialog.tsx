import React from 'react';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import IngredientComponentTable from './IngredientComponentTable';
import { IIngredientData } from '../../interfaces';
import useMediaQuery from '@mui/material/useMediaQuery';
import IngredientMealTable from './IngredientMealTable';
import theme from '../../theme/theme';

interface IngredientPlaygroundDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const IngredientPlaygroundDialog: React.FC<IngredientPlaygroundDialogProps> = (props) => {

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Dialog
    open={props.open}
    onClose={handleClose}
    fullScreen
    >
      <Card style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CardContent style={{ flex: 1 }}>
          <Grid container spacing={2}>
            <Grid item container xs={2} spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h6">Section 1</Typography>
              </Grid>
              {/* Add your content for Section 1 here */}
              <Grid item xs={12}>
                <TextField variant="outlined" label="Price" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" label="Protein" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" label="Carbs" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" label="Fats" fullWidth />
              </Grid>
            </Grid>
            <Grid item container xs={8} spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h6">Section 2</Typography>
              </Grid>
              {/* Add your content for Section 2 here */}
              <Grid item xs={12}>
                <IngredientComponentTable />
              </Grid>
              <Grid item xs={12}>
              <Grid item xs={12}>
                {/* <ArrowDownwardIcon /> */}
              </Grid>
              </Grid>
              <Grid item xs={12}>
              <IngredientMealTable/>
              </Grid>

            </Grid>
            <Grid item container xs={2} spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h6">Section 3</Typography>
              </Grid>
              {/* Add your content for Section 3 here */}
            </Grid>
          </Grid>
        </CardContent>
        <Button variant="contained" onClick={handleClose} style={{ alignSelf: 'flex-end', margin: '16px' }}>
          Close
        </Button>
      </Card>
    </Dialog>
  );
};

export default IngredientPlaygroundDialog;
