import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import hackTime from "../../media/hackTime.mov";
import "./TransitionPage.css";
function TransitionPage() {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [play, setPlay] = useState(false);
  const videoRef = useRef(null);
  const { transitionId } = useParams();
  const location = useLocation();
  const listingId = location.state.listingId;

  useEffect(() => {
    setPlay(true);

    const pogPlay = setTimeout(() => {
      if (transitionId === "1") {
        history.push(`/profile/${sessionUser.id}`);
      }
      if (transitionId === "2") {
        history.push(`/listing/${listingId}`);
      }
    }, 3500);

    return (
      () => {
        clearTimeout(pogPlay);
      },
      [history]
    );
  }, [history, sessionUser.id, transitionId]);

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
      {play && transitionId === "2" && (
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
