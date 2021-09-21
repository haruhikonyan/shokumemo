import React from "react"
import { useFormContext, useFieldArray } from "react-hook-form";

import { MealWithDishes } from "~/types/meals";

export type FormInputs = MealWithDishes

type Props = {}
const MealForm: React.VFC<Props> = () => {
  const { register, control } = useFormContext<FormInputs>();
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "dishes", // unique name for your Field Array
    keyName: 'key'
  });

  return (
    <>
      <div className="mb-3">
        <label className="form-label">タイトル</label>
        <input
          className="form-control"
          type="text"
          placeholder="タイトル"
          {...register("title")}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">説明</label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="説明"
          {...register("description")}
        />
      </div>

      {fields.map((field, index) => {
        return (
          <div key={field.key}>
            <div className="mb-3">
              <label className="form-label">食べ物タイトル</label>
              <input
                className="form-control"
                type="text"
                placeholder="タイトル"
                {...register(`dishes.${index}.title` as const)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">食べ物説明</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="説明"
                {...register(`dishes.${index}.description` as const)}
              />
            </div>
            <button type="button" onClick={() => remove(index)}
              className="btn btn-danger">
              食べ物を削除
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() =>
          append({
            title: '',
            description: '',
          })
        }
        className="btn btn-success"
      >
        食べ物を追加
      </button>
    </>
  )
}

export default MealForm
