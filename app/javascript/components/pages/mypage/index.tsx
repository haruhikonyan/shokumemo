import React, { useEffect, useState } from "react"
import axios from "axios";
import { useForm } from "react-hook-form";

import { displayTitle } from "~/utils/stirng";

import { User } from "~/types/users";
import { MealWithDishes, sceneLabelAndValues } from "~/types/meals";

import Loading from "@commons/Loading";

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

type FilterQuery = { startDate: string, endDate: string, scene: string, searchWord: string }
const MyMeals: React.VFC<{ meals: MealWithDishes[], filterQuery: FilterQuery, sceneLabelAndValues: sceneLabelAndValues, deleteMealHundler: (meal: MealWithDishes) => void }> = ({ meals, filterQuery, sceneLabelAndValues, deleteMealHundler }) => {
  const [displayMeals, setDesplayMeals] = useState(meals);
  const { register, handleSubmit, watch } = useForm<FilterQuery>({
    defaultValues: { ...filterQuery, scene: filterQuery.scene != null ? filterQuery.scene : 'all' },
  });

  const searchWord = watch('searchWord');
  const scene = watch('scene');

  useEffect(() => {
    let filteredMeals = meals;
    if (scene !== 'all') {
      filteredMeals = filteredMeals.filter(m => m.scene === scene);
    }
    if (searchWord) {
      filteredMeals = filteredMeals.filter(m => m.title?.includes(searchWord) || m.description?.includes(searchWord) || m.location?.includes(searchWord));
    }
    setDesplayMeals(filteredMeals);
  }, [searchWord, scene])

  const onSubmitDate = (data: FilterQuery) => {
    location.href = `/mypage?start_date=${data.startDate}&end_date=${data.endDate}&search_word=${data.searchWord ?? ''}&scene=${data.scene}`;
  }

  return (
    <>
      <form
        onKeyPress={e => {
          if (e.key == "Enter") {
            e.preventDefault();
          }
        }}
        onSubmit={handleSubmit(onSubmitDate)}
      >
        <div className="d-flex justify-content-sm-center">
          <button type="submit" className="btn btn-primary ms-auto ms-sm-0">
            ?????????????????????
          </button>
        </div>
        <div className="d-flex align-items-center mb-3">
          <div className="flex-grow-1">
            <label className="form-label">??????????????????</label>
            <input
              className="form-control skm-small-date-picker"
              type="date"
              {...register("startDate")}
            />
          </div>
          <div className="mx-2"> ??? </div>
          <div className="flex-grow-1">
            <label className="form-label">??????????????????</label>
            <input
              className="form-control skm-small-date-picker"
              type="date"
              {...register("endDate")}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">???????????????</label>
          <input
            className="form-control"
            type="text"
            {...register("searchWord")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">??????</label>
          <select className="form-control" {...register("scene", { required: true })}>
            <option value="all">?????????</option>
            {
              sceneLabelAndValues.map(([label, value]) => {
                return <option key={value} value={value}>{label}</option>
              })
            }
          </select>
        </div>
      </form>
      <div className="row">
        {displayMeals.map(meal => {
          return (
            <div className="col-xs-12 col-md-4 mb-3" key={meal.id}>
              <MealCard meal={meal} />
              <div className="d-flex justify-content-around">
                <a className="btn btn-secondary" href={`/meals/${meal.id}/edit`}>??????</a>
                <button type="button" className="btn btn-danger" onClick={() => { deleteMealHundler(meal) }}>??????</button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

type FormInputs = Pick<User, 'email' | 'displayName' | 'description'>
type Props = { user: User, meals: MealWithDishes[], filterQuery: FilterQuery, sceneLabelAndValues: sceneLabelAndValues }
const Mypage: React.VFC<Props> = ({ user: initialUser, meals, filterQuery, sceneLabelAndValues }) => {
  const [user, setUser] = useState(initialUser);
  const [isAPIRequesting, setIsAPIRequesting] = useState<boolean>(false);
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
    const response = confirm(`${displayTitle(meal.title)}(${meal.dishes.length}???????????????)?????????????????????`);
    if (response) {
      setIsAPIRequesting(true);
      await axios.delete(`/api/v1/meals/${meal.id}`);
      location.reload();
    }
  }
  return (
    <>
      {isAPIRequesting && <Loading />}
      {
        isEditing
          ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">?????????</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="??????????????????"
                  {...register("displayName")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">?????????????????????</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="tabelbumer@tabelbum.com"
                  {...register("email")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">????????????</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="??????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
                  {...register("description")}
                />
              </div>
              <div className="d-flex justify-content-sm-center">
                <button type="submit" className="btn btn-primary ms-auto ms-sm-0">
                  ??????
                </button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => { setIsEditing(false) }}>
                  ???????????????
                </button>
              </div>
            </form>
          )
          : (
            <>
              <p>?????????: {user.displayName}</p>
              <p>?????????????????????(?????????): {user.email}</p>
              <div>????????????:</div>
              <pre className="mt-2 skm-pre-wrap">{user.description}</pre>
              <div className="d-flex justify-content-sm-center">
                <button type="submit" className="btn btn-primary ms-auto ms-sm-0" onClick={() => { setIsEditing(true) }}>
                  ??????
                </button>
              </div>
            </>
          )
      }

      <h1>????????????</h1>
      <MyMeals meals={meals} filterQuery={filterQuery} sceneLabelAndValues={sceneLabelAndValues} deleteMealHundler={deleteMealHundler} />
      <a className="btn btn-primary" href="/meals/new">????????????</a>
    </>
  )
}

export default Mypage
