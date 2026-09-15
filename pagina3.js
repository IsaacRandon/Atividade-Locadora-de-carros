// Base de dados com valores semanais ajustados (multiplicados por 7 dias)
const baseCarros = {
    "Chevrolet Onix 1.0": { diaria: 90, semanal: 630, cat: "Econômico", consumo: "14 km/l", portaMalas: "289 L" },
    "Hyundai HB20": { diaria: 95, semanal: 665, cat: "Econômico", consumo: "14.5 km/l", portaMalas: "300 L" },
    "Fiat Argo 1.0": { diaria: 100, semanal: 700, cat: "Econômico", consumo: "13.5 km/l", portaMalas: "300 L" },
    "Chevrolet Prisma": { diaria: 140, semanal: 980, cat: "Sedan", consumo: "12.5 km/l", portaMalas: "500 L" },
    "Volkswagen Virtus": { diaria: 150, semanal: 1050, cat: "Sedan", consumo: "12 km/l", portaMalas: "521 L" },
    "Honda City": { diaria: 160, semanal: 1120, cat: "Sedan", consumo: "13 km/l", portaMalas: "519 L" },
    "Jeep Renegade": { diaria: 210, semanal: 1470, cat: "SUV", consumo: "10 km/l", portaMalas: "320 L" },
    "Hyundai Creta": { diaria: 230, semanal: 1610, cat: "SUV", consumo: "10.5 km/l", portaMalas: "431 L" },
    "Jeep Compass": { diaria: 250, semanal: 1750, cat: "SUV", consumo: "9.5 km/l", portaMalas: "410 L" },
    "Toyota Corolla": { diaria: 280, semanal: 1960, cat: "Executivo", consumo: "11 km/l", portaMalas: "470 L" },
    "Honda Civic": { diaria: 310, semanal: 2170, cat: "Executivo", consumo: "11.5 km/l", portaMalas: "495 L" },
    "BMW 320i": { diaria: 450, semanal: 3150, cat: "Luxo", consumo: "9 km/l", portaMalas: "480 L" }
};

let precoSemanalGlobal = 0;
let carroSelecionadoNome = '';

function abrirSubmenu(nome, precoSemanal) {
    carroSelecionadoNome = nome;
    document.getElementById('modalCarTitle').innerText = 'Alugar: ' + nome;
    precoSemanalGlobal = precoSemanal;
    document.getElementById('inputSemanas').value = 1;
    document.getElementById('selectSeguro').value = '700'; // Seguro padrão completo semanal
    calcularTotal();
    document.getElementById('rentalOverlay').classList.replace('d-none', 'd-flex');
}

function fecharSubmenu() {
    document.getElementById('rentalOverlay').classList.replace('d-flex', 'd-none');
}

function calcularTotal() {
    let semanas = parseInt(document.getElementById('inputSemanas').value) || 1;
    
    // Validação estrita para o limite de 10 semanas
    if (semanas > 10) {
        semanas = 10;
        document.getElementById('inputSemanas').value = 10;
    } else if (semanas < 1) {
        semanas = 1;
        document.getElementById('inputSemanas').value = 1;
    }

    const seguro = parseInt(document.getElementById('selectSeguro').value) || 0;
    const total = (precoSemanalGlobal + seguro) * semanas;
    
    // Multa de atraso (10% do valor total)
    const multa = total * 0.10;

    document.getElementById('spanTotal').innerText = 'R$ ' + total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('inputMulta').value = 'R$ ' + multa.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

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

function atualizarContador() {
    const checkboxes = document.querySelectorAll('.check-comparar:checked');
    document.getElementById('contadorComparacao').innerText = checkboxes.length;
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