// ==== Dados e estado ====
const data = { supply: [], source: [] };
let climaSelecionado = 'sol';
let batteryChart = null;

// ==== Funções de UI ====
function addItem(type) {
  const select = document.getElementById(type === 'supply' ? 'supply_selector' : 'source_selector');
  const opt = select.options[select.selectedIndex];
  if (!opt || !opt.dataset.name) return;

  data[type].push({
    name: opt.dataset.name,
    power: parseFloat(opt.dataset.power.replace(',', '.')),
    factor: parseFloat(opt.dataset.factor?.replace(',', '.') || 1)
  });
  handleBatteryLogic();
  handlePlacaLogic();
  renderItems(type);
  updateResults();
  renderBatteryChart();
}

function renderItems(type) {
  const container = document.getElementById(`${type}_list`);
  container.innerHTML = '';
  data[type].forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      ${item.name} - ${item.power.toFixed(2)} W
      <button onclick="removeItem('${type}', ${i})">Remover</button>
    `;
    container.appendChild(div);
  });
}

function removeItem(type, idx) {
  data[type].splice(idx, 1);
  handleBatteryLogic();
  handlePlacaLogic();
  renderItems(type);
  updateResults();
  renderBatteryChart();
}

// ==== Lógica de bateria e placas ====
let batpower = 0, placapower = 0;
function handleBatteryLogic() {
  const bats = data.supply.filter(i => i.name.toLowerCase().includes('bateria'));
  if (!bats.length) { batpower = 0; document.getElementById('battery_alert').textContent = ''; return; }
  const same = bats.every(b => b.name === bats[0].name);
  if (!same) {
    batpower = 0;
    document.getElementById('battery_alert').textContent = '⚠️ Baterias diferentes não somam.';
    return;
  }
  batpower = bats.reduce((s, b) => s + b.power, 0);
  document.getElementById('battery_alert').textContent = '';
}

function handlePlacaLogic() {
  const pls = data.supply.filter(i => i.name.toLowerCase().includes('placa'));
  if (!pls.length) { placapower = 0; document.getElementById('placa_alert').textContent = ''; return; }
  const same = pls.every(p => p.name === pls[0].name);
  if (!same) {
    placapower = 0;
    document.getElementById('placa_alert').textContent = '⚠️ Placas diferentes não somam.';
    return;
  }
  placapower = pls.reduce((s, p) => s + p.power, 0);
  document.getElementById('placa_alert').textContent = '';
}

// ==== Resultados e status ====
function updateResults() {
  const totalSupply = batpower + placapower;
  const totalSource = data.source.reduce((s, i) => s + i.power, 0);

  const tempoDescarga = totalSource > 0 ? totalSupply / totalSource : 0;
  const autonomia = tempoDescarga * 0.8;

  document.getElementById('total_power_supply').textContent = totalSupply.toFixed(2);
  document.getElementById('total_power_source').textContent = totalSource.toFixed(2);
  document.getElementById('autonomy').textContent = autonomia.toFixed(2);

  const statusEl = document.getElementById('status');
  if (totalSupply >= totalSource) {
    statusEl.textContent = 'Viável ✅';
  } else {
    statusEl.textContent = 'Não Viável ❌';
  }
}

// ==== Clima ====
function setClima(clima) {
  climaSelecionado = clima;
  updateResults();
  renderBatteryChart();
}

// ==== Gráfico da bateria com Chart.js ====
function renderBatteryChart() {
  // Reuso totals já calculados
  const totalSupply = batpower + placapower;
  const totalSource = data.source.reduce((s, i) => s + i.power, 0);
  const capacidade = totalSupply / 12;   // em Ah
  let carga = capacidade * 0.8;          // carga inicial 80%
  const consumo = totalSource / 12;      // A
  const dias = 3, passoMin = 10;
  const passos = dias * 24 * 60 / passoMin;
  const fatorClimaArr = Array.from({ length: passos+1 }, (_, i) => {
    const dia = Math.floor(i / ((passos+1)/3));
    if (climaSelecionado === 'sol') return 1;
    if (climaSelecionado === 'nublado') return 0.6;
    return 0.2;
  });

  const horas = [], tensoes = [];
  for (let i = 0; i <= passos; i++) {
    const h = i * passoMin / 60;
    horas.push(h.toFixed(2));
    const horaDoDia = h % 24;

    let correnteSolar = 0;
    if (horaDoDia >= 6 && horaDoDia <= 18) {
      const fator = Math.sin(Math.PI * (horaDoDia - 6) / 12);
      correnteSolar = fator * fatorClimaArr[i] * (placapower / 12); 
    }
    const net = correnteSolar - consumo;
    carga = Math.max(0, Math.min(capacidade, carga + net * (passoMin/60)));
    tensoes.push((9.5 + (carga/capacidade)*(14.5-9.5)).toFixed(2));
  }

  // Se já existe, atualiza; senão, cria
  const ctx = document.getElementById('batteryChart').getContext('2d');
  if (batteryChart) {
    batteryChart.data.labels = horas;
    batteryChart.data.datasets[0].data = tensoes;
    batteryChart.update();
  } else {
    batteryChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: horas,
        datasets: [{
          label: 'Tensão da Bateria (V)',
          data: tensoes,
          borderColor: 'green',
          borderWidth: 2,
          pointRadius: 0,
          fill: false
        }]
      },
      options: {
        scales: {
          x: { title: { display: true, text: 'Tempo (h)' } },
          y: { title: { display: true, text: 'Tensão (V)' }, min: 9, max: 15 }
        },
        plugins: {
          title: { display: true, text: 'Tensão da Bateria em 3 Dias' }
        }
      }
    });
  }
}

// ==== Inicialização ====
window.addEventListener('DOMContentLoaded', () => {
  renderItems('supply');
  renderItems('source');
  updateResults();
  renderBatteryChart();
});
