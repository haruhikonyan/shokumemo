import React from "react"
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";

import { MealWithDishes } from "~/types/meals";

import MealForm, { FormInputs } from "@commons/forms/MealForm";

type Props = { meal: MealWithDishes }
const EditMeal: React.VFC<Props> = ({ meal }) => {
  const methods = useForm<FormInputs>({
    defaultValues: {
      ...meal
    }
  });

  const onSubmit = async (data: FormInputs) => {
    const response = await axios.put(`/api/v1/meals/${meal.id}`, data);
    location.href = `/meals/${response.data.id}`
  }

  return (
    <>
      <h1>食メモ編集a</h1>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <MealForm />

          <button type="submit" className="btn btn-primary">
            編集
          </button>
        </form>
      </FormProvider>
    </>
  )
}

export default EditMeal
