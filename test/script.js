async function increment() {
    const response = await fetch('/api/counter', { method: 'POST' });
    const data = await response.json();
    document.getElementById('counter').innerText = data.value;
}

// Initial load
fetch('/api/counter')
    .then(res => res.json())
    .then(data => {
        document.getElementById('counter').innerText = data.value;
    });