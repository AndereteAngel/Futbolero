import { calcularPuntos } from "./calcularPuntos";

const pruebas = [
    {
        nombre: "Resultado exacto",
        pronosticoLocal: 3,
        pronosticoVisitante: 1,
        resultadoLocal: 3,
        resultadoVisitante: 1,
    },
    {
        nombre: "Resultado + diferencia",
        pronosticoLocal: 2,
        pronosticoVisitante: 0,
        resultadoLocal: 3,
        resultadoVisitante: 1,
    },
    {
        nombre: "Resultado correcto",
        pronosticoLocal: 2,
        pronosticoVisitante: 1,
        resultadoLocal: 3,
        resultadoVisitante: 1,
    },
    {
        nombre: "Resultado incorrecto",
        pronosticoLocal: 1,
        pronosticoVisitante: 2,
        resultadoLocal: 3,
        resultadoVisitante: 1,
    },
    {
        nombre: "Empate + diferencia",
        pronosticoLocal: 2,
        pronosticoVisitante: 2,
        resultadoLocal: 1,
        resultadoVisitante: 1,
    },
    {
        nombre: "Empate incorrecto",
        pronosticoLocal: 3,
        pronosticoVisitante: 1,
        resultadoLocal: 1,
        resultadoVisitante: 1,
    },
    {
        nombre: "Partido suspendido",
        pronosticoLocal: 2,
        pronosticoVisitante: 1,
        resultadoLocal: 0,
        resultadoVisitante: 0,
        estado: "PST",
    },
];

pruebas.forEach((prueba) => {
    const puntos = calcularPuntos(prueba);

    console.log(
        `${prueba.nombre}:`,
        puntos
    );
});