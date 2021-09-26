import React, { useCallback, useState } from "react"
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";

import MealForm, { FormInputs } from "@commons/forms/MealForm";

type Props = {}
const NewMeal: React.VFC<Props> = () => {
  const [dishImages, setDishImages] = useState<(File | undefined)[]>([])
  const methods = useForm<FormInputs>();

  const onChangeDishFiles = useCallback((files: (File | undefined)[]) => {
    setDishImages(files);
  }, [])

  const onSubmit = async (data: FormInputs) => {
    let formData = new FormData();
    formData.append('title', data.title)
    formData.append('description', data.description)
    // formData.append('image', mealImage, mealImage.name)
    data.dishes.forEach((dish, index) => {
      formData.append('dishes[]title', dish.title);
      formData.append('dishes[]description', dish.description);
      if (dishImages[index] !== undefined) {
        formData.append('dishes[]image', dishImages[index], dishImages[index].name);
      }
    })

    const response = await axios.post('/api/v1/meals', formData);
    location.href = `/meals/${response.data.id}`
  }

  return (
    <>
      <h1>食メモ新規作成</h1>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <MealForm dishImages={dishImages} onChangeDishFiles={onChangeDishFiles} />

          <button type="submit" className="btn btn-primary">
            投稿
          </button>
        </form>
      </FormProvider>
    </>
  )
}

export default NewMeal
