import React, { useState } from "react"
import axios from "axios";
import { useForm } from "react-hook-form";

import { displayTitle } from "~/utils/stirng";

import { User } from "~/types/users";
import { MealWithDishes } from "~/types/meals";

const MealCard: React.VFC<{ meal: MealWithDishes }> = ({ meal }) => {
  return (
    <a href={`/meals/${meal.id}`} className="card">
      <div className="card-header">
        {displayTitle(meal.title)}
        <span className="badge bg-primary float-end">{meal.sceneLabel}</span>
      </div>
      <div className="card-body p-2">
        {meal.cardThumbnailImageUrl != null ? <img src={meal.cardThumbnailImageUrl} className="img-fluid" /> : 'No image'}
      </div>
    </a>
  )
}


type Props = { user: User, meals: MealWithDishes[] }
const Mypage: React.VFC<Props> = ({ user, meals }) => {

  return (
    <>
      <h1>投稿一覧</h1>
      <div className="row">
        {meals.map(meal => {
          return (
            <div className="col-xs-12 col-md-4 mb-3" key={meal.id}>
              <MealCard meal={meal} />
              <div className="d-flex justify-content-around">
                <a className="btn btn-secondary" href={`/meals/${meal.id}/edit`}>編集</a>
                <button type="button" className="btn btn-danger">削除</button>
              </div>
            </div>
          )
        })}
      </div>
      <a className="btn btn-primary" href="/meals/new">新規作成</a>
    </>
  )
}

export default Mypage
