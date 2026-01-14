import { create } from "zustand";
import { LANGUAGE_CONFIG } from "../(root)/_constants";
import { Monaco } from "@monaco-editor/react";
import { CodeEditorState } from "@/app/types";

const getInitialState = () => {
  // if server return default value
  if (typeof window == "undefined") {
    return {
      languange: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    };
  }

  const savedLanguage = localStorage.getItem("editor-language") || "javascript";
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || 16
  return {
    langaunge: savedLanguage,
    theme: savedTheme,
    fontSize : Number(savedFontSize)
  };
};
export const useCodeEditorState = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {};
});
