import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useFireQuery } from '../../FireQuery';
import CmsForm from './CmsForm';

const index = () => {
  const { data, loading } = useFireQuery("cms");

  return (
    <div>
      {
        loading ? <CircularProgress /> : <CmsForm data={data ? data[0] : {}} />
      }
    </div>
  );
};

export default index;
