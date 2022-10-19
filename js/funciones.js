var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

    var speechRecognitionList = new SpeechGrammarList();

    let palabrasTexto=[]
    grammar = '#JSGF V1.0; grammar palabrasTexto; public <palabrasTexto> = ' + palabrasTexto.join(' | ') + ' ;'
 
  
    let reconocimiento = new webkitSpeechRecognition();
   crearGramatica( document.getElementById("texto").innerText )

    let bInicio = document.getElementById("comenzar")
    let bParar = document.getElementById("terminar")
    let texto = document.getElementById("voz")
    let bReproducir = document.getElementById("reproducir")
    let idiomaSeleccionado = "Ingles"

    document.getElementById("idioma").addEventListener("change", () => {
        let iidd = document.getElementById("idioma").value;


        if (iidd.indexOf("ES") > 0) {
            idiomaSeleccionado = "es-ES"
            reconocimiento.lang = idiomaSeleccionado
            document.getElementById("texto").innerText = "Hace mucho , muchísimo tiempo , en el próspero pueblo de Hamelín , en Alemania , sucedió algo muy extraño : una mañana , cuando sus gordos y satisfechos habitantes salieron de sus casas , encontraron las calles invadidas por miles de ratones que merodeaban por todas partes , devorando con mucha ansia el grano de sus repletos graneros y la comida de sus bien provistas despensas . Nadie acertaba a comprender la causa de tal invasión , y lo que era aún peor , nadie sabía qué hacer para acabar con tan inquietante plaga de ratones . Por más que pretendían exterminarlos o , al menos , ahuyentarlos , tal parecía que cada vez acudían más y mas ratones a la ciudad. Tal era la cantidad de ratones que , día tras día , se adueñaban de las calles y de las casas , que hasta los mismos gatos huían asustados ."
        }
        if (iidd.indexOf("US") > 0) {
            idiomaSeleccionado = "en-US"
            reconocimiento.lang = idiomaSeleccionado
            document.getElementById("texto").innerText = "A long , long time ago , in the prosperous town of Hamelin , in Germany , something very strange happened : one morning , when its fat and satisfied inhabitants left their houses , they found the streets invaded by thousands of mice that were prowling everywhere , devouring eagerly for grain from their overflowing barns and food from their well stocked pantries . No one was able to understand the cause of such an invasion , and what was even worse, no one knew what to do to put an end to such a disturbing plague of mice . As much as they tried to exterminate them or , at least , chase them away , it seemed that more and more mice were coming to the city . such was the number of mice that , day after day , took over the streets and houses , that even the cats themselves fled in fear "
        }
        if (iidd.indexOf("FR") > 0) {
            idiomaSeleccionado = "fr-FR"
            reconocimiento.lang = idiomaSeleccionado
            document.getElementById("texto").innerText = "Il y a très , très longtemps , dans la ville prospère de Hamelin , en Allemagne , quelque chose de très étrange s'est produit : un matin , alors que ses habitants gras et satisfaits quittaient leurs maisons , ils trouvèrent les rues envahies par des milliers de souris qui rôdaient partout , dévorant avec impatience le grain de leurs granges débordantes et la nourriture de leurs garde-manger bien garnis . Personne n'était capable de comprendre la cause d'une telle invasion , et ce qui était encore pire , personne ne savait quoi faire pour mettre un terme à un si inquiétant fléau de souris . Autant qu'ils essayaient de les exterminer ou , du moins , de les chasser , il semblait que de plus en plus de souris arrivaient dans la ville . Tel était le nombre de souris qui , jour après jour , envahissaient les rues et les maisons , que même les chats eux-mêmes s'enfuyaient de peur ."
        }

        crearGramatica( document.getElementById("texto").innerText )
    }, false)

    bReproducir.addEventListener("click", () => {
        leerTexto(document.getElementById("texto").innerText)
    }, false)


    reconocimiento.lang = idiomaSeleccionado

    reconocimiento.continuous = true;
    reconocimiento.interimResults = true;

    reconocimiento.onresult = (event) => {
        const resultados = event.results;
        console.log(resultados)
        const frase = resultados[resultados.length - 1][0].transcript;

        texto.value = frase
        textoLeido = frase

        palabras = textoLeido.split(" ");
        let palabraBuscar = palabras[palabras.length - 1]
        console.log(palabras[palabras.length - 1] + "         " + palabraBuscar)
        var informacion = document.getElementById("texto").innerHTML.toLowerCase();
      
       if(palabraBuscar.length<2){return}
        result = informacion.replace(palabraBuscar, "<b>" + palabraBuscar + "</b>", "ig")
        texto.innerHTML = result

        txt = document.getElementById("palabra")
       
        txt.value=palabraBuscar;
    }

    reconocimiento.onend = (event) => {
        console.log("Fin dictado") 
    }

    reconocimiento.onerror = (event) => {
        console.log("Error " + event.error)
    }

    bInicio.addEventListener("click", () => {
        reconocimiento.start();
    }, false)

    bParar.addEventListener("click", () => {
        reconocimiento.abort();
    }, false)

    const speech = new SpeechSynthesisUtterance();

    function leerTexto(texto) {

        speech.lang = idiomaSeleccionado 
        speech.text = texto;
        
        speech.volumen = 1
        speech.rate = 1
        speech.pitch = 1
        window.speechSynthesis.speak(speech)

    }

    PReproducir.addEventListener("click", () => {

        window.speechSynthesis.cancel()
    }, false)
    RPalabra.addEventListener("click", () => {

        leerTexto(document.getElementById("palabra").value)
    }, false)


    document.getElementById("texto").addEventListener("dblclick", () => {
        txt = document.getElementById("palabra")
        var sel = window.getSelection();
        txt.value=sel;
        leerTexto(sel)
    }, false)

    function crearGramatica(texto)
    {
    var textGramatica=  document.getElementById("texto").innerText
    palabrasTexto=textGramatica.split(" ")

    arrayGramatica=[];
    for(i=0;i<palabrasTexto.length;i++)
    {
        if(palabrasTexto[i].length> 2 ){
        arrayGramatica[i]=palabrasTexto[i]
        console.log( arrayGramatica[i])
    }
    }
     grammar = '#JSGF V1.0; grammar palabrasTexto; public <palabrasTexto> = ' + palabrasTexto.join(' | ') + ' ;'
     speechRecognitionList.addFromString(grammar, 1);
     reconocimiento.grammars = speechRecognitionList;

    }