"use client";
import React, { useState } from "react";

const FileUpload = () => {
  const [fileName, setFileName] = useState("");
  const [formData, setFormData] = useState({files: []});
  const [submissionStatus, setSubmissionStatus] = useState(null)

  const handleFile = (event) => {
    const selectedFiles = Array.from(event.target.files); // Convert FileList to array
    const validFiles = [];
    // const errorMessages = [];
    console.log(selectedFiles);

    setFileName("");
    selectedFiles.forEach((file, index) => {
      // Check if file is an image and less than 5MB

      if (file.type.startsWith("image/") && file.size < 5 * 1024 * 1024) {
        setFileName((prev) => prev + (prev && ", ") + file.name);
        validFiles.push({
          file,
          preview: URL.createObjectURL(file), // Create preview URL
        });
      }
    });

    // Update state with valid files
    if (validFiles.length > 0) {
      setFormData({ ...formData, files: validFiles });
    }
    console.log(fileName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.files.length===0) return alert("No document attached")
      
    setSubmissionStatus("submitting"); // Set status to submitting
    const form = new FormData();
    for (const key in formData) {
      if (key === "files") {
        formData.files.forEach((file) => form.append("files", file.file));
      } else {
        form.append(key, formData[key]);
      }
    }
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        setSubmissionStatus("success");
        alert("Documents Uploaded Sucessfully")
      } else {
        setSubmissionStatus("error");

        console.error("Error sending email:", response.status);
      }
    } catch (error) {
      setSubmissionStatus("error");
      console.error("Error sending email:", error);
    }

    setFormData({
      
      files: [],
    });
    setFileName("");

  };

  return (
    <form>
    <div className="mt-8">
      <input
        type="file"
        id="fileInput"
        name="files"
        multiple
        className="hidden"
        accept="image/*"
        onChange={handleFile}
      />
      <div className="flex flex-col items-start w-full">
        <label
          htmlFor="fileInput"
          className="inline-block px-4 py-2 font-medium text-white transition duration-300 bg-blue-900 rounded cursor-pointer hover:bg-blue-500"
        >
          Select Files to Upload
        </label>
        {fileName && (
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-medium">{fileName}</span>
          </p>
        )}
      </div>
    </div>
    <button
              type="submit"
              className="relative px-4 my-8 py-2 overflow-hidden text-white rounded md:w-48 cursor-pointer hover:bg-blue-500 bg-blue-900 transition duration-200"
              onClick={handleSubmit}
              disabled={submissionStatus === "submitting"}
            >
                {submissionStatus === "submitting" ? (
                  <svg
                    className="size-6 animate-spin"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Submit"
                )}
            </button>

    </form>
  );
};

export default FileUpload;
