"use client";

import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  CodeToggle,
  ConditionalContents,
  InsertCodeBlock,
  InsertSandpack,
  MDXEditor,
  MDXEditorMethods,
  SandpackConfig,
  ShowSandpackInfo,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  sandpackPlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { FC, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface EditorProps {
  value?: string;
  onChange?: (markdown: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

const Editor: FC<EditorProps> = ({
  value = "",
  onChange,
  placeholder = "Start writing your content...",
  className,
  disabled = false,
}) => {
  const editorRef = useRef<MDXEditorMethods | null>(null);

  // Sync external value changes to editor (only when value prop changes externally)
  const prevValueRef = useRef(value);
  useEffect(() => {
    if (editorRef.current && value !== undefined && prevValueRef.current !== value) {
      const currentMarkdown = editorRef.current.getMarkdown();
      if (currentMarkdown !== value) {
        editorRef.current.setMarkdown(value);
      }
      prevValueRef.current = value;
    }
  }, [value]);

  const handleChange = (markdown: string) => {
    onChange?.(markdown);
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "rounded-lg border border-input bg-card overflow-hidden",
          disabled && "opacity-50 pointer-events-none"
        )}
      >
        <MDXEditor
          ref={editorRef}
          markdown={value}
          onChange={handleChange}
          readOnly={disabled}
          contentEditableClassName="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none dark:prose-invert focus:outline-none min-h-[300px] p-4"
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
            sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
            codeMirrorPlugin({
              codeBlockLanguages: {
                jsx: "JavaScript (react)",
                js: "JavaScript",
                css: "CSS",
                tsx: "TypeScript (react)",
                ts: "TypeScript",
                python: "Python",
                java: "Java",
                cpp: "C++",
                html: "HTML",
                json: "JSON",
              },
            }),
            toolbarPlugin({
              toolbarClassName: cn(
                "border-b border-input bg-muted/50 px-4 py-2",
                "flex items-center gap-1 flex-wrap"
              ),
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <BlockTypeSelect />
                  <CodeToggle />
                  <ConditionalContents
                    options={[
                      {
                        when: (editor) => editor?.editorType === "codeblock",
                        contents: () => <ChangeCodeMirrorLanguage />,
                      },
                      {
                        when: (editor) => editor?.editorType === "sandpack",
                        contents: () => <ShowSandpackInfo />,
                      },
                      {
                        fallback: () => (
                          <>
                            <InsertCodeBlock />
                            <InsertSandpack />
                          </>
                        ),
                      },
                    ]}
                  />
                </>
              ),
            }),
          ]}
        />
      </div>
      {placeholder && !value && (
        <p className="text-xs text-muted-foreground mt-2 px-1">{placeholder}</p>
      )}
    </div>
  );
};

export default Editor;
