let precoGlobal = 0;
let carroSelecionadoNome = '';

function abrirSubmenu(nome, preco) {
    carroSelecionadoNome = nome;
    document.getElementById('modalCarTitle').innerText = 'Alugar: ' + nome;
    precoGlobal = preco;
    document.getElementById('inputDias').value = 1;
    document.getElementById('selectSeguro').value = '120';
    calcularTotal();
    document.getElementById('rentalOverlay').classList.replace('d-none', 'd-flex');
}

function fecharSubmenu() {
    document.getElementById('rentalOverlay').classList.replace('d-flex', 'd-none');
}

function calcularTotal() {
    const dias = parseInt(document.getElementById('inputDias').value) || 1;
    const seguro = parseInt(document.getElementById('selectSeguro').value) || 0;
    const total = (precoGlobal + seguro) * dias;
    document.getElementById('spanTotal').innerText = 'R$ ' + total.toFixed(2).replace('.', ',');
}

// Aluguel com SweetAlert2
function finalizarAluguel(e) {
    e.preventDefault();
    fecharSubmenu();
    
    Swal.fire({
        icon: 'success',
        title: 'Parabéns!',
        text: `O veículo ${carroSelecionadoNome} foi alugado com sucesso!`,
        confirmButtonColor: '#dc3545',
        background: '#212529',
        color: '#fff'
    });
}

// Sistema de Comparação de Carros
const carrosParaComparacao = [
    { nome: "Chevrolet Onix 1.0", diaria: 90, categoria: "Econômico", consumo: "14 km/l", portaMalas: "289 L" },
    { nome: "Volkswagen Virtus", diaria: 150, categoria: "Sedan", consumo: "12 km/l", portaMalas: "521 L" },
    { nome: "Jeep Renegade", diaria: 210, categoria: "SUV", consumo: "10 km/l", portaMalas: "320 L" }
];

function compararCarros() {
    let htmlTabela = `
        <div class="table-responsive">
            <table class="table table-dark table-striped table-bordered text-start m-0">
                <thead>
                    <tr>
                        <th>Modelo</th>
                        <th>Diária</th>
                        <th>Categoria</th>
                        <th>Consumo</th>
                        <th>Porta-malas</th>
                    </tr>
                </thead>
                <tbody>
    `;

    carrosParaComparacao.forEach(c => {
        htmlTabela += `
            <tr>
                <td class="fw-bold">${c.nome}</td>
                <td class="text-success">R$ ${c.diaria},00</td>
                <td><span class="badge bg-danger">${c.categoria}</span></td>
                <td>${c.consumo}</td>
                <td>${c.portaMalas}</td>
            </tr>
        `;
    });

    htmlTabela += `</tbody></table></div>`;

    Swal.fire({
        title: 'Comparativo de Veículos',
        html: htmlTabela,
        width: '700px',
        confirmButtonColor: '#dc3545',
        confirmButtonText: 'Fechar',
        background: '#212529',
        color: '#fff'
    });
}