// Mantém os itens selecionados pelo usuário
const data = {
    supply: [],
    source: []
};

// Pega o item selecionado na página (supply_selector ou source_selector)
// Lê os dados data-* do <option>
// Adiciona no array data[type]
// Chama renderItems e updateResults()
let batpower = 0;
let batteryName = '';
let placapower = 0;
let placaName = '';
const sol = 0.5;
const nublado = 0.2;
const chuvoso = 0.1;
let climaSelecionado = 'sol';  // valor inicial



function addItem(type) {
    const selectorId = type === 'supply' ? 'supply_selector' : 'source_selector';
    const select = document.getElementById(selectorId);
    const option = select.options[select.selectedIndex];

    if (!option || !option.dataset || !option.dataset.name) return;

    const item = {
        name: option.dataset.name,
        power: parseFloat(option.dataset.power.replace(',', '.')),
        factor: parseFloat(option.dataset.factor.replace(',', '.'))
    };

    data[type].push(item);

    handleBatteryLogic();
    handlePlacaLogic();
    renderItems(type);
    updateResults();
}



// Recria a lista HTML (<div>) de itens selecionados
// Inclui botão "remover" com chamada removeItem()
function renderItems(type) {
    const container = document.getElementById(`${type}_list`);
    container.innerHTML = '';
    data[type].forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            ${item.name} 
            - Potência: ${item.power}W
            
            <button onclick="removeItem('${type}', ${index})">Remover</button>
        `;
        container.appendChild(div);
    });
}

function handleBatteryLogic() {
    const batteryAlert = document.getElementById('battery_alert');
    const batteryItems = data.supply.filter(item => item.name.toLowerCase().includes('bateria'));

    if (batteryItems.length === 0) {
        // Nenhuma bateria → limpa tudo
        batteryName = '';
        batpower = 0;
        batteryAlert.textContent = '';
        return;
    }

    // Assume a primeira como referência
    batteryName = batteryItems[0].name;
    batpower = 0;

    let allSame = true;
    batteryItems.forEach(item => {
        if (item.name !== batteryName) {
            allSame = false;
        }
    });

    if (allSame) {
        // Todas iguais → soma potência e limpa alerta
        batteryItems.forEach(item => {
            batpower += item.power;
        });
        batteryAlert.textContent = '';
    } else {
        // Baterias diferentes → não soma, exibe alerta
        batteryAlert.textContent = `⚠️ Não é possível somar baterias diferentes. Verifique a lista.`;
        batpower = 0;
    }

    console.log(`Potência total de baterias (batpower): ${batpower}W`);
}

function handlePlacaLogic() {
    const placaAlert = document.getElementById('placa_alert'); // precisa ter um <div id="placa_alert">
    const placaItems = data.source.filter(item => item.name.toLowerCase().includes('placa'));

    if (placaItems.length === 0) {
        // Nenhuma placa → limpa tudo
        placaName = '';
        placapower = 0;
        placaAlert.textContent = '';
        return;
    }

    // Assume a primeira como referência
    placaName = placaItems[0].name;
    placapower = 0;
    

    let allSame = true;
    placaItems.forEach(item => {
        if (item.name !== placaName) {
            allSame = false;
        }
    });

    if (allSame) {
        // Todas iguais → soma potência e limpa alerta
        placaItems.forEach(item => {
            placapower += item.power;
        });
        placaAlert.textContent = '';
    } else {
        // Placas diferentes → não soma, exibe alerta
        placaAlert.textContent = `⚠️ Não é possível somar placas solares diferentes. Verifique a lista.`;
        placapower = 0;
    }

    console.log(`Potência total de placas solares (placapower): ${placapower}W`);
}


// Remove o item pelo índice
// Atualiza visual e totais
function removeItem(type, index) {
    data[type].splice(index, 1);
    handleBatteryLogic();
    handlePlacaLogic();
    renderItems(type);
    updateResults();
}

// Atualiza resultados totais e status
let graficoInstance = null;
let autonomia = 0;
function updateResults() {
    let totalSupply = batpower;  // só soma baterias
    let totalSource = 0;

    data.source.forEach(item => {
        totalSource += item.power;
    });

    // Calcula autonomia (evita divisão por zero)
    autonomia = totalSource > 0 ? totalSupply / totalSource : 0;

    document.getElementById('total_power_supply').textContent = totalSupply.toFixed(2);
    document.getElementById('total_power_source').textContent = totalSource.toFixed(2);
    document.getElementById('autonomy').textContent = autonomia.toFixed(2);

    const resultDiv = document.getElementById('results');
    const statusText = document.getElementById('status');

    if (totalSupply >= totalSource) {
        statusText.textContent = 'Viável ✅';
        resultDiv.classList.add('viavel');
        resultDiv.classList.remove('nao-viavel');
    } else {
        statusText.textContent = 'Não Viável ❌';
        resultDiv.classList.add('nao-viavel');
        resultDiv.classList.remove('viavel');
    }

    calcularAutonomiaEGrafico(totalSupply, totalSource);
}

function setClima(clima) {
    climaSelecionado = clima;
    updateResults(); // recalcula tudo com o novo clima
}


function calcularAutonomiaEGrafico(totalSupply, totalSource) {
    const tensao = {
        14.3: 1.99, 14.1: 2.1, 13.5: 3, 13.1: 3.3, 12.5: 5, 12.1: 6,
        11.9: 7, 11.8: 8, 11.7: 9, 11.6: 11, 11.2: 12, 10.9: 12.7, 10.2: 19.01
    };

    let porcentagem = [];
    let totalPorcentagem = Object.values(tensao).reduce((a, b) => a + b, 0);

    Object.values(tensao).forEach(value => {
        porcentagem.push(totalSupply - ((value / totalPorcentagem) * totalSupply));
    });

    // calcula placaRecarga com base no botão selecionado
    let multiplicador = climaSelecionado === 'sol' ? sol :
                        climaSelecionado === 'nublado' ? nublado :
                        chuvoso;  // padrão

    let placaRecarga = placapower * multiplicador;

    // somar placaRecarga a cada item da lista porcentagem
    let porcentagemComRecarga = porcentagem.map(v => v + placaRecarga);

    // transforma para horas:minutos
    let numero = porcentagemComRecarga.map(value => (autonomia - (value / totalSource)).toFixed(2));

    function decimalParaHorasMinutos(decimal) {
        const horas = Math.floor(decimal);
        const minutos = Math.round((decimal - horas) * 60);
        return `${horas}h ${minutos}min`;
    }

    let correnteCarga = numero.map(value => decimalParaHorasMinutos(value));

    const labels = Object.keys(tensao);
    const data = correnteCarga;

    // Para debug no console
    console.log(`Clima selecionado: ${climaSelecionado}`);
    //console.log(`placapower: ${placapower}, placaRecarga: ${placaRecarga}`);


    desenharGrafico(data, labels);
}

function desenharGrafico(labels, data) {
    const ctx = document.getElementById('graficoAutonomia').getContext('2d');

    if (graficoInstance) {
        graficoInstance.destroy();
    }

    graficoInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Energia Consumida por tensão (W)',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Queda da Potência (W)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Horas (H)'
                    }
                }
            }
        }
    });
}

window.onload = function() {
    renderItems('supply');
    renderItems('source');
    updateResults();
};
