import React, { useState, useCallback, useMemo } from "react"
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";

import { MealWithDishes, sceneLabelAndValues } from "~/types/meals";

import MealForm, { FormInputs } from "@commons/forms/MealForm";

type Props = { meal: MealWithDishes, sceneLabelAndValues: sceneLabelAndValues, isInitialAddDish?: boolean }
const EditMeal: React.VFC<Props> = ({ meal, sceneLabelAndValues, isInitialAddDish = false }) => {
  const [dishImages, setDishImages] = useState<(File | undefined)[]>(meal.dishes.map(_ => undefined))
  const [isAPIRequesting, setIsAPIRequesting] = useState<boolean>(false)

  const defaultValues = useMemo(() => {
    if (isInitialAddDish) {
      return { ...meal, dishes: [...meal.dishes, {}] }
    }
    else {
      return { ...meal }
    }
  }, [])

  const methods = useForm<FormInputs>({
    defaultValues: { ...meal },
  });

  const onChangeDishFiles = useCallback((files: (File | undefined)[]) => {
    setDishImages(files);
  }, [])

  const onSubmit = async (data: FormInputs) => {
    setIsAPIRequesting(true);

    let formData = new FormData();

    if (data.title !== undefined) formData.append('title', data.title);
    if (data.description !== undefined) formData.append('description', data.description);
    formData.append('scene', data.scene);
    formData.append('private', data.isPrivate.toString());
    data.dishes.forEach((dish, index) => {
      if (dish.id !== undefined) formData.append('dishes[]id', dish.id?.toString());
      if (dish.title !== undefined) formData.append('dishes[]title', dish.title);
      if (dish.description !== undefined) formData.append('dishes[]description', dish.description);
      if (dishImages[index] !== undefined) formData.append('dishes[]full_size_image', dishImages[index], dishImages[index].name);
    })

    const response = await axios.put(`/api/v1/meals/${meal.id}`, formData);
    location.href = `/meals/${response.data.id}`
  }

  return (
    <>
      <h1>食メモ編集</h1>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <MealForm dishImages={dishImages} sceneLabelAndValues={sceneLabelAndValues} isInitialAddDish={isInitialAddDish} onChangeDishFiles={onChangeDishFiles} />
          <button type="submit" className="btn btn-primary" disabled={isAPIRequesting}>
            保存
          </button>
        </form>
      </FormProvider>
    </>
  )
}

export default EditMeal
