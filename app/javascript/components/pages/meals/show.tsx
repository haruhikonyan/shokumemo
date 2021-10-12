import React, { useState } from "react"
import axios from "axios";

import { displayTitle } from "~/utils/stirng";

import { MealWithDishes } from "~/types/meals";
import { Dish } from "~/types/dishes";
type ShowDishProps = { dish: Dish, isMyDish: boolean, isThumbnailDish: boolean, updateThumbnailDish: (dishId: number) => void }
const ShowDish: React.VFC<ShowDishProps> = ({ dish, isMyDish, isThumbnailDish, updateThumbnailDish }) => {
  return (
    <div className="border p-3">
      {isMyDish && isThumbnailDish && <span className="badge bg-info float-end">サムネイル設定中</span>}
      <h3>{displayTitle(dish.title)}</h3>
      {dish.thumbnailImageUrl !== undefined ? <a href={dish.fullSizeImageUrl}><img className="img-fluid" src={dish.thumbnailImageUrl} /></a> : 'No image'}
      <pre className="mt-2">{dish.description}</pre>
      {isMyDish && !isThumbnailDish && dish.thumbnailImageUrl !== undefined && <button type="button" className="btn btn-info btn-sm mt-2" onClick={() => { updateThumbnailDish(dish.id) }}>サムネイルに設定</button>}
    </div>
  )
}

type Props = { meal: MealWithDishes, isMyMeal: boolean }
const ShowMeal: React.VFC<Props> = ({ meal: initialMeal, isMyMeal }) => {
  const [meal, setMeal] = useState(initialMeal)

  const updateThumbnailDish = async (dishId: number) => {
    const res = await axios.put<MealWithDishes>(`/api/v1/meals/${meal.id}/thumbnail_dish`, { dish_id: dishId })
    setMeal(res.data)
  }

  return (
    <>
      <h1>{displayTitle(meal.title)}</h1>
      <span className="badge bg-primary float-end">{meal.sceneLabel}</span>
      <pre className="mt-2">{meal.description}</pre>
      {meal.dishes.map((dish) => <div key={dish.id} className="mt-3"><ShowDish dish={dish} isMyDish={isMyMeal} isThumbnailDish={dish.id === meal.thumbnailDishId} updateThumbnailDish={updateThumbnailDish} /></div>)}
      {isMyMeal && <><a href={`/meals/${meal.id}/edit`}>編集</a> | <a href={`/meals/${meal.id}/edit?is_initial_add_dish=true`}>写真を追加</a> | </>}
      <a href="/meals">一覧へ戻る</a>
    </>
  )
}

export default ShowMeal
