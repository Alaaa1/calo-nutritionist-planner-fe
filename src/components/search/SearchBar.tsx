import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import * as IngredientsApi from '../../network/ingredientApi';
import * as ComponentApi from '../../network/componentApi';
import * as MealApi from '../../network/mealApi';
import createError from 'http-errors';
import useSearchStore from "../../stores/searchStore";
import useEntityStore from "../../stores/entityStore";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    setLoading,
    setSearchResult
  } = useSearchStore();
  const {
    entity,
    setEntityCount,
    skip
  } = useEntityStore();

  const handleChange = (event: any) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const searchItem = async (entity: string, skip: number, index: string) => {
    try {
      setLoading(true);
  
      const entityToApiFunctionMap: any = {
        ingredient: IngredientsApi.searchIngredient,
        component: ComponentApi.searchComponent,
        meal: MealApi.searchMeal,
      };
  
      const apiFunction: any = entityToApiFunctionMap[entity];
  
      if (apiFunction) {
        const response = await apiFunction(index, skip);
        setSearchResult(response.data);
        setEntityCount(response.count);
        setLoading(false);
      } else {
        console.error(`No API function found for entity: ${entity}`);
      }
    } catch (err) {
      throw createError(400, 'Bad Request', {
        details: `An error occurred while fetching matching ${entity}: ${err}`,
      });
    }
  };
  
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  
  const handleSubmit = () => {
    searchItem(entity, skip, searchTerm);
  }


  let placeholderText = "Search for an ingredient";

  if (entity === "ingredient") {
    placeholderText = "Search for an ingredient";
  } else if (entity === "component") {
    placeholderText = "Search for a component";
  } else if (entity === "meal") {
    placeholderText = "Search for a meal";
  }

  return (
    <TextField
    style={{
      width: "100%",
      display: "flex",
    }}
    label={searchTerm}
    value={searchTerm}
    onChange={handleChange}
    onKeyDown={handleKeyDown}
    placeholder={placeholderText}
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
      },
    }}
    InputProps={{
      type: "search",
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon
            style={{
              cursor: 'pointer'
            }}
            onClick={() => handleSubmit()}
          />
        </InputAdornment>
      ),
    }}
      />
  );
}

export default SearchBar;