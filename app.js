document.addEventListener('DOMContentLoaded', () => {

    // Cambios de Pestaña / Vista
    const moduleButtons = document.querySelectorAll('#module-nav .btn-module');
    const tabViews = document.querySelectorAll('.tab-view');

    moduleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;

            // Remueve estado activo de todos los botones y vistas
            moduleButtons.forEach(btn => btn.classList.remove('active'));
            tabViews.forEach(view => view.classList.remove('active'));

            // Activa el botón presionado y la vista correspondiente
            button.classList.add('active');
            const activeView = document.getElementById(targetId);
            if (activeView) {
                activeView.classList.add('active');
            }
        });
    });

    // Gestión de Indicativo en Tiempo Real
    const inputIndicativo = document.getElementById('indicativo');
    const displayIndicativo = document.getElementById('display-indicativo');
    if (inputIndicativo && displayIndicativo) {
        inputIndicativo.addEventListener('input', (e) => {
            const val = e.target.value.trim().toUpperCase();
            displayIndicativo.textContent = val !== '' ? val : '---';
        });
    }

    // Selección de Estados Operativos (10-8, 10-23, 10-97, 10-10)
    const statusButtons = document.querySelectorAll('#status-selector .btn-status');
    const displayEstado = document.getElementById('display-estado');
    const headerStatusBadge = document.getElementById('header-status-badge');

    statusButtons.forEach(button => {
        button.addEventListener('click', () => {
            statusButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const code = button.dataset.code;
            const label = button.dataset.label;
            const colorClass = button.dataset.color;

            if (displayEstado) {
                displayEstado.textContent = label;
                displayEstado.className = `metric-value ${colorClass}`;
            }

            if (headerStatusBadge) {
                headerStatusBadge.textContent = `ESTADO DE UNIDAD ${code} ${label}`;
                if (code === '10-8') {
                    headerStatusBadge.className = 'status-badge status-online';
                } else {
                    headerStatusBadge.className = 'status-badge status-offline';
                }
            }
        });
    });

    // Filtros de Servicio
    const serviceButtons = document.querySelectorAll('#service-selector .btn-service');
    serviceButtons.forEach(button => {
        button.addEventListener('click', () => {
            serviceButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Manejo de Formulario de Alerta
    const alertForm = document.getElementById('alert-form');
    const displayIncidenciasCount = document.getElementById('display-incidencias-count');
    let count = 0;

    if (alertForm) {
        alertForm.addEventListener('submit', (e) => {
            e.preventDefault();
            count++;
            if (displayIncidenciasCount) displayIncidenciasCount.textContent = count;
            alert('🚨 Incidencia registrada correctamente en la central PDA.');
            alertForm.reset();
        });
    }

    // Botón Salir
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            if (confirm('¿Cerrar sesión en la PDA?')) {
                location.reload();
            }
        });
    }
});
