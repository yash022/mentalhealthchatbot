


// document.addEventListener('DOMContentLoaded', function() {
//     const chatMessages = document.getElementById('chat-messages');
//     const userInput = document.getElementById('user-input');
//     const sendButton = document.getElementById('send-button');
    
//     // Together AI API details
//     const API_KEY = "88a1069d6468d3f7827919e0bb483e75ed87268ebaa6ea556dea8a7150db12a1";
//     const API_URL = "https://api.together.xyz/v1/chat/completions";
    
//     // Initial bot message
//     if (chatMessages.children.length === 0) {
//         addMessage("Hi there! I'm Heaven, your mental health companion. How are you feeling today?", 'bot');
//     }
    
//     // Add event listeners
//     sendButton.addEventListener('click', sendMessage);
//     userInput.addEventListener('keypress', function(e) {
//         if (e.key === 'Enter') {
//             sendMessage();
//         }
//     });
    
//     // Function to send message
//     async function sendMessage() {
//         const message = userInput.value.trim();
//         if (message === '') return;
        
//         // Add user message to chat
//         addMessage(message, 'user');
//         userInput.value = '';
        
//         // Show typing indicator
//         const typingIndicator = document.createElement('div');
//         typingIndicator.className = 'message bot-message typing-indicator';
//         typingIndicator.textContent = 'Heaven is typing...';
//         chatMessages.appendChild(typingIndicator);
        
//         // Scroll to bottom of chat
//         chatMessages.scrollTop = chatMessages.scrollHeight;
        
//         try {
//             // Get response from Together AI API
//             const response = await fetchBotResponse(message);
            
//             // Remove typing indicator
//             chatMessages.removeChild(typingIndicator);
            
//             // Add bot response to chat
//             addMessage(response, 'bot');
//         } catch (error) {
//             console.error('Error getting bot response:', error);
            
//             // Remove typing indicator
//             chatMessages.removeChild(typingIndicator);
            
//             // Add fallback message if API call fails
//             addMessage("I'm having trouble connecting right now. Could you try again in a moment?", 'bot');
//         }
//     }
    
//     // Function to add a message to the chat
//     function addMessage(message, sender) {
//         const messageElement = document.createElement('div');
//         messageElement.classList.add('message');
//         messageElement.classList.add(sender + '-message');
//         messageElement.textContent = message;
        
//         chatMessages.appendChild(messageElement);
        
//         // Scroll to bottom of chat
//         chatMessages.scrollTop = chatMessages.scrollHeight;
//     }
    
//     // Function to get response from Together AI API
//     async function fetchBotResponse(userMessage) {
//         const chatHistory = [];
        
//         // Get all existing messages from the chat
//         const messageElements = chatMessages.querySelectorAll('.message');
//         messageElements.forEach(element => {
//             if (element.classList.contains('bot-message')) {
//                 chatHistory.push({ role: "assistant", content: element.textContent });
//             } else if (element.classList.contains('user-message')) {
//                 chatHistory.push({ role: "user", content: element.textContent });
//             }
//         });
        
//         // Add the latest user message
//         chatHistory.push({ role: "user", content: userMessage });
        
//         // Prepare the payload for the API
//         const payload = {
//             model: "meta-llama/Llama-3-8b-chat-hf", // You can change to a different model if needed
//             messages: chatHistory,
//             max_tokens: 300,
//             temperature: 0.7,
//             system_prompt: "You are Heaven, a compassionate AI mental health companion. Your purpose is to provide supportive, empathetic responses to users discussing their mental health concerns. Give thoughtful advice that promotes wellbeing, self-care, and healthy coping strategies. If the user mentions serious issues like self-harm or suicidal thoughts, gently encourage them to seek professional help. Keep responses warm, concise, and focused on emotional support without being clinical or distant."
//         };
        
//         // Make the API call
//         const response = await fetch(API_URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${API_KEY}`
//             },
//             body: JSON.stringify(payload)
//         });
        
//         if (!response.ok) {
//             throw new Error(`API response error: ${response.status}`);
//         }
        
