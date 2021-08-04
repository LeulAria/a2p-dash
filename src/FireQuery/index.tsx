import React, {
  Suspense, createContext, lazy, useEffect, useReducer,
} from 'react';
import { fireReducer } from './FireQuery/reducers';
import LoadingDevtools from './FireQuery/DevTool/LoadingDevtools';

export * from './FireQuery/hooks';

const DevTool = lazy(() => import('./FireQuery/DevTool'));

const initialState: any = {
  devtools: false,
  firebase: null,
  querys: [],
};

export const FireQueryContext = createContext(initialState);

interface IProps {
  devtools?: boolean;
  children?: JSX.Element | JSX.Element[];
  firebase: any;
}

const FireQueryProvider: React.FC<IProps> = ({
  devtools = false,
  children,
  firebase,
}) => {
  const [firequery, dispatch] = useReducer(fireReducer, [], () => {
    const localData = localStorage.getItem('firequery');
    return localData ? { ...JSON.parse(localData), firebase } : initialState;
  });

  useEffect(() => {
    dispatch({ type: 'INIT', devtools, firebase });
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'firequery',
      JSON.stringify({
        devtools: firequery.devtools,
        querys: firequery.querys,
      }),
    );
  }, [firequery]);

  return (
    <div>
      {firequery.devtools && (
        <Suspense fallback={<LoadingDevtools />}>
          <DevTool data={[]} />
        </Suspense>
      )}
      <FireQueryContext.Provider value={{ firequery, dispatch }}>
        {children}
      </FireQueryContext.Provider>
    </div>
  );
};

export default FireQueryProvider;
