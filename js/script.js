document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('query').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<h2>Wyniki wyszukiwania:</h2>';

    const files = ['txt/file1.txt', 'txt/file2.txt', 'txt/file3.txt'];

    files.forEach(file => {
        fetch(file)
        .then(response => response.text())
        .then(text => {
            const lines = text.split('\n');
            let found = false;
            lines.forEach((line, index) => {
                if (line.toLowerCase().includes(query)) {
                    found = true;
                    const p = document.createElement('p');
                    p.textContent = `Plik: ${file} - Linia ${index + 1}: ${line}`;
                    resultsDiv.appendChild(p);
                }
            });
            if (!found) {
                const p = document.createElement('p');
                p.textContent = `Plik: ${file} - Brak wyników.`;
                resultsDiv.appendChild(p);
            }
        })
        .catch(error => {
            const p = document.createElement('p');
            p.textContent = `Plik: ${file} - Błąd podczas wczytywania pliku.`;
            resultsDiv.appendChild(p);
        });
    });
});
