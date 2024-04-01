import React, { useEffect, useState } from "react";
import "./Iframely.css";
import Loading from "./Loading";
import { IFRAMELY_KEY } from "../config";
export default function Iframely(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [html, setHtml] = useState({
    __html: "<div />",
  });
  useEffect(() => {
    if (props && props.url) {
      fetch(
        `https://cdn.iframe.ly/api/iframely?url=${encodeURIComponent(
          props.url
        )}&key=${IFRAMELY_KEY}&iframe=1&omit_script=1&card=${props.size}`
      )
        .then((res) => res.json())
        .then(
          (res) => {
            setIsLoaded(true);
            if (res.html) {
              setHtml({ __html: res.html });
            } else if (res.error) {
              setError({ code: res.error, message: res.message });
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    } else {
      setError({ code: 400, message: "Provide url attribute for the element" });
    }
  }, []);

  useEffect((props) => {
    window.iframely && window.iframely.load();
  });

  if (error) {
    return (
      <div>
        Error: {error.code} - {error.message}
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div>
        <Loading type="spinningBubbles" color="white" />
      </div>
    );
  } else {
    return <div dangerouslySetInnerHTML={html} />;
  }
}
