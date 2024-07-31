document.addEventListener('DOMContentLoaded', function() {
    const albums = [
        { id: 'imagem1', url: 'https://open.spotify.com/embed/album/4vXt6IpMcSnqonljffWlMI?utm_source=generator' },
        { id: 'imagem2', url: 'https://open.spotify.com/embed/album/1ORxRsK3MrSLvh7VQTF01F?utm_source=generator' },
        { id: 'imagem3', url: 'https://open.spotify.com/embed/album/2DpEBrjCur1ythIZ10gJWw?utm_source=generator' },
        { id: 'imagem4', url: 'https://open.spotify.com/embed/album/7xYiTrbTL57QO0bb4hXIKo?utm_source=generator' },
        { id: 'imagem5', url: 'https://open.spotify.com/embed/album/5XpEKORZ4y6OrCZSKsi46A?utm_source=generator' },
        { id: 'imagem6', url: 'https://open.spotify.com/embed/album/6QeosPQpJckkW0Obir5RT8?utm_source=generator' },
        { id: 'imagem7', url: 'https://open.spotify.com/embed/album/2wwCc6fcyhp1tfY3J6Javr?utm_source=generator' },
        { id: 'imagem8', url: 'https://open.spotify.com/embed/album/5HOHne1wzItQlIYmLXLYfZ?utm_source=generator' }
    ];

    function showIframe(event) {
        const imageElement = event.currentTarget;
        const spotifyUrl = imageElement.dataset.url;

        if (imageElement.dataset.isIframeVisible === 'true') return;

        const iframe = document.createElement('iframe');
        iframe.src = spotifyUrl;
        iframe.style.width = "600px";
        iframe.style.height = "600px";
        iframe.style.border = "none";
        iframe.style.maxWidth = "100%";
        iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.title = 'Clique para voltar à imagem';

        imageElement.parentNode.replaceChild(iframe, imageElement);
        iframe.dataset.isIframeVisible = 'true';
        iframe.dataset.url = spotifyUrl;
        iframe.addEventListener('click', showImage);
    }

    function showImage(event) {
        const iframeElement = event.currentTarget;
        const imageElement = document.createElement('img');
        imageElement.src = iframeElement.dataset.url;
        imageElement.dataset.isIframeVisible = 'false';
        imageElement.dataset.url = iframeElement.dataset.url;
        imageElement.style.cursor = 'pointer';
        iframeElement.parentNode.replaceChild(imageElement, iframeElement);
        imageElement.addEventListener('click', showIframe);
    }

    albums.forEach(album => {
        const imageElement = document.getElementById(album.id);
        imageElement.dataset.url = album.url;
        imageElement.dataset.isIframeVisible = 'false';
        imageElement.title = 'Clique para abrir o álbum';
        imageElement.style.cursor = 'pointer';
        imageElement.addEventListener('click', showIframe);
    });

    const voteForm = document.getElementById('voteForm');
    const voteMessage = document.getElementById('voteMessage');

    voteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedAlbum = document.querySelector('input[name="album"]:checked');

        if (selectedAlbum) {
            voteMessage.style.display = 'block'; 
            voteForm.reset();
        } else {
            alert('Por favor, selecione um álbum antes de enviar.');
        }
    });

    const suggestionForm = document.getElementById('suggestionForm');
    const suggestionMessage = document.getElementById('suggestionMessage');

    suggestionForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = suggestionForm.querySelector('input[name="nome"]').value;
        const email = suggestionForm.querySelector('input[name="mail"]').value;
        const suggestion = suggestionForm.querySelector('textarea').value;

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