document.addEventListener('DOMContentLoaded', () => {

    // CAMBIO DE PESTAÑAS Y VISTAS
    const moduleButtons = document.querySelectorAll('#module-nav .btn-module');
    const tabViews = document.querySelectorAll('.tab-view');

    moduleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;

            moduleButtons.forEach(btn => btn.classList.remove('active'));
            tabViews.forEach(view => view.classList.remove('active'));

            button.classList.add('active');
            const targetView = document.getElementById(targetId);
            if (targetView) targetView.classList.add('active');
        });
    });

    // INDICATIVO EN TIEMPO REAL
    const inputIndicativo = document.getElementById('indicativo');
    const displayIndicativo = document.getElementById('display-indicativo');
    if (inputIndicativo && displayIndicativo) {
        inputIndicativo.addEventListener('input', (e) => {
            const val = e.target.value.trim().toUpperCase();
            displayIndicativo.textContent = val !== '' ? val : '---';
        });
    }

    // ESTADOS OPERATIVOS
    const statusButtons = document.querySelectorAll('#status-selector .btn-status');
    const displayEstado = document.getElementById('display-estado');

    statusButtons.forEach(button => {
        button.addEventListener('click', () => {
            statusButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const label = button.dataset.label;
            const className = button.dataset.class;

            if (displayEstado) {
                displayEstado.textContent = label;
                displayEstado.className = `metric-badge ${className}`;
            }
        });
    });

    // SERVICIOS
    const serviceButtons = document.querySelectorAll('#service-selector .btn-service');
    serviceButtons.forEach(button => {
        button.addEventListener('click', () => {
            serviceButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // REGISTRO DE INCIDENCIAS
    const alertForm = document.getElementById('alert-form');
    const displayIncidenciasCount = document.getElementById('display-incidencias-count');
    let count = 0;

    if (alertForm) {
        alertForm.addEventListener('submit', (e) => {
            e.preventDefault();
            count++;
            if (displayIncidenciasCount) displayIncidenciasCount.textContent = count;
            alert('🚨 Registro enviado correctamente a la central.');
            alertForm.reset();
        });
    }

    // SALIR
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            if (confirm('¿Cerrar sesión del sistema?')) {
                location.reload();
            }
        });
    }
});
