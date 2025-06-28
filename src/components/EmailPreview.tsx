
import { useMemo } from "react";
import { TemplateData } from "@/lib/templateData";

interface EmailPreviewProps {
  templateData: TemplateData;
}

export const EmailPreview = ({ templateData }: EmailPreviewProps) => {
  const renderedHtml = useMemo(() => {
    let html = templateData.htmlTemplate;
    
    // Replace tokens with field values
    templateData.fields.forEach(field => {
      const token = `{{${field.id.toUpperCase().replace('-', '_')}}}`;
      html = html.replace(new RegExp(token, 'g'), field.value);
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
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              Live Preview
            </div>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="max-w-2xl mx-auto">
          {/* Email Client Mockup */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Mock Email Header */}
            <div className="bg-gray-50 px-4 py-3 border-b text-sm text-gray-600">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">From: Your Company &lt;hello@yourcompany.com&gt;</span>
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
            <h4 className="text-sm font-medium text-blue-900 mb-2">Preview Notes</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• This preview shows how your email will appear to recipients</li>
              <li>• Changes made in the control panel will update this preview in real-time</li>
              <li>• Use the "Send Test" button to see how it looks in actual email clients</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
