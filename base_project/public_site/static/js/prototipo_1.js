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

let autonomia = 0;
const sol = 0.8;
const nublado = 0.4;
const chuvoso = 0.1;
let climaSelecionado = 'sol';  // valor inicial
const horas = [];
const tensoes = [];



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
    const placaItems = data.supply.filter(item => item.name.toLowerCase().includes('placa'));

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
function updateResults() {
    let totalSupply = data.supply
        .filter(item => item.name.toLowerCase().includes('bateria') || item.name.toLowerCase().includes('placa'))
        .reduce((sum, item) => sum + item.power, 0);

    let totalSource = data.source.reduce((sum, item) => sum + item.power, 0);

    tempoDescarga = totalSource > 0 ? totalSupply / totalSource : 0;
    autonomia = tempoDescarga * 0.80 ; // para preservar a bateria usualmente só se usa 80% da carga total

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
}


function setClima(clima) {
    climaSelecionado = clima;
    updateResults(); // recalcula tudo com o novo clima
}

let capacidade = totalSupply/12 ; //Ah
let carga = placapower;        //Ah Placa solar
let consumo = 



window.onload = function() {
    renderItems('supply');
    renderItems('source');
    updateResults();
};
