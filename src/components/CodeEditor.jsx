import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const CodeEditor = ({ value, onChange }) => {
  return (
    <div className="h-full">
      <CodeMirror
        value={value}
        height="300px"
        extensions={[javascript({ jsx: true })]}
        onChange={(value) => onChange(value)}
      />
    </div>
  );
};

export default CodeEditor;
