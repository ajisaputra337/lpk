"use client";

import React, { forwardRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    modules: any;
    placeholder?: string;
    className?: string;
}

const RichTextEditor = forwardRef<ReactQuill, RichTextEditorProps>(
    ({ value, onChange, modules, placeholder, className }, ref) => {
        return (
            <ReactQuill
                ref={ref}
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                placeholder={placeholder}
                className={className}
            />
        );
    }
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
