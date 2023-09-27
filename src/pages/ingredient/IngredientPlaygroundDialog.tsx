import React from 'react';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IIngredientData } from '../../interfaces';
import IngredientMealTable from './IngredientMealTable';
import { useTheme } from '@mui/material/styles';
import DialogComponentTable from './DialogComponentTable';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import LinearProgress from '@mui/material/LinearProgress';
import useIngredientStore from '../../stores/ingredientStore';

interface IngredientPlaygroundDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  calculateData: (useCase:string, data: any) => void;
  formattedCalories: () => number;
  progressColor: () => 'error' | 'primary' | 'warning' | undefined;
  sliderColor: () => string | undefined;
}

const IngredientPlaygroundDialog: React.FC<IngredientPlaygroundDialogProps> = ({
  open,
  setOpen,
  calculateData,
  formattedCalories,
  progressColor,
  sliderColor
}) => {
  const {
    selectedIngredient,
    editData,
  } = useIngredientStore();

  const theme = useTheme();

  const handleDecimalChange = (e: any) => {

    const data: any = { ...editData };
    data[e.target.name] = e.target.value;
    console.log(editData.totalUnit);

    calculateData('decimalChange', data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
    >
      <Card
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '65px',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText
        }}
      >
        <Typography
          variant='h5'
          align='center'
          style={{
            margin: '16px 0'
          }}
        >
          Ingredient Playground
        </Typography>
      </Card>
      <Card
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 65px)'
        }}
      >
        <CardContent>
          <Grid
            container
            spacing={1}
            height={'calc(98vh - 65px)'}
          >
            {/* Section 1 */}
            <Grid
              item
              container
              xs={3.5}
              alignItems='center'
              spacing={1.9}
              justifyContent='space-between'
            >
              <Grid
                item 
                xs={12}
                alignItems='center'
                textAlign='center'
              >
                <Typography
                  variant='h6'
                >
                  {selectedIngredient?.name}
                </Typography>
              </Grid>
              <Grid
                item
                container
                spacing={1}
              >
                <Grid
                  item
                  xs={6}
                >
                  <TextField
                    variant='outlined'
                    label='Category'
                    value={selectedIngredient?.category}
                    fullWidth
                    disabled
                  />
                </Grid>

                <Grid
                  item
                  xs={6}
                >
                  <TextField
                    variant='outlined'
                    label='Unit'
                    value={
                      selectedIngredient?.unit === 'g' ? 'Grams' : selectedIngredient?.unit === 'ml' ? 'Milliliters' : null
                    }
                    fullWidth
                    disabled
                  />
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
              >
                <TextField
                  variant='outlined'
                  label='Description'
                  value={selectedIngredient?.description}
                  fullWidth
                  disabled
                />
              </Grid>

              <Grid
                item
                xs={12}
              >
                <Divider
                  orientation='horizontal'
                />
              </Grid>
              
              {/* Before Values */}

              <Grid
                item
                container
                xs={12}
                spacing={1}
              >
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Price'
                    value={selectedIngredient?.price}
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Protein'
                    value={selectedIngredient?.protein}
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Carbs'
                    value={selectedIngredient?.carbs}
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Fats'
                    value={selectedIngredient?.fats}
                    disabled
                  />
                </Grid>
              </Grid>

              {/* Downward Arrows */}

              <Grid
                item
                container
                xs={12}
              >
                <Grid
                  item
                  xs={3}
                  textAlign='center'
                  // color={'GrayText'}
                  color= {theme.palette.primary.main}
                >
                  <ArrowDownwardIcon
                    sx={{
                      fontSize: 28
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  textAlign='center'
                  // color={'GrayText'}
                  color= {theme.palette.primary.main}
                >
                  <ArrowDownwardIcon
                    sx={{
                      fontSize: 28
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  textAlign='center'
                  // color={'GrayText'}
                  color= {theme.palette.primary.main}
                >
                  <ArrowDownwardIcon
                    sx={{
                      fontSize: 28
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  textAlign='center'
                  // color={'GrayText'}
                  color= {theme.palette.primary.main}
                >
                  <ArrowDownwardIcon
                    sx={{
                      fontSize: 28
                    }}
                  />
                </Grid>
              </Grid>

              {/* After Values */}

              <Grid
                item
                container
                xs={12}
                spacing={1}
              >
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Price'
                    value={editData.price}
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Protein'
                    value={editData.protein}
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Carbs'
                    value={editData.carbs}
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Fats'
                    value={editData.fats}
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Divider
                  orientation='horizontal'
                />
              </Grid>
              <Grid
                item
                container
                xs={12}
                spacing={1}
              >
                <Grid
                  item
                  xs={3}
                >
                  <Typography
                    variant='h6'
                  >
                    Price
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={9}
                >
                  <Slider
                    sx={{
                      color: sliderColor()
                    }}
                    name='price'
                    defaultValue={Number(selectedIngredient?.price)}
                    max={0.999}
                    step={0.001}
                    onChange={handleDecimalChange}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
                spacing={1}
              >
                <Grid
                  item
                  xs={3}
                >
                  <Typography
                    variant='h6'
                    // color={'#57AE7F'}
                  >
                    Protein
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={9}
                >
                  <Slider
                    sx={{
                      color: sliderColor()
                    }}
                    name='protein'
                    defaultValue={Number(selectedIngredient?.protein)}
                    max={0.999}
                    step={0.001}
                    onChange={handleDecimalChange}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
                spacing={1}
              >
                <Grid
                  item
                  xs={3}
                >
                  <Typography
                    variant='h6'
                    // color={'#F29C38'}
                  >
                    Carbs
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={9}
                >
                  <Slider
                    sx={{
                      color: sliderColor()
                    }}
                    name='carbs'
                    defaultValue={Number(selectedIngredient?.carbs)}
                    max={0.999}
                    step={0.001}
                    onChange={handleDecimalChange}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
                spacing={1}
              >
                <Grid
                  item
                  xs={3}
                >
                  <Typography
                    variant='h6'
                    // color={'#D3302F'}
                  >
                    Fats
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={9}
                >
                  <Slider
                    sx={{
                      color: sliderColor()
                    }}
                    name='fats'
                    defaultValue={Number(selectedIngredient?.fats)}
                    max={0.999}
                    step={0.001}
                    onChange={handleDecimalChange}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Divider
                  orientation='horizontal'
                />
              </Grid>
              <Grid
                item
                container
                spacing={1}
                xs={12}
                alignItems='center'
              >
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Total'
                    value={editData.totalUnit}
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Calories'
                    value={3.537}
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                >
                  <Typography
                    variant="body1"
                    fontSize={'15px'}
                    textAlign='center'
                  >
                    Calorie Rating
                  </Typography>
                  <LinearProgress
                    color={progressColor()}
                    aria-label="Calorie"
                    sx={{
                      width: '100%',
                      color: 'blue',
                    }}
                    variant="determinate"
                    value={formattedCalories()}
                  />
                </Grid>
              </Grid>
            </Grid>
            
            {/* Section 2 */}

            <Grid
              item
              container
              xs={8.5}
              spacing={1}
            >
              <Grid
                item
                xs={12}
                textAlign='center'
              >
                <Typography
                  variant='h6'
                >
                  Components
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <DialogComponentTable/>
              </Grid>
              <Grid
                item
                xs={12}
                textAlign='center'
              >
                <Typography
                  variant='h6'
                >
                  Meals
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
              >
              <IngredientMealTable/>
              </Grid>
              <Grid
                item
                xs={12}
                textAlign='right'
              >
                <Button
                  variant='contained'
                  onClick={handleClose}
                  style={{
                    alignSelf: 'flex-end',
                    margin: '16px'
                  }}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default IngredientPlaygroundDialog;