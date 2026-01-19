/**
 * Wood Tide Travel Chat Widget - EmailJS Fallback Mode
 * Guided form with chat interface aesthetic
 */

class WoodTideChatWidget {
    constructor(config = {}) {
        // Configuration
        this.apiUrl = config.apiUrl || 'https://chatbot.scoreit.duckdns.org';
        this.emailjs = config.emailjs || {
            serviceId: 'service_pzw0rqd',
            templateId: 'template_dua7u8p',
            userId: 'yzXFX4SYbx4ELcRFE'
        };

        // Travel destinations from your website
        this.destinations = {
            'River Cruises': [
                'Danube River (Europe)',
                'Rhine River (Europe)',
                'Douro River (Portugal)',
                'Rhône & Saône (France)',
                'Seine River (France)',
                'Mekong River (Southeast Asia)',
                'Nile River (Egypt)',
                'Mississippi River (USA)',
                'European Rivers - Multiple',
                'Other River Cruise'
            ],
            'Ocean Cruises': [
                'Caribbean',
                'Mediterranean',
                'Alaska',
                'Northern Europe & Fjords',
                'South Pacific',
                'Antarctica',
                'Transatlantic',
                'World Cruise',
                'Other Ocean Cruise'
            ],
            'Luxury Resorts': [
                'Europe',
                'Maldives',
                'Bali',
                'Dubai',
                'French Riviera',
                'Seychelles',
                'Other Luxury Resort'
            ],
            'All-Inclusive Resorts': [
                'Caribbean',
                'Mexico - Cancun/Riviera Maya',
                'Mexico - Los Cabos',
                'Jamaica',
                'Dominican Republic',
                'Hawaii',
                'Other All-Inclusive'
            ],
            'Guided Tours': [
                'Europe',
                'Asia',
                'Africa Safari',
                'South America',
                'Australia & New Zealand',
                'Wine & Culinary Tours',
                'Cultural & Heritage Tours',
                'Adventure Tours',
                'Other Guided Tour'
            ],
            'Custom Itineraries': [
                'Custom destination'
            ],
            'Group Travel': [
                'Custom group destination'
            ]
        };

        // Widget state
        this.isOpen = false;
        this.mode = 'emailjs'; // Start with EmailJS mode
        this.conversationStage = 'greeting';
        this.collectedData = {};
        this.waitingForInput = false;

        // Initialize widget
        this.init();
    }

    init() {
        // Create widget HTML
        this.createWidget();

        // Attach event listeners
        this.attachEventListeners();

        // Start with greeting
        setTimeout(() => {
            this.showGreeting();
        }, 500);
    }

    createWidget() {
        // Create chat button
        const button = document.createElement('div');
        button.className = 'woodtide-chat-button';
        button.innerHTML = `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
        `;

        // Create chat window
        const window = document.createElement('div');
        window.className = 'woodtide-chat-window';
        window.innerHTML = `
            <div class="woodtide-chat-header">
                <div class="woodtide-chat-header-content">
                    <div class="woodtide-chat-header-icon">✈️</div>
                    <div class="woodtide-chat-header-text">
                        <h3>Wood Tide Travel</h3>
                        <p>Let's plan your dream trip!</p>
                    </div>
                </div>
                <button class="woodtide-chat-close" aria-label="Close chat">×</button>
            </div>
            <div class="woodtide-chat-messages" id="woodtide-messages"></div>
            <div class="woodtide-chat-input-area" id="woodtide-input-area">
                <!-- Dynamic input area -->
            </div>
        `;

        // Add to page
        document.body.appendChild(button);
        document.body.appendChild(window);

        // Store references
        this.button = button;
        this.window = window;
        this.messagesContainer = document.getElementById('woodtide-messages');
        this.inputArea = document.getElementById('woodtide-input-area');
    }

    attachEventListeners() {
        // Toggle chat window
        this.button.addEventListener('click', () => this.toggleChat());

        // Close button
        this.window.querySelector('.woodtide-chat-close').addEventListener('click', () => this.closeChat());
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
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
        const greeting = "Hi! 👋 I'm here to help you plan an amazing vacation. I'll ask you a few quick questions so Rodney can create the perfect proposal for you.";
        this.addBotMessage(greeting);

        // Start the conversation
        setTimeout(() => {
            this.askName();
        }, 1000);
    }

    askName() {
        this.conversationStage = 'name';
        this.addBotMessage("Let's start with the basics - what's your name?");

        setTimeout(() => {
            this.showTextInput('Your name', (value) => {
                this.collectedData.name = value;
                this.addUserMessage(value);
                this.askPhone();
            });
        }, 300);
    }

