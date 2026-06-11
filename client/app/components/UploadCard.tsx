"use client";

import { useState } from "react";

export default function UploadCard() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const processFile = async (selectedFile: File | null) => {
    if (!selectedFile) {
      setResult("Please choose a PDF file first.");
      return;
    }

    try {
      setLoading(true);
      setResult("Uploading and processing PDF...");

      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadResponse = await fetch(
        "http://127.0.0.1:8000/api/upload/pdf",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();

      setResult("Extracting text and creating AI chunks...");

      const extractResponse = await fetch(
        "http://127.0.0.1:8000/api/extract/pdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filepath: uploadData.data.filepath,
          }),
        }
      );

      const extractData = await extractResponse.json();

      setResult(
        `PDF processed successfully.

File: ${selectedFile.name}
Chunks: ${extractData.data.chunks_count}
Saved chunks: ${extractData.data.saved_chunks_count}
Embeddings: ${extractData.data.embeddings_count}`
      );
    } catch {
      setResult("Upload failed. Please make sure Server-2 is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-slate-950">
          Upload PDF
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Drag and drop your learning material for AI processing.
        </p>
      </div>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);

          const droppedFile = e.dataTransfer.files?.[0];

          if (droppedFile) {
            setFile(droppedFile);
          }
        }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 text-center transition ${
          dragging
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50"
        }`}
      >
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
          }}
        />

        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-100 text-3xl">
          📄
        </div>

        <p className="text-sm font-semibold text-slate-800">
          Drop your PDF here or click to browse
        </p>

        <p className="mt-2 text-xs text-slate-500">
          PDF files only
        </p>

        {file && (
          <div className="mt-5 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
            Selected: {file.name}
          </div>
        )}
      </label>

      <button
        onClick={() => processFile(file)}
        disabled={loading}
        className="mt-5 w-full rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white shadow hover:bg-blue-700 disabled:bg-slate-400"
      >
        {loading ? "Processing..." : "Upload and Process"}
      </button>

      {result && (
        <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-slate-950 p-4 text-sm text-green-300">
          {result}
        </pre>
      )}
    </section>
  );
}