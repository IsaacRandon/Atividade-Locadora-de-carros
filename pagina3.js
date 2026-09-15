let precoGlobal = 0;

function abrirSubmenu(nome, preco) {
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

function finalizarAluguel(e) {
    e.preventDefault();
    alert('Reserva solicitada com sucesso!');
    fecharSubmenu();
}