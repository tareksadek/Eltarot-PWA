import React from 'react'

import PropTypes from 'prop-types'

import ImageUploader from 'react-images-upload'

import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Grid from '@material-ui/core/Grid'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import ChipInput from 'material-ui-chip-input'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

import * as vars from '../../utilities/appVars'

import { formStyles } from './styles'

const FormElement = ({
  valid,
  shouldValidate,
  touched,
  errorMessage,
  value,
  changed,
  elementSetup,
  label,
  elementOptions,
  elementType,
  grid,
  disabled,
}) => {
  const classes = formStyles()
  const createSelectOptions = opts => opts.map((opt, i) => <option key={opt + i} value={opt.value}>{opt.display}</option>)

  let inputEl = null
  let chipsArray = []
  const inputClasses = !valid && shouldValidate && touched ? `${classes.inputEl} ${classes.Invalid}` : classes.inputEl

  switch (elementType) {
    case ('textarea'):
      inputEl = (
        <TextField
          className={inputClasses}
          label={label}
          multiline
          rowsMax={4}
          value={value}
          onChange={changed}
          error={!valid}
          helperText={errorMessage}
          disabled={disabled}
          fullWidth={grid.fullWidth}
          {...elementSetup}
        />
      )
      break
    case ('textarea-auto-size'):
      inputEl = (
        <TextareaAutosize
          className={inputClasses}
          label={label}
          multiline
          rowsMin={4}
          value={value}
          onChange={changed}
          error={!valid}
          helperText={errorMessage}
          disabled={disabled}
          fullWidth={grid.fullWidth}
          {...elementSetup}
        />
      )
      break
    case ('select'):
      inputEl = (
        <>
          <InputLabel htmlFor={elementSetup.name}>{label}</InputLabel>
          <Select
            native
            error={!valid}
            value={value}
            onChange={changed}
            fullWidth={grid.fullWidth}
            disabled={disabled}
            inputProps={{
              name: elementSetup.name,
              id: elementSetup.name,
            }}
          >
            <option aria-label="None" value="" />
            {createSelectOptions(elementOptions)}
          </Select>
          <FormHelperText>{errorMessage}</FormHelperText>
        </>
      )
      break
    case ('autoComplete'):
      inputEl = (
        <Autocomplete
          multiple
          id="tags-standard"
          options={elementOptions}
          getOptionLabel={tag => tag.title}
          defaultValue={value}
          renderInput={params => (
            <TextField
              {...params}
              variant="standard"
              label="Multiple values"
              placeholder="Favorites"
              fullWidth={grid.fullWidth}
              disabled={disabled}
            />
          )}
        />
      )
      break
    case ('tags'):
      chipsArray = value
      if (typeof value === 'string') {
        chipsArray = value.split(',')
      }
      inputEl = (
        <>
          <ChipInput defaultValue={chipsArray} label={label} onChange={changed} error={!valid} />
          <FormHelperText>{errorMessage}</FormHelperText>
        </>
      )
      break
    case ('imageUpload'):
      inputEl = (
        <>
          <ImageUploader
            {...elementSetup}
            withIcon
            withPreview
            singleImage
            onChange={changed}
            imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
            maxFileSize={5242880}
          />
          {!touched && <img src={`${vars.CARDS_IMAGES_DIRECTORY}/${value}`} alt={value} width="150" />}
        </>
      )
      break
    case ('slider'):
      inputEl = (
        <>
          <Typography id="discrete-slider" gutterBottom>
            {label}
          </Typography>
          <Slider
            value={parseInt(value, 10) || 0}
            aria-valuetext={value.toString()}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            step={10}
            onChange={(e, sliderValue) => changed(sliderValue)}
            marks
            min={0}
            max={100}
          />
        </>
      )
      break
    default:
      inputEl = (
        <TextField
          className={inputClasses}
          label={label}
          value={value}
          onChange={changed}
          error={!valid}
          helperText={errorMessage}
          fullWidth={grid.fullWidth}
          disabled={disabled}
          {...elementSetup}
        />
      )
      break
  }

  return (
    <Grid item xs={grid.xs} sm={grid.sm} md={grid.md} lg={grid.lg} xl={grid.xl}>
      <FormControl fullWidth={grid.fullWidth}>
        {inputEl}
      </FormControl>
    </Grid>
  )
}

FormElement.defaultProps = {
  valid: false,
  shouldValidate: null,
  touched: false,
  errorMessage: null,
  value: null,
  elementSetup: null,
  label: null,
  elementOptions: null,
  elementType: null,
  grid: null,
  disabled: false,
}

FormElement.propTypes = {
  valid: PropTypes.bool,
  shouldValidate: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  touched: PropTypes.bool,
  errorMessage: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  changed: PropTypes.func.isRequired,
  elementSetup: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ])),
  label: PropTypes.string,
  elementOptions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  elementType: PropTypes.string,
  grid: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ])),
  disabled: PropTypes.bool,
}

export default FormElement
