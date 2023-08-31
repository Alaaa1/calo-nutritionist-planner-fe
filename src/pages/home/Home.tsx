// Material UI
import { Typography } from '@mui/material';

// Components
import SearchTypeDropdown from '../../components/search/SearchTypeDropdown';
import SearchBar from "../../components/search/SearchBar"
import PaginationFooter from "../../components/footer/PaginationFooter";

// Pages
import AddIngredientButton from '../ingredient/AddIngredientButton';
import AddComponentButton from "../component/AddComponentButton";
import AddMealButton from "../meal/AddMealButton";
import IngredientTable from "../ingredient/IngredientTable";
import ComponentTable from '../component/ComponentTable';
import MealTable from "../meal/MealTable";

// Stores
import useEntityStore from '../../stores/entityStore';


const Home: React.FC = () => {
  const { entity } = useEntityStore();

  const entityTable = entity === 'ingredient'
  ? <IngredientTable/>
  : entity === 'component'
  ? <ComponentTable/>
  : entity === 'meal'
  ? <MealTable/>
  : null;

  const addEntityButton = entity === 'ingredient'
  ? <AddIngredientButton/>
  : entity === 'component'
  ? <AddComponentButton/>
  : entity === 'meal'
  ? <AddMealButton/>
  : null;

  function entityString(entity: string) {
    return entity.charAt(0).toUpperCase() + entity.slice(1) + 's'
  }

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: '15px',
        marginBottom: '15px'
        }}
      >
        <SearchTypeDropdown/>
        <Typography
          variant="h4"
          component="h2"
          >
          { entityString(entity) }
        </Typography>
        { addEntityButton }
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: 'auto'
        }}
      >
      <SearchBar/>
      </div>

      { entityTable }
      
      <div
        style={{
          position: "absolute",
          bottom: "2vh",
          width: "100%",
          textAlign: "center",
        }}
      >
        <PaginationFooter/>
      </div>
    </>
  );
};

export default Home;