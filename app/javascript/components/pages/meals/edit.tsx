import React, { useState, useCallback } from "react"
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";

import { compressor } from "~/utils/compressor";

import { MealWithDishes, sceneLabelAndValues } from "~/types/meals";

import Loading from "@commons/Loading";
import MealForm, { FormInputs } from "@commons/forms/MealForm";

type Props = { meal: MealWithDishes, sceneLabelAndValues: sceneLabelAndValues, isInitialAddDish?: boolean }
const EditMeal: React.VFC<Props> = ({ meal, sceneLabelAndValues, isInitialAddDish = false }) => {
  const [dishImages, setDishImages] = useState<(File | undefined)[]>(meal.dishes.map(_ => undefined))
  const [isAPIRequesting, setIsAPIRequesting] = useState<boolean>(false)

  const methods = useForm<FormInputs>({
    defaultValues: { ...meal },
  });

  const onChangeDishFiles = useCallback((files: (File | undefined)[]) => {
    setDishImages(files);
  }, []);

  const onSubmit = async (data: FormInputs) => {
    setIsAPIRequesting(true);

    let formData = new FormData();

    formData.append('eaten_at', data.eatenAt);
    if (data.title !== undefined) formData.append('title', data.title);
    formData.append('scene', data.scene);
    if (data.description !== undefined) formData.append('description', data.description);
    if (data.location !== undefined) formData.append('location', data.location);
    formData.append('private', data.isPrivate.toString());
    for (const [index, dish] of data.dishes.entries()) {
      if (dish.id !== undefined) formData.append('dishes[]id', dish.id?.toString());
      if (dish.title !== undefined) formData.append('dishes[]title', dish.title);
      if (dish.description !== undefined) formData.append('dishes[]description', dish.description);
      if (dishImages[index] !== undefined) {
        formData.append('dishes[]full_size_image', dishImages[index], dishImages[index].name);
        const thumbnailImage = await compressor(dishImages[index])
        formData.append('dishes[]thumbnail_image', thumbnailImage, `thumbnail_${dishImages[index].name}`);
      }
    };
    data.tags.forEach(tag => {
      if (tag.id !== undefined) {
        formData.append("tags[]id", tag.id);
      }
      formData.append("tags[]name", tag.name);
    })

    try {
    const response = await axios.put(`/api/v1/meals/${meal.id}`, formData);
    location.href = `/meals/${response.data.id}`;
  }catch (error) {
      console.log(error);
      setIsAPIRequesting(false);
    }
  };

  return (
    <>
      {isAPIRequesting && <Loading />}
      <h1>編集</h1>
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
