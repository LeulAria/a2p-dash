import React from 'react'
import { DesignSystem, ZionForm } from '../../../../types'
import { UseFormReturn, FieldValues } from 'react-hook-form';
import GirdSkeleton from './GirdSkeleton';
import StepFormSkeletonHorizontal from './StepFormSkeletonHorizontal';
import StepFormSkeletonVertical from './StepFormSkeletonVertical';

interface Props {
  form: ZionForm;
  zionForm: UseFormReturn<FieldValues>
  designSystem: DesignSystem;
}

const FormElementMUI: React.FC<Props> = ({ form, zionForm, designSystem }) => {
  const renderSkeleton = () => {
    switch (form?.skeleton) {
      case "grid":
        return <GirdSkeleton form={form} zionForm={zionForm} designSystem={designSystem} />
      case "step-form-horizontal":
        return <StepFormSkeletonHorizontal form={form} zionForm={zionForm} designSystem={designSystem} />
      case "step-form-vertical":
        return <StepFormSkeletonVertical form={form} zionForm={zionForm} designSystem={designSystem} />
      default:
        return <GirdSkeleton form={form} zionForm={zionForm} designSystem={designSystem} />
    }
  }

  return (
    <>
      {renderSkeleton()}
    </>
  )
}

export default FormElementMUI