document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.loader');
    const successMessage = document.getElementById('success-message');
    const header = document.querySelector('.header');
    const resetButton = document.getElementById('reset-button');
    const hiddenIframe = document.getElementById('hidden_iframe');

    let submitted = false;

    // Handle form submission
    form.addEventListener('submit', (e) => {
        // We DO NOT prevent default because we want it to submit to the iframe natively
        
        // Basic validation
        if (!form.checkValidity()) {
            e.preventDefault();
            return;
        }

        submitted = true;

        // Update button state to loading
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        loader.classList.remove('hidden');
    });

    // Listen for iframe load which means the submission is complete
    hiddenIframe.addEventListener('load', () => {
        if (submitted) {
            // Show success state
            form.classList.add('hidden');
            header.classList.add('hidden');
            successMessage.classList.remove('hidden');
            
            // Reset button state
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            loader.classList.add('hidden');
            
            submitted = false;
        }
    });

    // Handle reset button to show form again
    resetButton.addEventListener('click', () => {
        form.reset();
        successMessage.classList.add('hidden');
        form.classList.remove('hidden');
        header.classList.remove('hidden');
    });

    // Add floating label behavior on load for auto-filled inputs
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        // Trigger once to handle browser autofill
        if(input.value) {
            input.classList.add('has-value');
        }
        
        input.addEventListener('input', () => {
            if(input.value) {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });
});
