// Mantém os itens selecionados pelo usuário
const data = {
    supply: [],
    source: []
};

// Pega o item selecionado na página (supply_selector ou source_selector)
// Lê os dados data-* do <option>
// Adiciona no array data[type]
// Chama renderItems e updateResults()
function addItem(type) {
    const selectorId = type === 'supply' ? 'supply_selector' : 'source_selector';
    const select = document.getElementById(selectorId);
    const option = select.options[select.selectedIndex];

    if (!option || !option.dataset || !option.dataset.name) return;

    data[type].push({
        name: option.dataset.name,
        power: parseFloat(option.dataset.power.replace(',', '.')),
        factor: parseFloat(option.dataset.factor.replace(',', '.'))
    });

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
            - Potência: ${item.power}W, 
            Fator: ${item.factor}
            <button onclick="removeItem('${type}', ${index})">Remover</button>
        `;
        container.appendChild(div);
    });
}

// Remove o item pelo índice
// Atualiza visual e totais
function removeItem(type, index) {
    data[type].splice(index, 1);
    renderItems(type);
    updateResults();
}

// Atualiza resultados totais e status
function updateResults() {
    let totalSupply = 0, totalSource = 0;

    data.supply.forEach(item => {
        totalSupply += item.power * item.factor;
    });

    data.source.forEach(item => {
        totalSource += item.power * item.factor;
    });

    document.getElementById('total_power_supply').textContent = totalSupply.toFixed(2);
    document.getElementById('total_power_source').textContent = totalSource.toFixed(2);

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

// Remove a chamada do populateSelects para evitar erro
window.onload = function() {
    renderItems('supply');
    renderItems('source');
    updateResults();
};
