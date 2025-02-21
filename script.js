document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginContainer = document.getElementById('loginContainer');
    const dashboard = document.getElementById('dashboard');
    const barChartCanvas = document.getElementById('barChart');
    const lineChartCanvas = document.getElementById('lineChart');
    const ageFilter = document.getElementById('ageFilter');
    const genderFilter = document.getElementById('genderFilter');
    const dateFilter = document.getElementById('dateFilter');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const logoutBtn = document.getElementById('logout');

    let barData = [120, 150, 80];
    let lineData = [10, 20, 15, 25];

    if (localStorage.getItem('isLoggedIn')) {
        loginContainer.style.display = 'none';
        dashboard.style.display = 'block';
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username && password) {
            localStorage.setItem('isLoggedIn', true);
            loginContainer.style.display = 'none';
            dashboard.style.display = 'block';
        } else {
            alert('Please enter valid credentials.');
        }
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        location.reload();
    });

    const barChart = new Chart(barChartCanvas, {
        type: 'bar',
        data: {
            labels: ['Feature A', 'Feature B', 'Feature C'],
            datasets: [{ label: 'Time Spent', data: barData, backgroundColor: ['#007bff', '#28a745', '#dc3545'] }],
        },
        options: { responsive: true },
    });

    const lineChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr'],
            datasets: [{ label: 'Time Trend', data: lineData, borderColor: '#007bff', fill: false }],
        },
        options: { responsive: true },
    });

    applyFiltersBtn.addEventListener('click', () => {
        updateCharts();
    });

    function updateCharts() {
        const age = ageFilter.value;
        const gender = genderFilter.value;

        if (age === '15-25') {
            barData = [100, 120, 60];
            lineData = [8, 18, 12, 20];
        } else if (age === '>25') {
            barData = [80, 140, 90];
            lineData = [12, 22, 18, 28];
        }

        if (gender === 'male') {
            barData = barData.map((val) => val - 10);
        } else if (gender === 'female') {
            barData = barData.map((val) => val + 10);
        }

        barChart.data.datasets[0].data = barData;
        barChart.update();

        lineChart.data.datasets[0].data = lineData;
        lineChart.update();
    }
});
