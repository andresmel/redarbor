function letters(event) {
    const input = event.target;
  let valor = input.value;

  // Elimina caracteres que no sean letras, espacios, tildes o ñ
  valor = valor.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]/g, '');

  // Limita a 100 caracteres (aunque también usamos maxlength por seguridad)
  if (valor.length > 100) {
    valor = valor.slice(0, 100);
  }

  input.value = valor;
}