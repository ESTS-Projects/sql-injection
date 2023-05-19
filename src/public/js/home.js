(() => {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const safeInput = document.getElementById('safe');
    const preview = document.getElementById('preview');

    function updatePreview() {
        const name = nameInput.value ?? '';
        const email = emailInput.value ?? '';
        const safe = safeInput.checked ?? '';
        
        if (safe) {
            preview.innerHTML = `INSERT INTO users (name, email) VALUES (?, ?);`;
        } else {
            preview.innerHTML = `INSERT INTO users (name, email) VALUES ('${name}', '${email}');`;
        }
        
        hljs.highlightAll();
    }

    nameInput.addEventListener('input', () => {
        updatePreview();
    });

    emailInput.addEventListener('input', () => {
        updatePreview();
    });

    safeInput.addEventListener('input', () => {
        updatePreview();
    });

    updatePreview();
})();