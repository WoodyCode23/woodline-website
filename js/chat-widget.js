/**
 * Woodline Technologies Chat Widget
 * Customized for web development and AI chatbot services
 */

class WoodlineChatWidget {
    constructor(config = {}) {
        // Configuration
        this.emailjs = config.emailjs || {
            serviceId: 'YOUR_SERVICE_ID',
            templateId: 'YOUR_TEMPLATE_ID',
            userId: 'YOUR_PUBLIC_KEY'
        };

        // Service types
        this.serviceTypes = {
            'Website Development': [
                'New Business Website',
                'Website Redesign',
                'E-commerce Site',
                'Landing Page',
                'Portfolio Website',
                'Other'
            ],
            'AI Chatbot': [
                'Customer Support Bot',
                'Lead Generation Bot',
                'FAQ Bot',
                'Custom AI Solution',
                'Other'
            ],
            'Website Hosting & Management': [
                'New Hosting Setup',
                'Website Migration',
                'Ongoing Maintenance',
                'Performance Optimization',
                'Other'
            ],
            'Full Package (Website + Hosting + Chatbot)': [
                'Complete business solution'
            ],
            'Consultation': [
                'Free consultation call'
            ]
        };

        // Widget state
        this.isOpen = false;
        this.conversationStage = 'greeting';
        this.collectedData = {};

        // Initialize widget
        this.init();
    }

    init() {
        this.createWidget();
        this.attachEventListeners();
        setTimeout(() => this.showGreeting(), 500);
    }

    createWidget() {
        // Create chat button
        const button = document.createElement('div');
        button.className = 'wt-chat-button';
        button.innerHTML = `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
        `;

        // Create chat window
        const window = document.createElement('div');
        window.className = 'wt-chat-window';
        window.innerHTML = `
            <div class="wt-chat-header">
                <div class="wt-chat-header-content">
                    <div class="wt-chat-header-icon">💬</div>
                    <div class="wt-chat-header-text">
                        <h3>Woodline Technologies</h3>
                        <p>Let's discuss your project!</p>
                    </div>
                </div>
                <button class="wt-chat-close" aria-label="Close chat">×</button>
            </div>
            <div class="wt-chat-messages" id="wt-messages"></div>
            <div class="wt-chat-input-area" id="wt-input-area"></div>
        `;

        document.body.appendChild(button);
        document.body.appendChild(window);

        this.button = button;
        this.window = window;
        this.messagesContainer = document.getElementById('wt-messages');
        this.inputArea = document.getElementById('wt-input-area');
    }

    attachEventListeners() {
        this.button.addEventListener('click', () => this.toggleChat());
        this.window.querySelector('.wt-chat-close').addEventListener('click', () => this.closeChat());
    }

    toggleChat() {
        this.isOpen ? this.closeChat() : this.openChat();
    }

    openChat() {
        this.isOpen = true;
        this.window.classList.add('open');
    }

    closeChat() {
        this.isOpen = false;
        this.window.classList.remove('open');
    }

    showGreeting() {
        const greeting = "Hi! 👋 I'm here to help you get started with your website or AI chatbot project. I'll ask you a few quick questions so Ryan can reach out with the perfect solution for your business.";
        this.addBotMessage(greeting);
        setTimeout(() => this.askName(), 1000);
    }

    askName() {
        this.conversationStage = 'name';
        this.addBotMessage("Let's start with the basics - what's your name?");
        setTimeout(() => {
            this.showTextInput('Your name', (value) => {
                this.collectedData.name = value;
                this.addUserMessage(value);
                this.askBusinessName();
            });
        }, 300);
    }

    askBusinessName() {
        this.conversationStage = 'business';
        this.addBotMessage(`Nice to meet you, ${this.collectedData.name}! What's your business or company name?`);
        setTimeout(() => {
            this.showTextInput('Business name', (value) => {
                this.collectedData.businessName = value;
                this.addUserMessage(value);
                this.askEmail();
            });
        }, 300);
    }

    askEmail() {
        this.conversationStage = 'email';
        this.addBotMessage("What's the best email address to reach you?");
        setTimeout(() => {
            this.showTextInput('Email address', (value) => {
                if (!this.isValidEmail(value)) {
                    this.addBotMessage("Hmm, that doesn't look like a valid email. Could you double-check it?");
                    this.askEmail();
                    return;
                }
                this.collectedData.email = value;
                this.addUserMessage(value);
                this.askPhone();
            });
        }, 300);
    }

