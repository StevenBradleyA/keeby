import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import hackTime from "../../media/hackTime.mov";
import "./TransitionPage.css";
function TransitionPage() {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [play, setPlay] = useState(false);
  const videoRef = useRef(null);
  const { transitionId } = useParams();

    useEffect(() => {
      setPlay(true);

      const pogPlay = setTimeout(() => {
          history.push(`/profile/${sessionUser.id}`);
      }, 3500);

      return (
        () => {
          clearTimeout(pogPlay);
        },
        [history]
      );
    },[history, sessionUser.id, transitionId]);

  return (
    <>
      {play && transitionId === "1" && (
        <video
          className="error-hacking-too-much"
          ref={videoRef}
          src={hackTime}
          autoPlay
          muted
        />
      )}
    </>
  );
}

export default TransitionPage;
