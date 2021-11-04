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

type FormInputs = Pick<User, 'email' | 'displayName' | 'description'>
type Props = { user: User, meals: MealWithDishes[] }
const Mypage: React.VFC<Props> = ({ user: initialUser, meals }) => {
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormInputs>({
    defaultValues: { ...user },
  });
  const onSubmit = async (data: FormInputs) => {
    const { data: updatedUser } = await axios.put<User>('/api/v1/users', {
      email: data.email,
      display_name: data.displayName,
      description: data.description
    });
    setUser(updatedUser);
    reset(updatedUser);
    setIsEditing(false);
  }

  const deleteMealHundler = async (meal: MealWithDishes) => {
    const response = confirm(`${displayTitle(meal.title)}(${meal.dishes.length}皿の食べ物)を削除します。`);
    if (response) {
      await axios.delete(`/api/v1/meals/${meal.id}`);
      location.reload;
    }
  }
  return (
    <>
      {
        isEditing
          ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">表示名</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="タベルバマー"
                  {...register("displayName")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">メールアドレス</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="tabelbumer@tabelbum.com"
                  {...register("email")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">自己紹介</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="美味しいものをいただいたら忘れないようタベルバムに残すことにはまっています。"
                  {...register("description")}
                />
              </div>
              <div className="d-flex justify-content-sm-center">
                <button type="submit" className="btn btn-primary ms-auto ms-sm-0">
                  保存
                </button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => { setIsEditing(false) }}>
                  キャンセル
                </button>
              </div>
            </form>
          )
          : (
            <>
              <p>表示名: {user.displayName}</p>
              <p>メールアドレス: {user.email}</p>
              <div>自己紹介:</div>
              <pre className="mt-2 skm-pre-wrap">{user.description}</pre>
              <div className="d-flex justify-content-sm-center">
                <button type="submit" className="btn btn-primary ms-auto ms-sm-0" onClick={() => { setIsEditing(true) }}>
                  編集
                </button>
              </div>
            </>
          )
      }

      <h1>投稿一覧</h1>
      <div className="row">
        {meals.map(meal => {
          return (
            <div className="col-xs-12 col-md-4 mb-3" key={meal.id}>
              <MealCard meal={meal} />
              <div className="d-flex justify-content-around">
                <a className="btn btn-secondary" href={`/meals/${meal.id}/edit`}>編集</a>
                <button type="button" className="btn btn-danger" onClick={() => { deleteMealHundler(meal) }}>削除</button>
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
