const q = (el) => document.querySelector(el);
let Actualprice;
let modalKey = 0;
let cart = [];
let Qnumber;



pizzaJson.map((item, index) =>{

    let pizzaItem = q(".models .pizza-item").cloneNode(true);
    
    pizzaItem.setAttribute("data-key", index)
    pizzaItem.querySelector(".pizza-item--img img").src = innerHTML = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = (`R$: ${item.price.toFixed(2)}`);
    pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    document.querySelector('.pizza-area').append(pizzaItem);

    
   
    

    
    pizzaItem.querySelector("a").addEventListener('click', (e)=>{
        e.preventDefault()     // OU SEJA, A TELA NÃO VAI ATUALIZAR
            let key = e.target.closest(".pizza-item").getAttribute("data-key")
            modalKey = key;
            // QUANDO VC CLICAR NELE ELE SELECIONARA O PIZZA-ITEM E DELE IRÁ PEGAR O ATRIBUTO DATA-KEY
            q(".pizzaInfo--desc").innerHTML = pizzaJson[key].description
            q(".pizzaBig img").src = innerHTML = pizzaJson[key].img
            q('.pizzaInfo--size.selected').classList.remove('selected')
            q(".pizzaInfo h1").innerHTML = pizzaJson[key].name

            let pizzaArea = document.querySelector('.pizzaWindowArea')
            pizzaArea.style.opacity= "0.5";
            pizzaArea.style.display= "flex";
            setTimeout( ()=> {
                pizzaArea.style.opacity= "1"}, 50 )

                 

            document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) =>{
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
            if(sizeIndex == 2){
                size.classList.add('selected')
            }
            
            
                 
            }) //selecion o item, pra cada item vc vai fazer algo(função), usando os parametros (size, sizeIndex)


         Actualprice =  q(".pizzaInfo--actualPrice").innerHTML = pizzaJson[key].price.toFixed(2)
         let Qnumber = document.querySelector('.pizzaInfo--qt')
         Qnumber.innerHTML = 1 
         
        })
        
       
       
            
   
});

function increase() {
    let number =  document.querySelector('.pizzaInfo--qt')
     let Number = number.innerHTML
     let un = parseFloat(Number)
     number.innerHTML = (un + 1)

     if(number.innerHTML != 0){
        let numberprice =  q(".pizzaInfo--actualPrice")
        Qnumber = document.querySelector('.pizzaInfo--qt')
        let QNumber = Qnumber.innerHTML
        let PQnumber = parseFloat(QNumber)
        let result = (Actualprice * PQnumber).toFixed(2)
       numberprice.innerHTML = result}
    
      
  }

  function decrease() {
    let number =  document.querySelector('.pizzaInfo--qt')
     let Number = number.innerHTML
     let un = parseFloat(Number)
     number.innerHTML = (un - 1)
     if(number.innerHTML <= 0)
     {number.innerHTML = 1}
     
   
     if(number.innerHTML != 0){
        let numberprice =  q(".pizzaInfo--actualPrice")
        let Qnumber = document.querySelector('.pizzaInfo--qt')
        let QNumber = Qnumber.innerHTML
        let PQnumber = parseFloat(QNumber)
        let result = (Actualprice * PQnumber).toFixed(2)
       numberprice.innerHTML = result}

}



function CloseModal() {
    let pizzaArea = document.querySelector('.pizzaWindowArea')
    pizzaArea.style.opacity= "0";
    setTimeout( () =>{
    pizzaArea.style.display= "none"}, 200 )
}
document.querySelectorAll(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach((item) => {
    item.addEventListener('click', CloseModal)
})


document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
       size.addEventListener('click', (e)=>{
           document.querySelector(".pizzaInfo--size.selected").classList.remove('selected')
           size.classList.add('selected')
       })
})





q('.pizzaInfo--addButton').addEventListener('click', ()=> {

    let size = parseInt(document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalKey].id+"@"+size;

    let key = cart.findIndex((item)=>item.identifier === identifier);
    if(key > -1){
        cart[key].qt += parseInt(Qnumber.innerHTML);
    }else{
    cart.push({id: pizzaJson[modalKey].id, 
    size,
    identifier,
    qt: Qnumber.innerHTML})}
     
    updateCart()
    CloseModal();

})

q('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0){    
    q('aside').style.left = "0px"}
})
q('.menu-closer').addEventListener("click", () => {
    q('aside').style.left = "100vw"
})

function updateCart() {

    q('.menu-openner span').innerHTML = cart.length;

     if(cart.length > 0){
        q("aside").classList.add('show')
         q('.cart').innerHTML = " "

        let subtotal = 0;
        let total = 0;
        let desconto = 0;

        for(let i in cart){

            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id)
            subtotal += pizzaItem.price * cart[i].qt
            
        let cartItem = q('.models .cart--item').cloneNode(true)
        
        let pizzaSizeName;
        switch(cart[i].size){
            case 0:
                pizzaSizeName = "P"
            break;
            case 1:
                pizzaSizeName = "M"
            break;
            case 2:
                pizzaSizeName = "G"
            break;
        }

        let pizzaName = `${pizzaItem.name} ${pizzaSizeName}`

        cartItem.querySelector('img').src = pizzaItem.img
        cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
        cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
        cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
             if(cart[i].qt > 1){
            cart[i].qt--; }
            else{
                cart.splice(i, 1)
            }
             updateCart()
        })
        cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
             cart[i].qt++; 
             updateCart()
        })
        

        q('.cart').append(cartItem)


            }
        
            desconto = subtotal * 0.1;
            total = subtotal - desconto;

            q('.subtotal span:last-child').innerHTML = `R$${subtotal.toFixed(2)}`
            q('.desconto span:last-child').innerHTML = `R$${desconto.toFixed(2)}`
            q('.total span:last-child').innerHTML = `R$${total.toFixed(2)}`

        } 
     else{
        q("aside").classList.remove('show')
        q('aside').style.left = '100vw'
     }
    }
