import React, { useContext, useState } from "react";
import routes from "./config/routes";
import firebase from "./firebase";
import Error from "./pages/util/Error";
import SnackBar from "./components/shared/SnackBar";
import Blocked from "./pages/util/Blocked";
import BackToTop from "./components/shared/BackToTop";
import { useLoadingOverlay } from "./contexts/loading";
import ReactRoleAccessRouter from "react-rolebased-router";
import { AuthContext } from "./contexts/auth/AuthProvider";
import OverlayLoading from "./components/shared/OverlayLoading";
import { redirectUserHome, redirectUserLogin } from "./utils/userRoleUtils";

const Router: React.FC = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isApproved, setApproved] = useState(true);
  const [isUserPassChanged, setIsUserPassChanged] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const { user } = useContext(AuthContext);
  const { loading } = useLoadingOverlay();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then((res) => {
          const data = res.data();
          if (data) {
            if (data?.isStuff) {
              if (data?.accountStatus === "pending") {
                setApproved(false);
              }
            }
            if (data?.isBlocked) {
              setIsBlocked(true);
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      localStorage.clear();
    }
  });

  firebase
    .firestore()
    .collection("users")
    .doc(user?.uid)
    .onSnapshot(
      (res) => {
        const data = res.data();
        if (data) {
          if (data?.roles?.isStuff) {
            if (data?.accountStatus === "approved") {
              setApproved(true);
            }
          }
          if (data?.isBlocked) {
            setIsBlocked(true);
          }

          if (data?.roles?.isClient) {
            if (data?.isEmailVerified) {
              if (data?.isPassChanged) {
                setIsUserPassChanged(true);
              } else {
                setIsUserPassChanged(false);
              }
            }
          }
        }
      },
      (err) => {
        console.log("USER NOT FOUND: ", err.code);
      },
    );

  return (
    <div>
      {loading && <OverlayLoading />}
      <ReactRoleAccessRouter
        routes={routes}
        userAuthRoles={user?.UserRole ? user.UserRole : ["NOT_LOGGED_IN"]}
        loginRedirectPath={user ? redirectUserHome(user) : redirectUserLogin(user)}
        isUserAuthenticated={!!user}
        blocked={{
          isBlocked:
            !isApproved || isBlocked || !isUserPassChanged,
          component: isBlocked ? (
            <Blocked />
          ) : !isApproved ? (
            <Error />
          ) : null,
        }}
      />
      <SnackBar />
      <BackToTop />
    </div>
  );
};

export default Router;
