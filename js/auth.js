import { auth, provider } from './firebase-init.js';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userDisplay = document.getElementById('user-display');

    // Function to get user initials
    function getUserInitials(user) {
        if (user.displayName) {
            return user.displayName.split(' ')[0][0].toUpperCase();
        } else if (user.email) {
            return user.email[0].toUpperCase();
        }
        return 'U';
    }

    // Function to create avatar with initials
    function createInitialsAvatar(initial, size = 32) {
        const colors = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50'];
        const charCode = initial.charCodeAt(0);
        const colorIndex = charCode % colors.length;
        const backgroundColor = colors[colorIndex];
        
        return `
            <div style="
                width: ${size}px;
                height: ${size}px;
                background-color: ${backgroundColor};
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: ${size/2}px;
            ">${initial}</div>
        `;
    }

    // Handle Login
    loginBtn.addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log('User logged in:', user);
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData?.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.error("Login Error:", errorMessage);
                alert("Gagal login: " + errorMessage);
            });
    });

    // Handle Logout
    logoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            console.log('User logged out');
        }).catch((error) => {
            console.error('Logout Error:', error);
            alert("Gagal logout: " + error.message);
        });
    });

    // Listen for auth state changes
    onAuthStateChanged(auth, (user) => {
        // Update UI for all user displays on the page
        document.querySelectorAll('.auth-buttons').forEach(authButtons => {
            const loginBtn = authButtons.querySelector('#login-btn');
            const userDisplay = authButtons.querySelector('#user-display');
            const logoutBtn = authButtons.querySelector('#logout-btn');
            const userAvatar = authButtons.querySelector('#user-avatar');

            if (user) {
                // User is signed in.
                if(loginBtn) loginBtn.style.display = 'none';
                if(userDisplay) userDisplay.style.display = 'flex'; // Use flex to show it
                if(logoutBtn) logoutBtn.style.display = 'inline-block';

                const userNameElement = userDisplay.querySelector('#user-name');
                if(userNameElement) {
                    userNameElement.textContent = user.displayName || user.email || 'Pengguna';
                }
                
                // Update avatar
                if(userAvatar) {
                    const initial = getUserInitials(user);
                    userAvatar.innerHTML = createInitialsAvatar(initial);
                }

            } else {
                // User is signed out.
                if(loginBtn) loginBtn.style.display = 'inline-block';
                if(userDisplay) userDisplay.style.display = 'none';
                if(logoutBtn) logoutBtn.style.display = 'none';
            }
        });
    });
}); 