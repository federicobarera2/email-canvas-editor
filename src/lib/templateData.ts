export interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'image' | 'link' | 'html' | 'wysiwyg' | 'toggle';
  value: string;
  placeholder?: string;
  section: string;
  controlsSection?: string; // New field to specify which section this toggle controls
}

export interface TemplateData {
  id: string;
  name: string;
  description: string;
  fields: TemplateField[];
  htmlTemplate: string;
}

const templates: Record<string, TemplateData> = {
  "newsletter-basic": {
    id: "newsletter-basic",
    name: "Basic Newsletter",
    description: "Simple newsletter template with header, content section, and footer",
    fields: [
      {
        id: "header-image",
        label: "Header Image",
        type: "image",
        value: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=200&fit=crop",
        section: "Header"
      },
      {
        id: "header-link",
        label: "Header Link URL",
        type: "link",
        value: "https://example.com",
        placeholder: "Enter website URL",
        section: "Header"
      },
      {
        id: "main-content",
        label: "Main Content",
        type: "wysiwyg",
        value: "<h2>Welcome to our Newsletter!</h2><p>This is the main content area where you can add your newsletter content. You can format text, add links, and create engaging content for your subscribers.</p><p>Feel free to customize this section with your own content.</p>",
        section: "Content"
      },
      {
        id: "show-optional-section",
        label: "Show Optional Section",
        type: "toggle",
        value: "true",
        section: "Content",
        controlsSection: "optional-content"
      },
      {
        id: "optional-content",
        label: "Optional Content Block",
        type: "wysiwyg",
        value: "<h3>Additional Information</h3><p>This is an optional content section that can be toggled on or off. Use this space for additional details, announcements, or special offers.</p>",
        section: "Content"
      },
      {
        id: "footer-content",
        label: "Footer Content",
        type: "wysiwyg",
        value: "<p>© 2024 Your Company Name. All rights reserved.</p><p>You received this email because you subscribed to our newsletter.</p><p><a href='#'>Unsubscribe</a> | <a href='#'>Manage Preferences</a></p>",
        section: "Footer"
      }
    ],
    htmlTemplate: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{TITLE}}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; }
          .header { text-align: center; padding: 20px; }
          .header img { max-width: 100%; height: auto; border-radius: 8px; }
          .content { padding: 30px; line-height: 1.6; color: #333; }
          .optional-section { margin-top: 30px; padding-top: 30px; border-top: 1px solid #eee; }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
          .footer a { color: #007bff; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <a href="{{HEADER_LINK}}">
              <img src="{{HEADER_IMAGE}}" alt="Header Image" />
            </a>
          </div>
          <div class="content">
            {{MAIN_CONTENT}}
            {{#SHOW_OPTIONAL_SECTION}}
            <div class="optional-section">
              {{OPTIONAL_CONTENT}}
            </div>
            {{/SHOW_OPTIONAL_SECTION}}
          </div>
          <div class="footer">
            {{FOOTER_CONTENT}}
          </div>
        </div>
      </body>
      </html>
    `
  },
  "promotional": {
    id: "promotional",
    name: "Promotional Email",
    description: "Eye-catching promotional template with call-to-action sections",
    fields: [
      {
        id: "hero-image",
        label: "Hero Image",
        type: "image",
        value: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=300&fit=crop",
        section: "Hero"
      },
      {
        id: "cta-link",
        label: "Call-to-Action Link",
        type: "link",
        value: "https://example.com/shop",
        placeholder: "Enter CTA URL",
        section: "Hero"
      },
      {
        id: "promotional-content",
        label: "Promotional Content",
        type: "wysiwyg",
        value: "<h1 style='color: #e74c3c; text-align: center;'>Special Offer!</h1><p style='text-align: center; font-size: 18px;'>Don't miss out on our amazing deals. Limited time offer!</p><div style='text-align: center; padding: 20px;'><a href='#' style='background-color: #e74c3c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;'>Shop Now</a></div>",
        section: "Content"
      },
      {
        id: "show-bonus-section",
        label: "Show Bonus Offer",
        type: "toggle",
        value: "true",
        section: "Content",
        controlsSection: "bonus-content"
      },
      {
        id: "bonus-content",
        label: "Bonus Offer Content",
        type: "wysiwyg",
        value: "<h2 style='color: #27ae60; text-align: center;'>Bonus Offer!</h2><p style='text-align: center;'>Get an additional 15% off when you spend over $100. Use code: BONUS15</p>",
        section: "Content"
      },
      {
        id: "footer-promo",
        label: "Footer",
        type: "wysiwyg",
        value: "<p style='text-align: center;'>Follow us on social media for more deals!</p><p style='text-align: center; font-size: 12px;'>© 2024 Your Store. All rights reserved.</p>",
        section: "Footer"
      }
    ],
    htmlTemplate: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{TITLE}}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; }
          .hero { position: relative; text-align: center; }
          .hero img { width: 100%; height: auto; }
          .content { padding: 30px; }
          .bonus-section { margin-top: 30px; padding: 20px; background-color: #f0f8ff; border-radius: 8px; }
          .footer { background-color: #2c3e50; color: white; padding: 20px; text-align: center; }
          .footer a { color: #3498db; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="hero">
            <a href="{{CTA_LINK}}">
              <img src="{{HERO_IMAGE}}" alt="Promotional Image" />
            </a>
          </div>
          <div class="content">
            {{PROMOTIONAL_CONTENT}}
            {{#SHOW_BONUS_SECTION}}
            <div class="bonus-section">
              {{BONUS_CONTENT}}
            </div>
            {{/SHOW_BONUS_SECTION}}
          </div>
          <div class="footer">
            {{FOOTER_PROMO}}
          </div>
        </div>
      </body>
      </html>
    `
  },
  "welcome-series": {
    id: "welcome-series",
    name: "Welcome Email",
    description: "Warm welcome template for new subscribers and customers",
    fields: [
      {
        id: "welcome-image",
        label: "Welcome Image",
        type: "image",
        value: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=250&fit=crop",
        section: "Header"
      },
      {
        id: "company-link",
        label: "Company Website",
        type: "link",
        value: "https://yourcompany.com",
        placeholder: "Enter company URL",
        section: "Header"
      },
      {
        id: "welcome-message",
        label: "Welcome Message",
        type: "wysiwyg",
        value: "<h1 style='color: #2ecc71; text-align: center;'>Welcome Aboard!</h1><p>Thank you for joining our community! We're excited to have you with us and can't wait to share amazing content, exclusive offers, and updates.</p><p>Here's what you can expect from us:</p><ul><li>Weekly newsletters with valuable insights</li><li>Exclusive member-only discounts</li><li>Early access to new products and features</li></ul><p>If you have any questions, don't hesitate to reach out to our team.</p>",
        section: "Content"
      },
      {
        id: "show-getting-started",
        label: "Show Getting Started Guide",
        type: "toggle",
        value: "true",
        section: "Content",
        controlsSection: "getting-started"
      },
      {
        id: "getting-started",
        label: "Getting Started Guide",
        type: "wysiwyg",
        value: "<h2 style='color: #3498db;'>Getting Started</h2><p>Here are some quick steps to help you get the most out of your membership:</p><ol><li>Complete your profile setup</li><li>Explore our resource library</li><li>Join our community discussions</li><li>Follow us on social media</li></ol>",
        section: "Content"
      },
      {
        id: "welcome-footer",
        label: "Footer Message",
        type: "wysiwyg",
        value: "<p style='text-align: center;'>Welcome to the family!</p><p style='text-align: center; font-size: 12px;'>© 2024 Your Company. We're glad you're here!</p>",
        section: "Footer"
      }
    ],
    htmlTemplate: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{TITLE}}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { text-align: center; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          .header img { max-width: 100%; height: auto; border-radius: 8px; }
          .content { padding: 40px 30px; line-height: 1.7; color: #444; }
          .getting-started-section { margin-top: 30px; padding: 25px; background-color: #e8f4fd; border-left: 4px solid #3498db; }
          .footer { background-color: #2ecc71; color: white; padding: 25px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <a href="{{COMPANY_LINK}}">
              <img src="{{WELCOME_IMAGE}}" alt="Welcome Image" />
            </a>
          </div>
          <div class="content">
            {{WELCOME_MESSAGE}}
            {{#SHOW_GETTING_STARTED}}
            <div class="getting-started-section">
              {{GETTING_STARTED}}
            </div>
            {{/SHOW_GETTING_STARTED}}
          </div>
          <div class="footer">
            {{WELCOME_FOOTER}}
          </div>
        </div>
      </body>
      </html>
    `
  }
};

export const getTemplateById = (id: string): TemplateData | null => {
  return templates[id] || null;
};

export const getAllTemplates = (): TemplateData[] => {
  return Object.values(templates);
};
