document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('meuFormulario');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o reload da página

        // Pega todos os inputs com classe 'nome' e filtra os que têm valor
        const nomes = Array.from(document.querySelectorAll('.nome'))
                           .map(input => input.value)
                           .filter(nome => nome.trim() !== '');

        const mensagem = document.getElementById('mensagem').value;

        const dados = {
            names: nomes,
            message: mensagem
        };

        fetch('https://fsdt-contact.onrender.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta');
            }
            return response.json();
        })
        .then(() => {
            alert('Formulário enviado com sucesso! 🎉');
            form.reset(); // Limpa os campos do formulário
        })
        .catch(() => {
            alert('Erro ao enviar o formulário 😓');
        });
    });
});
