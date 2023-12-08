document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('#myForm');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;

            const formData = {
                email: email,
                password: password
            };

            fetch('http://localhost:3000/log/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.message === 'User logged in') {
                    window.location.href = '/league_m2l/front/index.html';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                console.log(formData);
            });
        });
    } else {
        console.error('Le formulaire avec ID myForm n\'a pas été trouvé.');
    }
});
