import { updateObj } from './utils'

export const createFormElementObj = (
  type, label, setupObj, value, selectOptions, rules, isValid, uiGrid,
) => {
  const elObj = {}

  elObj.elementType = type
  elObj.elementLabel = label
  elObj.elementSetup = setupObj
  elObj.value = value
  elObj.elementOptions = selectOptions
  elObj.validtationRules = rules
  elObj.isValid = isValid
  elObj.touched = false
  elObj.errorMessage = null
  elObj.grid = uiGrid

  return elObj
}

const validateEmail = email => {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return reg.test(email)
}

const validateNumbers = str => {
  const reg = /^\d+$/
  return reg.test(str)
}

const validityCheck = (inputValue, rules) => {
  let isValid = true
  let errorMessage = null
  const value = Number.isInteger(inputValue) ? inputValue : inputValue.trim()

  if (rules.required && isValid) {
    isValid = value !== ''
    errorMessage = !isValid ? 'This field is required' : null
  }

  if (rules.maxLength && isValid) {
    isValid = value.length <= rules.maxLength
    errorMessage = !isValid ? `Max length is ${rules.maxLength} characters` : null
  }

  if (rules.minLength && isValid) {
    isValid = value.length >= rules.minLength
    errorMessage = !isValid ? `Min length is ${rules.minLength} characters` : null
  }

  if (rules.email && isValid) {
    isValid = validateEmail(value.toLowerCase())
    errorMessage = !isValid ? 'Please provid a valid email address' : null
  }

  if (rules.onlyNumber && isValid) {
    isValid = validateNumbers(value)
    errorMessage = !isValid ? 'Only numbers are allowed' : null
  }

  if (rules.matchField && isValid) {
    isValid = value === document.querySelector(`input[name=${rules.matchField}]`).value
    errorMessage = !isValid ? `Must match ${rules.matchField} field` : null
  }

  return {
    isValid,
    errorMessage,
  }
}

export const adjustFormValues = (formState, event, key) => {
  const adjustedForm = {
    ...formState,
  }

  const value = event.type === 'change' ? event.target.value : event

  if (key) {
    adjustedForm[key] = updateObj(adjustedForm[key], {
      touched: true,
      value,
      isValid: validityCheck(value, adjustedForm[key].validtationRules).isValid,
      errorMessage: validityCheck(
        value, adjustedForm[key].validtationRules,
      ).errorMessage,
    })
  } else {
    Object.keys(adjustedForm).map(formKey => {
      const dbValue = value[formKey] || ''
      adjustedForm[formKey] = updateObj(adjustedForm[formKey], {
        value: dbValue,
        isValid: validityCheck(dbValue, adjustedForm[formKey].validtationRules).isValid,
        errorMessage: validityCheck(
          dbValue, adjustedForm[formKey].validtationRules,
        ).errorMessage,
      })
      return true
    })
  }

  const formValidArray = Object.keys(adjustedForm).map(fieldName => adjustedForm[fieldName].isValid)

  const formValid = !formValidArray.includes(false)

  return {
    adjustedForm,
    formValid,
  }
}

export const createFormValuesObj = stateForm => Object.assign({}, ...(
  Object.keys(stateForm).map(fieldName => ({
    [fieldName]: stateForm[fieldName].value,
  }))
))
