import { FieldValues, UseFormReturn } from "react-hook-form";

export class ZionValidation {
  zionForm: UseFormReturn<FieldValues> | null = null;
  rules: any = { validate: {} };

  constructor(zionForm: UseFormReturn<FieldValues>) {
    this.zionForm = zionForm
    return this
  }

  // string validations
  required(msg: string = "") {
    this.rules.required = msg ? msg : true;
    return this
  }

  minLength(length?: number, msg: string = "") {
    this.rules.minLength = {
      value: length,
      message: msg ? msg : ""
    }
    return this
  }

  maxLength(length?: number, msg: string = "") {
    this.rules.maxLength = {
      value: length,
      message: msg ? msg : ""
    }
    return this
  }

  max(length?: number, msg: string = "") {
    this.rules.max = {
      value: length,
      message: msg ? msg : ""
    }
    return this
  }

  min(length?: number, msg: string = "") {
    this.rules.min = {
      value: length,
      message: msg ? msg : ""
    }
    return this
  }

  email(msg: string = "") {
    this.rules.pattern = {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: msg ? msg : ""
    }
    return this
  }

  url(msg: string = "") {
    this.rules.pattern = {
      value: /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/,
      message: msg ? msg : ""
    };
    return this
  }

  lowercase(msg: string = "") {
    this.rules.validate.lowercase = (value: string) => (value === value.toLocaleLowerCase() || msg)
    return this
  }

  uppercase(msg: string = "") {
    this.rules.validate.uppercase = (value: string) => (value === value.toUpperCase() || msg)
    return this
  }
  capitalized(msg: string = "") {
    this.rules.validate.capitalized = (value: string) => (value || value[0] === (value[0].toUpperCase()) || msg)
    return this
  }

  // number
  number() {
    this.rules.valueAsNumber = true;
    return this
  }

  positive(msg: string = "") {
    this.rules.validate.positive = (v: any) => +v > 0 || msg
    return this
  }

  negative(msg: string = "") {
    this.rules.validate.negative = (value: string) => (+value < 0 || msg)
    return this
  }
  integer(msg: string = "") {
    this.rules.validate.integer = (value: string) => (+value >= 1 || msg)
    return this
  }
  zero(msg: string = "") {
    this.rules.validate.msg = (value: string) => (+value === 0 || msg)
    return this
  }
  greaterThan(field: string, msg: string = "") {
    this.rules.validate.greaterThan = (value: string) => (parseFloat(value) > parseFloat(this.zionForm?.getValues(field)) || msg)
    return this
  }
  lessThan(field: string, msg: string = "") {
    this.rules.validate.lessThan = (value: string) => (parseFloat(value) < parseFloat(this.zionForm?.getValues(field)) || msg)
    return this
  }
  equalNumber(field: string, msg: string = "") {
    this.rules.validate.equalNumber = (value: string) => (parseFloat(value) === parseFloat(this.zionForm?.getValues(field)) || msg)
    return this
  }
  equals(field: string, msg: string = "") {
    this.rules.validate.equals = (value: string) => (value === this.zionForm?.getValues(field) || msg)
    return this
  }
  date() {
    this.rules.valueAsDate = true;
    return this
  }

  // dateMin(dateToCompare: Date, msg: string= "") {
  //   this.rules.validate = (value: string) => (+value >= dateToCompare)
  //   return this
  // }
  // dateMax(dateToCompare: Date, msg: string= "") {
  //   this.rules.validate = (value: string) => (+value >= dateToCompare)
  //   return this
  // }

  setValueAs(callback: (value: any) => any) {
    this.rules.setValueAs = (v: any) => callback(v)
    return this
  }

  value(value: any) {
    this.rules.value = value
    return this
  }

  validate(validationName: string, callback: (value: any) => (string | undefined)) {
    this.rules.validate[validationName] = (v: any) => callback(v)
    return this
  }

  matches(regex: RegExp, msg: string = "") {
    this.rules.pattern = {
      value: regex,
      message: msg ? msg : ""
    }
    return this
  }
}