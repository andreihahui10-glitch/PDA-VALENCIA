document.addEventListener('DOMContentLoaded', () => {
    
    // Estado Global de la aplicación
    const state = {
        role: 'cuerpos',
        servicio: 'POL',
        indicativo: '---',
        estadoCodigo: '10-10',
        estadoTexto: 'Fuera de servicio',
        incidenciasCount: 0
    };

    // 1. Selector de Rol (Cuerpos del Estado vs Ciudadano)
    const roleButtons = document.querySelectorAll('#role-selector .btn-role');
    roleButtons.forEach(button => {
        button.addEventListener('click', () => {
            roleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            state.role = button.dataset.role;
        });
    });

    // 2. Formulario de Autenticación
    const loginForm = document.getElementById('login-form');
    const loginAlert = document.getElementById('login-alert');
    const loginAlertText = document.getElementById('login-alert-text');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('usuario').value.trim();
        const pass = document.getElementById('password').value.trim();

        if (user === '' || pass === '') {
            loginAlertText.textContent = '⚠️ Ingresa usuario y contraseña.';
            loginAlert.style.display = 'block';
            return;
        }

        // Simulación de login exitoso
        loginAlert.style.display = 'none';
        alert(`Sesión iniciada correctamente como: ${user} (${state.role.toUpperCase()})`);
    });

    // 3. Modulos Tácticos (Pestañas de Navegación)
    const moduleButtons = document.querySelectorAll('#module-nav .btn-module');
    const sectionTitle = document.getElementById('section-title');
    const sectionDesc = document.getElementById('section-desc');

    const moduleDescriptions = {
        despacho: {
            title: 'Panel Operativo',
            desc: 'Gestiona unidades, incidencias y consultas desde un único lugar.'
        },
        vehiculos: {
            title: 'Consulta DGT / Vehículos',
            desc: 'Verificación de matrículas, bastidores y licencias de conducir.'
        },
        antecedentes: {
            title: 'Base de Datos de Antecedentes',
            desc: 'Búsqueda de requisitorias, identificaciones y registros del sistema.'
        },
        infracciones: {
            title: 'Código de Infracciones',
            desc: 'Consulta de artículos, sanciones y cuadro general de multas.'
        }
    };

    moduleButtons.forEach(button => {
        button.addEventListener('click', () => {
            moduleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const tabKey = button.dataset.tab;
            if (moduleDescriptions[tabKey]) {
                sectionTitle.textContent = moduleDescriptions[tabKey].title;
                sectionDesc.textContent = moduleDescriptions[tabKey].desc;
            }
        });
    });

    // 4. Selección de Servicio Activo (POL, BOM, SAN, CAR, 112)
    const serviceButtons = document.querySelectorAll('#service-selector .btn-service');
    serviceButtons.forEach(button => {
        button.addEventListener('click', () => {
            serviceButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            state.servicio = button.dataset.service;
        });
    });

    // 5. Cambio de Indicativo en Tiempo Real
    const inputIndicativo = document.getElementById('indicativo');
    const displayIndicativo = document.getElementById('display-indicativo');

    inputIndicativo.addEventListener('input', (e) => {
        const val = e.target.value.trim().toUpperCase();
        state.indicativo = val !== '' ? val : '---';
        displayIndicativo.textContent = state.indicativo;
    });

    // 6. Cambio de Estado Operativo (10-8, 10-23, 10-97, 10-10)
    const statusButtons = document.querySelectorAll('#status-selector .btn-status');
    const displayEstado = document.getElementById('display-estado');
    const headerStatusBadge = document.getElementById('header-status-badge');

    statusButtons.forEach(button => {
        button.addEventListener('click', () => {
            statusButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            state.estadoCodigo = button.dataset.code;
            state.estadoTexto = button.dataset.label;
            const colorClass = button.dataset.color;

            // Actualizar interfaz
            displayEstado.textContent = `${state.estadoTexto}`;
            displayEstado.className = `metric-value ${colorClass}`;

            headerStatusBadge.textContent = `ESTADO DE UNIDAD ${state.estadoCodigo} ${state.estadoTexto}`;
            
            // Ajustar badge superior según el estado
            if (state.estadoCodigo === '10-8') {
                headerStatusBadge.className = 'status-badge status-online';
            } else {
                headerStatusBadge.className = 'status-badge status-offline';
            }
        });
    });

    // 7. Formulario de Creación de Alertas / Incidencias 112
    const alertForm = document.getElementById('alert-form');
    const displayIncidenciasCount = document.getElementById('display-incidencias-count');

    alertForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const tipo = document.getElementById('tipo-incidencia').value;
        const ubicacion = document.getElementById('ubicacion').value;
        const detalles = document.getElementById('detalles').value;

        // Incrementar contador
        state.incidenciasCount++;
        displayIncidenciasCount.textContent = state.incidenciasCount;

        alert(`🚨 REGISTRO ENVIADO AL SISTEMA\n\nTipo: ${tipo}\nUbicación: ${ubicacion}\nDetalles: ${detalles}`);

        // Limpiar campos
        document.getElementById('ubicacion').value = '';
        document.getElementById('detalles').value = '';
    });

    // 8. Botón Salir
    const btnLogout = document.getElementById('btn-logout');
    btnLogout.addEventListener('click', () => {
        if (confirm('¿Deseas cerrar la sesión de la terminal PDA?')) {
            location.reload();
        }
    });

});
