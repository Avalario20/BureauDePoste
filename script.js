
class Client {
    constructor(nom, service, tempsEstime, priorite) {
        this.nom = nom;
        this.service = service;
        this.tempsEstime = tempsEstime;
        this.priorite = priorite === "non";
    }
}

class FilePostale {
    constructor() {
        this.clients = [];
    }

    ajouterClient(client) {
        this.clients.push(client);
        this.afficherFile();
    }

    servirClient() {
        const clientPrioritaireIndex = this.clients.findIndex(client => client.priorite);
        const clientServi =
            clientPrioritaireIndex !== -1
                ? this.clients.splice(clientPrioritaireIndex, 1)[0]
                : this.clients.shift();

        this.afficherFile();
        return clientServi;
    }

    afficherFile() {
        const liste = document.getElementById("file-attente");
        liste.innerHTML = "";

        this.clients.forEach(client => {
            const element = document.createElement("li");
            element.textContent = `${client.nom} - ${client.service} (${client.priorite ? "Prioritaire" : "Standard"})`;
            liste.appendChild(element);
        });
    }
}

const filePostale = new FilePostale();


document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();

    const form = event.target;
    const nom = form.elements["nom"].value;
    const service = form.elements["service"].value;
    const temps = form.elements["temps"].value;
    const priorite = form.elements["priorite"].value;

    const client = new Client(nom, service, temps, priorite);

    filePostale.ajouterClient(client);

    form.reset();
});

document.getElementById("servir-client").addEventListener("click", () => {
    const clientServi = filePostale.servirClient();
    if (clientServi) {
        alert(`Client servi : ${clientServi.nom}`);
    } else {
        alert("Aucun client dans la file !");
    }
});
