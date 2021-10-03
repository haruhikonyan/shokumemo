import React, { useEffect, useState, useRef, createRef } from "react"
import { useFormContext, useFieldArray } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { faFileImage } from '@fortawesome/free-regular-svg-icons'

import { MealWithDishes, sceneLabelAndValues } from "~/types/meals";

export type FormInputs = MealWithDishes

const Thumbnail: React.VFC<{file?: File, defaultImageUrl?: string}> = ({file, defaultImageUrl}) => {
  const [imageUrl, setImageUrl] = useState<string>(defaultImageUrl)
  useEffect(() => {
    if (file !== undefined) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        setImageUrl(e.target.result)
      }
      reader.readAsDataURL(file)
    }
    else {
      setImageUrl(defaultImageUrl)
    }
  }, [file, defaultImageUrl])
  
  return imageUrl !== undefined ? <img src={imageUrl} className="img-fluid" /> : null
}

type ImageInputProps = {
  file?: File;
  thumbnailImageUrl?: string;
  isInitialOpenCamera: boolean;
  onChangeDishFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIsInitialAddDish: (isInitialAddDish: boolean) => void;
}
const ImageInput: React.VFC<ImageInputProps> = ({file, thumbnailImageUrl, isInitialOpenCamera, onChangeDishFile, setIsInitialAddDish}) => {
  const fileInputRef = useRef();
  const labelRef = useRef();
  useEffect(() => {
    if (isInitialOpenCamera && thumbnailImageUrl === undefined ) {
      fileInputRef.current.click();
      setIsInitialAddDish(false);
    }
  }, [])

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (thumbnailImageUrl === undefined ) {
      labelRef.current.scrollIntoView({block: 'center'});
    }
    onChangeDishFile(event);
  }
  return <>
    <label className="form-label" ref={labelRef}>写真</label>
    <label className="form-label ms-2">
      <input
        className="d-none"
        type="file"
        accept="image/*"
        capture="camera"
        onChange={(e) => fileChangeHandler(e)}
        ref={fileInputRef}
      />
      <FontAwesomeIcon icon={faCamera} size="2x" />
    </label>

    <label className="form-label ms-2">
      <input
        className="d-none"
        type="file"
        accept="image/*"
        onChange={(e) => fileChangeHandler(e)}
      />
      <FontAwesomeIcon icon={faFileImage} size="2x" />
    </label>
    <Thumbnail file={file} defaultImageUrl={thumbnailImageUrl} />
  </>
}

type Props = {
  dishImages: (File | undefined)[];
  sceneLabelAndValues: sceneLabelAndValues;
  isInitialAddDish?: boolean;
  onChangeDishFiles: (files: (File | undefined)[]) => void
}
const MealForm: React.VFC<Props> = ({dishImages, sceneLabelAndValues, isInitialAddDish: propIsInitialAddDish = false, onChangeDishFiles}) => {
  const { register, control } = useFormContext<FormInputs>();
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "dishes", // unique name for your Field Array
    keyName: 'key'
  });

  const onChangeDishFile = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = [...dishImages]
    if (event.target.files == null || event.target.files.length === 0) {
      files[index] = undefined
    }
    const file = event.target.files[0]
    files[index] = file
    onChangeDishFiles(files)
  }

  const appendHandler = () => {
    append({
      title: '',
      description: '',
    })
    onChangeDishFiles([...dishImages, undefined])
  }

  const removeHandler = (index: number) => {
    remove(index)
    const files = [...dishImages]
    files.splice(index, 1)
    onChangeDishFiles(files)
  }
  
  const [isInitialAddDish, setIsInitialAddDish] = useState(propIsInitialAddDish)

  useEffect(() => {
    if (isInitialAddDish) {
      appendHandler();
    }
  }, [])

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
        <label className="form-label">種別</label>
        <select className="form-control" {...register("scene", { required: true })}>
          {
            sceneLabelAndValues.map(([label, value]) => {
              return <option key={value} value={value}>{label}</option>
            })
          }
        </select>
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
          <div className="border p-3 mb-3" key={field.key}>
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
              <ImageInput
                file={dishImages?.[index]}
                thumbnailImageUrl={field.thumbnailImageUrl}
                isInitialOpenCamera={isInitialAddDish && (fields.length - 1) === index}
                onChangeDishFile={(e) => onChangeDishFile(e, index)}
                setIsInitialAddDish={setIsInitialAddDish}
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
            <button type="button" onClick={() => removeHandler(index)}
              className="btn btn-danger">
              食べ物を削除
            </button>
          </div>
        );
      })}
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="is-private"
            {...register('isPrivate')}
          />
          <label className="custom-control-label" htmlFor="is-private">
            非公開
          </label>
        </div>
      </div>
      <button
        type="button"
        onClick={appendHandler}
        className="btn btn-success"
      >
        食べ物を追加
      </button>
    </>
  )
}

export default MealForm
