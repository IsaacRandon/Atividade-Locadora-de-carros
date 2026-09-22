const carros = [
{ nome: "Chevrolet Onix 1.0", semanal: 630, cat: "Econômico", consumo: "14 km/l", portaMalas: "289 L", desc: "Perfeito para a cidade, econômico e prático.", img: "onix.png" },
{ nome: "Hyundai HB20", semanal: 665, cat: "Econômico", consumo: "14.5 km/l", portaMalas: "300 L", desc: "Moderno, confortável e excelente consumo.", img: "hb20.webp" },
{ nome: "Fiat Argo 1.0", semanal: 700, cat: "Econômico", consumo: "13.5 km/l", portaMalas: "300 L", desc: "Design autêntico e muita agilidade.", img: "argo.webp" },
{ nome: "Chevrolet Prisma", semanal: 980, cat: "Sedan", consumo: "12.5 km/l", portaMalas: "500 L", desc: "Porta-malas espaçoso e conforto familiar.", img: "prisma.webp" },
{ nome: "Volkswagen Virtus", semanal: 1050, cat: "Sedan", consumo: "12 km/l", portaMalas: "521 L", desc: "Tecnologia avançada e sofisticação.", img: "virtus.webp" },
{ nome: "Honda City", semanal: 1120, cat: "Sedan", consumo: "13 km/l", portaMalas: "519 L", desc: "Conforto premium na estrada.", img: "city.webp" },
{ nome: "Jeep Renegade", semanal: 1470, cat: "SUV", consumo: "10 km/l", portaMalas: "320 L", desc: "Robustez e estilo para qualquer terreno.", img: "renegade.webp" },
{ nome: "Hyundai Creta", semanal: 1610, cat: "SUV", consumo: "10.5 km/l", portaMalas: "431 L", desc: "Amplo espaço interno e alta tecnologia.", img: "creta.webp" },
{ nome: "Jeep Compass", semanal: 1750, cat: "SUV", consumo: "9.5 km/l", portaMalas: "410 L", desc: "Luxo, potência e máxima segurança.", img: "compass.webp" },
{ nome: "Toyota Corolla", semanal: 1960, cat: "Executivo", consumo: "11 km/l", portaMalas: "470 L", desc: "Elegância e alto desempenho corporativo.", img: "corrola.webp" },
{ nome: "Honda Civic", semanal: 2170, cat: "Executivo", consumo: "11.5 km/l", portaMalas: "495 L", desc: "Design esportivo e motorização eficiente.", img: "civic.webp" },
{ nome: "BMW 320i", semanal: 3150, cat: "Luxo", consumo: "9 km/l", portaMalas: "480 L", desc: "Alto padrão, velocidade e tecnologia.", img: "320i.webp" }
];
let precoSemanalGlobal = 0;
let carroSelecionadoNome = '';

window.addEventListener('DOMContentLoaded', () => {
renderizarGrid();
atualizarRanking();
});

function renderizarGrid() {
const grid = document.getElementById('gridCarros');
if (!grid) return;
grid.innerHTML = carros.map(c => `
<div class="col">
<div class="card h-100 bg-dark text-light border-secondary p-3 position-relative">
<div class="position-absolute top-0 end-0 m-3 z-3">
<input class="form-check-input bg-dark border-secondary check-comparar" type="checkbox" value="${c.nome}" onchange="atualizarContador()">
</div>
<img src="${c.img}" class="card-img-top rounded mb-3" alt="${c.nome}">
<div class="card-body d-flex flex-column justify-content-between p-0">
<div>
<div class="d-flex justify-content-between align-items-center mb-2">
<span class="badge bg-danger bg-opacity-25 text-danger">${c.cat}</span>
<span class="fw-bold text-success">R$ ${c.semanal.toLocaleString('pt-BR')} <small class="text-secondary">/sem</small></span>
</div>
<h5 class="card-title fw-bold text-white">${c.nome}</h5>
<p class="card-text text-secondary small mb-3">${c.desc}</p>
</div>
<button class="btn btn-outline-primary rounded-pill w-100" onclick="abrirSubmenu('${c.nome}', ${c.semanal})">Alugar Carro</button>
</div>
</div>
</div>
`).join('');
}

function abrirSubmenu(nome, precoSemanal) {
carroSelecionadoNome = nome;
document.getElementById('modalCarTitle').innerText = 'Alugar: ' + nome;
precoSemanalGlobal = precoSemanal;
document.getElementById('inputSemanas').value = 1;
document.getElementById('selectSeguro').value = '700';
calcularTotal();
document.getElementById('rentalOverlay').classList.replace('d-none', 'd-flex');
}

