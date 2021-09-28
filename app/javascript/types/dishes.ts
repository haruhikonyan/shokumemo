import { Meal } from "./meals";

export type Dish = {
  id?: number;
  title?: string;
  description?: string;
  fullSizeImageUrl?: string
  thumbnailImageUrl?: string
}

export type DishWithMeal = Dish & {
  meal: Meal;
}
