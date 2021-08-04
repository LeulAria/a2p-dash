import firebase from 'firebase/app';
import 'firebase/storage';

import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { FireQueryContext } from '../../../index';

export const useFireStorage = <T>(path?: string) => {
  const {
    firequery: { firebase },
  } = useContext(FireQueryContext);
  const [url, seturl] = useState<string>();
  const [error, setError] = useState<
    firebase.storage.FirebaseStorageError | string
  >();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const getDownloadURL = useCallback((storageRef: firebase.storage.Reference) => {
    storageRef
      .getDownloadURL()
      .then((value) => {
        seturl(value);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const uploadFile = useCallback(
    (
      storageRef: firebase.storage.Reference,
      file: Blob | Uint8Array | ArrayBuffer,
    ) => {
      setLoading(true);
      storageRef.put(file).on(
        'state_changed',
        (snap) => {
          const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (err) => {
          setError(err);
          setLoading(false);
        },
        () => {
          setSuccess(true);
          getDownloadURL(storageRef);
        },
      );
    },
    [],
  );

  const deleteFromStorage = useCallback((deleteRef: firebase.storage.Reference) => {
    deleteRef
      .delete()
      .then(() => {
        setLoading(false);
        setSuccess(true);
      })
      .catch((err) => {
        setError(error);
        setLoading(false);
        setSuccess(false);
      });
  }, []);

  /// HOOKS ///
  const getFile = useCallback(
    (path) => {
      setLoading(true);
      if (firebase) {
        const storageRef = firebase.storage().ref(path);
        getDownloadURL(storageRef);
      } else {
        setLoading(false);
      }
    },
    [firebase, getDownloadURL],
  );

  const deleteFile = useCallback(
    (fileName: string) => {
      setLoading(true);
      if (firebase) {
        const storageRef = firebase.storage().ref().child(fileName);
        // deleteFromStorage(deleteRef);
        storageRef
          .delete()
          .then()
          .catch((err: any) => {
            console.error(err);
          });
      } else {
        setLoading(false);
      }
    },
    [firebase],
  );

  const deleteDir = useCallback(
    (directoryName: string) => {
      setLoading(true);
      if (firebase) {
        const storageRef = firebase.storage().ref();
        const deleteRef = directoryName
          ? storageRef.child(directoryName)
          : storageRef;

        setLoading(true);
        deleteRef
          .listAll()
          .then((result: any) => {
            result.items.forEach((file: any) => {
              file.delete();
            });
            setLoading(false);
            setSuccess(true);
          })
          .catch((err: any) => {
            setError(err);
            setLoading(false);
            setSuccess(false);
          });
      } else {
        setLoading(false);
      }
    },
    [firebase],
  );

  const upload = useCallback(
    (
      file: Blob | Uint8Array | ArrayBuffer,
      fileName: string,
      prevAddress?: string,
    ) => {
      setLoading(true);
      if (firebase) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(fileName);
        uploadFile(fileRef, file);

        if (prevAddress) {
          try {
            deleteFile(prevAddress);
          } catch (error) {
            setError(error);
          }
        }
      } else {
        setLoading(false);
      }
    },
    [firebase, uploadFile, deleteFile],
  );

  useEffect(() => {
    setLoading(true);
    if (firebase) {
      if (path) {
        const storageRef = firebase.storage().ref(path);
        getDownloadURL(storageRef);
      } else {
        setLoading(false);
      }
    }
  }, [firebase, getDownloadURL, path]);

  return {
    url,
    loading,
    progress,
    success,
    error,
    upload,
    deleteFile,
    deleteDir,
    getFile,
  };
};
