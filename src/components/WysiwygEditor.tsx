
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bold, Italic, Underline, Link, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Code } from "lucide-react";

interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const WysiwygEditor = ({ value, onChange, placeholder }: WysiwygEditorProps) => {
  const [showHtml, setShowHtml] = useState(false);
  const [htmlValue, setHtmlValue] = useState(value);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHtmlValue(value);
    if (editorRef.current && !showHtml) {
      editorRef.current.innerHTML = value;
    }
  }, [value, showHtml]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateContent();
  };

  const updateContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setHtmlValue(content);
      onChange(content);
    }
  };

  const handleHtmlChange = (htmlContent: string) => {
    setHtmlValue(htmlContent);
    onChange(htmlContent);
    if (editorRef.current) {
      editorRef.current.innerHTML = htmlContent;
    }
  };

  const toggleHtmlView = () => {
    if (showHtml) {
      // Switching from HTML to visual
      if (editorRef.current) {
        editorRef.current.innerHTML = htmlValue;
      }
    } else {
      // Switching from visual to HTML
      updateContent();
    }
    setShowHtml(!showHtml);
  };

  return (
    <div className="border rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b p-2 flex flex-wrap items-center gap-1">
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('bold')}
            className="h-8 w-8 p-0"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('italic')}
            className="h-8 w-8 p-0"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('underline')}
            className="h-8 w-8 p-0"
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('justifyLeft')}
            className="h-8 w-8 p-0"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('justifyCenter')}
            className="h-8 w-8 p-0"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('justifyRight')}
            className="h-8 w-8 p-0"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('insertUnorderedList')}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('insertOrderedList')}
            className="h-8 w-8 p-0"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              const url = prompt('Enter URL:');
              if (url) execCommand('createLink', url);
            }}
            className="h-8 w-8 p-0"
          >
            <Link className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <Button
          type="button"
          variant={showHtml ? "default" : "ghost"}
          size="sm"
          onClick={toggleHtmlView}
          className="h-8 px-2"
        >
          <Code className="h-4 w-4 mr-1" />
          HTML
        </Button>
      </div>

      {/* Editor Content */}
      {showHtml ? (
        <textarea
          value={htmlValue}
          onChange={(e) => handleHtmlChange(e.target.value)}
          className="w-full h-40 p-3 font-mono text-sm border-0 resize-none focus:outline-none"
          style={{ direction: 'ltr' }}
          placeholder="Enter HTML code..."
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={updateContent}
          onBlur={updateContent}
          className="min-h-[160px] p-3 focus:outline-none"
          style={{ 
            wordBreak: 'break-word',
            direction: 'ltr',
            textAlign: 'left',
            unicodeBidi: 'embed'
          }}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      )}
    </div>
  );
};
