import { Dish } from "./dishes";
import { SecuredUser } from "./users";

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
  cardThumbnailImageUrl?: string;

  user: SecuredUser;
}

export type MealWithDishes = Meal & {
  dishes: Dish[];
}

export type sceneLabelAndValues = [string, string][]
