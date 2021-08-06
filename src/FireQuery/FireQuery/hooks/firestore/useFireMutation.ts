import firebase from "firebase/app";
import "firebase/firestore";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FireQueryContext } from "../../../index";

export const useFireMutation = <T>(collectionNameArg: string) => {
  type CollectionName = {
    collectionName: string;
  };

  interface MutationStateType {
    loading: boolean;
    data: T | any | null;
    success: boolean;
    error: firebase.firestore.FirestoreError | string | null;
  }

  type MutationTypes = "ADD" | "UPDATE" | "DELETE";

  const {
    firequery: { firebase },
  } = useContext(FireQueryContext);
  const [collectionName, setCollectionName] = useState("");
  const collectionNameRef = useRef<CollectionName>({ collectionName });

  const [mutationStates, setMutationStates] = useState<MutationStateType>({
    loading: false,
    data: null,
    success: false,
    error: null,
  });

  const resetMutationStates = () => {
    setMutationStates({
      loading: false,
      data: null,
      success: false,
      error: null,
    });
  };

  const setMutationStateLoading = () => {
    setMutationStates({
      loading: true,
      data: null,
      success: false,
      error: null,
    });
  };

  const setMutationStateError = (
    error: firebase.firestore.FirestoreError | string
  ) => {
    setMutationStates({
      loading: true,
      data: null,
      success: false,
      error,
    });
  };

  const setMutationStateData = (data: T[] | any) => {
    setMutationStates({
      loading: false,
      data,
      success: true,
      error: null,
    });
  };

  const addDoc = (
    data: Partial<T>,
    $ref: firebase.firestore.CollectionReference
  ): Promise<any> =>
    new Promise((res, rej) => {
      $ref.add(data).then(
        (data) => {
          setMutationStateData(data);
          res(data);
        },
        (err) => {
          setMutationStateError(err);
          rej(err);
        }
      );
    });
  const setDoc = (
    data: Partial<T>,
    $ref: firebase.firestore.DocumentReference
  ): Promise<any> =>
    new Promise((res, rej) => {
      $ref.set(data).then(
        (data) => {
          setMutationStateData(data);
          res(data);
        },
        (err) => {
          setMutationStateError(err);
          rej(err);
        }
      );
    });

  const updateDoc = (
    data: Partial<T>,
    $ref: firebase.firestore.DocumentReference
  ): Promise<any> =>
    new Promise((res, rej) => {
      $ref.update(data).then(
        (useFireQueryData) => {
          setMutationStateData(data);
          res(data);
        },
        (err) => {
          setMutationStateError(err);
          rej(err);
        }
      );
    });
  const deleteDoc = ($ref: firebase.firestore.DocumentReference): Promise<any> =>
    new Promise((res, rej) => {
      $ref.delete().then(
        (data) => {
          setMutationStates({
            loading: false,
            data: null,
            success: true,
            error: null,
          });
          res(data);
        },
        (err) => {
          setMutationStateError(err);
          rej(err);
        }
      );
    });

  const populateRefData = (
    data?: any,
    optionFields?: { createdAt?: boolean; updatedAt?: boolean }
  ) => {
    const dataRef: any = {};
    for (const [k, v] of Object.entries(data)) {
      if (typeof v === "string") {
        if (v.includes("firestore:ref")) {
          const refVal = v.split("(")[1];
          if (refVal.includes("/")) {
            dataRef[k] = firebase.firestore().doc(refVal);
          } else {
            dataRef[k] = v;
          }
        } else {
          dataRef[k] = v;
        }
      } else {
        dataRef[k] = v;
      }
    }

    if (optionFields) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp;
      if (optionFields.createdAt) {
        dataRef.createdAt = timestamp();
      }
      if (optionFields.updatedAt) {
        dataRef.updatedAt = timestamp();
      }
    }
    return dataRef;
  };

  const mutate = useCallback(
    (
      mutationType: MutationTypes,
      id?: string | null,
      data?: Partial<T>,
      optionFields?: { createdAt?: boolean; updatedAt?: boolean }
    ): Promise<any> =>
      new Promise((res, rej) => {
        if (firebase) {
          resetMutationStates();
          setMutationStateLoading();

          const { collectionName } = collectionNameRef.current;

          let $ref;
          switch (mutationType) {
            case "ADD":
              if (data) {
                if (id) {
                  $ref = firebase.firestore().collection(collectionName).doc(id);
                  const dataRef = populateRefData(data, optionFields);
                  return setDoc(dataRef, $ref)
                    .then((data) => res(data))
                    .catch((err) => rej(err));
                }
                $ref = firebase.firestore().collection(collectionName);
                const dataRef = populateRefData(data, optionFields);
                return addDoc(dataRef, $ref)
                  .then((data) => res(data))
                  .catch((err) => rej(err));
              }
              setMutationStateError("Data not provided to add.");
              rej("Data not provided to add.");

              break;
            case "UPDATE":
              if (data) {
                if (id) {
                  $ref = firebase.firestore().collection(collectionName).doc(id);
                  const dataRef: any = {};
                  for (const [k, v] of Object.entries(data)) {
                    if (typeof v === "string") {
                      if (v.includes("firestore:ref")) {
                        const refVal = v.split("(")[1];
                        if (refVal.includes("/")) {
                          dataRef[k] = firebase.firestore().doc(refVal);
                        } else {
                          dataRef[k] = v;
                        }
                      } else {
                        dataRef[k] = v;
                      }
                    } else {
                      dataRef[k] = v;
                    }
                  }

                  if (optionFields) {
                    const timestamp = firebase.firestore.FieldValue.serverTimestamp;
                    if (optionFields.createdAt) {
                      dataRef.createdAt = timestamp();
                    }
                    if (optionFields.updatedAt) {
                      dataRef.updatedAt = timestamp();
                    }
                  }

                  return updateDoc(dataRef, $ref)
                    .then((data) => res(data))
                    .catch((err) => rej(err));
                }
                setMutationStateError("Id not provided to update.");
                rej("Id not provided to update.");
              } else {
                setMutationStateError("Data not provided to update.");
                rej("Data not provided to update.");
              }
              break;
            case "DELETE":
              if (id) {
                $ref = firebase.firestore().collection(collectionName).doc(id);
                deleteDoc($ref)
                  .then((data) => res(data))
                  .catch((err) => rej(err));
              } else {
                setMutationStateError("No Id provided to delete.");
                rej("No Id provided to delete.");
              }
              break;
            default:
              setMutationStateError("Please specify a valid mutation type.");
              rej("Please specify a valid mutation type.");
          }
        } else {
          setMutationStateError("Whooops can't get firebase instance");
        }
      }),
    [collectionName]
  );

  const mutateWithDocRef = useCallback(
    (
      mutationType: MutationTypes,
      data?: Partial<T>,
      $ref?: firebase.firestore.DocumentReference,
      $newRefAdd?: firebase.firestore.CollectionReference
    ) => {
      resetMutationStates();
      setMutationStateLoading();

      if (firebase) {
        switch (mutationType) {
          case "ADD":
            if (data) {
              if ($ref) {
                setDoc(data, $ref);
              } else if ($newRefAdd) {
                addDoc(data, $newRefAdd);
              } else {
                setMutationStateError("Reference not provided to add!");
              }
            } else {
              setMutationStateError("Data not provided to add.");
            }
            break;
          case "UPDATE":
            if (data) {
              if ($ref) {
                updateDoc(data, $ref);
              } else {
                setMutationStateError("Reference not provided to update!");
              }
            } else {
              setMutationStateError("Data not provided to update.");
            }
            break;
          case "DELETE":
            if ($ref) {
              deleteDoc($ref);
            } else {
              setMutationStateError("Reference not provided to delete!");
            }
            break;
          default:
            setMutationStateError("Please specify a valid mutation type.");
        }
      } else {
        setMutationStateError("Whooops can't get firebase instance");
      }
    },
    []
  );

  useEffect(() => {
    resetMutationStates();
    setCollectionName(collectionNameArg);
    collectionNameRef.current = { collectionName: collectionNameArg };
  }, []);

  return { ...mutationStates, mutate, mutateWithDocRef };
};
