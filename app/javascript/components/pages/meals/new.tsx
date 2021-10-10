import React, { useCallback, useState } from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";

import { compressor } from "~/utils/compressor";

import { sceneLabelAndValues } from "~/types/meals";

import MealForm, { FormInputs } from "@commons/forms/MealForm";

type Props = { sceneLabelAndValues: sceneLabelAndValues };
const NewMeal: React.VFC<Props> = ({ sceneLabelAndValues }) => {
  const [dishImages, setDishImages] = useState<(File | undefined)[]>([]);
  const [isAPIRequesting, setIsAPIRequesting] = useState<boolean>(false);

  const methods = useForm<FormInputs>({
    defaultValues: {
      dishes: [{}],
    },
  });

  const onChangeDishFiles = useCallback((files: (File | undefined)[]) => {
    setDishImages(files);
  }, []);

  const onSubmit = async (data: FormInputs) => {
    setIsAPIRequesting(true);

    let formData = new FormData();

    if (data.title !== undefined) formData.append("title", data.title);
    if (data.description !== undefined)
      formData.append("description", data.description);
    formData.append("scene", data.scene);
    formData.append("private", data.isPrivate.toString());
    for (const [index, dish] of data.dishes.entries()) {
      if (dish.id !== undefined) {
        formData.append("dishes[]id", dish.id?.toString());
      }
      if (dish.title !== undefined) {
        formData.append("dishes[]title", dish.title);
      }
      if (dish.description !== undefined) {
        formData.append("dishes[]description", dish.description);
      }
      if (dishImages[index] !== undefined) {
        formData.append(
          "dishes[]full_size_image",
          dishImages[index],
          dishImages[index].name
        );
        const thumbnailImage = await compressor(dishImages[index])
        formData.append('dishes[]thumbnail_image', thumbnailImage, `thumbnail_${dishImages[index].name}`);
      }
    };

    const response = await axios.post("/api/v1/meals", formData);
    location.href = `/meals/${response.data.id}`;
  };

  return (
    <>
      <h1>食メモ新規作成</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <MealForm
            dishImages={dishImages}
            sceneLabelAndValues={sceneLabelAndValues}
            onChangeDishFiles={onChangeDishFiles}
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isAPIRequesting}
          >
            投稿
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default NewMeal;