    askPhone() {
        this.conversationStage = 'phone';
        this.addBotMessage("And what's your phone number?");
        setTimeout(() => {
            this.showTextInput('Phone number', (value) => {
                this.collectedData.phone = value;
                this.addUserMessage(value);
                this.askServiceType();
            });
        }, 300);
    }

    askServiceType() {
        this.conversationStage = 'serviceType';
        this.addBotMessage("Great! What type of service are you interested in?");
        setTimeout(() => {
            const services = Object.keys(this.serviceTypes);
            this.showDropdown(services, 'Select service type...', (value) => {
                this.collectedData.serviceType = value;
                this.addUserMessage(value);
                this.askServiceDetails();
            });
        }, 300);
    }

    askServiceDetails() {
        this.conversationStage = 'serviceDetails';
        this.addBotMessage(`Perfect! Can you tell me more about your ${this.collectedData.serviceType.toLowerCase()} needs?`);
        setTimeout(() => {
            const details = this.serviceTypes[this.collectedData.serviceType] || [];
            this.showDropdown(details, 'Select option...', (value) => {
                this.collectedData.serviceDetails = value;
                this.addUserMessage(value);
                this.askTimeline();
            });
        }, 300);
    }

    askTimeline() {
        this.conversationStage = 'timeline';
        this.addBotMessage("When would you like to get started?");
        setTimeout(() => {
            const timelines = [
                'As soon as possible',
                'Within 1-2 weeks',
                'Within a month',
                'Just exploring options',
                'Other'
            ];
            this.showDropdown(timelines, 'Select timeline...', (value) => {
                this.collectedData.timeline = value;
                this.addUserMessage(value);
                this.askAdditionalInfo();
            });
        }, 300);
    }

    askAdditionalInfo() {
        this.conversationStage = 'additionalInfo';
        this.addBotMessage("Is there anything else you'd like us to know about your project?");
        setTimeout(() => {
            this.showTextArea('Additional details (optional)', (value) => {
                this.collectedData.additionalInfo = value || 'No additional details';
                this.addUserMessage(value || 'No additional details');
                this.askContactMethod();
            });
        }, 300);
    }

    askContactMethod() {
        this.conversationStage = 'contactMethod';
        this.addBotMessage("How would you prefer Ryan to contact you?");
        setTimeout(() => {
            const methods = ['Email', 'Phone', 'Either is fine'];
            this.showDropdown(methods, 'Select contact method...', (value) => {
                this.collectedData.contactMethod = value;
                this.addUserMessage(value);
                if (value === 'Phone' || value === 'Either is fine') {
                    this.askBestTime();
                } else {
                    this.showConfirmation();
                }
            });
        }, 300);
    }

    askBestTime() {
        this.conversationStage = 'bestTime';
        this.addBotMessage("What's the best time to call you?");
        setTimeout(() => {
            const times = ['Morning (9am-12pm)', 'Afternoon (12pm-5pm)', 'Evening (5pm-8pm)', 'Anytime'];
            this.showDropdown(times, 'Select best time...', (value) => {
                this.collectedData.bestTime = value;
                this.addUserMessage(value);
                this.showConfirmation();
            });
        }, 300);
    }

    showConfirmation() {
        this.conversationStage = 'confirmation';
        const summary = `Perfect! Let me confirm everything:

👤 Name: ${this.collectedData.name}
🏢 Business: ${this.collectedData.businessName}
📧 Email: ${this.collectedData.email}
📱 Phone: ${this.collectedData.phone}

🎯 Service: ${this.collectedData.serviceType}
📋 Details: ${this.collectedData.serviceDetails}
⏱️ Timeline: ${this.collectedData.timeline}
📝 Notes: ${this.collectedData.additionalInfo}

📞 Contact via: ${this.collectedData.contactMethod}
${this.collectedData.bestTime ? `⏰ Best time: ${this.collectedData.bestTime}` : ''}

Does everything look correct?`;

        this.addBotMessage(summary);
        setTimeout(() => this.showConfirmationButtons(), 500);
    }

