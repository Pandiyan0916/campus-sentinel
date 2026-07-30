/*
Campus Sentinel - Minimal JavaScript (< 5% of codebase)
Used ONLY for essential UI interactions: mobile sidebar navigation toggle,
symptom selection helpers, and MedicBot asynchronous chat API calls.
*/

document.addEventListener('DOMContentLoaded', function () {
    // --------------------------------------------------
    // Progress Bar Widths
    // --------------------------------------------------
    document.querySelectorAll('.bar-progress').forEach(function (bar) {
        const width = bar.getAttribute('data-width');
        if (width !== null) {
            bar.style.width = width + '%';
        }
    });

    // --------------------------------------------------
    // Mobile Sidebar Drawer Toggle
    // --------------------------------------------------
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebar = document.getElementById('sidebar-drawer');
    const mobileOverlay = document.getElementById('mobile-overlay');

    if (sidebarToggleBtn && sidebar) {
        sidebarToggleBtn.addEventListener('click', function () {
            sidebar.classList.toggle('-translate-x-full');
            if (mobileOverlay) {
                mobileOverlay.classList.toggle('hidden');
            }
        });
    }

    if (mobileOverlay && sidebar) {
        mobileOverlay.addEventListener('click', function () {
            sidebar.classList.add('-translate-x-full');
            mobileOverlay.classList.add('hidden');
        });
    }

    // --------------------------------------------------
    // Symptom Reporter Selection Toggle
    // --------------------------------------------------
    const symptomBtns = document.querySelectorAll('.symptom-btn');
    const submitBtn = document.getElementById('submit-symptoms-btn');

    symptomBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const checkbox = btn.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                btn.classList.toggle('active', checkbox.checked);
            }

            // Enable/disable submit button based on any checked symptom
            if (submitBtn) {
                const anyChecked = document.querySelectorAll('.symptom-btn input[type="checkbox"]:checked').length > 0;
                submitBtn.disabled = !anyChecked;
                if (anyChecked) {
                    submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                } else {
                    submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
                }
            }
        });
    });

    // --------------------------------------------------
    // MedicBot Chat Drawer Toggle & AJAX Interaction
    // --------------------------------------------------
    const botToggleBtn = document.getElementById('medicbot-toggle-btn');
    const botDrawer = document.getElementById('medicbot-drawer');
    const botCloseBtn = document.getElementById('medicbot-close-btn');
    const chatInput = document.getElementById('chat-input-field');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatMessagesContainer = document.getElementById('chat-messages-list');

    if (botToggleBtn && botDrawer) {
        botToggleBtn.addEventListener('click', function () {
            botDrawer.classList.remove('hidden');
            botToggleBtn.classList.add('hidden');
        });
    }

    if (botCloseBtn && botDrawer && botToggleBtn) {
        botCloseBtn.addEventListener('click', function () {
            botDrawer.classList.add('hidden');
            botToggleBtn.classList.remove('hidden');
        });
    }

    function sendChatMessage() {
        if (!chatInput || !chatMessagesContainer) return;
        const text = chatInput.value.trim();
        if (!text) return;

        // Append User Message
        const userMsgDiv = document.createElement('div');
        userMsgDiv.className = 'flex justify-end';
        userMsgDiv.innerHTML = `<div class="max-w-xs px-3 py-2 rounded-lg text-sm bg-blue-600 text-white">${escapeHtml(text)}</div>`;
        chatMessagesContainer.appendChild(userMsgDiv);

        chatInput.value = '';
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.id = 'bot-typing-indicator';
        typingDiv.className = 'flex justify-start';
        typingDiv.innerHTML = `<div class="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm">MedicBot is thinking...</div>`;
        chatMessagesContainer.appendChild(typingDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

        // AJAX request to Flask endpoint
        fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        })
        .then(response => response.json())
        .then(data => {
            const typingEl = document.getElementById('bot-typing-indicator');
            if (typingEl) typingEl.remove();

            const botMsgDiv = document.createElement('div');
            botMsgDiv.className = 'flex justify-start';
            botMsgDiv.innerHTML = `<div class="max-w-xs px-3 py-2 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">${escapeHtml(data.reply)}</div>`;
            chatMessagesContainer.appendChild(botMsgDiv);
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        })
        .catch(err => {
            const typingEl = document.getElementById('bot-typing-indicator');
            if (typingEl) typingEl.remove();

            const botMsgDiv = document.createElement('div');
            botMsgDiv.className = 'flex justify-start';
            botMsgDiv.innerHTML = `<div class="max-w-xs px-3 py-2 rounded-lg text-sm bg-red-50 text-red-700">Sorry, unable to connect to MedicBot server right now.</div>`;
            chatMessagesContainer.appendChild(botMsgDiv);
        });
    }

    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', sendChatMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
});
