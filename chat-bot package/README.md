# Wood Tide Travel Chat Widget

This folder contains all the files needed to add the Wood Tide Travel chatbot to any website.

## Files Included

- `chat-widget.js` - The main chatbot JavaScript code
- `chat-widget.css` - The chatbot styles
- `example.html` - Example implementation showing how to integrate the chatbot
- `README.md` - This file with installation instructions

## Installation Instructions

### Step 1: Copy Files

Copy the following files to your website's directory:
- `chat-widget.js`
- `chat-widget.css`

### Step 2: Add Required Dependencies

Add these scripts to your HTML file's `<head>` section:

```html
<!-- EmailJS SDK (required for form submissions) -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>

<!-- Flatpickr (optional - for date picker functionality) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
```

### Step 3: Link Chat Widget Files

Add these links to your HTML file (adjust the path based on where you placed the files):

```html
<!-- Chat Widget CSS -->
<link rel="stylesheet" href="path/to/chat-widget.css">

<!-- EmailJS Configuration -->
<script>
    // Initialize EmailJS with your public key
    const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

    emailjs.init(EMAILJS_PUBLIC_KEY);
</script>

<!-- Chat Widget Script -->
<script src="path/to/chat-widget.js"></script>
<script>
    // Initialize Chat Widget
    const chatWidget = new WoodTideChatWidget({
        apiUrl: '', // Leave empty for EmailJS-only mode
        emailjs: {
            serviceId: EMAILJS_SERVICE_ID,
            templateId: EMAILJS_TEMPLATE_ID,
            userId: EMAILJS_PUBLIC_KEY
        }
    });

    console.log('✅ Chat widget ready');
</script>
```

### Step 4: Configure EmailJS

1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. Set up an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{from_name}}` - Customer name
   - `{{from_email}}` - Customer email
   - `{{phone}}` - Customer phone number
   - `{{travel_category}}` - Type of travel
   - `{{destination}}` - Destination choice
   - `{{travel_dates}}` - Travel dates
   - `{{num_travelers}}` - Number of travelers
   - `{{contact_method}}` - Preferred contact method
   - `{{call_time}}` - Best time to call
   - `{{message}}` - Additional interests/requests
4. Get your Public Key, Service ID, and Template ID from EmailJS
5. Replace the placeholder values in the code above with your actual IDs

## Customization

### Changing Colors

Edit `chat-widget.css` and modify these color variables:
- Navy: `#0a1628`
- Champagne: `#c9a961`

### Changing Destinations

Edit `chat-widget.js` and modify the `destinations` object in the constructor to add/remove travel categories and destinations.

### Changing Messages

Edit `chat-widget.js` and modify the text in methods like:
- `showGreeting()`
- `askName()`
- `askPhone()`
- etc.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Requires JavaScript enabled

## Features

- Conversational UI that guides users through travel inquiry
- Email validation
- Date picker integration
- Cascading dropdowns for travel categories and destinations
- Edit functionality to update any field
- Mobile-friendly design
- Email submission via EmailJS

## Support

For issues or questions, contact: rodney@woodtidetravel.com