//         const data = await response.json();
//         return data.choices[0].message.content;
//     }
// });



document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    // Crisis keywords list
    const crisisKeywords = [
        'suicide', 'kill myself', 'want to die', 'end my life', 
        'better off dead', 'no reason to live', 'can\'t go on', 
        'hurt myself', 'self harm', 'cut myself'
    ];
    
    // Function to check for crisis keywords
    function checkForCrisis(message) {
        const lowercaseMessage = message.toLowerCase();
        for (const keyword of crisisKeywords) {
            if (lowercaseMessage.includes(keyword)) {
                return true;
            }
        }
        return false;
    }
    
    // Together AI API details
    const API_KEY = "88a1069d6468d3f7827919e0bb483e75ed87268ebaa6ea556dea8a7150db12a1";
    const API_URL = "https://api.together.xyz/v1/chat/completions";
    
    // Initial bot message
    if (chatMessages.children.length === 0) {
        addMessage("Hi there! I'm Heaven, your mental health companion. How are you feeling today?", 'bot');
    }
    
    // Add event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Function to send message
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        userInput.value = '';
        
        // Check for crisis keywords
        if (checkForCrisis(message)) {
            // Crisis detected - add crisis response and open helpline
            addMessage("I notice you've mentioned something that concerns me. Your wellbeing is important, and there are people available to talk 24/7 if you're going through a difficult time.", 'bot');
            
            // Wait a moment before showing the helpline link
            setTimeout(() => {
                // Create a special message with helpline information
                const helplineElement = document.createElement('div');
                helplineElement.className = 'message bot-message crisis-message';
                helplineElement.innerHTML = `
                    <p>Would you like to see some crisis resources that might help?</p>
                    <div class="crisis-buttons">
                        <button id="crisis-yes">Yes, please</button>
                        <button id="crisis-no">Not now</button>
                    </div>
                `;
                chatMessages.appendChild(helplineElement);
                
                // Scroll to show the message
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Add event listeners to the buttons
                document.getElementById('crisis-yes').addEventListener('click', function() {
                    // Open crisis helpline website
                    window.open('https://988lifeline.org/', '_blank');
                    
                    // Replace buttons with confirmation
                    helplineElement.innerHTML = `<p>I've opened the National Suicide Prevention Lifeline website in a new tab. Remember, reaching out for help shows courage and strength.</p>`;
                    
                    // Add a follow-up message
                    addMessage("Would you like to continue our conversation? I'm here to listen and support you.", 'bot');
                });
                
                document.getElementById('crisis-no').addEventListener('click', function() {
                    // Replace buttons with acknowledgment
                    helplineElement.innerHTML = `<p>I understand. I'm here to listen if you want to talk. Remember that support is available whenever you need it.</p>`;
                    
                    // Continue the conversation normally
                    addMessage("Is there something specific you'd like to talk about today?", 'bot');
                });
                
                // Add styles for crisis message if not already added
                if (!document.getElementById('crisis-styles')) {
                    const style = document.createElement('style');
                    style.id = 'crisis-styles';
                    style.textContent = `
                    /* Add or update these styles to fix the weird shape beside message boxes */
                    /* More aggressive fix for the weird shapes beside message boxes */
.user-message:before, .user-message:after,
.bot-message:before, .bot-message:after {
    display: none !important; /* Remove all pseudo-elements */
}

/* Create new cleaner message bubbles without tails */
.message {
    position: relative;
    border-radius: 18px !important; /* Make all corners rounded */
    margin-bottom: 1rem;
    max-width: 80%;
    padding: 1rem 1.2rem;
    line-height: 1.4;
}

.user-message {
    background: linear-gradient(135deg, #bbdefb 0%, #e3f2fd 100%);
    color: #444;
    align-self: flex-end;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bot-message {
    background-color: white;
    color: #555;
    align-self: flex-start;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
    
                        .crisis-message {
                            background-color: #fff8e1;
                            border-left: 3px solid #ffb300;
                        }
                        .crisis-buttons {
                            display: flex;
                            gap: 10px;
                            margin-top: 10px;
                        }
                        .crisis-buttons button {
                            padding: 8px 15px;
                            border-radius: 20px;
                            border: none;
                            cursor: pointer;
                            font-weight: 500;
                            transition: all 0.3s ease;
                        }
                        #crisis-yes {
                            background: linear-gradient(135deg, #42a5f5 0%, #1976d2 100%);
                            color: white;
                        }
                        #crisis-no {
                            background-color: #f1f1f1;
                            color: #555;
                        }
                        .crisis-buttons button:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
                        }
                    `;
                    document.head.appendChild(style);
                }
            }, 1000);
            
            return; // Don't proceed with API call
        }
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot-message typing-indicator';
        typingIndicator.textContent = 'Heaven is typing...';
        chatMessages.appendChild(typingIndicator);
        
        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        try {
            // Get response from Together AI API
            const response = await fetchBotResponse(message);
            
            // Remove typing indicator
            chatMessages.removeChild(typingIndicator);
            
            // Add bot response to chat
            addMessage(response, 'bot');
        } catch (error) {
            console.error('Error getting bot response:', error);
            
            // Remove typing indicator
            chatMessages.removeChild(typingIndicator);
            
            // Add fallback message if API call fails
            addMessage("I'm having trouble connecting right now. Could you try again in a moment?", 'bot');
        }
    }
    
    // Function to add a message to the chat
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender + '-message');
        messageElement.textContent = message;
        
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to get response from Together AI API
    async function fetchBotResponse(userMessage) {
        const chatHistory = [];
        
        // Get all existing messages from the chat
        const messageElements = chatMessages.querySelectorAll('.message');
        messageElements.forEach(element => {
            if (element.classList.contains('bot-message')) {
                chatHistory.push({ role: "assistant", content: element.textContent });
            } else if (element.classList.contains('user-message')) {
                chatHistory.push({ role: "user", content: element.textContent });
            }
        });
        
        // Add the latest user message
        chatHistory.push({ role: "user", content: userMessage });
        
        // Prepare the payload for the API
        const payload = {
            model: "meta-llama/Llama-3-8b-chat-hf", // You can change to a different model if needed
            messages: chatHistory,
            max_tokens: 300,
            temperature: 0.7,
            system_prompt: "You are Heaven, a compassionate AI mental health companion. Your purpose is to provide supportive, empathetic responses to users discussing their mental health concerns. Give thoughtful advice that promotes wellbeing, self-care, and healthy coping strategies. If the user mentions serious issues like self-harm or suicidal thoughts, gently encourage them to seek professional help. Keep responses warm, concise, and focused on emotional support without being clinical or distant."
        };
        
        // Make the API call
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`API response error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    }
});


function showResults() {
    // Calculate score
    let totalScore = 0;
    for (const question in userAnswers) {
        totalScore += userAnswers[question];
    }
    
    // Update UI to show results
    const assessmentCard = document.querySelector('.assessment-card');
    if (assessmentCard) {
        assessmentCard.innerHTML = `
            <div class="assessment-header">
                <h3>Your Assessment Results</h3>
                <p>Thank you for completing the assessment.</p>
            </div>
            <div class="results-content">
                <p>Based on your responses, we've prepared some initial insights. Remember, this is not a clinical diagnosis.</p>
                <div class="results-score">
                    <div class="score-bar">
                        <div class="progress-bar">
                            <div class="progress-filled" style="width: ${(totalScore / (totalQuestions * 3)) * 100}%"></div>
                        </div>
                        <p class="score-label">Your score: ${totalScore} out of ${totalQuestions * 3}</p>
                    </div>
                </div>
                <div class="results-message">
                    ${getResultMessage(totalScore, totalQuestions)}
                </div>
                <div class="results-actions">
                    <button class="restart-button">Take Assessment Again</button>
                    <a href="#chat" class="chat-link">Talk to Heaven</a>
                </div>
            </div>
        `;
        
        // Add event listener for restart button
        const restartButton = assessmentCard.querySelector('.restart-button');
        if (restartButton) {
            restartButton.addEventListener('click', function() {
                currentQuestion = 1;
                userAnswers = {};
                updateQuestion();
            });
        }
    } else {
        console.error("Assessment card element not found");
    }
}

// Make sure these variables are properly declared at the appropriate scope
let currentQuestion = 1;
const totalQuestions = 9;
const userAnswers = {};

// Function to get result message based on score - ensure this exists
function getResultMessage(score, totalQuestions) {
    const maxScore = totalQuestions * 3;
    const percentage = (score / maxScore) * 100;
    
    if (percentage < 25) {
        return `<p>Your responses suggest minimal signs of distress. Continue your self-care practices and monitor your wellbeing.</p>`;
    } else if (percentage < 50) {
        return `<p>Your responses suggest mild signs of distress. Consider incorporating additional self-care practices and stress management techniques.</p>`;
    } else if (percentage < 75) {
        return `<p>Your responses suggest moderate signs of distress. It may be beneficial to explore additional support options, including our resources section.</p>`;
    } else {
        return `<p>Your responses suggest significant signs of distress. We recommend connecting with a mental health professional for further support and guidance.</p>`;
    }
}

// Make sure the listener for the next button properly handles the last question
document.addEventListener('DOMContentLoaded', function() {
    const nextButton = document.querySelector('.next-button');
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            // Get selected answer for current question
            const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
            if (selectedOption) {
                // Save the answer
                userAnswers[currentQuestion] = parseInt(selectedOption.value);
                
                // Move to next question
                currentQuestion++;
                
                if (currentQuestion <= totalQuestions) {
                    updateQuestion();
                } else {
                    // Show results on the last question
                    showResults();
                    console.log("Assessment completed, showing results");
                }
            } else {
                alert("Please select an answer before proceeding.");
            }
        });
    }
});
    // Add this function to your existing JavaScript to generate random mood data

// Helper function to format date
function formatDate(date) {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return month + ' ' + day;
}
// 
// Function to set up the mood tracker with random initial data
function setupMoodTracker() {
    // Initialize localStorage if it doesn't exist or generate random data
    if (!localStorage.getItem('moodData') || localStorage.getItem('useRandomData') === 'true') {
        // Create array for the last 7 days with random data
        const today = new Date();
        const moodData = [];
        
        // Generate random values for the past 7 days
        // Values from 0-4 (0 = Very Low, 4 = Very Good)
        const moodLabels = ["Very Low", "Low", "Neutral", "Good", "Very Good"];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            
            // Generate random mood value between 1 and 4 (avoid too many "Very Low" values)
            const randomValue = Math.floor(Math.random() * 4) + 1;
            
            moodData.push({
                date: formatDate(date),
                value: randomValue,
                label: moodLabels[randomValue]
            });
        }
        
        localStorage.setItem('moodData', JSON.stringify(moodData));
        localStorage.setItem('useRandomData', 'false'); // Only generate random data once
    }
    
    // Initial render of the chart
    updateMoodChart();
}

// Function to update the mood chart visualization
function updateMoodChart() {
    const moodData = JSON.parse(localStorage.getItem('moodData')) || [];
    const chartContainer = document.querySelector('.mood-chart');
    
    if (!chartContainer) return;
    
    // Clear previous chart
    chartContainer.innerHTML = '';
    
    // Add chart lines (grid)
    for (let i = 0; i < 4; i++) {
        const line = document.createElement('div');
        line.className = 'chart-line';
        line.style.top = (20 + i * 20) + '%';
        chartContainer.appendChild(line);
    }
    
    // Create chart data points
    const chartData = document.createElement('div');
    chartData.className = 'chart-data';
    chartContainer.appendChild(chartData);
    
    // Add data points
    moodData.forEach(day => {
        const dataPoint = document.createElement('div');
        dataPoint.className = 'data-point';
        
        const barHeight = day.value !== null ? (day.value + 1) * 15 : 0; // Scale 0-4 to 15-75%
        
        const bar = document.createElement('div');
        bar.className = 'point-bar';
        bar.style.height = barHeight + '%';
        if (day.value !== null) {
            bar.title = day.label + ' (' + day.date + ')';
        }
        
        const date = document.createElement('div');
        date.className = 'point-date';
        date.textContent = day.date;
        
        dataPoint.appendChild(bar);
        dataPoint.appendChild(date);
        chartData.appendChild(dataPoint);
    });
    
    // Add chart label
    const chartLabel = document.createElement('div');
    chartLabel.className = 'chart-label';
    chartLabel.textContent = 'Your mood history (last 7 days)';
    chartContainer.appendChild(chartLabel);
}

// Function to save mood data
function saveMood(value, label) {
    const today = new Date();
    const formattedDate = formatDate(today);
    
    // Get existing data
    let moodData = JSON.parse(localStorage.getItem('moodData')) || [];
    
    // Check if today's entry already exists
    const todayIndex = moodData.findIndex(item => item.date === formattedDate);
    
    if (todayIndex !== -1) {
        // Update today's entry
        moodData[todayIndex].value = value;
        moodData[todayIndex].label = label;
    } else {
        // Add today's entry and remove the oldest
        moodData.push({
            date: formattedDate,
            value: value,
            label: label
        });
        if (moodData.length > 7) {
            moodData.shift(); // Remove oldest entry
        }
    }
    
    // Save updated data
    localStorage.setItem('moodData', JSON.stringify(moodData));
    
    // Show confirmation
    alert('Your mood has been saved!');
    
    // Update chart
    updateMoodChart();
}

// When the page loads, initialize the mood data and chart
document.addEventListener('DOMContentLoaded', function() {
    // Force random data generation (remove this line if you only want random data the first time)
    localStorage.setItem('useRandomData', 'true');
    
    // Set up the mood tracker
    setupMoodTracker();
    
    // Handle mood selection
    const moodItems = document.querySelectorAll('.mood-item');
    if (moodItems.length > 0) {
        moodItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                // Remove active class from all mood items
                moodItems.forEach(m => m.classList.remove('active'));
                
                // Add active class to clicked mood item
                this.classList.add('active');
                
                // Get the mood value (0-4, where 0 is "Very Low" and 4 is "Very Good")
                const moodValue = index;
                const moodText = this.querySelector('.mood-label').textContent;
                
                // Save the current mood with today's date
                saveMood(moodValue, moodText);
            });
        });
    }
});

  

function showResults() {
    // Calculate score - example scoring system
    let totalScore = 0;
    for (const question in userAnswers) {
        totalScore += userAnswers[question];
    }
    
    // Update UI to show results
    const assessmentCard = document.querySelector('.assessment-card');
    if (assessmentCard) {
        assessmentCard.innerHTML = `
            <div class="assessment-header">
                <h3>Your Assessment Results</h3>
                <p>Thank you for completing the assessment.</p>
            </div>
            <div class="results-content">
                <p>Based on your responses, we've prepared some initial insights. Remember, this is not a clinical diagnosis.</p>
                <div class="results-score">
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${(totalScore / (totalQuestions * 3)) * 100}%"></div>
                    </div>
                    <p class="score-label">Your score: ${totalScore} out of ${totalQuestions * 3}</p>
                </div>
                <div class="results-message">
                    ${getResultMessage(totalScore, totalQuestions)}
                </div>
                <div class="results-actions">
                    <button class="restart-button">Take Assessment Again</button>
                    <a href="#chat" class="chat-link">Talk to Heaven</a>
                </div>
            </div>
        `;
        
        // Add event listener for restart button
        const restartButton = assessmentCard.querySelector('.restart-button');
        if (restartButton) {
            restartButton.addEventListener('click', function() {
                currentQuestion = 1;
                userAnswers = {};
                updateQuestion();
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Helper function to format date - moved to the top
    function formatDate(date) {
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        return month + ' ' + day;
    }
    
    // Function to update the mood chart
    function updateMoodChart() {
        const moodData = JSON.parse(localStorage.getItem('moodData')) || [];
        const chartContainer = document.querySelector('.mood-chart');
        
        if (!chartContainer) return;
        
        // Clear previous chart
        chartContainer.innerHTML = '';
        
        // Add chart lines (grid)
        for (let i = 0; i < 4; i++) {
            const line = document.createElement('div');
            line.className = 'chart-line';
            line.style.top = (20 + i * 20) + '%';
            chartContainer.appendChild(line);
        }
        
        // Create chart data points
        const chartData = document.createElement('div');
        chartData.className = 'chart-data';
        chartContainer.appendChild(chartData);
        
        // Add data points
        moodData.forEach(day => {
            const dataPoint = document.createElement('div');
            dataPoint.className = 'data-point';
            
            const barHeight = day.value !== null ? (day.value + 1) * 20 : 0; // Scale 0-4 to 20-100%
            
            const bar = document.createElement('div');
            bar.className = 'point-bar';
            bar.style.height = barHeight + '%';
            if (day.value !== null) {
                bar.title = day.label + ' (' + day.date + ')';
            }
            
            const date = document.createElement('div');
            date.className = 'point-date';
            date.textContent = day.date;
            
            dataPoint.appendChild(bar);
            dataPoint.appendChild(date);
            chartData.appendChild(dataPoint);
        });
        
        // Add chart label
        const chartLabel = document.createElement('div');
        chartLabel.className = 'chart-label';
        chartLabel.textContent = 'Your mood history (last 7 days)';
        chartContainer.appendChild(chartLabel);
    }
    
    // Function to save mood data
    function saveMood(value, label) {
        const today = new Date();
        const formattedDate = formatDate(today);
        
        // Get existing data
        let moodData = JSON.parse(localStorage.getItem('moodData')) || [];
        
        // Check if today's entry already exists
        const todayIndex = moodData.findIndex(item => item.date === formattedDate);
        
        if (todayIndex !== -1) {
            // Update today's entry
            moodData[todayIndex].value = value;
            moodData[todayIndex].label = label;
        } else {
            // Add today's entry and remove the oldest
            moodData.push({
                date: formattedDate,
                value: value,
                label: label
            });
            if (moodData.length > 7) {
                moodData.shift(); // Remove oldest entry
            }
        }
        
        // Save updated data
        localStorage.setItem('moodData', JSON.stringify(moodData));
        
        // Show confirmation
        alert('Your mood has been saved!');
    }
    
    // Function to set up the mood tracker
    function setupMoodTracker() {
        // Initialize localStorage if it doesn't exist
        if (!localStorage.getItem('moodData')) {
            // Create empty array for the last 7 days
            const today = new Date();
            const moodData = [];
            
            // Initialize with null values for the past 7 days
            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(today.getDate() - i);
                moodData.push({
                    date: formatDate(date),
                    value: null,
                    label: null
                });
            }
            
            localStorage.setItem('moodData', JSON.stringify(moodData));
        }
        
        // Initial render of the chart
        updateMoodChart();
    }
    
    // Set up the mood tracker
    setupMoodTracker();
    
    // Handle mood selection
    const moodItems = document.querySelectorAll('.mood-item');
    if (moodItems.length > 0) {
        moodItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                // Remove active class from all mood items
                moodItems.forEach(m => m.classList.remove('active'));
                
                // Add active class to clicked mood item
                this.classList.add('active');
                
                // Get the mood value (0-4, where 0 is "Very Low" and 4 is "Very Good")
                const moodValue = index;
                const moodText = this.querySelector('.mood-label').textContent;
                
                // Save the current mood with today's date
                saveMood(moodValue, moodText);
                
                // Update the chart
                updateMoodChart();
            });
        });
    }
    
    // For the Mental Health Assessment section
    const nextButton = document.querySelector('.next-button');
    const progressBar = document.querySelector('.progress-filled');
    const progressText = document.querySelector('.progress-text');
    const questionCount = document.querySelector('.question-count');
    const questionElement = document.querySelector('.assessment-question h4');
    const optionsContainer = document.querySelector('.question-options');
    
    if (nextButton && progressBar && progressText && questionCount) {
        let currentQuestion = 1;
        const totalQuestions = 9;
        const userAnswers = {};
        
        // Array of different questions for the assessment
        const questions = [
            {
                question: "Over the past two weeks, how often have you felt down, depressed, or hopeless?",
                options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
            },
            {
                question: "How often have you had little interest or pleasure in doing things?",
                options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
            },
            {
                question: "How often have you had trouble falling or staying asleep, or sleeping too much?",
                options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
            },
            {
                question: "How often have you felt tired or had little energy?",
                options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
            },
            {
                question: "How often have you had poor appetite or been overeating?",
                options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
            },
            {
                question: "How often have you felt bad about yourself, or that you are a failure?",
                options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
            },
            {
                question: "How often have you had trouble concentrating on things?",
                options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
            },
            {
                question: "How often have you been so fidgety or restless that you move around more than usual?",
                options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
            },
            {
                question: "How often have you felt anxious, nervous, or on edge?",
                options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
            }
        ];
        
        // Update the UI with the current question
        function updateQuestion() {
            if (currentQuestion <= totalQuestions) {
                // Update the question text
                if (questionElement) {
                    questionElement.textContent = questions[currentQuestion-1].question;
                }
                
                // Update the options
                if (optionsContainer) {
                    let optionsHTML = '';
                    questions[currentQuestion-1].options.forEach((option, index) => {
                        optionsHTML += `
                            <label class="option">
                                <input type="radio" name="q${currentQuestion}" value="${index}">
                                <span class="option-text">${option}</span>
                            </label>
                        `;
                    });
                    optionsContainer.innerHTML = optionsHTML;
                }
                
                // Update the progress display
                const progress = ((currentQuestion - 1) / totalQuestions) * 100;
                progressBar.style.width = `${progress}%`;
                progressText.textContent = `${Math.round(progress)}% Complete`;
                questionCount.textContent = `Question ${currentQuestion} of ${totalQuestions}`;
            } else {
                // Assessment completed
                showResults();
            }
        }
        
        // Handle the "Next Question" button
        nextButton.addEventListener('click', function() {
            // Get selected answer for current question
            const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
            
            if (selectedOption) {
                // Save the answer
                userAnswers[currentQuestion] = parseInt(selectedOption.value);
                
                // Move to next question
                currentQuestion++;
                
                if (currentQuestion <= totalQuestions) {
                    updateQuestion();
                } else {
                    // Show results on the last question
                    showResults();
                }
            } else {
                alert("Please select an answer before proceeding.");
            }
        });
        
        // Helper function to get result message based on score
        function getResultMessage(score, totalQuestions) {
            const maxScore = totalQuestions * 3;
            const percentage = (score / maxScore) * 100;
            
            if (percentage < 25) {
                return `<p>Your responses suggest minimal signs of distress. Continue your self-care practices and monitor your wellbeing.</p>`;
            } else if (percentage < 50) {
                return `<p>Your responses suggest mild signs of distress. Consider incorporating additional self-care practices and stress management techniques.</p>`;
            } else if (percentage < 75) {
                return `<p>Your responses suggest moderate signs of distress. It may be beneficial to explore additional support options, including our resources section.</p>`;
            } else {
                return `<p>Your responses suggest significant signs of distress. We recommend connecting with a mental health professional for further support and guidance.</p>`;
            }
        }
        
        // Initialize the first question
        updateQuestion();
    }
    
    // Journal system
    const journalTextarea = document.querySelector('.journal-textarea');
    const saveButton = document.querySelector('.journal-save');
    
    if (journalTextarea && saveButton) {
        // Load saved journal entry
        try {
            const savedJournal = localStorage.getItem('mindfulAI-journal');
            if (savedJournal) {
                journalTextarea.value = savedJournal;
            }
        } catch (e) {
            console.error('Error loading from localStorage:', e);
        }
        
        // Save when button is clicked
        saveButton.addEventListener('click', function() {
            try {
                const journalText = journalTextarea.value;
                localStorage.setItem('mindfulAI-journal', journalText);
                alert('Journal entry saved successfully!');
            } catch (e) {
                alert('Failed to save journal entry. Error: ' + e.message);
                console.error('Error saving to localStorage:', e);
            }
        });
    }
    
    // Chatbot functionality
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    // Bot responses
    const botResponses = [
        "How are you feeling today?",
        "Tell me more about that. How does it make you feel?",
        "That sounds challenging. What helps you cope when you feel this way?",
        "I'm here to listen. Would you like to talk more about this?",
        "Taking care of your mental health is important. Have you tried any relaxation techniques recently?",
        "Remember that it's okay to ask for help when you need it.",
        "What are some positive things that happened in your day today?",
        "Deep breathing can sometimes help in moments of stress. Would you like to try a quick breathing exercise?",
        "It's brave of you to share your feelings. How can I support you right now?",
        "Would it help to talk about some coping strategies for this situation?"
    ];
    
    // Add event listeners for chat
    if (sendButton && userInput && chatMessages) {
        // Send message when button is clicked
        sendButton.addEventListener('click', sendMessage);
        
        // Send message when Enter key is pressed
        userInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Function to send message
    function sendMessage() {
        const message = userInput.value.trim();
        
        // Don't send empty messages
        if (message === '') {
            return;
        }
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input field
        userInput.value = '';
        
        // Check for crisis keywords
        if (checkForCrisis(message)) {
            // Wait a moment before showing crisis message
            setTimeout(() => {
                addMessage("I notice you might be experiencing distress. Remember that help is available. Would you like to see some crisis resources?", 'bot');
                
                // Open the crisis resources page in a new tab
                window.open('https://988lifeline.org/', '_blank');
                
                // Show simple alert
                setTimeout(() => {
                    alert("We've opened our crisis resources page in a new tab to provide immediate support.");
                }, 1000);
            }, 1000);
        } else {
            // Normal response - wait a moment to simulate thinking
            setTimeout(() => {
                // Generate a random response
                const randomIndex = Math.floor(Math.random() * botResponses.length);
                const botReply = botResponses[randomIndex];
                
                // Add bot message to chat
                addMessage(botReply, 'bot');
            }, 1000);
        }
    }
    
    // Function to add message to chat
    function addMessage(text, type) {
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.textContent = text;
        
        // Add to chat
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.getElementById('nav');
    const overlay = document.getElementById('overlay');
    
    // Mobile menu toggle
    if (mobileMenuBtn && nav && overlay) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close mobile menu when overlay is clicked
        overlay.addEventListener('click', function() {
            nav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }
    
    // Close mobile menu when navigation link is clicked
    const navLinks = document.querySelectorAll('nav ul li a');
    if (navLinks.length > 0 && nav && overlay) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
    
    // Animation for scroll effects
    const animateOnScroll = function() {
        const fadeElements = document.querySelectorAll('.fade-in');
        const featureCards = document.querySelectorAll('.feature-card');
        const steps = document.querySelectorAll('.step');
        const chatBox = document.querySelector('.chat-box');
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        fadeElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
        
        featureCards.forEach(card => {
            if (isElementInViewport(card)) {
                card.classList.add('visible');
            }
        });
        
        steps.forEach(step => {
            if (isElementInViewport(step)) {
                step.classList.add('visible');
            }
        });
        
        if (chatBox && isElementInViewport(chatBox)) {
            chatBox.classList.add('visible');
        }
        
        testimonialCards.forEach(card => {
            if (isElementInViewport(card)) {
                card.classList.add('visible');
            }
        });
    };
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            animateOnScroll();
        });
        
        // Initial check for elements in viewport
        animateOnScroll();
    }
    
    // Plan tabs switching functionality
    const planTabs = document.querySelectorAll('.plan-tab');
    if (planTabs.length > 0) {
        planTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                planTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
});