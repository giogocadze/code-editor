import { create } from "zustand";
import { LANGUAGE_CONFIG } from "../(root)/_constants";
import { Monaco } from "@monaco-editor/react";
import { CodeEditorState } from "@/app/types";

const getInitialState = (): Pick<
  CodeEditorState,
  "language" | "theme" | "fontSize"
> => {
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    };
  }

  return {
    language: localStorage.getItem("editor-language") ?? "javascript",
    theme: localStorage.getItem("editor-theme") ?? "vs-dark",
    fontSize: Number(localStorage.getItem("editor-font-size") ?? 16),
  };
};

export const useCodeEditorState = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,

    getCode: () => get().editor?.getValue() || "",

    setEditor: (editor: Monaco) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);

      if (savedCode) editor.setValue(savedCode);
      set({ editor });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    setLanguage: (language: string) => {
      const currentCode = get().editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode);
      }

      localStorage.setItem("editor-language", language);

      set({
        language,
        output: "",
        error: null,
      });
    },
  };
});
