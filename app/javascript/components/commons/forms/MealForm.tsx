import React, { useEffect, useState, useRef, useMemo } from "react"
import { useFormContext, useFieldArray } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { faFileImage } from '@fortawesome/free-regular-svg-icons'
import { Accordion } from 'react-bootstrap';

import { MealWithDishes, sceneLabelAndValues } from "~/types/meals";

export type FormInputs = MealWithDishes

const TagForm: React.VFC<{}> = () => {
  const { register, control, getValues } = useFormContext<FormInputs>();
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "tags", // unique name for your Field Array
    keyName: 'key'
  });
  return (
    <>
      {fields.map((field, index) => {
        return (
          <>
            <input
              className="form-control"
              type="text"
              placeholder="タグ名"
              {...register(`tags.${index}.name` as const)}
            />
            <button type="button" onClick={() => remove(index)}>×</button>
          </>
        );
      })}
      <button type="button" onClick={() => append({})}>＋</button>
    </>
  )
}

const Thumbnail: React.VFC<{ file?: File, defaultImageUrl?: string }> = ({ file, defaultImageUrl }) => {
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
const ImageInput: React.VFC<ImageInputProps> = ({ file, thumbnailImageUrl, isInitialOpenCamera, onChangeDishFile, setIsInitialAddDish }) => {
  const fileInputRef = useRef();
  const labelRef = useRef();
  useEffect(() => {
    if (isInitialOpenCamera && thumbnailImageUrl === undefined) {
      fileInputRef.current.click();
      setIsInitialAddDish(false);
    }
  }, [])

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (thumbnailImageUrl === undefined) {
      labelRef.current.scrollIntoView({ block: 'center' });
    }
    onChangeDishFile(event);
  }
  return <>
    <label className="form-label" ref={labelRef}>写真(5メガまで)</label>
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
// 5メガ制限
// const SIZE_LIMIT = 1024 * 1024 * 5;
const SIZE_LIMIT = 1024 * 1024 * 5;
const MealForm: React.VFC<Props> = ({ dishImages, sceneLabelAndValues, isInitialAddDish: propIsInitialAddDish = false, onChangeDishFiles }) => {
  const { register, control, getValues } = useFormContext<FormInputs>();
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
    else {
      const file = event.target.files[0]
      if (file.size > SIZE_LIMIT) {
        return alert(`画像サイズは5MB以下になります。(${Math.floor(file.size / 1024 / 1024 * 100) / 100}メガ)`);
      }
      files[index] = file
    }
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

  const isDefaultActiveMealDetail = useMemo(() => {
    const desc = getValues('description')
    const location = getValues('location')
    return (desc !== undefined && desc !== '') || (location !== undefined && location !== '')
  }, []);

  const isDefaultActiveDishDetailList = useMemo(() => {
    const dishValues = getValues('dishes');
    return dishValues.map((dish) => {
      const desc = dish.description
      return desc !== undefined && desc !== ''
    });
  }, []);

  return (
    <>
      <div className="mb-3">
        <label className="form-label">日付</label>
        <input
          className="form-control"
          type="date"
          {...register("eatenAt")}
        />
      </div>
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
      <Accordion className="mb-3 ckm-meal-form-accordion" defaultActiveKey={isDefaultActiveMealDetail ? 'meal-detail' : ''}>
        <Accordion.Item eventKey="meal-detail">
          <Accordion.Header>詳細を編集</Accordion.Header>
          <Accordion.Body>

            <div className="mb-3">
              <label className="form-label">タグ</label>
              <TagForm />
            </div>
            <div className="mb-3">
              <label className="form-label">説明・感想</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="おいしかった"
                {...register("description")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">場所</label>
              <input
                className="form-control"
                type="text"
                placeholder="居酒屋タベルバム"
                {...register("location")}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

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
            <Accordion className="mb-3 ckm-meal-form-accordion" defaultActiveKey={isDefaultActiveDishDetailList[index] ? 'dish-detail' : ''}>
              <Accordion.Item eventKey="dish-detail">
                <Accordion.Header>詳細を編集</Accordion.Header>
                <Accordion.Body>
                  {/* TODO: タグ追加 */}
                  <div className="mb-3">
                    <label className="form-label">食べ物説明・感想</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="ジューシーだった"
                      {...register(`dishes.${index}.description` as const)}
                    />
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div className="d-flex">
              <button type="button" onClick={() => removeHandler(index)}
                className="btn btn-danger ms-auto">
                食べ物を削除
              </button>
            </div>
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
      <div className="d-grid gap-1 col-5 mx-auto">
        <button
          type="button"
          onClick={appendHandler}
          className="btn btn-success"
        >
          食べ物を追加
        </button>
      </div>
    </>
  )
}

export default MealForm
