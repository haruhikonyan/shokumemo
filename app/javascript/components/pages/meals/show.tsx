import React, { useMemo, useState } from "react"
import axios from "axios";
import { useForm } from "react-hook-form";

import { displayTitle } from "~/utils/stirng";

import { MealWithDishes } from "~/types/meals";
import { Dish } from "~/types/dishes";
type ShowDishProps = { dish: Dish, isMyDish: boolean, isThumbnailDish: boolean, updateThumbnailDish: (dishId: number) => void, updaetDish: (dish: Dish) => void }
const ShowDish: React.VFC<ShowDishProps> = ({ dish, isMyDish, isThumbnailDish, updateThumbnailDish, updaetDish }) => {
  const [isEditingDescription, setIsEditingDescription] = useState(false)

  const { register, handleSubmit } = useForm<Dish>({
    defaultValues: { ...dish },
  });

  const onSubmit = async (data: Dish) => {
    await updaetDish(data)
    setIsEditingDescription(false)
  };

  return (
    <div className="border p-3">
      {isMyDish && isThumbnailDish && <span className="badge bg-info float-end">サムネイル設定中</span>}
      {isMyDish && !isThumbnailDish && dish.thumbnailImageUrl !== undefined && <button type="button" className="btn btn-info btn-sm float-end" onClick={() => { updateThumbnailDish(dish.id) }}>サムネイルに設定</button>}
      <h3>{displayTitle(dish.title)}</h3>
      {dish.thumbnailImageUrl !== undefined ? <a href={dish.fullSizeImageUrl}><img className="img-fluid d-block" src={dish.thumbnailImageUrl} /></a> : <div>No image</div>}
      {
        isEditingDescription
          ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                className="form-control"
                rows={3}
                placeholder="説明"
                {...register('description')}
              />
              <button type="submit" className="btn btn-primary btn-sm">保存</button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setIsEditingDescription(false) }}>キャンセル</button>
            </form>
          )
          : (
            <>
              {isMyDish && <button type="button" className="btn btn-info btn-sm mt-2" onClick={() => { setIsEditingDescription(true) }}>説明を編集</button>}
              <pre className="mt-2 skm-pre-wrap">{dish.description}</pre>
            </>
          )
      }
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

  const updaetDish = async (dish: Dish) => {
    const res = await axios.put<MealWithDishes>(`/api/v1/dishes/${dish.id}`, { description: dish.description });
    setMeal(res.data)
  }

  const formatedDate = useMemo(() => {
    const date = new Date(meal.eatenAt);
    return `${date.getFullYear()}日${date.getMonth() + 1}月${date.getDate()}日`
  }, [])

  const desplayLocation = useMemo(() => {
    return meal.location !== undefined && meal.location !== '' && `${meal.location} にて`
  }, [])

  return (
    <>
      <div className="d-flex">
        <small>{meal.user.displayName} さん投稿</small>
        <span className="badge bg-primary ms-auto">{meal.sceneLabel}</span>
      </div>
      <h1>{displayTitle(meal.title)}</h1>
      <small>{formatedDate} {desplayLocation}</small>
      <pre className="mt-2 skm-pre-wrap">{meal.description}</pre>
      <div className="row">
        {meal.dishes.map((dish) => {
          return (
            <div key={dish.id} className="col-12 col-md-6 mt-3">
              <ShowDish dish={dish} isMyDish={isMyMeal} isThumbnailDish={dish.id === meal.thumbnailDishId} updateThumbnailDish={updateThumbnailDish} updaetDish={updaetDish} />
            </div>
          )
        })}
      </div>
      {isMyMeal && (
        <div className="fixed-bottom skm-show-action-buttons">
          <div className="p-2 bg-light">
            <div className="text-center"><a href={`/meals/${meal.id}/edit`}>編集</a></div>
            <div className="text-center"><a href={`/meals/${meal.id}/edit?is_initial_add_dish=true`}>写真を追加</a></div>
          </div>
        </div>
      )}
      <a href="/meals">一覧へ戻る</a>
    </>
  )
}

export default ShowMeal
