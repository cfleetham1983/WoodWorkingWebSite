import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import StyledButton from "./StyledButton";

export type QuestionType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox";

export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  defaultValue?: string | number | boolean;
  options?: QuestionOption[];
}

export type FormValues = Record<string, string | number | boolean>;

type ModalFormProps = {
  open: boolean;
  title: string;
  questions: Question[];
  submitLabel?: string;
  cancelLabel?: string;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
};

function buildInitialValues(questions: Question[]): FormValues {
  return questions.reduce<FormValues>((acc, question) => {
    if (question.defaultValue !== undefined) {
      acc[question.id] = question.defaultValue;
      return acc;
    }

    if (question.type === "checkbox") {
      acc[question.id] = false;
      return acc;
    }

    acc[question.id] = "";
    return acc;
  }, {});
}

export default function ModalForm({
  open,
  title,
  questions,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  onClose,
  onSubmit,
}: ModalFormProps) {
  const initialValues = useMemo(() => buildInitialValues(questions), [questions]);
  const [values, setValues] = useState<FormValues>(initialValues);

  useEffect(() => {
    if (open) {
      setValues(initialValues);
    }
  }, [initialValues, open]);

  const setValue = (id: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const renderQuestion = (question: Question) => {
    const value = values[question.id];
    const commonTextFieldProps = {
      fullWidth: true,
      label: question.label,
      required: question.required,
      placeholder: question.placeholder,
      helperText: question.helperText,
      value: typeof value === "boolean" ? "" : value,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setValue(question.id, event.target.value),
    };

    switch (question.type) {
      case "textarea":
        return (
          <TextField
            key={question.id}
            {...commonTextFieldProps}
            multiline
            minRows={3}
          />
        );
      case "select":
        return (
          <TextField key={question.id} {...commonTextFieldProps} select>
            {(question.options ?? []).map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      case "radio":
        return (
          <FormControl key={question.id} required={question.required}>
            <FormLabel>{question.label}</FormLabel>
            <RadioGroup
              value={String(value ?? "")}
              onChange={(event) => setValue(question.id, event.target.value)}
            >
              {(question.options ?? []).map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case "checkbox":
        return (
          <FormControlLabel
            key={question.id}
            control={
              <Checkbox
                checked={Boolean(value)}
                onChange={(event) => setValue(question.id, event.target.checked)}
              />
            }
            label={question.label}
          />
        );
      case "email":
      case "tel":
      case "number":
      case "text":
      default:
        return (
          <TextField
            key={question.id}
            {...commonTextFieldProps}
            type={question.type}
          />
        );
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          {questions.map(renderQuestion)}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <StyledButton
              name={cancelLabel}
              variant="ghost"
              type="button"
              onClick={onClose}
            />
            <StyledButton name={submitLabel} variant="filled" type="submit" />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
