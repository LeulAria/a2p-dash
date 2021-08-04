import firebase from 'firebase/app';
import 'firebase/firestore';

import {
  useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import { FireQueryContext } from '../../../index';

export const useFireQueryData = <T>(
  collectionNameArg: string,
  id?: string,
  snapshotListener?: boolean,
) => {
  type CollectionName = {
    collectionName: string;
  };

  interface QueryDataStates {
    loading: boolean;
    data: T | any | null;
    error: firebase.firestore.FirestoreError | string | null;
  }

  const {
    firequery: { firebase },
  } = useContext(FireQueryContext);
  const [collectionName, setCollectionName] = useState('');
  const collectionNameRef = useRef<CollectionName>({ collectionName });

  const [querDataStates, setQuerDataStates] = useState<QueryDataStates>({
    loading: false,
    data: null,
    error: null,
  });

  const resetQueryDataStates = () => {
    setQuerDataStates({
      loading: false,
      data: null,
      error: null,
    });
  };

  const setQueryDataError = (err: firebase.firestore.FirestoreError | string) => {
    setQuerDataStates({
      loading: false,
      data: null,
      error: err,
    });
  };

  const fetchGet = ($ref: firebase.firestore.DocumentReference) => {
    resetQueryDataStates();
    if ($ref) {
      $ref.get().then(
        (doc) => {
          if (doc) {
            const data = { id: doc.id, ...doc.data() };
            setQuerDataStates({
              loading: false,
              data,
              error: null,
            });
          } else {
            setQuerDataStates({
              loading: false,
              data: null,
              error: null,
            });
          }
        },
        (err) => {
          setQueryDataError(err);
        },
      );
    } else {
      setQueryDataError('Refecence not profided to query.');
    }
  };

  const fetchSnapshot = ($ref: firebase.firestore.DocumentReference) => {
    resetQueryDataStates();
    if ($ref) {
      $ref.onSnapshot(
        (doc) => {
          if (doc) {
            const data = { id: doc.id, ...doc.data() };
            setQuerDataStates({
              loading: false,
              data,
              error: null,
            });
          } else {
            setQuerDataStates({
              loading: false,
              data: null,
              error: null,
            });
          }
        },
        (err) => {
          setQueryDataError(err);
        },
      );
    } else {
      setQueryDataError('Refecence not profided to query snapshots.');
    }
  };

  const fetchDataAsync = useCallback(
    async (id: string, snapshotListener?: boolean) => {
      if (firebase) {
        resetQueryDataStates();
        const { collectionName } = collectionNameRef.current;

        if (id) {
          const $ref = firebase.firestore().collection(collectionName).doc(id);
          return new Promise((res, rej) => {
            $ref.get().then(
              (doc: any) => {
                if (doc) {
                  const data = { id: doc.id, ...doc.data() };
                  setQuerDataStates({
                    loading: false,
                    data,
                    error: null,
                  });
                  res(data);
                }
              },
              (err: any) => {
                setQueryDataError(err);
                setQuerDataStates({
                  loading: false,
                  data: null,
                  error: err,
                });
                rej(err);
              },
            );
          });
        }
        setQueryDataError('Id not provided to query data.');
      } else {
        setQueryDataError('Firebase instance not found...');
      }
    },
    [collectionName],
  );

  const refetch = useCallback(
    (id: string, snapshotListener?: boolean) => {
      if (firebase) {
        resetQueryDataStates();
        const { collectionName } = collectionNameRef.current;

        const $ref = firebase.firestore().collection(collectionName).doc(id);

        if (snapshotListener) {
          fetchSnapshot($ref);
        } else {
          fetchGet($ref);
        }
      } else {
        setQueryDataError('Firebase instance not found...');
      }
    },
    [collectionName],
  );

  useEffect(() => {
    if (firebase) {
      setCollectionName(collectionNameArg);
      collectionNameRef.current = { collectionName: collectionNameArg };

      const $ref = firebase.firestore().collection(collectionNameArg).doc(id);
      if (snapshotListener) {
        fetchSnapshot($ref);
      } else {
        fetchGet($ref);
      }
    } else {
      setQueryDataError('Firebase instance not found...');
    }
  }, []);

  return { ...querDataStates, refetch, fetchDataAsync };
};
