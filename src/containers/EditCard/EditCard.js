import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import axios from 'axios'

import {
  Button, CircularProgress, Paper, Typography, Grid, Box,
} from '@material-ui/core'

import FormElement from '../../components/Ui/FormElement'

import { editCardStyles } from './styles'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { getCardById, updateCard } from '../../API/cards'

import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'

const EditCard = ({ onSetNotification }) => {
  const { cardId } = useParams()
  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [picture, setPicture] = useState(null)
  const classes = editCardStyles()
  const language = useLanguage()

  const [cardForm, setCardForm] = useState({
    cardId: createFormElementObj('input', 'Order', { type: 'text', name: 'order', placeholder: 'Card Order' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    name: createFormElementObj('input', 'Name', { type: 'text', name: 'name', placeholder: 'Card Name' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    fullMeaning: createFormElementObj('textarea', 'Description', { type: 'text', name: 'fullMeaning', placeholder: 'Description' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    summary: createFormElementObj('textarea', 'Meaning', { type: 'text', name: 'summary', placeholder: 'Meaning' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    summaryReversed: createFormElementObj('textarea', 'Meaning Reversed', { type: 'text', name: 'summaryReversed', placeholder: 'Meaning Reversed' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    advice: createFormElementObj('textarea', 'Advice', { type: 'text', name: 'advice', placeholder: 'Advice' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    adviceReversed: createFormElementObj('textarea', 'Advice Reversed', { type: 'text', name: 'adviceReversed', placeholder: 'Advice Reversed' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    upright: createFormElementObj('tags', 'Upright', { type: 'text', name: 'upright', placeholder: 'Add tags' }, null, null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    reversed: createFormElementObj('tags', 'Reversed', { type: 'text', name: 'reversed', placeholder: 'Add tags' }, null, null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    nameAr: createFormElementObj('input', 'الاسم', { type: 'text', name: 'nameAr', placeholder: 'الاسم' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    fullMeaningAr: createFormElementObj('textarea', 'الوصف', { type: 'text', name: 'fullMeaningAr', placeholder: 'الوصف' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    summaryAr: createFormElementObj('textarea', 'المعنى', { type: 'text', name: 'summaryAr', placeholder: 'المعنى' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    summaryReversedAr: createFormElementObj('textarea', 'المعنى معكوس', { type: 'text', name: 'summaryReversedAr', placeholder: 'المعنى معكوس' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    adviceAr: createFormElementObj('textarea', 'النصيحة', { type: 'text', name: 'adviceAr', placeholder: 'النصيحة' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    adviceReversedAr: createFormElementObj('textarea', 'النصيحة معكوس', { type: 'text', name: 'adviceReversedAr', placeholder: 'النصيحة معكوس' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    uprightAr: createFormElementObj('tags', 'مستقيم', { type: 'text', name: 'uprightAr', placeholder: 'اضف اشارة' }, null, null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    reversedAr: createFormElementObj('tags', 'معكوس', { type: 'text', name: 'reversedAr', placeholder: 'اضف اشارة' }, null, null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    image: createFormElementObj('imageUpload', 'Image', { name: 'image', placeholder: 'Image' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    positivityIndex: createFormElementObj('slider', 'Positivity index', { name: 'positivityIndex', placeholder: 'Positivity index' }, 0, null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    type: createFormElementObj('select', 'Order', { name: 'order' }, '', [
      { value: 'major', display: 'Major arcana' },
      { value: 'wands', display: 'Wands' },
      { value: 'swords', display: 'Swords' },
      { value: 'cups', display: 'Cups' },
      { value: 'pentacles', display: 'Pentacles' },
    ], { required: true }, false, {
      xs: 12,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      fullWidth: true,
    }),
  })

  useEffect(() => {
    let mounted = true
    setLoading(true)

    if (mounted) {
      (async () => {
        const data = await getCardById(cardId)
        const adjustedForm = await adjustFormValues(cardForm, data, null)
        setCardForm(prevForm => ({ ...prevForm, ...adjustedForm.adjustedForm }))
        setFormValid(adjustedForm.formValid)
        setLoading(false)
      })()
    }

    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId])

  const updateCardHandler = async e => {
    e.preventDefault()
    setLoading(true)
    const cardDetails = createFormValuesObj(cardForm)
    let pictureFile = null
    let pictureUpluadResult
    if (picture) {
      pictureFile = new FormData()
      pictureFile.append('file', picture)
    }
    try {
      if (pictureFile) {
        pictureUpluadResult = await axios.post('http://localhost:8000/upload', pictureFile)
        cardDetails.image = pictureUpluadResult.data.filename
      }
      await updateCard(cardId, cardDetails)
      setLoading(false)
      onSetNotification({
        message: language.languageVars.notifications.updateCardSuccess,
        type: 'success',
      })
    } catch (err) {
      onSetNotification({
        message: language.languageVars.notifications.updateCardFail,
        type: 'error',
      })
    }
  }

  const inputChangeHandler = (e, key) => {
    let changeEvent

    if (e[0] instanceof File) {
      changeEvent = e[0].name
      setPicture(e[0]);
    } else if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }
    const adjustedForm = adjustFormValues(cardForm, changeEvent, key)
    setCardForm(adjustedForm.adjustedForm)
    setFormValid(adjustedForm.formValid)
    setFormTouched(true)
  }

  const loadForm = () => {
    const form = Object.keys(cardForm).map((formEl, i) => (
      <Grid item xs={12} key={formEl + i}>
        <Box mb={3}>
          <FormElement
            elementType={cardForm[formEl].elementType}
            label={cardForm[formEl].elementLabel}
            value={cardForm[formEl].value}
            elementOptions={cardForm[formEl].elementOptions}
            touched={cardForm[formEl].touched}
            valid={cardForm[formEl].isValid}
            errorMessage={cardForm[formEl].errorMessage}
            shouldValidate={cardForm[formEl].validtationRules}
            elementSetup={cardForm[formEl].elementSetup}
            changed={e => inputChangeHandler(e, formEl)}
            grid={cardForm[formEl].grid}
            disabled={loading}
          />
        </Box>
      </Grid>
    ))

    return form
  }

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper} square elevation={0}>
        <>
          <Typography component="h1" variant="h4" align="center">
            {language.languageVars.titles.editCard}
          </Typography>
          <form>
            <Grid container spacing={3}>
              {loadForm()}
              <Button
                color="secondary"
                onClick={e => updateCardHandler(e)}
                disabled={!formValid || loading || !formTouched}
                className={classes.editCardButton}
                classes={{
                  disabled: classes.editCardButtonDisabled,
                }}
              >
                {language.languageVars.buttons.editCard}
              </Button>
              {loading && <CircularProgress size={20} />}
            </Grid>
          </form>
        </>
      </Paper>
    </main>
  )
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

EditCard.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(EditCard)
