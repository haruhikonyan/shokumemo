import React, { useState, useCallback } from "react"
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";

import { MealWithDishes } from "~/types/meals";

import MealForm, { FormInputs } from "@commons/forms/MealForm";

type Props = { meal: MealWithDishes }
const EditMeal: React.VFC<Props> = ({ meal }) => {
  const [dishImages, setDishImages] = useState<(File | undefined)[]>(meal.dishes.map(_ => undefined))
  const methods = useForm<FormInputs>({
    defaultValues: {
      ...meal
    }
  });

  const onChangeDishFiles = useCallback((files: (File | undefined)[]) => {
    setDishImages(files);
  }, [])

  const onSubmit = async (data: FormInputs) => {
    let formData = new FormData();
    formData.append('title', data.title)
    formData.append('description', data.description)
    // formData.append('image', mealImage, mealImage.name)
    data.dishes.forEach((dish, index) => {
      if (dish.id) {
        formData.append('dishes[]id', dish.id?.toString());
      }
      formData.append('dishes[]title', dish.title);
      formData.append('dishes[]description', dish.description);
      if (dishImages[index] !== undefined) {
        formData.append('dishes[]image', dishImages[index], dishImages[index].name);
      }
    })

    const response = await axios.put(`/api/v1/meals/${meal.id}`, formData);
    location.href = `/meals/${response.data.id}`
  }

  return (
    <>
      <h1>食メモ編集</h1>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <MealForm dishImages={dishImages} onChangeDishFiles={onChangeDishFiles} />

          <button type="submit" className="btn btn-primary">
            編集
          </button>
        </form>
      </FormProvider>
    </>
  )
}

export default EditMeal
