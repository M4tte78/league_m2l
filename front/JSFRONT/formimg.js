document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('profile-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('profile-picture', document.getElementById('profile-picture').files[0]);

        fetch('/token/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse the JSON only if the response is successful
        })
        .then(data => {
            if (data.success) {
                // Update the profile picture
                document.getElementById('profile-img').src = '/profile-picture/' + data.userId;
            } else {
                alert('Failed to update profile picture');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
