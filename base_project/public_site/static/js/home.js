const data = {
    supply: [],
    source: []
};

// Simulando dados do banco (você pode popular via Django template ou AJAX)
/*
const items = [
    {
        name: 'Painel Solar 500W',
        power: 500,
        power_factor: 1.0,
        width: 2.0,
        height: 1.0,
        depth: 0.05,
        load_type: 'gerador'
    },
    {
        name: 'Inversor 1000W',
        power: 1000,
        power_factor: 0.95,
        width: 0.5,
        height: 0.5,
        depth: 0.2,
        load_type: 'gerador'
    },
    {
        name: 'Geladeira 300W',
        power: 300,
        power_factor: 0.9,
        width: 0.7,
        height: 1.5,
        depth: 0.6,
        load_type: 'carga'
    },
    {
        name: 'Ar-condicionado 1200W',
        power: 1200,
        power_factor: 0.85,
        width: 1.0,
        height: 0.5,
        depth: 0.4,
        load_type: 'carga'
    }
];
*/

// Popula os selects com base nos tipos
function populateSelects() {
    /*
    const prodSelect = document.getElementById('supply_selector');
    const consSelect = document.getElementById('source_selector');

    items.forEach(item => {
        const option = document.createElement('option');
        option.value = JSON.stringify(item);
        option.textContent = item.name;
        if (item.load_type === 'gerador') prodSelect.appendChild(option.cloneNode(true));
        if (item.load_type === 'carga') consSelect.appendChild(option.cloneNode(true));
    });
    */
}

function addItem(type) {
    const selectorId = type === 'supply' ? 'supply_selector' : 'source_selector';

    const select = document.getElementById(selectorId);
    const option = select.options[select.selectedIndex];

    const value = select.value;

    if (!value) return;


    console.log(parseFloat(option.dataset.factor));

    data[type].push({
        name: option.dataset.name,
        power: parseFloat(option.dataset.power.replace(',', '.')),
        factor: parseFloat(option.dataset.factor.replace(',', '.')),
        width: parseFloat(option.dataset.width.replace(',', '.')),
        height: parseFloat(option.dataset.height.replace(',', '.')),
        depth: parseFloat(option.dataset.depth.replace(',', '.'))
    });

    renderItems(type);
    updateResults();
}

function renderItems(type) {
    const container = document.getElementById(`${type}_list`);
    container.innerHTML = '';
    data[type].forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            ${item.name} 
            - Potência: ${item.power}W, 
            Fator: ${item.factor}, 
            Espaço: ${item.width}x${item.height}x${item.depth} m
            <button onclick="removeItem('${type}', ${index})">Remover</button>
            `;
        container.appendChild(div);
    });
}

function removeItem(type, index) {
    data[type].splice(index, 1);
    renderItems(type);
    updateResults();
}

function updateResults() {
    let totalSupply = 0, 
        totalSource = 0, 
        totalArea = 0,
        totalSpace = 0;

    let supplyTotalArea = 0, 
        supplyTotalSpace = 0, 
        sourceTotalArea = 0, 
        sourceTotalSpace = 0;

    data.supply.forEach(item => {
        totalSupply += item.power * item.factor;
        supplyTotalArea += item.width * item.height;
        supplyTotalSpace += supplyTotalArea * item.depth;
    });

    data.source.forEach(item => {
        totalSource += item.power * item.factor;
        sourceTotalArea += item.width * item.height;
        sourceTotalSpace += sourceTotalArea * item.depth;
    });

    document.getElementById('total_power_supply').textContent = totalSupply.toFixed(2);
    document.getElementById('total_power_source').textContent = totalSource.toFixed(2);

    document.getElementById('supply_total_area').textContent = supplyTotalSpace.toFixed(2);
    document.getElementById('supply_total_space').textContent = supplyTotalArea.toFixed(2);

    document.getElementById('source_total_area').textContent = sourceTotalArea.toFixed(2);
    document.getElementById('source_total_space').textContent = sourceTotalSpace.toFixed(2);

    totalArea = supplyTotalArea + sourceTotalArea
    totalSpace = supplyTotalSpace + sourceTotalSpace
    
    document.getElementById('total_area').textContent = totalArea.toFixed(2);
    document.getElementById('total_space').textContent = totalSpace.toFixed(2);

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

window.onload = populateSelects;