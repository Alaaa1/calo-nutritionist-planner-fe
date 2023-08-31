import { Button } from '@mui/material';
import {AiOutlinePlus} from 'react-icons/ai'
import useIngredientStore from '../../stores/ingredientStore';

const AddIngredientButton: React.FC = () => {
  const { setAddOpen } = useIngredientStore();

  return (
    <Button
      id='primary-button'
      variant='contained'
      type="submit"
      onClick={() => setAddOpen(true)}
      style={{
        width: '131px',
        height: '56px'
      }}
    >
      Create &nbsp;
      <AiOutlinePlus
        style={{
        scale: '150%'
        }}
      />
    </Button>
  )
}

export default AddIngredientButton;