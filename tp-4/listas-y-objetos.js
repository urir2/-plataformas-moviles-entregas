var listaPersonasEjemplo = [
    {
        "apellido": "Perez",
        "nombre": "Juan",
        "edad": 20,
        "documento": 12345
    },
    {
        "apellido": "Lopez",
        "nombre": "Luis",
        "edad": 20,
        "documento": 23456
    },
    {
        "apellido": "Zapata",
        "nombre": "Pablo",
        "edad": 10,
        "documento": 34567
    },
    {
        "apellido": "Acuña",
        "nombre": "Ana",
        "edad": 30,
        "documento": 45678
    },
];
/**
 * 01 - ordenarPorApellido
 * 
 * Recibe
 * - `listaDePersonas`: una lista, array, con objetos de la forma `persona`.
 * 
 * Ordena la lista alfabéticamente por el apellido de la persona en su lugar.
 */
function ordenarPorApellido(listaDePersonas) {
    listaDePersonas.sort((a, b) => {
        return a.apellido.localeCompare(b.apellido);
    });
}

// Ejemplo de uso:
ordenarPorApellido(listaPersonasEjemplo);
console.log("listaDePersonas ordenada por apellido:", listaPersonasEjemplo);

/**
 * 02 - soloNombres
 * 
 * Recibe
 * - `listaDePersonas`: una lista, array, con objetos de la forma `persona`
 * 
 * Retorna: 
 * - una lista de strings, con sólo los nombres de las personas
 */
function soloNombres(listaDePersonas) {
    let listaNombres = [];

    for (let i=0; i<listaDePersonas.length; i++) {
        let nombreDePersona = listaDePersonas[i].nombre;
        listaNombres.push(nombreDePersona);
    }

    return listaNombres;

    // return listaDePersonas.map(p => p.nombre);
}
console.log("soloNombres()", soloNombres(listaPersonasEjemplo));

/**
 * 03 - promedioEdades
 * 
 * Recibe
 * - `listaDePersonas`: una lista, array, con objetos de la forma `persona`
 * 
 * Retorna: 
 * - un numero, con el cálculo del promedio de las edades
 */
function promedioEdades(listaDePersonas) {
    let total = 0;
    for(let i=0; i<listaDePersonas.length; i++) {
        total += listaDePersonas[i].edad;
    }
    return total / listaDePersonas.length;
}
console.log("promedioEdades()", promedioEdades(listaPersonasEjemplo));

/**
 * 04 - soloMayoresDeEdad
 * 
 * Recibe
 * - `listaDePersonas`: una lista, array, con objetos de la forma `persona`
 * 
 * Retorna: 
 * - una lista, array, conteniendo solamente las personas con más de 18 años
 */
function soloMayoresDeEdad(listaDePersonas) {
    return listaDePersonas.filter(persona => persona.edad > 18);
}

// Ejemplo de uso:
console.log("soloMayoresDeEdad()", soloMayoresDeEdad(listaPersonasEjemplo));

/**
 * 05 - laPersonaMayor
 * 
 * Recibe
 * - `listaDePersonas`: una lista, array, con objetos de la forma `persona`
 * 
 * Retorna: 
 * - un objeto con la persona de mayor edad en todo el listado. En caso de que haya varias personas con la misma edad, se devuelve la primera que aparezca en el listado.
 */
function laPersonaMayor(listaDePersonas) {
    if (listaDePersonas.length === 0) {
        return null; // Si la lista está vacía, no hay persona mayor.
    }

    let personaMayor = listaDePersonas[0]; // Inicialize con la primera persona de la lista.

    for (let i = 1; i < listaDePersonas.length; i++) {
        if (listaDePersonas[i].edad > personaMayor.edad) {
            personaMayor = listaDePersonas[i]; //se Actualiza si se encuentra una persona de mayor edad.
        }
    }

    return personaMayor;
}

// Ejemplo de uso:
console.log("laPersonaMayor()", laPersonaMayor(listaPersonasEjemplo));
