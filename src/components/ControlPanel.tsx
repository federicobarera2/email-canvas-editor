
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WysiwygEditor } from "@/components/WysiwygEditor";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { TemplateData, TemplateField } from "@/lib/templateData";
import { Image, Link, Type, Code } from "lucide-react";

interface ControlPanelProps {
  templateData: TemplateData;
  onUpdate: (updates: Partial<TemplateData>) => void;
}

export const ControlPanel = ({ templateData, onUpdate }: ControlPanelProps) => {
  // Dynamically get unique sections from template fields
  const sections = Array.from(new Set(templateData.fields.map(field => field.section)));
  const [activeSection, setActiveSection] = useState(sections[0] || "Content");

  console.log("Available sections:", sections);
  console.log("Active section:", activeSection);
  console.log("Template fields:", templateData.fields);

  const handleFieldUpdate = (fieldId: string, value: string) => {
    const updatedFields = templateData.fields.map(field =>
      field.id === fieldId ? { ...field, value } : field
    );
    onUpdate({ fields: updatedFields });
  };

  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'link': return <Link className="h-4 w-4" />;
      case 'wysiwyg': return <Code className="h-4 w-4" />;
      case 'html': return <Code className="h-4 w-4" />;
      default: return <Type className="h-4 w-4" />;
    }
  };

  const renderField = (field: TemplateField) => {
    const commonProps = {
      id: field.id,
      value: field.value,
      onChange: (value: string) => handleFieldUpdate(field.id, value)
    };

    switch (field.type) {
      case 'wysiwyg':
        return (
          <ErrorBoundary key={`${field.id}-${activeSection}`}>
            <WysiwygEditor
              {...commonProps}
              placeholder={field.placeholder}
            />
          </ErrorBoundary>
        );
      case 'image':
        return (
          <div className="space-y-2">
            <Input
              type="url"
              placeholder={field.placeholder || "Enter image URL"}
              value={field.value}
              onChange={(e) => handleFieldUpdate(field.id, e.target.value)}
              className="w-full"
            />
            {field.value && (
              <div className="border rounded-md p-2">
                <img 
                  src={field.value} 
                  alt="Preview" 
                  className="max-w-full h-20 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        );
      case 'link':
        return (
          <Input
            type="url"
            placeholder={field.placeholder || "Enter URL"}
            value={field.value}
            onChange={(e) => handleFieldUpdate(field.id, e.target.value)}
            className="w-full"
          />
        );
      default:
        return (
          <Input
            type="text"
            placeholder={field.placeholder || "Enter text"}
            value={field.value}
            onChange={(e) => handleFieldUpdate(field.id, e.target.value)}
            className="w-full"
          />
        );
    }
  };

  // Get fields for the current active section
  const currentSectionFields = templateData.fields.filter(field => field.section === activeSection);

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Template Controls</h2>
        <p className="text-sm text-gray-600">Customize your email template content</p>
      </div>

      <div className="flex-1 p-6">
        {sections.length > 1 ? (
          <Tabs value={activeSection} onValueChange={setActiveSection}>
            <TabsList className={`grid w-full mb-6 ${sections.length === 2 ? 'grid-cols-2' : sections.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
              {sections.map((section) => (
                <TabsTrigger key={section} value={section} className="text-xs">
                  {section}
                </TabsTrigger>
              ))}
            </TabsList>

            {sections.map((section) => (
              <TabsContent key={section} value={section} className="space-y-4">
                {templateData.fields
                  .filter(field => field.section === section)
                  .map((field) => (
                    <Card key={field.id} className="shadow-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          {getFieldIcon(field.type)}
                          {field.label}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <Label 
                            htmlFor={field.id} 
                            className="text-xs text-gray-600 uppercase tracking-wide"
                          >
                            {field.type === 'wysiwyg' ? 'Rich Text Editor' : field.type}
                          </Label>
                          {renderField(field)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="space-y-4">
            {currentSectionFields.map((field) => (
              <Card key={field.id} className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    {getFieldIcon(field.type)}
                    {field.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <Label 
                      htmlFor={field.id} 
                      className="text-xs text-gray-600 uppercase tracking-wide"
                    >
                      {field.type === 'wysiwyg' ? 'Rich Text Editor' : field.type}
                    </Label>
                    {renderField(field)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
