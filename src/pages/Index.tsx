
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Eye, Edit3 } from "lucide-react";

interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  thumbnail: string;
}

const templates: EmailTemplate[] = [
  {
    id: "newsletter-basic",
    name: "Basic Newsletter",
    description: "Simple newsletter template with header, content section, and footer",
    preview: "A clean and professional newsletter layout perfect for company updates",
    thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop"
  },
  {
    id: "promotional",
    name: "Promotional Email",
    description: "Eye-catching promotional template with call-to-action sections",
    preview: "Designed to showcase products and drive conversions with bold visuals",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
  },
  {
    id: "welcome-series",
    name: "Welcome Email",
    description: "Warm welcome template for new subscribers and customers",
    preview: "Create a great first impression with this welcoming design",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleEditTemplate = () => {
    if (selectedTemplate) {
      navigate(`/editor/${selectedTemplate}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Email Canvas Editor</h1>
              <p className="text-sm text-gray-600">Create beautiful email templates with ease</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
          <p className="text-gray-600 text-lg">Select a template to start creating your email campaign</p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {templates.map((template) => (
            <Card 
              key={template.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-blue-500 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => handleSelectTemplate(template.id)}
            >
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src={template.thumbnail} 
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  {selectedTemplate === template.id && (
                    <div className="p-1 bg-blue-500 rounded-full">
                      <Eye className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <CardDescription className="text-sm">{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{template.preview}</p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Preview functionality could be added here
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Bar */}
        {selectedTemplate && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Edit3 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {templates.find(t => t.id === selectedTemplate)?.name} Selected
                  </p>
                  <p className="text-sm text-gray-600">Ready to start editing</p>
                </div>
              </div>
              <Button 
                onClick={handleEditTemplate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Start Editing
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
