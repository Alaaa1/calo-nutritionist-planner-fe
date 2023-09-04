import React, { useEffect, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop, IconButton } from "@mui/material";
import * as componentsApi from "../../network/componentApi";
import useSearchStore from "../../stores/searchStore";
import { IComponent } from "../../interfaces";
import EditIcon from "@mui/icons-material/Edit";
import useComponentStore from "../../stores/componentStore";
import useEntityStore from "../../stores/entityStore";
import CreateComponentDialog from "./CreateComponentDialog";
// import EditComponentDialog from "./EditComponentDIalog";

const ComponentTable: React.FC = () => {
  const [components, setComponents] = useState<IComponent[]>([]);
  const { selectedComponent, setSelectedComponent } = useComponentStore();
  const [open, setOpen] = useState(false);
  const {setEntity} = useEntityStore()

  const {
    setEntityCount,
    skip,
  } = useEntityStore();
  const {
    loading,
    setLoading,
    setSearchResult,
    searchResult
  } = useSearchStore();

  const memoizedSearchResult = useMemo(() => searchResult, [searchResult]);
  
  async function loadComponents() {
    try {
      setLoading(true);
      const response = await componentsApi.fetchComponents(skip);
      setEntityCount(response.data.count);
      setSearchResult(response.data.components)
      if (searchResult) {
        setComponents(searchResult);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadComponents();
  }, [skip]);

  const handleComponentAdded = (newIngredient: any) => {
    setComponents((prevIngredients: any) => [
      ...prevIngredients,
      newIngredient,
    ]);
    // setEntity('component')
  };

  const handleEditClick = (row: any) => {
    setSelectedComponent(row);
    setTimeout(() => {
      setOpen(true);
    }, 0);
    console.log(row);
    console.log("Dialog should open now.");
  };

  const handleComponentUpdated = (updatedComponent: IComponent) => {
    const updatedIndex = components.findIndex(
      (component) => component.id === updatedComponent.id
    );

    if (updatedIndex !== -1) {
      const updatedComponents = [...components];
      updatedComponents[updatedIndex] = updatedComponent;
      setComponents(updatedComponents);
    }

    setOpen(false);
    loadComponents();
  };

  return (
    <>
      {loading && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Table
        sx={{
          marginTop: "15px",
          marginBottom: '15px',
          userSelect: "none",
        }}
        id='table'
          >
        <thead>
          <tr>
            <th>
              Component Name&nbsp;
            </th>
            <th>Calories&nbsp;</th>
            <th>Proteins&nbsp;</th>
            <th>Carbs&nbsp;</th>
            <th>Fats&nbsp;</th>
            <th>Unit&nbsp;</th>
            <th>Price&nbsp;</th>
            {/* <th>Edit&nbsp;</th> */}
          </tr>
        </thead>
        <tbody>
        {memoizedSearchResult && Array.isArray(memoizedSearchResult) && memoizedSearchResult.length > 0 ? (
            memoizedSearchResult.map((component: IComponent, index: number) => {
              let totalFats = 0;
              let totalCarbs = 0;
              let totalProteins = 0;
              let totalCalories = 0;
              let totalPrice = 0;

              if (component.components_ingredients && Array.isArray(component.components_ingredients)) {
                component.components_ingredients.forEach((el) => {
                  totalFats += Number(el.ingredient.fats*el.ingredient_quantity);
                  totalCarbs += Number(el.ingredient.carbs*el.ingredient_quantity);
                  totalProteins += Number(el.ingredient.protein*el.ingredient_quantity);
                  totalCalories += totalFats * 9 + totalCarbs * 4 + totalProteins * 4;
                  totalPrice += Number(el.ingredient.price* el.ingredient_quantity);
                });

                totalFats = Number(totalFats.toFixed(3));
                totalCarbs = Number(totalCarbs.toFixed(3));
                totalProteins = Number(totalProteins.toFixed(3));
                totalCalories = Number(totalCalories.toFixed(3));
                totalPrice = Number(totalPrice.toFixed(3));
              }

              return (
                <tr key={index} style={{height:"52px"}}>
                  <td>{component.name}</td>
                  <td>{totalCalories}</td>
                  <td>{totalProteins}</td>
                  <td>{totalCarbs}</td>
                  <td>{totalFats}</td>
                  <td>{component.unit}</td>
                  <td>{totalPrice}</td>
                  {/* <td>
                    <IconButton onClick={() => handleEditClick(component)}>
                      <EditIcon />
                    </IconButton>
                  </td> */}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8}>No search results found.</td>
            </tr>
          )}
        </tbody>

      </Table>
      {/* <EditComponentDialog
        key={selectedComponent?.id}
        open={open}
        setOpen={setOpen}
        onComponentUpdated={handleComponentUpdated}
        component={selectedComponent}
      /> */}
      <CreateComponentDialog onComponentAdded={handleComponentAdded} />
    </>
  );
};

export default ComponentTable;
