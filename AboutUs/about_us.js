function handleSubmit(event) {
            event.preventDefault(); 
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

          
            const confirmationDiv = document.getElementById('confirmation');
            confirmationDiv.innerHTML = `Thank you, ${name}! Your message has been received.`;
            confirmationDiv.style.display = 'block';

          
            document.getElementById('contactForm').reset();
        }

function submitSuggestion() {
            const suggestionText = document.getElementById('suggestions').value;
            if (suggestionText) {
                alert(`Thank you for your suggestion: "${suggestionText}"`);
                document.getElementById('suggestions').value = ''; // Clear the textarea
            } else {
                alert('You can submit your suggestion later if you wish.');
            }
        }

        