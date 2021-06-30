document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelector('#text').innerHTML = `Global property set by parent: ${window.customProperty ? window.customProperty : 'FAILED'}`;
    }, 2000);
});
