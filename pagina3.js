// Base completa de dados para cálculo e comparação
const baseCarros = {
    "Chevrolet Onix 1.0": { diaria: 90, cat: "Econômico", consumo: "14 km/l", portaMalas: "289 L" },
    "Hyundai HB20": { diaria: 95, cat: "Econômico", consumo: "14.5 km/l", portaMalas: "300 L" },
    "Fiat Argo 1.0": { diaria: 100, cat: "Econômico", consumo: "13.5 km/l", portaMalas: "300 L" },
    "Chevrolet Prisma": { diaria: 140, cat: "Sedan", consumo: "12.5 km/l", portaMalas: "500 L" },
    "Volkswagen Virtus": { diaria: 150, cat: "Sedan", consumo: "12 km/l", portaMalas: "521 L" },
    "Honda City": { diaria: 160, cat: "Sedan", consumo: "13 km/l", portaMalas: "519 L" },
    "Jeep Renegade": { diaria: 210, cat: "SUV", consumo: "10 km/l", portaMalas: "320 L" },
    "Hyundai Creta": { diaria: 230, cat: "SUV", consumo: "10.5 km/l", portaMalas: "431 L" },
    "Jeep Compass": { diaria: 250, cat: "SUV", consumo: "9.5 km/l", portaMalas: "410 L" },
    "Toyota Corolla": { diaria: 280, cat: "Executivo", consumo: "11 km/l", portaMalas: "470 L" },
    "Honda Civic": { diaria: 310, cat: "Executivo", consumo: "11.5 km/l", portaMalas: "495 L" },
    "BMW 320i": { diaria: 450, cat: "Luxo", consumo: "9 km/l", portaMalas: "480 L" }
};

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
    
    // Multa de atraso fixa em 10% do valor total da locação
    const multa = total * 0.10;

    document.getElementById('spanTotal').innerText = 'R$ ' + total.toFixed(2).replace('.', ',');
    document.getElementById('inputMulta').value = 'R$ ' + multa.toFixed(2).replace('.', ',');
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

// Atualiza o contador de selecionados na interface
function atualizarContador() {
    const checkboxes = document.querySelectorAll('.check-comparar:checked');
    document.getElementById('contadorComparacao').innerText = checkboxes.length;
}

// Sistema de Comparação Dinâmica Personalizada
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

    checkboxes.forEach(cb => {
        const nomeCarro = cb.value;
        const dados = baseCarros[nomeCarro];
        if (dados) {
            htmlTabela += `
                <tr>
                    <td class="fw-bold">${nomeCarro}</td>
                    <td class="text-success">R$ ${dados.diaria},00</td>
                    <td><span class="badge bg-danger">${dados.cat}</span></td>
                    <td>${dados.consumo}</td>
                    <td>${dados.portaMalas}</td>
                </tr>
            `;
        }
    });

    htmlTabela += `</tbody></table></div>`;

    Swal.fire({
        title: 'Comparativo de Veículos Selecionados',
        html: htmlTabela,
        width: '750px',
        confirmButtonColor: '#dc3545',
        confirmButtonText: 'Fechar',
        background: '#212529',
        color: '#fff'
    });
}