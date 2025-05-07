function mostrar(tag) {
    document.querySelectorAll('page-1, page-2, page-3').forEach(el => {
      el.classList.remove('ativa');
    });
    document.querySelector(tag).classList.add('ativa');

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    const menuLink = document.querySelector(`[onclick="mostrar('${tag}')"]`);
    if (menuLink) menuLink.classList.add('active');
  }