    askPhone() {
        this.conversationStage = 'phone';
        this.addBotMessage(`Great to meet you, ${this.collectedData.name}! What's the best phone number to reach you?`);

        // Small delay to let the message render first
        setTimeout(() => {
            this.showTextInput('Phone number', (value) => {
                this.collectedData.phone = value;
                this.addUserMessage(value);
                this.askEmail();
            });
        }, 300);
    }

    askEmail() {
        this.conversationStage = 'email';
        this.addBotMessage("Perfect! What's your email address? We'll send your personalized proposal there.");

        setTimeout(() => {
            this.showTextInput('Email address', (value) => {
                if (!this.isValidEmail(value)) {
                    this.addBotMessage("Hmm, that doesn't look like a valid email. Could you double-check it?");
                    this.askEmail();
                    return;
                }
                this.collectedData.email = value;
                this.addUserMessage(value);
                this.askTravelCategory();
            });
        }, 300);
    }

    askTravelCategory() {
        this.conversationStage = 'category';
        this.addBotMessage("Now for the fun part! What type of travel experience are you interested in?");

        setTimeout(() => {
            const categories = Object.keys(this.destinations);
            this.showDropdown(categories, 'Select travel type...', (value) => {
                this.collectedData.travelCategory = value;
                this.addUserMessage(value);
                this.askDestination();
            });
        }, 300);
    }

    askDestination() {
        this.conversationStage = 'destination';
        this.addBotMessage(`Excellent choice! Which ${this.collectedData.travelCategory.toLowerCase()} destination interests you?`);

        setTimeout(() => {
            const destinations = this.destinations[this.collectedData.travelCategory] || [];
            this.showDropdown(destinations, 'Select destination...', (value) => {
                this.collectedData.destination = value;
                this.addUserMessage(value);
                this.askDates();
            });
        }, 300);
    }

    askDates() {
        this.conversationStage = 'dates';
        this.addBotMessage("When are you hoping to travel? You can type it in (e.g., 'March 2026', 'Summer 2026', 'flexible') or select dates from the calendar.");

        setTimeout(() => {
            this.showDateInput((value) => {
                this.collectedData.travelDates = value;
                this.addUserMessage(value);
                this.askTravelers();
            });
        }, 300);
    }

    askTravelers() {
        this.conversationStage = 'travelers';
        this.addBotMessage("How many travelers will be going on this adventure?");

        setTimeout(() => {
            this.showTextInput('Number of travelers', (value) => {
                this.collectedData.numTravelers = value;
                this.addUserMessage(value);
                this.askInterests();
            });
        }, 300);
    }

    askInterests() {
        this.conversationStage = 'interests';
        this.addBotMessage("Any special interests or requests? (e.g., spa & relaxation, adventure activities, family-friendly, etc.)");

        setTimeout(() => {
            this.showTextArea('Your interests and preferences', (value) => {
                this.collectedData.interests = value;
                this.addUserMessage(value || 'No special requests');
                this.askContactMethod();
            });
        }, 300);
    }

    askContactMethod() {
        this.conversationStage = 'contactMethod';
        this.addBotMessage("How would you prefer Rodney to contact you?");

        setTimeout(() => {
            const methods = ['Email', 'Phone', 'Either is fine'];
            this.showDropdown(methods, 'Select contact method...', (value) => {
                this.collectedData.contactMethod = value;
                this.addUserMessage(value);

                if (value === 'Phone' || value === 'Either is fine') {
                    this.askCallTime();
                } else {
                    this.showConfirmation();
                }
            });
        }, 300);
    }

    askCallTime() {
        this.conversationStage = 'callTime';
        this.addBotMessage("What's the best time to call you?");

        setTimeout(() => {
            const times = ['Morning (9am-12pm)', 'Afternoon (12pm-5pm)', 'Evening (5pm-8pm)', 'Anytime'];
            this.showDropdown(times, 'Select best time...', (value) => {
                this.collectedData.callTime = value;
                this.addUserMessage(value);
                this.showConfirmation();
            });
        }, 300);
    }

