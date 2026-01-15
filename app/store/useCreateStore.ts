import { create } from "zustand";
import { LANGUAGE_CONFIG } from "../(root)/_constants";
import { Monaco } from "@monaco-editor/react";
import { CodeEditorState } from "@/app/types";
import { error } from "console";

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

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
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

    runCode: async () => {
      const { language, getCode } = get();
      const code = getCode();

      if (!code) {
        set({ error: "please return some function" });
        return;
      }

      set({ isRunning: true, error: null, output: "" });
      try {
        const runtime = LANGUAGE_CONFIG[language].pistonRuntime;

        const response = await fetch("https://emkc.org/v2/piston/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: runtime.language,
            version: runtime.version,
            files: [
              {
                content: code,
              },
            ],
          }),
        });

        const data = await response.json();
        console.log("data back from piston", data);

        if (data.message) {
          set({ error: data.message, executionResult: { code, output : "", error : data.message} });
          return
        }
        
      } catch (error) {}
    },
  };
});
