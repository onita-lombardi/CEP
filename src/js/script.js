const input_cep = document.getElementById("cep")
const rua = document.getElementById("rua")
const estado = document.getElementById("estado")
const bairro = document.getElementById("bairro")

const buscarCep = (cep) => {
    const API_URL = `https://viacep.com.br/ws/${cep}/json/`

    fetch(API_URL)
        .then(res => res.json())
        .then(data =>{
            if (data.erro){
                preencherErro()
            }else{
                rua.value = data.logradouro
                estado.value = data.estado
                bairro.value = data.bairro
            }
        })
        .catch(err => preencherErro())
}

const preencherErro = () => {
    rua.value = "Não encontrado"
    estado.value = "Não encontrado"
    bairro.value = "Não encontrado"
}

const limparCep = () => {
    rua.value = ""
    estado.value = ""
    bairro.value = ""
}

input_cep.addEventListener("input", () => {
    let cep = input_cep.value.replace(/\D/g, "");

    cep = cep.slice(0, 8);

    const cepFormatado = cep.length > 5 ? cep.slice(0, 5) + "-" + cep.slice(5) : cep;

    input_cep.value = cepFormatado;

    if (cep.length === 8) {
        buscarCep(cep);
    }else{
        limparCep()
    }
})
