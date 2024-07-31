document.addEventListener('DOMContentLoaded', function() {
    const suggestionForm = document.getElementById('suggestionForm');
    const suggestionMessage = document.getElementById('suggestionMessage');

    suggestionForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = suggestionForm.querySelector('input[name="nome"]').value.trim();
        const email = suggestionForm.querySelector('input[name="mail"]').value.trim();
        const suggestion = suggestionForm.querySelector('textarea[name="suggestion"]').value.trim();

        const isNameValid = name.length > 2;
        const isEmailValid = email.includes('@') && email.includes('.');
        const isSuggestionValid = suggestion.length >= 30;

        if (isNameValid && isEmailValid && isSuggestionValid) {
            suggestionMessage.style.display = 'block';
            suggestionForm.reset();
        } else {
            alert('Por favor, preencha todos os campos corretamente. Nome deve ter mais de 2 letras, e-mail deve conter "@" e ".", e sugestão deve ter no mínimo 30 caracteres.');
        }
    });
});