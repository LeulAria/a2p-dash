import React from 'react';
import { DesignSystem, Schema } from "../../../types"
import TextWidgets from '../../widgets/TextWidgets'
import RadioWidgets from '../../widgets/RadioWidgets'
import CheckWidgets from '../../widgets/CheckWidgets'
import SelectWidgets from '../../widgets/SelectWidgets'
import SliderWidgets from '../../widgets/SliderWidgets'
import SwitchWidgets from '../../widgets/SwitchWidgets'
import CustomWidgets from '../../widgets/CustomWidgets'
import AutoCompleteWidgets from '../../widgets/AutoCompleteWidgets'
import { UseFormReturn, FieldValues } from 'react-hook-form';

interface Props {
  schema: Schema;
  zionForm: UseFormReturn<FieldValues>;
  designSystem: DesignSystem;
}

export const RenderWidget: React.FC<Props> = ({ schema, zionForm, designSystem }) => {
  switch (schema.widget) {
    case "text":
      return (<TextWidgets schema={schema} zionForm={zionForm} designSystem={designSystem} />)
    case "select":
      return <SelectWidgets schema={schema} zionForm={zionForm} designSystem={designSystem} />
    case "radio":
      return <RadioWidgets schema={schema} zionForm={zionForm} designSystem={designSystem} />
    case "autocomplete":
      return <AutoCompleteWidgets schema={schema} zionForm={zionForm} designSystem={designSystem} />
    case "slider":
      return <SliderWidgets schema={schema} zionForm={zionForm} designSystem={designSystem} />
    case "check":
      return <CheckWidgets schema={schema} zionForm={zionForm} designSystem={designSystem} />
    case "switch":
      return <SwitchWidgets schema={schema} zionForm={zionForm} designSystem={designSystem} />
    case "custom":
      return <CustomWidgets schema={schema} zionForm={zionForm} designSystem={designSystem} />
    default:
      return <></>
  }
}