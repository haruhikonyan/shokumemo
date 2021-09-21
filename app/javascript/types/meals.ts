import { Dish } from "./dishes";

export type Meal = {
  id?: number;
  title: string;
  description: string;
}

export type MealWithDishes = Meal & {
  dishes: Dish[];
}
