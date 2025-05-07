function mostrar(tag) {
    // Esconde todas as páginas
    document.querySelectorAll('page-1, page-2, page-3').forEach(el => {
      el.classList.remove('ativa');
    });
    document.querySelector(tag).classList.add('ativa');

    // Atualiza o item ativo da navbar
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    const menuLink = document.querySelector(`[onclick="mostrar('${tag}')"]`);
    if (menuLink) menuLink.classList.add('active');
  }