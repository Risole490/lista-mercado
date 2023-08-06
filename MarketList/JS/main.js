const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || [] 

itens.forEach((elemento) => { 
    criaItem(elemento)
})

form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Dentro do target, tem uma parte de elements, onde tem os dois inputs 'nome' e 'quantidade' em suas posições e seus respectivos values
    // Pego o input de onde os valores foram inseridos
    const nome = e.target.elements['nome']
    const quantidade = e.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value)
    
    // Crio um objeto com o valor dos inputs capturados anteriormente para o item atual sendo submetido pelo form
    const itemAtual = { 
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(existe) {
        itemAtual.id = existe.id

        atualizaItem(itemAtual)
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual // atualizo o localStorage localizando o item com a sua posição no array
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id +1 : 0

        criaItem(itemAtual) // Chamo a função para criar o item
        itens.push(itemAtual)// O itemAtual será adicionado no array
    }

    // Adiciono a chave("itens") ao storage, ou atualizar o valor(itens) caso a chave já exista.
    localStorage.setItem("itens", JSON.stringify(itens))

    // Limpo os campos do form
    nome.value = ""
    quantidade.value = ""
})

function criaItem(item) {

    //Crio um novo elemento com a tag <li> e adiciono uma classe .item
    const novoItem = document.createElement('li')
    novoItem.classList.add('item') 

    //O numero do novo item receberá um elemento criado em <strong>
    const numeroItem = document.createElement('strong')
    //O elemento do número receberá o valor da quantidade capturada anteriormente no itemAtual
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id

    //Adiciono o numeroItem no elemento novoItem
    novoItem.appendChild(numeroItem)
    //Adiciono então o nome do itemAtual no elemento novoItem, que será adicionado na lista 
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    // Por fim, o item novo é adicionado na lista
    lista.appendChild(novoItem)
}

function atualizaItem(item) {
        document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id) // parentNode pega o elemento pai de onde o botão está. No caso, será o <li>
    })

    return elementoBotao
}


function deletaElemento(elemento, id) {
    elemento.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}