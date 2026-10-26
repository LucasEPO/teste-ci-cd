
const dayjs = require('dayjs');

function verificarProjeto() {
  return {
    nome: 'ci-cd-sbom-pratica',
    status: 'funcionando',
    dataVerificacao: dayjs().format('DD/MM/YYYY HH:mm:ss')
  };
}

module.exports = { verificarProjeto };

if (require.main === module) {
  console.log(verificarProjeto());
}
