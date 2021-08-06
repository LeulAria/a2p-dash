import firebase from "firebase/app";
import "firebase/firestore";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FireQueryContext } from "../../../index";

interface QueryConfig {
  query?: any;
  orderBy?: string[];
  startAt?: any;
  endAt?: any;
  limit?: number;
  paginateNext?: firebase.firestore.DocumentSnapshot | null;
  paginatePrev?: firebase.firestore.DocumentSnapshot | null;
  snapshotListener?: boolean;
}

export const useFireQuery = <T>(collectionNameArg: string, config?: QueryConfig) => {
  type CollectionName = {
    collectionName: string;
  };

  interface FireQueryStateType {
    loading: boolean;
    data: T[] | any | null;
    error: firebase.firestore.FirestoreError | string | null;
    firstSnapDoc: firebase.firestore.DocumentSnapshot | null;
    lastSnapDoc: firebase.firestore.DocumentSnapshot | null;
  }

  const {
    firequery: { firebase },
  } = useContext(FireQueryContext);

  const [collectionName, setCollectionName] = useState("");
  const collectionNameRef = useRef<CollectionName>({ collectionName });

  const [fireQueryStates, setFireQueryStates] = useState<FireQueryStateType>({
    loading: false,
    data: null,
    error: null,
    firstSnapDoc: null,
    lastSnapDoc: null,
  });

  const resetFireQueryState = () => {
    setFireQueryStates({
      loading: false,
      data: null,
      error: null,
      firstSnapDoc: null,
      lastSnapDoc: null,
    });
  };

  const setFireQueryStatesLoading = () => {
    setFireQueryStates({
      loading: true,
      data: null,
      error: null,
      firstSnapDoc: null,
      lastSnapDoc: null,
    });
  };

  const refQueryGenerator = (
    $ref: firebase.firestore.Query,
    config?: QueryConfig
  ) => {
    let $refEdited = $ref;

    if (config) {
      if (config.query) {
        config.query.forEach((q: any) => {
          const fc = q[0].trim().split(" ");
          if (fc[0] && fc[1] && q[1]) {
            $refEdited = $refEdited.where(fc[0], fc[1], q[1]);
          }
        });
      }
      if (config.orderBy) {
        config.orderBy.forEach((orders: string) => {
          const [orderBy, order] = orders.split(" ");
          if (order) {
            $refEdited = $refEdited.orderBy(
              orderBy,
              order === "desc" ? "desc" : "asc"
            );
          }
        });
      }
      if (config.startAt) {
        $refEdited = $refEdited.startAt(config.startAt);
      }
      if (config.endAt) {
        $refEdited = $refEdited.endAt(config.endAt);
      }
      if (config.paginateNext) {
        $refEdited = $refEdited.startAfter(config.paginateNext);
      }
      if (config.paginatePrev) {
        $refEdited = $refEdited.endBefore(config.paginatePrev);
      }
      if (config.limit) {
        if (!config.paginatePrev) {
          $refEdited = $refEdited.limitToLast(config.limit);
        } else {
          $refEdited = $refEdited.limit(config.limit);
        }
      }
    }

    return $refEdited;
  };

  const fetchOnSnapshot = ($ref: firebase.firestore.CollectionReference) => {
    const unsub = $ref.onSnapshot(
      (snapshot: any) => {
        const data: T[] = [];
        snapshot.docs.forEach((doc: any) => {
          data.push({
            ...doc.data(),
            id: doc.id,
          } as unknown as T);
        });

        setFireQueryStates({
          loading: false,
          data,
          error: null,
          firstSnapDoc: null,
          lastSnapDoc: null,
        });
      },
      (err: any) => {
        setFireQueryStates({
          loading: false,
          data: null,
          error: err,
          firstSnapDoc: null,
          lastSnapDoc: null,
        });
      }
    );

    return unsub;
  };

  const fetchGet = ($ref: firebase.firestore.CollectionReference) => {
    $ref.get().then(
      (snapshot: any) => {
        const firstSnapDoc = snapshot.docs[0];
        const lastSnapDoc = snapshot.docs[snapshot.docs.length - 1];
        const data: T[] = [];
        snapshot.docs.forEach((doc: any) => {
          data.push({
            ...doc.data(),
            id: doc.id,
          } as unknown as T);
        });

        setFireQueryStates({
          loading: false,
          data,
          error: null,
          firstSnapDoc,
          lastSnapDoc,
        });
      },
      (err: any) => {
        setFireQueryStates({
          loading: false,
          data: null,
          error: err,
          firstSnapDoc: null,
          lastSnapDoc: null,
        });
      }
    );
  };

  const refetchAsync = useCallback(
    (config?: any) => {
      if (firebase) {
        let $ref = firebase.firestore().collection(collectionName);
        if (config) {
          $ref = refQueryGenerator($ref, config);
        }

        if (config.snapshotListener) {
          return new Promise((res, rej) => {
            const unsub = $ref.onSnapshot(
              (snapshot: any) => {
                const data: T[] = [];
                snapshot.docs.forEach((doc: any) => {
                  data.push({
                    ...doc.data(),
                    id: doc.id,
                  } as unknown as T);
                });

                setFireQueryStates({
                  loading: false,
                  data,
                  error: null,
                  firstSnapDoc: null,
                  lastSnapDoc: null,
                });
                res(data);
              },
              (err: any) => {
                setFireQueryStates({
                  loading: false,
                  data: null,
                  error: err,
                  firstSnapDoc: null,
                  lastSnapDoc: null,
                });
                rej(err);
              }
            );

            return () => unsub && unsub();
          });
        }
        return new Promise((res, rej) => {
          const unsub = $ref.get().then(
            (snapshot: any) => {
              const firstSnapDoc = snapshot.docs[0];
              const lastSnapDoc = snapshot.docs[snapshot.docs.length - 1];
              const data: T[] = [];
              snapshot.docs.forEach((doc: any) => {
                data.push({
                  ...doc.data(),
                  id: doc.id,
                } as T);
              });
              setFireQueryStates({
                loading: false,
                data,
                error: null,
                firstSnapDoc,
                lastSnapDoc,
              });
              res(data);
            },
            (err: any) => {
              setFireQueryStates({
                loading: false,
                data: null,
                error: err,
                firstSnapDoc: null,
                lastSnapDoc: null,
              });
              rej(err);
            }
          );

          return () => unsub && unsub();
        });
      }
    },
    [collectionName]
  );

  const refetch = useCallback(
    (config?: any) => {
      resetFireQueryState();
      setFireQueryStatesLoading();

      const { collectionName } = collectionNameRef.current;

      if (firebase) {
        let $ref = firebase.firestore().collection(collectionName);
        if (config) {
          $ref = refQueryGenerator($ref, config);
        }

        if (config?.snapshotListener) {
          const unsub = fetchOnSnapshot($ref);
          return () => unsub && unsub();
        }
        fetchGet($ref);
      }
    },
    [collectionName]
  );

  useEffect(() => {
    setCollectionName(collectionNameArg);
    collectionNameRef.current = { collectionName: collectionNameArg };
    resetFireQueryState();
    setFireQueryStatesLoading();

    if (firebase) {
      let $ref = firebase.firestore().collection(collectionNameArg);
      if (config) {
        $ref = refQueryGenerator($ref, config);
      }

      if (config?.snapshotListener) {
        const unsub = fetchOnSnapshot($ref);
        return () => unsub && unsub();
      }
      fetchGet($ref);
    }
  }, []);

  return { ...fireQueryStates, refetch, refetchAsync };
};
