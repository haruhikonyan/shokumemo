import { Dish } from "./dishes";

export type Meal = {
  id?: number;
  scene: string;
  title?: string;
  description?: string;
  eatenAt?: string;
  location?: string;
  isPrivate: boolean;
  sceneLabel: string;
  thumbnailDishId?: number;
  cardThumbnailImageUrl?: string
}

export type MealWithDishes = Meal & {
  dishes: Dish[];
}

export type sceneLabelAndValues = [string, string][]
