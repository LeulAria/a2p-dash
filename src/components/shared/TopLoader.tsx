import React, { useEffect, useRef } from 'react';

import LoadingBar from 'react-top-loading-bar';

const TopLoader = () => {
  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current.continuousStart();
  }, []);

  return <LoadingBar color="#56B" ref={ref} shadow />;
};

export default TopLoader;
