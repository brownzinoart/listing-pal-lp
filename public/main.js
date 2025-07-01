const emailForm = document.getElementById('email-capture-form');
const emailInput = document.getElementById('email-address');
const submitButton = document.getElementById('submit-button');
const spinner = document.getElementById('spinner');
const buttonText = document.getElementById('button-text');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!emailInput.value) {
        return;
    }

    // Show spinner and disable button
    spinner.classList.remove('hidden');
    buttonText.classList.add('hidden');
    submitButton.disabled = true;
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');

    try {
        const response = await fetch('/.netlify/functions/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailInput.value }),
        });

        if (response.ok) {
            successMessage.classList.remove('hidden');
            emailInput.value = '';
        } else {
            errorMessage.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Submission error:', error);
        errorMessage.classList.remove('hidden');
    } finally {
        // Hide spinner and re-enable button
        spinner.classList.add('hidden');
        buttonText.classList.remove('hidden');
        submitButton.disabled = false;
    }
}); 