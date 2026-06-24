import { Controller, useFormContext, type FieldError as RHFFieldError } from "react-hook-form"
import type { Question } from "@/lib/brief-schemas/question"
import type { Locale } from "@/lib/brief-schemas/locale"
import {
  Field,
  Input,
  Textarea,
  Label,
  FieldHelper,
  FieldError,
} from "@/components/ui/field"
import { Choice, ChoiceGroup } from "@/components/ui/choice"
import { NativeSelect } from "@/components/ui/native-select"
import { FileLinks } from "@/components/ui/file-links"
import { getDict } from "@/lib/i18n"

type Props = { question: Question; locale: Locale }

export function QuestionField({ question, locale }: Props) {
  const t = getDict(locale)
  const { register, formState, control } = useFormContext()

  if (question.type === "heading") {
    return (
      <h3 className="font-mono text-lg font-bold text-primary border-b border-border pb-2 mt-4">
        {question.content}
      </h3>
    )
  }

  const error = formState.errors[question.id] as RHFFieldError | undefined
  const errorMessage = error?.message as string | undefined
  const id = `q-${question.id}`

  switch (question.type) {
    case "short_text":
      return (
        <Field>
          <Label htmlFor={id} required={question.required}>
            {question.label}
          </Label>
          {question.helper ? <FieldHelper>{question.helper}</FieldHelper> : null}
          <Input
            id={id}
            placeholder={question.placeholder}
            maxLength={question.max_length}
            aria-invalid={Boolean(errorMessage)}
            {...register(question.id)}
          />
          <FieldError>{errorMessage}</FieldError>
        </Field>
      )

    case "long_text":
      return (
        <Field>
          <Label htmlFor={id} required={question.required}>
            {question.label}
          </Label>
          {question.helper ? <FieldHelper>{question.helper}</FieldHelper> : null}
          <Textarea
            id={id}
            placeholder={question.placeholder}
            maxLength={question.max_length}
            rows={5}
            aria-invalid={Boolean(errorMessage)}
            {...register(question.id)}
          />
          <FieldError>{errorMessage}</FieldError>
        </Field>
      )

    case "url":
      return (
        <Field>
          <Label htmlFor={id} required={question.required}>
            {question.label}
          </Label>
          {question.helper ? <FieldHelper>{question.helper}</FieldHelper> : null}
          <Input
            id={id}
            type="url"
            inputMode="url"
            placeholder={question.placeholder ?? "https://"}
            aria-invalid={Boolean(errorMessage)}
            {...register(question.id)}
          />
          <FieldError>{errorMessage}</FieldError>
        </Field>
      )

    case "email":
      return (
        <Field>
          <Label htmlFor={id} required={question.required}>
            {question.label}
          </Label>
          {question.helper ? <FieldHelper>{question.helper}</FieldHelper> : null}
          <Input
            id={id}
            type="email"
            inputMode="email"
            placeholder={question.placeholder}
            aria-invalid={Boolean(errorMessage)}
            {...register(question.id)}
          />
          <FieldError>{errorMessage}</FieldError>
        </Field>
      )

    case "select":
      return (
        <Field>
          <Label htmlFor={id} required={question.required}>
            {question.label}
          </Label>
          {question.helper ? <FieldHelper>{question.helper}</FieldHelper> : null}
          <NativeSelect
            id={id}
            defaultValue=""
            aria-invalid={Boolean(errorMessage)}
            {...register(question.id)}
          >
            <option value="" disabled>
              {t.form.selectPlaceholder}
            </option>
            {question.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </NativeSelect>
          <FieldError>{errorMessage}</FieldError>
        </Field>
      )

    case "radio":
      return (
        <div className="flex flex-col gap-1.5">
          <ChoiceGroup legend={question.label} required={question.required}>
            {question.helper ? <FieldHelper>{question.helper}</FieldHelper> : null}
            {question.options.map((opt) => (
              <Choice
                key={opt.value}
                type="radio"
                value={opt.value}
                label={opt.label}
                {...register(question.id)}
              />
            ))}
          </ChoiceGroup>
          <FieldError>{errorMessage}</FieldError>
        </div>
      )

    case "multi_select":
    case "checkbox_group":
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue={[]}
          render={({ field }) => {
            const values: string[] = Array.isArray(field.value) ? field.value : []
            function toggle(value: string, on: boolean) {
              field.onChange(
                on ? [...values, value] : values.filter((v) => v !== value),
              )
            }
            return (
              <div className="flex flex-col gap-1.5">
                <ChoiceGroup legend={question.label} required={question.required}>
                  {question.helper ? (
                    <FieldHelper>{question.helper}</FieldHelper>
                  ) : null}
                  {question.options.map((opt) => (
                    <Choice
                      key={opt.value}
                      type="checkbox"
                      checked={values.includes(opt.value)}
                      onChange={(e) => toggle(opt.value, e.target.checked)}
                      label={opt.label}
                    />
                  ))}
                </ChoiceGroup>
                <FieldError>{errorMessage}</FieldError>
              </div>
            )
          }}
        />
      )

    case "file_links":
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Field>
              <Label required={question.required}>{question.label}</Label>
              {question.helper ? (
                <FieldHelper>{question.helper}</FieldHelper>
              ) : null}
              <FileLinks
                value={Array.isArray(field.value) ? field.value : []}
                onChange={field.onChange}
                placeholder={question.placeholder ?? t.form.fileLinks.placeholder}
                ariaInvalid={Boolean(errorMessage)}
                addLabel={t.form.fileLinks.add}
                removeLabel={t.form.fileLinks.remove}
              />
              <FieldError>{errorMessage}</FieldError>
            </Field>
          )}
        />
      )
  }
}
