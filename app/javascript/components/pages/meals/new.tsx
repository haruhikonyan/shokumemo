import React from "react"
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";

import MealForm, { FormInputs } from "@commons/forms/MealForm";

type Props = {}
const NewMeal: React.VFC<Props> = () => {
  const methods = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    const response = await axios.post('/api/v1/meals', data);
    location.href = `/meals/${response.data.id}`
  }

  return (
    <>
      <h1>食メモ新規作成</h1>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <MealForm />

          <button type="submit" className="btn btn-primary">
            投稿
          </button>
        </form>
      </FormProvider>
    </>
  )
}

export default NewMeal
