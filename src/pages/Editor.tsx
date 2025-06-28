
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Send, Eye } from "lucide-react";
import { ControlPanel } from "@/components/ControlPanel";
import { EmailPreview } from "@/components/EmailPreview";
import { getTemplateById, TemplateData } from "@/lib/templateData";

const Editor = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const [templateData, setTemplateData] = useState<TemplateData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (templateId) {
      const template = getTemplateById(templateId);
      setTemplateData(template);
      setIsLoading(false);
    }
  }, [templateId]);

  const handleUpdateTemplate = (updates: Partial<TemplateData>) => {
    if (templateData) {
      setTemplateData({ ...templateData, ...updates });
    }
  };

  const handleSave = () => {
    console.log("Saving template:", templateData);
    // Save functionality would be implemented here
  };

  const handlePreview = () => {
    console.log("Opening preview:", templateData);
    // Preview functionality would be implemented here
  };

  const handleSend = () => {
    console.log("Sending email:", templateData);
    // Send functionality would be implemented here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading template...</p>
        </div>
      </div>
    );
  }

  if (!templateData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Template not found</p>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Templates
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{templateData.name}</h1>
                <p className="text-sm text-gray-600">Email Template Editor</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4 mr-2" />
                Send Test
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Editor */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Control Panel - Left Side */}
        <div className="w-1/3 min-w-[400px] bg-white border-r shadow-sm overflow-y-auto">
          <ControlPanel 
            templateData={templateData}
            onUpdate={handleUpdateTemplate}
          />
        </div>

        {/* Preview Panel - Right Side */}
        <div className="flex-1 bg-gray-100 overflow-y-auto">
          <EmailPreview templateData={templateData} />
        </div>
      </div>
    </div>
  );
};

export default Editor;
