document.addEventListener('DOMContentLoaded', () => {
    const tables = document.querySelectorAll('.table');
    const loaderOverlay = document.querySelector('.loader-overlay');

    tables.forEach(table => {
        table.addEventListener('click', async (e) => {
            if (e.target.tagName === 'TD') {
                const row = e.target.parentElement;
                const href = row.dataset.href;

                if (href) {
                    loaderOverlay.classList.add('visible');

                    try {
                        const response = await fetch(href);
                        const content = await response.text();
                        document.getElementById('infoModalBody').innerHTML = content;
                    } catch (error) {
                        console.error('Error fetching content:', error);
                    }

                    setTimeout(() => {
                        loaderOverlay.classList.remove('visible');
                        const infoModal = new bootstrap.Modal(document.getElementById('infoModal'));
                        infoModal.show();
                    }, 1000);
                }
            }
        });
    });
});