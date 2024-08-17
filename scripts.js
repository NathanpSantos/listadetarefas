const caixaescreve = document.getElementById("caixa-escreve");
const boxlista = document.getElementById("box-lista");

function addTask(){
    if(caixaescreve.value === ''){
        alert("Você deve escrever algo primeiro");
    } else {
        let li = document.createElement("li");
        li.innerHTML = caixaescreve.value;
        boxlista.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    caixaescreve.value = "";
    SalvarInformações();
}

boxlista.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("verificado");
        SalvarInformações();
    } else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        SalvarInformações();
    }
}, false);

function SalvarInformações(){
    localStorage.setItem("data", boxlista.innerHTML);
}

function MostrarTarefas(){
    boxlista.innerHTML = localStorage.getItem("data");
}

MostrarTarefas();

function filterTasks(filter) {
    const tasks = document.querySelectorAll("#box-lista li");

    tasks.forEach(task => {
        switch (filter) {
            case "all":
                task.style.display = "flex";
                break;
            case "completed":
                if (task.classList.contains("verificado")) {
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!task.classList.contains("verificado")) {
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                }
                break;
        }
    });
}
