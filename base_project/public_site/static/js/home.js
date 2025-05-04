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

// Remove o item pelo índice
// Atualiza visual e totais
function removeItem(type, index) {
    data[type].splice(index, 1);
    handleBatteryLogic();
    renderItems(type);
    updateResults();
}

// Atualiza resultados totais e status
function updateResults() {
    let totalSupply = batpower;  // Só soma a potência das baterias
    let totalSource = 0;

    // Soma os outros itens de supply (não baterias) separadamente
    let otherSupplyPower = 0;
    data.supply.forEach(item => {
        if (!item.name.toLowerCase().includes('bateria')) {
            otherSupplyPower += item.power;
        }
    });

    // Soma os itens de source normalmente
    data.source.forEach(item => {
        totalSource += item.power;
    });

    // Calcula autonomia (evita divisão por zero)
    let autonomia = totalSource > 0 ? totalSupply / totalSource : 0;

    // Atualiza no HTML
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

    // (Opcional) → Log para debug ou uso futuro
    console.log(`Potência de baterias: ${batpower}W`);
    console.log(`Potência de outros supplies: ${otherSupplyPower}W`);
}


// Remove a chamada do populateSelects para evitar erro
window.onload = function() {
    renderItems('supply');
    renderItems('source');
    updateResults();
};