function fecharSubmenu() {
document.getElementById('rentalOverlay').classList.replace('d-flex', 'd-none');
}

function calcularTotal() {
let semanas = parseInt(document.getElementById('inputSemanas').value) || 1;
if (semanas > 10) { semanas = 10; document.getElementById('inputSemanas').value = 10; }
if (semanas < 1) { semanas = 1; document.getElementById('inputSemanas').value = 1; }
const seguro = parseInt(document.getElementById('selectSeguro').value) || 0;
const total = (precoSemanalGlobal + seguro) * semanas;
const multa = total * 0.10;
const fmt = v => 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
document.getElementById('spanTotal').innerText = fmt(total);
document.getElementById('inputMulta').value = fmt(multa);
}

function finalizarAluguel(e) {
e.preventDefault();
salvarAluguelNoRanking(carroSelecionadoNome);
fecharSubmenu();
atualizarRanking();
Swal.fire({
icon: 'success',
title: 'Parabéns!',
text: `O veículo ${carroSelecionadoNome} foi alugado com sucesso e computado no ranking!`,
confirmButtonColor: '#dc3545',
background: '#212529',
color: '#fff'
});
}

function salvarAluguelNoRanking(nomeCarro) {
let ranking = JSON.parse(localStorage.getItem('rankingAlugueis')) || {};
ranking[nomeCarro] = (ranking[nomeCarro] || 0) + 1;
localStorage.setItem('rankingAlugueis', JSON.stringify(ranking));
}

function atualizarRanking() {
let ranking = JSON.parse(localStorage.getItem('rankingAlugueis')) || {};
let arrayRanking = Object.keys(ranking).map(nome => ({
nome: nome,
total: ranking[nome]
}));
arrayRanking.sort((a, b) => b.total - a.total);
let top5 = arrayRanking.slice(0, 5);
const tabela = document.getElementById('tabelaRanking');
if (!tabela) return;
if (top5.length === 0) {
tabela.innerHTML = `<tr><td colspan="3" class="text-center text-secondary py-3">Nenhum aluguel realizado ainda. Seja o primeiro!</td></tr>`;
return;
}
let html = '';
top5.forEach((item, index) => {
let badgeCor = index === 0 ? 'bg-warning text-dark' : (index === 1 ? 'bg-secondary text-white' : (index === 2 ? 'bg-danger text-white' : 'bg-dark border border-secondary text-light'));
html += `
<tr>
<td><span class="badge ${badgeCor} fw-bold px-2 py-1">#${index + 1}</span></td>
<td class="fw-bold text-white">${item.nome}</td>
<td class="text-end fw-bold text-success">${item.total} aluguel(is)</td>
</tr>
`;
});
tabela.innerHTML = html;
}

function atualizarContador() {
const qtd = document.querySelectorAll('.check-comparar:checked').length;
document.getElementById('contadorComparacao').innerText = qtd;
}

function compararCarrosSelecionados() {
const checkboxes = document.querySelectorAll('.check-comparar:checked');
if (checkboxes.length === 0) {
Swal.fire({
icon: 'warning',
title: 'Nenhum carro selecionado',
text: 'Selecione pelo menos um carro nos cards acima para comparar.',
confirmButtonColor: '#dc3545',
background: '#212529',
color: '#fff'
});
return;
}
let linhas = '';
checkboxes.forEach(cb => {
const c = carros.find(item => item.nome === cb.value);
if (c) {
linhas += `
<tr>
<td class="fw-bold">${c.nome}</td>
<td class="text-success">R$ ${c.semanal.toLocaleString('pt-BR')},00</td>
<td><span class="badge bg-danger">${c.cat}</span></td>
<td>${c.consumo}</td>
<td>${c.portaMalas}</td>
</tr>
`;
}
});
Swal.fire({
title: 'Comparativo Semanal',
html: `
<div class="table-responsive">
<table class="table table-dark table-striped table-bordered text-start m-0">
<thead>
<tr>
<th>Modelo</th>
<th>Valor Semanal</th>
<th>Categoria</th>
<th>Consumo</th>
<th>Porta-malas</th>
</tr>
</thead>
<tbody>${linhas}</tbody>
</table>
</div>
`,
width: '750px',
confirmButtonColor: '#dc3545',
confirmButtonText: 'Fechar',
background: '#212529',
color: '#fff'
});
}