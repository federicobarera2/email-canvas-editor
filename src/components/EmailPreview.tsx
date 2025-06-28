
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Monitor, Smartphone } from "lucide-react";
import { TemplateData } from "@/lib/templateData";

interface EmailPreviewProps {
  templateData: TemplateData;
}

export const EmailPreview = ({ templateData }: EmailPreviewProps) => {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  const renderedHtml = useMemo(() => {
    let html = templateData.htmlTemplate;
    
    // Replace tokens with field values
    templateData.fields.forEach(field => {
      const token = `{{${field.id.toUpperCase().replace('-', '_')}}}`;
      html = html.replace(new RegExp(token, 'g'), field.value);
    });
    
    // Handle conditional sections (toggle fields)
    templateData.fields
      .filter(field => field.type === 'toggle')
      .forEach(toggleField => {
        const isEnabled = toggleField.value === 'true';
        const sectionId = toggleField.controlsSection?.toUpperCase().replace('-', '_');
        
        if (sectionId) {
          // Handle Handlebars-style conditionals
          const conditionalPattern = new RegExp(
            `{{#${toggleField.id.toUpperCase().replace('-', '_')}}}([\\s\\S]*?){{/${toggleField.id.toUpperCase().replace('-', '_')}}}`,
            'g'
          );
          
          html = html.replace(conditionalPattern, (match, content) => {
            console.log(`Toggle ${toggleField.id} is ${isEnabled ? 'enabled' : 'disabled'}`);
            return isEnabled ? content : '';
          });
        }
      });
    
    // Replace any remaining common tokens
    html = html.replace(/{{TITLE}}/g, templateData.name);
    
    return html;
  }, [templateData]);

  return (
    <div className="h-full flex flex-col">
      {/* Preview Header */}
      <div className="bg-white border-b p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Email Preview</h3>
            <p className="text-sm text-gray-600">Live preview of your email template</p>
          </div>
          <div className="flex items-center gap-4">
            <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "desktop" | "mobile")}>
              <ToggleGroupItem value="desktop" aria-label="Desktop view">
                <Monitor className="h-4 w-4" />
                <span className="ml-2 text-sm">Desktop</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="mobile" aria-label="Mobile view">
                <Smartphone className="h-4 w-4" />
                <span className="ml-2 text-sm">Mobile</span>
              </ToggleGroupItem>
            </ToggleGroup>
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              Live Preview
            </div>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className={`mx-auto ${viewMode === "mobile" ? "w-[375px]" : "max-w-2xl w-full"}`}>
          {/* Email Client Mockup */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
            {/* Mock Email Header */}
            <div className="bg-gray-50 px-4 py-3 border-b text-sm text-gray-600">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-xs sm:text-sm">From: Your Company &lt;hello@yourcompany.com&gt;</span>
                <span className="text-xs">Just now</span>
              </div>
              <div className="text-xs">
                <span className="font-medium">Subject: </span>
                {templateData.name}
              </div>
            </div>

            {/* Email Content */}
            <div className="bg-white">
              <iframe
                srcDoc={renderedHtml}
                className="w-full border-0"
                style={{ height: '600px', minHeight: '400px' }}
                title="Email Preview"
                sandbox="allow-same-origin"
              />
            </div>
          </div>

          {/* Preview Notes */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              Preview Notes {viewMode === "mobile" && "- Mobile View"}
            </h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• This preview shows how your email will appear to recipients</li>
              <li>• Changes made in the control panel will update this preview in real-time</li>
              <li>• Use toggles to show/hide optional content sections</li>
              <li>• Use the "Send Test" button to see how it looks in actual email clients</li>
              {viewMode === "mobile" && (
                <li>• Mobile view simulates a 375px width typical of smartphones</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
