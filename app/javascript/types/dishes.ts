import { Meal } from "./meals";

export type Dish = {
  id?: number;
  title: string;
  description: string;
}

export type DishWithMeal = Dish & {
  meal: Meal;
}