    showConfirmation() {
        this.conversationStage = 'confirmation';

        const summary = `Perfect! Let me confirm everything:

📍 Type: ${this.collectedData.travelCategory}
🌍 Destination: ${this.collectedData.destination}
📅 Travel Dates: ${this.collectedData.travelDates}
👥 Travelers: ${this.collectedData.numTravelers}
${this.collectedData.interests ? `✨ Interests: ${this.collectedData.interests}` : ''}

📧 Email: ${this.collectedData.email}
📱 Phone: ${this.collectedData.phone}
📞 Contact via: ${this.collectedData.contactMethod || 'Not specified'}
${this.collectedData.callTime ? `⏰ Best time: ${this.collectedData.callTime}` : ''}

Does everything look correct?`;

        this.addBotMessage(summary);

        setTimeout(() => {
            this.showConfirmationButtons();
        }, 500);
    }

    showEditOptions() {
        this.addBotMessage("No problem! What would you like to change?");

        setTimeout(() => {
            this.inputArea.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <button class="woodtide-submit-button" id="edit-name">
                        Edit Name
                    </button>
                    <button class="woodtide-submit-button" id="edit-phone">
                        Edit Phone
                    </button>
                    <button class="woodtide-submit-button" id="edit-email">
                        Edit Email
                    </button>
                    <button class="woodtide-submit-button" id="edit-category">
                        Edit Travel Type
                    </button>
                    <button class="woodtide-submit-button" id="edit-destination">
                        Edit Destination
                    </button>
                    <button class="woodtide-submit-button" id="edit-dates">
                        Edit Travel Dates
                    </button>
                    <button class="woodtide-submit-button" id="edit-travelers">
                        Edit Number of Travelers
                    </button>
                    <button class="woodtide-submit-button" id="edit-interests">
                        Edit Interests
                    </button>
                    <button class="woodtide-submit-button" id="edit-contact-method">
                        Edit Contact Method
                    </button>
                    <button class="woodtide-submit-button" id="edit-call-time">
                        Edit Call Time
                    </button>
                    <button class="woodtide-submit-button" id="back-to-confirm">
                        ← Back to Confirmation
                    </button>
                </div>
            `;

            // Name edit
            document.getElementById('edit-name').addEventListener('click', () => {
                this.addUserMessage('I want to edit my name');
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

            // Phone edit
            document.getElementById('edit-phone').addEventListener('click', () => {
                this.addUserMessage('I want to edit my phone number');
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

            // Email edit
            document.getElementById('edit-email').addEventListener('click', () => {
                this.addUserMessage('I want to edit my email');
                this.addBotMessage("What's your email address?");
                setTimeout(() => {
                    this.showTextInput('Email address', (value) => {
                        if (!this.isValidEmail(value)) {
                            this.addBotMessage("Hmm, that doesn't look like a valid email. Could you double-check it?");
                            setTimeout(() => {
                                this.addBotMessage("What's your email address?");
                                setTimeout(() => {
                                    this.showTextInput('Email address', (newValue) => {
                                        if (!this.isValidEmail(newValue)) {
                                            this.addBotMessage("Still doesn't look right. Let's go back to the edit menu.");
                                            this.showEditOptions();
                                            return;
                                        }
                                        this.collectedData.email = newValue;
                                        this.addUserMessage(newValue);
                                        this.addBotMessage("Updated!");
                                        this.showConfirmation();
                                    });
                                }, 300);
                            }, 1000);
                            return;
                        }
                        this.collectedData.email = value;
                        this.addUserMessage(value);
                        this.addBotMessage("Updated!");
                        this.showConfirmation();
                    });
                }, 300);
            });

            // Category edit
            document.getElementById('edit-category').addEventListener('click', () => {
                this.addUserMessage('I want to edit the travel type');
                this.addBotMessage("What type of travel experience are you interested in?");
                setTimeout(() => {
                    const categories = Object.keys(this.destinations);
                    this.showDropdown(categories, 'Select travel type...', (value) => {
                        this.collectedData.travelCategory = value;
                        // Reset destination when category changes
                        this.collectedData.destination = '';
                        this.addUserMessage(value);
                        this.addBotMessage("Great! Now which destination?");
                        setTimeout(() => {
                            const destinations = this.destinations[value] || [];
                            this.showDropdown(destinations, 'Select destination...', (dest) => {
                                this.collectedData.destination = dest;
                                this.addUserMessage(dest);
                                this.addBotMessage("Updated!");
                                this.showConfirmation();
                            });
                        }, 300);
                    });
                }, 300);
            });

            // Destination edit
            document.getElementById('edit-destination').addEventListener('click', () => {
                this.addUserMessage('I want to edit the destination');
                this.addBotMessage(`Which ${this.collectedData.travelCategory.toLowerCase()} destination?`);
                setTimeout(() => {
                    const destinations = this.destinations[this.collectedData.travelCategory] || [];
                    this.showDropdown(destinations, 'Select destination...', (value) => {
                        this.collectedData.destination = value;
                        this.addUserMessage(value);
                        this.addBotMessage("Updated!");
                        this.showConfirmation();
                    });
                }, 300);
            });

            // Dates edit
            document.getElementById('edit-dates').addEventListener('click', () => {
                this.addUserMessage('I want to edit the travel dates');
                this.addBotMessage("When are you hoping to travel? You can type it in or select dates from the calendar.");
                setTimeout(() => {
                    this.showDateInput((value) => {
                        this.collectedData.travelDates = value;
                        this.addUserMessage(value);
                        this.addBotMessage("Updated!");
                        this.showConfirmation();
                    });
                }, 300);
            });

            // Travelers edit
            document.getElementById('edit-travelers').addEventListener('click', () => {
                this.addUserMessage('I want to edit the number of travelers');
                this.addBotMessage("How many travelers?");
                setTimeout(() => {
                    this.showTextInput('Number of travelers', (value) => {
                        this.collectedData.numTravelers = value;
                        this.addUserMessage(value);
                        this.addBotMessage("Updated!");
                        this.showConfirmation();
                    });
                }, 300);
            });

            // Interests edit
            document.getElementById('edit-interests').addEventListener('click', () => {
                this.addUserMessage('I want to edit my interests');
                this.addBotMessage("What are your special interests or requests?");
                setTimeout(() => {
                    this.showTextArea('Your interests and preferences', (value) => {
                        this.collectedData.interests = value;
                        this.addUserMessage(value || 'No special requests');
                        this.addBotMessage("Updated!");
                        this.showConfirmation();
                    });
                }, 300);
            });

            // Contact method edit
            document.getElementById('edit-contact-method').addEventListener('click', () => {
                this.addUserMessage('I want to edit the contact method');
                this.addBotMessage("How would you prefer Rodney to contact you?");
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
                                    this.collectedData.callTime = time;
                                    this.addUserMessage(time);
                                    this.addBotMessage("Updated!");
                                    this.showConfirmation();
                                });
                            }, 300);
                        } else {
                            this.collectedData.callTime = '';
                            this.addBotMessage("Updated!");
                            this.showConfirmation();
                        }
                    });
                }, 300);
            });

            // Call time edit
            document.getElementById('edit-call-time').addEventListener('click', () => {
                this.addUserMessage('I want to edit the call time');
                this.addBotMessage("What's the best time to call you?");
                setTimeout(() => {
                    const times = ['Morning (9am-12pm)', 'Afternoon (12pm-5pm)', 'Evening (5pm-8pm)', 'Anytime'];
                    this.showDropdown(times, 'Select best time...', (value) => {
                        this.collectedData.callTime = value;
                        this.addUserMessage(value);
                        this.addBotMessage("Updated!");
                        this.showConfirmation();
                    });
                }, 300);
            });

            // Back to confirmation
            document.getElementById('back-to-confirm').addEventListener('click', () => {
                this.addUserMessage('Back to confirmation');
                this.inputArea.innerHTML = ''; // Clear the edit menu first
                this.showConfirmation();
            });
        }, 300);
    }

    showConfirmationButtons() {
        this.inputArea.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <button class="woodtide-submit-button" id="woodtide-confirm">
                    ✓ Yes, send it!
                </button>
                <button class="woodtide-submit-button" id="woodtide-edit" style="background: #c9a961; border-color: #0a1628; color: #0a1628;">
                    ✎ Edit Something
                </button>
                <button class="woodtide-submit-button" id="woodtide-restart" style="background: #6c757d; border-color: #6c757d;">
                    ↺ Start Over
                </button>
            </div>
        `;

        document.getElementById('woodtide-confirm').addEventListener('click', () => {
            this.addUserMessage('Yes, send it!');
            this.submitToEmailJS();
        });

        document.getElementById('woodtide-edit').addEventListener('click', () => {
            this.addUserMessage('I want to edit something');
            this.showEditOptions();
        });

        document.getElementById('woodtide-restart').addEventListener('click', () => {
            this.addUserMessage('Let me start over');
            this.resetChat();
        });
    }

    async submitToEmailJS() {
        this.inputArea.innerHTML = '';
        this.showTypingIndicator();

        try {
            // Prepare email template parameters
            const templateParams = {
                from_name: this.collectedData.name,
                from_email: this.collectedData.email,
                phone: this.collectedData.phone,
                travel_category: this.collectedData.travelCategory,
                destination: this.collectedData.destination,
                travel_dates: this.collectedData.travelDates || 'Not specified',
                num_travelers: this.collectedData.numTravelers || 'Not specified',
                contact_method: this.collectedData.contactMethod || 'Not specified',
                call_time: this.collectedData.callTime || 'Not specified',
                message: `${this.collectedData.interests || 'No special requests'}

--- Submitted via AI Chat Widget (EmailJS mode) ---
This inquiry was collected through the conversational chat widget.`
            };

            // Send via EmailJS (v4 API)
            emailjs.send(
                this.emailjs.serviceId,
                this.emailjs.templateId,
                templateParams,
                this.emailjs.userId  // v4 requires userId as 4th parameter
            ).then((response) => {
                this.hideTypingIndicator();
                console.log('EmailJS Success:', response);
                this.showSuccess();
            }).catch((error) => {
                this.hideTypingIndicator();
                console.error('EmailJS Error:', error);
                this.showError();
            });

        } catch (error) {
            console.error('EmailJS Error:', error);
            this.hideTypingIndicator();
            this.showError();
        }
    }

    showSuccess() {
        const successMessage = `✅ Perfect! Your request has been sent to Rodney!

Rodney will contact you within 24 hours to discuss your ${this.collectedData.destination} adventure! 🌴✈️

If you have any questions in the meantime, feel free to reach out at rodney@woodtidetravel.com.`;

        this.addBotMessage(successMessage);

        // Show restart button
        this.inputArea.innerHTML = `
            <button class="woodtide-submit-button" id="woodtide-new-inquiry">
                Start New Inquiry
            </button>
        `;

        document.getElementById('woodtide-new-inquiry').addEventListener('click', () => {
            this.resetChat();
        });
    }

    showError() {
        const errorMessage = `Oops! Something went wrong sending your request.

Please try again, or email us directly at:
rodney@woodtidetravel.com

We apologize for the inconvenience!`;

        this.addBotMessage(errorMessage);

        // Show retry button
        this.inputArea.innerHTML = `
            <div style="display: flex; gap: 8px;">
                <button class="woodtide-submit-button" id="woodtide-retry">
                    Try Again
                </button>
                <button class="woodtide-submit-button" id="woodtide-restart-error" style="background: #6c757d; border-color: #6c757d;">
                    Start Over
                </button>
            </div>
        `;

        document.getElementById('woodtide-retry').addEventListener('click', () => {
            this.submitToEmailJS();
        });

        document.getElementById('woodtide-restart-error').addEventListener('click', () => {
            this.resetChat();
        });
    }

    resetChat() {
        // Clear messages
        this.messagesContainer.innerHTML = '';
        this.inputArea.innerHTML = '';

        // Reset state
        this.collectedData = {};
        this.conversationStage = 'greeting';
        this.waitingForInput = false;

        // Show greeting again
        this.showGreeting();
    }

    // Input helpers
    showTextInput(placeholder, callback) {
        this.inputArea.innerHTML = `
            <div class="woodtide-chat-input-wrapper">
                <input
                    type="text"
                    class="woodtide-chat-input"
                    id="woodtide-current-input"
                    placeholder="${placeholder}"
                    autocomplete="off"
                />
                <button class="woodtide-chat-send-button" id="woodtide-send-btn">
                    ➤
                </button>
            </div>
        `;

        const input = document.getElementById('woodtide-current-input');
        const sendBtn = document.getElementById('woodtide-send-btn');

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

    showDateInput(callback) {
        this.inputArea.innerHTML = `
            <div class="woodtide-chat-input-wrapper" style="position: relative;">
                <input
                    type="text"
                    class="woodtide-chat-input"
                    id="woodtide-date-text-input"
                    placeholder="Type dates or pick from calendar"
                    autocomplete="off"
                    style="padding-right: 90px;"
                    readonly
                />
                <button
                    class="woodtide-calendar-btn"
                    id="woodtide-calendar-btn"
                    type="button"
                    style="position: absolute; right: 50px; top: 50%; transform: translateY(-50%); background: transparent; border: none; cursor: pointer; font-size: 18px; padding: 5px; color: #c9a961;"
                    title="Pick dates from calendar"
                >
                    📅
                </button>
                <button class="woodtide-chat-send-button" id="woodtide-send-btn">
                    ➤
                </button>
            </div>
        `;

        const textInput = document.getElementById('woodtide-date-text-input');
        const sendBtn = document.getElementById('woodtide-send-btn');

        const handleSend = () => {
            const value = textInput.value.trim();
            if (value) {
                callback(value);
                this.inputArea.innerHTML = '';
                if (this.flatpickrInstance) {
                    this.flatpickrInstance.destroy();
                    this.flatpickrInstance = null;
                }
            }
        };

        // Initialize Flatpickr with range mode
        if (typeof flatpickr !== 'undefined') {
            this.flatpickrInstance = flatpickr(textInput, {
                mode: 'range',
                minDate: 'today',
                dateFormat: 'F j, Y',
                onChange: function(selectedDates, dateStr, instance) {
                    // Auto-populate the input as dates are selected
                    if (selectedDates.length === 2) {
                        const start = selectedDates[0].toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                        const end = selectedDates[1].toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                        textInput.value = `${start} to ${end}`;
                    } else if (selectedDates.length === 1) {
                        textInput.value = selectedDates[0].toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                    }
                },
                onClose: function(selectedDates, dateStr, instance) {
                    // Allow typing after calendar closes
                    textInput.removeAttribute('readonly');
                },
                onOpen: function(selectedDates, dateStr, instance) {
                    // Make readonly when calendar opens
                    textInput.setAttribute('readonly', 'readonly');
                }
            });
        } else {
            // Fallback if Flatpickr isn't loaded
            console.warn('Flatpickr not loaded, using text input only');
            textInput.removeAttribute('readonly');
            textInput.placeholder = 'Type dates (e.g., March 2026, flexible)';
        }

        sendBtn.addEventListener('click', handleSend);

        textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
            }
        });

        setTimeout(() => textInput.focus(), 100);
    }

