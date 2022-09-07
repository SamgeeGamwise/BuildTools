import React, { useEffect, useRef, useState } from "react";
import GetQuestions from "../../components/GetQuestions/index";
import Navbar from "../../components/Navbar/index";
import HeadComp from "../../components/HeadComp/index";

export default function json() {
  const [fileTypes, setFileTypes] = useState([]);

  const [fileType, setFileType] = useState({ title: "", abbr: "" });

  useEffect(() => {
    fetch(`/api/json`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          data[0].active = true;
          setFileTypes(data);
          setFileType(data[0]);
        }
      });
  }, []);

  const renderTabs = (files) => {
    if (files.length > 0) {
      const tabs = files.map((file, index) => {
        if (file.active) {
          return (
            <li className="nav-item" key={index}>
              <span className="nav-link text-black active">{file.abbr}</span>
            </li>
          );
        } else {
          return (
            <li className="nav-item" key={index}>
              <span className="nav-link text-black" onClick={updateTabs}>
                {file.abbr}
              </span>
            </li>
          );
        }
      });
      return <ul className="nav nav-tabs">{tabs}</ul>;
    } else return null;
  };

  const updateTabs = (e) => {
    const newFileTypes = [...fileTypes];
    newFileTypes.forEach((file) => (file.active = false));
    newFileTypes.forEach((file) => {
      if (file.abbr === e.target.innerText) {
        file.active = true;
        setFileType(() => file);
      }
    });
    setFileTypes(() => newFileTypes);
  };

  return (
    <>
      <HeadComp title={fileType.title} />
      <Navbar />
      <div className="container mt-5">
        {renderTabs(fileTypes)}
        <GetQuestions
          title={fileType.title}
          abbr={fileType.abbr.toLowerCase()}
        />
      </div>
    </>
  );
}
