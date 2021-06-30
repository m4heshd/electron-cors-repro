document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#open').addEventListener('click', () => {
        const isHttp = JSON.parse(window.process.argv.filter(arg => arg.includes('isHttp'))[0]).isHttp;
        const newWnd = window.open(isHttp ? 'http://localhost:8080/child.html' : `file://${__dirname}/child.html`);

        setTimeout(() => {
            newWnd.customProperty = 'SUCCESS';
        }, 1000);
    });
});
