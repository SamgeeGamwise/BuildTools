import React, { useRef, useState } from "react";
import Link from "next/link";
import styles from "../../styles/getQuestions.module.css";

export default function GetQuestions(props) {
  const [questions, setQuestions] = useState("");
  const codeRef = useRef(null);

  const getQuestions = () => {
    const payload = JSON.stringify({
      type: "questions",
      file: props.abbr.toLowerCase(),
    });
    fetch(`/api/json`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: payload,
    })
      .then((res) => res.json())
      .then((data) => setQuestions({ questions: { question: data } }))
      .catch(() => setQuestions(""));
  };

  const getMainJson = () => {
    const payload = JSON.stringify({ type: "main", file: props.abbr });
    fetch(`/api/json`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: payload,
    })
      .then((res) => res.json())
      .then((data) => setQuestions({ questions: { question: data } }))
      .catch(() => setQuestions(""));
  };

  const displayJson = (json) => {
    return json
      ? JSON.stringify(JSON.parse(JSON.stringify(json)), null, 2)
      : "";
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeRef.current.innerText);
    alert("Copied to clipboard!");
  };

  return (
    <>
      {props.title ? (
        <>
          <div className="row ">
            <div className="col">
              <h4 className="mb-5">{props.title}</h4>
            </div>
          </div>
          <div className="row justify-content-start">
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-primary mb-4"
                onClick={getQuestions}
              >
                Generate {props.abbr.toUpperCase()} JSON
              </button>
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-primary mb-4"
                onClick={getMainJson}
              >
                Generate {props.abbr.toUpperCase()} Main JSON
              </button>
            </div>
            <div className="col-auto">
              {questions ? (
                <button
                  type="button"
                  className={`${styles.tooltip} btn btn-outline-primary`}
                  onClick={copyToClipboard}
                >
                  Copy to clipboard
                </button>
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <h4 className="d-inline-block">
          <Link href="/csv">
            Please upload CSV files to get started &#8594;
          </Link>
        </h4>
      )}
      {questions ? (
        <div className="row">
          <div className="col">
            <pre className={`${styles.displayJson} ${styles.shadow} p-3`}>
              <code ref={codeRef}>{displayJson(questions)}</code>
            </pre>
          </div>
        </div>
      ) : null}
    </>
  );
}
