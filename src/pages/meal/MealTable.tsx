import React, { useEffect, useState } from "react";
import Table from "@mui/joy/Table";
import { Backdrop, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import * as mealApi from '../../network/mealApi';
import useSearchStore from "../../stores/searchStore";
import useEntityStore from "../../stores/entityStore";
import { IComponentIngredient, IMeal, IMealComponent } from "../../interfaces";

const MealTable: React.FC = () => {

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


  async function loadMeals() {
    try {
      setLoading(true)
      const take = 9
      const response = await mealApi.fetchMeals(skip, take)
      setEntityCount(response.count);
      setSearchResult(response.data);
    } catch (err) {
      console.log(err);
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMeals();
  }, [skip]);

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
      <Table hoverRow sx={{ marginTop: "20px", userSelect: "none" }}>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Meal Name&nbsp;</th>
            <th>Calories&nbsp;</th>
            <th>Proteins&nbsp;</th>
            <th>Carbs&nbsp;</th>
            <th>Fats&nbsp;</th>
            <th>Unit&nbsp;</th>
            <th>Price&nbsp;</th>
            <th>Edit&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {searchResult && Array.isArray(searchResult) && searchResult.length > 0 ? (
            searchResult.map((meal: IMeal, index: number) => {
              let totalFats = 0;
              let totalCarbs = 0;
              let totalProteins = 0;
              let totalCalories = 0;
              let totalPrice = 0;

              if (meal.meals_components && Array.isArray(meal.meals_components)) {
                meal.meals_components.map((el: IMealComponent) => {
                  el.component.components_ingredients.map((el: IComponentIngredient) => {
                    totalFats += Number(el.ingredient.fats)
                    totalCarbs += Number(el.ingredient.carbs);
                    totalProteins += Number(el.ingredient.protein);
                    totalCalories += totalFats * 9 + totalCarbs * 4 + totalProteins * 4;
                    totalPrice += Number(el.ingredient.price);
                  })
                });

                totalFats = Number(totalFats.toFixed(3));
                totalCarbs = Number(totalCarbs.toFixed(3));
                totalProteins = Number(totalProteins.toFixed(3));
                totalCalories = Number(totalCalories.toFixed(3));
                totalPrice = Number(totalPrice.toFixed(3));
              }

              return (
                <tr key={index}>
                  <td>{meal.name}</td>
                  <td>{totalCalories}</td>
                  <td>{totalProteins}</td>
                  <td>{totalCarbs}</td>
                  <td>{totalFats}</td>
                  <td>{meal.unit}</td>
                  <td>{totalPrice}</td>
                  <td>
                    <IconButton
                      // onClick={() => handleEditClick(component)}
                    >
                      <EditIcon />
                    </IconButton>
                  </td>
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
    </>
  )
}

export default MealTable;