    showTextArea(placeholder, callback) {
        this.inputArea.innerHTML = `
            <textarea
                class="woodtide-chat-input"
                id="woodtide-current-input"
                placeholder="${placeholder}"
                style="width: 100%; min-height: 80px; resize: vertical; border-radius: 12px; padding: 12px; box-sizing: border-box; margin-bottom: 8px;"
            ></textarea>
            <button class="woodtide-submit-button" id="woodtide-send-btn">
                Continue ➤
            </button>
        `;

        const input = document.getElementById('woodtide-current-input');
        const sendBtn = document.getElementById('woodtide-send-btn');

        sendBtn.addEventListener('click', () => {
            const value = input.value.trim();
            callback(value);
            this.inputArea.innerHTML = '';
        });

        setTimeout(() => input.focus(), 100);
    }

    showDropdown(options, placeholder, callback) {
        const optionsHtml = options.map(opt =>
            `<option value="${opt}">${opt}</option>`
        ).join('');

        this.inputArea.innerHTML = `
            <select
                class="woodtide-chat-input"
                id="woodtide-current-select"
                style="width: 100%; padding: 12px; border-radius: 12px; cursor: pointer; box-sizing: border-box;"
            >
                <option value="">${placeholder}</option>
                ${optionsHtml}
            </select>
        `;

        const select = document.getElementById('woodtide-current-select');

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
        messageDiv.className = 'woodtide-chat-message bot';

        const avatar = document.createElement('div');
        avatar.className = 'woodtide-message-avatar bot';
        avatar.textContent = '✈️';

        const content = document.createElement('div');
        content.className = 'woodtide-message-content bot';
        content.style.whiteSpace = 'pre-line';
        content.textContent = text;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'woodtide-chat-message user';

        const avatar = document.createElement('div');
        avatar.className = 'woodtide-message-avatar user';
        avatar.textContent = '👤';

        const content = document.createElement('div');
        content.className = 'woodtide-message-content user';
        content.textContent = text;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'woodtide-chat-message bot';
        typingDiv.id = 'woodtide-typing';

        const avatar = document.createElement('div');
        avatar.className = 'woodtide-message-avatar bot';
        avatar.textContent = '✈️';

        const indicator = document.createElement('div');
        indicator.className = 'woodtide-message-content bot';
        indicator.innerHTML = `
            <div class="woodtide-typing-indicator">
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
        const typing = document.getElementById('woodtide-typing');
        if (typing) {
            typing.remove();
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Auto-initialize if emailjs is already loaded
if (typeof emailjs !== 'undefined') {
    console.log('Wood Tide Chat Widget ready - EmailJS mode');
} else {
    console.warn('EmailJS not loaded - chat widget may not function properly');
}
