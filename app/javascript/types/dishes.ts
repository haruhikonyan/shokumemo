import { Meal } from "./meals";

export type Dish = {
  id?: number;
  title?: string;
  description?: string;
  imageUrl?: string
  thumbnailImageUrl?: string
}

export type DishWithMeal = Dish & {
  meal: Meal;
}