    showConfirmationButtons() {
        this.inputArea.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <button class="wt-submit-button" id="wt-confirm">
                    ✓ Yes, send it!
                </button>
                <button class="wt-submit-button" id="wt-edit" style="background: rgba(255, 255, 255, 0.15);">
                    ✎ Edit Something
                </button>
                <button class="wt-submit-button" id="wt-restart" style="background: rgba(255, 255, 255, 0.1);">
                    ↺ Start Over
                </button>
            </div>
        `;

        document.getElementById('wt-confirm').addEventListener('click', () => {
            this.addUserMessage('Yes, send it!');
            this.submitToEmailJS();
        });

        document.getElementById('wt-edit').addEventListener('click', () => {
            this.addUserMessage('I want to edit something');
            this.showEditOptions();
        });

        document.getElementById('wt-restart').addEventListener('click', () => {
            this.addUserMessage('Let me start over');
            this.resetChat();
        });
    }

    showEditOptions() {
        this.addBotMessage("No problem! What would you like to change?");

        setTimeout(() => {
            this.inputArea.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <button class="wt-submit-button" id="edit-name">Edit Name</button>
                    <button class="wt-submit-button" id="edit-business">Edit Business Name</button>
                    <button class="wt-submit-button" id="edit-email">Edit Email</button>
                    <button class="wt-submit-button" id="edit-phone">Edit Phone</button>
                    <button class="wt-submit-button" id="edit-service">Edit Service Type</button>
                    <button class="wt-submit-button" id="edit-timeline">Edit Timeline</button>
                    <button class="wt-submit-button" id="edit-notes">Edit Notes</button>
                    <button class="wt-submit-button" id="edit-contact">Edit Contact Method</button>
                    <button class="wt-submit-button" id="back-confirm" style="background: rgba(255, 255, 255, 0.1);">← Back to Confirmation</button>
                </div>
            `;

            // Name edit
            document.getElementById('edit-name').addEventListener('click', () => {
                this.addUserMessage('Edit my name');
                this.addBotMessage("What's your name?");
                setTimeout(() => {
                    this.showTextInput('Your name', (value) => {
                        this.collectedData.name = value;
                        this.addUserMessage(value);
                        this.addBotMessage("Updated!");
                        this.showConfirmation();
                    });
                }, 300);
            });

            // Business name edit
            document.getElementById('edit-business').addEventListener('click', () => {
                this.addUserMessage('Edit business name');
                this.addBotMessage("What's your business name?");
                setTimeout(() => {
                    this.showTextInput('Business name', (value) => {
                        this.collectedData.businessName = value;
                        this.addUserMessage(value);
                        this.addBotMessage("Updated!");
                        this.showConfirmation();
                    });
                }, 300);
            });

            // Email edit
            document.getElementById('edit-email').addEventListener('click', () => {
                this.addUserMessage('Edit my email');
                this.addBotMessage("What's your email address?");
                setTimeout(() => {
                    this.showTextInput('Email address', (value) => {
                        if (!this.isValidEmail(value)) {
                            this.addBotMessage("That doesn't look like a valid email. Could you double-check it?");
                            setTimeout(() => this.showEditOptions(), 1000);
                            return;
                        }
                        this.collectedData.email = value;
                        this.addUserMessage(value);
                        this.addBotMessage("Updated!");
                        this.showConfirmation();
                    });
                }, 300);
            });

            // Phone edit
            document.getElementById('edit-phone').addEventListener('click', () => {
                this.addUserMessage('Edit my phone number');
                this.addBotMessage("What's your phone number?");
                setTimeout(() => {
                    this.showTextInput('Phone number', (value) => {
                        this.collectedData.phone = value;
                        this.addUserMessage(value);
                        this.addBotMessage("Updated!");
                        this.showConfirmation();
                    });
                }, 300);
            });

            // Service type edit
            document.getElementById('edit-service').addEventListener('click', () => {
                this.addUserMessage('Edit service type');
                this.addBotMessage("What type of service are you interested in?");
                setTimeout(() => {
                    const services = Object.keys(this.serviceTypes);
                    this.showDropdown(services, 'Select service type...', (value) => {
                        this.collectedData.serviceType = value;
                        this.collectedData.serviceDetails = ''; // Reset details
                        this.addUserMessage(value);
                        this.addBotMessage("Great! Now which specific option?");
                        setTimeout(() => {
                            const details = this.serviceTypes[value] || [];
                            this.showDropdown(details, 'Select option...', (detail) => {
                                this.collectedData.serviceDetails = detail;
                                this.addUserMessage(detail);
                                this.addBotMessage("Updated!");
                                this.showConfirmation();
                            });
                        }, 300);
                    });
                }, 300);
            });

            // Timeline edit
            document.getElementById('edit-timeline').addEventListener('click', () => {
                this.addUserMessage('Edit timeline');
                this.addBotMessage("When would you like to get started?");
                setTimeout(() => {
                    const timelines = [
                        'As soon as possible',
                        'Within 1-2 weeks',
                        'Within a month',
                        'Just exploring options',
                        'Other'
                    ];
                    this.showDropdown(timelines, 'Select timeline...', (value) => {
                        this.collectedData.timeline = value;
                        this.addUserMessage(value);
                        this.addBotMessage("Updated!");
                        this.showConfirmation();
                    });
                }, 300);
            });

            // Notes edit
            document.getElementById('edit-notes').addEventListener('click', () => {
                this.addUserMessage('Edit additional notes');
                this.addBotMessage("What would you like us to know about your project?");
                setTimeout(() => {
                    this.showTextArea('Additional details', (value) => {
                        this.collectedData.additionalInfo = value || 'No additional details';
                        this.addUserMessage(value || 'No additional details');
                        this.addBotMessage("Updated!");
                        this.showConfirmation();
                    });
                }, 300);
            });

            // Contact method edit
            document.getElementById('edit-contact').addEventListener('click', () => {
                this.addUserMessage('Edit contact method');
                this.addBotMessage("How would you prefer Ryan to contact you?");
                setTimeout(() => {
                    const methods = ['Email', 'Phone', 'Either is fine'];
                    this.showDropdown(methods, 'Select contact method...', (value) => {
                        this.collectedData.contactMethod = value;
                        this.addUserMessage(value);
                        if (value === 'Phone' || value === 'Either is fine') {
                            this.addBotMessage("What's the best time to call you?");
                            setTimeout(() => {
                                const times = ['Morning (9am-12pm)', 'Afternoon (12pm-5pm)', 'Evening (5pm-8pm)', 'Anytime'];
                                this.showDropdown(times, 'Select best time...', (time) => {
                                    this.collectedData.bestTime = time;
                                    this.addUserMessage(time);
                                    this.addBotMessage("Updated!");
                                    this.showConfirmation();
                                });
                            }, 300);
                        } else {
                            this.collectedData.bestTime = '';
                            this.addBotMessage("Updated!");
                            this.showConfirmation();
                        }
                    });
                }, 300);
            });

            // Back to confirmation
            document.getElementById('back-confirm').addEventListener('click', () => {
                this.addUserMessage('Back to confirmation');
                this.inputArea.innerHTML = '';
                this.showConfirmation();
            });
        }, 300);
    }

    async submitToEmailJS() {
        this.inputArea.innerHTML = '';
        this.showTypingIndicator();

        try {
            const templateParams = {
                from_name: this.collectedData.name,
                business_name: this.collectedData.businessName,
                from_email: this.collectedData.email,
                phone: this.collectedData.phone,
                service_type: this.collectedData.serviceType,
                service_details: this.collectedData.serviceDetails,
                timeline: this.collectedData.timeline,
                contact_method: this.collectedData.contactMethod,
                best_time: this.collectedData.bestTime || 'Not specified',
                message: this.collectedData.additionalInfo
            };

            if (typeof emailjs !== 'undefined') {
                emailjs.send(
                    this.emailjs.serviceId,
                    this.emailjs.templateId,
                    templateParams,
                    this.emailjs.userId
                ).then(() => {
                    this.hideTypingIndicator();
                    this.showSuccess();
                }).catch((error) => {
                    console.error('EmailJS Error:', error);
                    this.hideTypingIndicator();
                    this.showError();
                });
            } else {
                // Fallback if EmailJS is not configured
                this.hideTypingIndicator();
                this.showSuccessWithoutEmail();
            }
        } catch (error) {
            console.error('Error:', error);
            this.hideTypingIndicator();
            this.showError();
        }
    }

    showSuccess() {
        const successMessage = `✅ Perfect! Your inquiry has been sent to Ryan!

Ryan will contact you within 24 hours to discuss your ${this.collectedData.serviceType} project! 🚀

If you have any questions in the meantime, feel free to reach out at ryan@woodlinetechnologies.com.`;

        this.addBotMessage(successMessage);
        this.inputArea.innerHTML = `
            <button class="wt-submit-button" id="wt-new-inquiry">
                Start New Inquiry
            </button>
        `;
        document.getElementById('wt-new-inquiry').addEventListener('click', () => this.resetChat());
    }

    showSuccessWithoutEmail() {
        const successMessage = `✅ Thank you for your interest!

Here's a summary of your inquiry:
• Service: ${this.collectedData.serviceType}
• Timeline: ${this.collectedData.timeline}

Please contact Ryan directly at:
📧 ryan@woodlinetechnologies.com
📱 (614) 526-9557

We'll get back to you as soon as possible!`;

        this.addBotMessage(successMessage);
        this.inputArea.innerHTML = `
            <button class="wt-submit-button" id="wt-new-inquiry">
                Start New Inquiry
            </button>
        `;
        document.getElementById('wt-new-inquiry').addEventListener('click', () => this.resetChat());
    }

    showError() {
        const errorMessage = `Oops! Something went wrong sending your request.

Please try contacting us directly:
📧 ryan@woodlinetechnologies.com
📱 (614) 526-9557

We apologize for the inconvenience!`;

        this.addBotMessage(errorMessage);
        this.inputArea.innerHTML = `
            <button class="wt-submit-button" id="wt-restart-error">
                Start Over
            </button>
        `;
        document.getElementById('wt-restart-error').addEventListener('click', () => this.resetChat());
    }

    resetChat() {
        this.messagesContainer.innerHTML = '';
        this.inputArea.innerHTML = '';
        this.collectedData = {};
        this.conversationStage = 'greeting';
        this.showGreeting();
    }

    // Input helpers
    showTextInput(placeholder, callback) {
        this.inputArea.innerHTML = `
            <div class="wt-chat-input-wrapper">
                <input type="text" class="wt-chat-input" id="wt-current-input" placeholder="${placeholder}" autocomplete="off"/>
                <button class="wt-chat-send-button" id="wt-send-btn">➤</button>
            </div>
        `;

        const input = document.getElementById('wt-current-input');
        const sendBtn = document.getElementById('wt-send-btn');

        const handleSend = () => {
            const value = input.value.trim();
            if (value) {
                callback(value);
                this.inputArea.innerHTML = '';
            }
        };

        sendBtn.addEventListener('click', handleSend);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
            }
        });

        setTimeout(() => input.focus(), 100);
    }

    showTextArea(placeholder, callback) {
        this.inputArea.innerHTML = `
            <textarea class="wt-chat-input" id="wt-current-input" placeholder="${placeholder}" style="width: 100%; min-height: 80px; resize: vertical; border-radius: 12px; padding: 12px; box-sizing: border-box; margin-bottom: 8px;"></textarea>
            <button class="wt-submit-button" id="wt-send-btn">Continue ➤</button>
        `;

        const input = document.getElementById('wt-current-input');
        const sendBtn = document.getElementById('wt-send-btn');

        sendBtn.addEventListener('click', () => {
            const value = input.value.trim();
            callback(value);
            this.inputArea.innerHTML = '';
        });

        setTimeout(() => input.focus(), 100);
    }

    showDropdown(options, placeholder, callback) {
        const optionsHtml = options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
        this.inputArea.innerHTML = `
            <select class="wt-chat-input" id="wt-current-select" style="width: 100%; padding: 12px; border-radius: 12px; cursor: pointer; box-sizing: border-box;">
                <option value="">${placeholder}</option>
                ${optionsHtml}
            </select>
        `;

        const select = document.getElementById('wt-current-select');
        select.addEventListener('change', () => {
            const value = select.value;
            if (value) {
                callback(value);
                this.inputArea.innerHTML = '';
            }
        });

        setTimeout(() => select.focus(), 100);
    }

    // Message helpers
    addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'wt-chat-message bot';

        const avatar = document.createElement('div');
        avatar.className = 'wt-message-avatar bot';
        avatar.textContent = '💬';

        const content = document.createElement('div');
        content.className = 'wt-message-content bot';
        content.style.whiteSpace = 'pre-line';
        content.textContent = text;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'wt-chat-message user';

        const avatar = document.createElement('div');
        avatar.className = 'wt-message-avatar user';
        avatar.textContent = '👤';

        const content = document.createElement('div');
        content.className = 'wt-message-content user';
        content.textContent = text;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'wt-chat-message bot';
        typingDiv.id = 'wt-typing';

        const avatar = document.createElement('div');
        avatar.className = 'wt-message-avatar bot';
        avatar.textContent = '💬';

        const indicator = document.createElement('div');
        indicator.className = 'wt-message-content bot';
        indicator.innerHTML = `
            <div class="wt-typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

        typingDiv.appendChild(avatar);
        typingDiv.appendChild(indicator);
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typing = document.getElementById('wt-typing');
        if (typing) typing.remove();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

// Auto-notify when ready
console.log('Woodline Technologies Chat Widget ready');
