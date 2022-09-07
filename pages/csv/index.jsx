import React, { useState } from "react";
import Navbar from "../../components/Navbar/index";
import HeadComp from "../../components/HeadComp/index";

const url = "/api/csv";

export default function csv() {
  const [file, setFile] = useState();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);

    fetch(url, {
      method: "POST",
      // headers: new Headers({ "content-type": "multipart/form-data" }),
      body: formData,
    });
  }

  const handleDelete = (event) => {
    event.preventDefault();
    fetch(url, {
      method: "DELETE",
    });
  };

  return (
    <>
      <HeadComp title="CSV" />
      <Navbar />
      <div className="container mt-3">
        <div className="row align-items-end">
          <div className="col-md-6 col-12">
            <form onSubmit={handleSubmit}>
              <h1>CSV File Upload</h1>
              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  onChange={handleChange}
                />
                <button
                  className="btn btn-outline-primary"
                  type="submit"
                  id="inputGroupFileAddon04"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6 col-12">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete all saved files
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
