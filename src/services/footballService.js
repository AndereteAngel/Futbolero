const WORKER_URL = "https://futbolero-api.a-anderete.workers.dev";

/**
 * Obtener los partidos de una fecha desde nuestro Worker de Cloudflare.
 *
 * La API Key de API-Football nunca llega al frontend.
 * React solamente habla con nuestro Worker.
 */
export async function obtenerPartidosPorFecha(fecha) {
  if (!fecha) {
    throw new Error("Falta indicar la fecha.");
  }

  const url = `${WORKER_URL}/?date=${encodeURIComponent(fecha)}`;

  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error(
      `Error al consultar el Worker. Código: ${respuesta.status}`
    );
  }

  const datos = await respuesta.json();

  if (!datos.ok) {
    throw new Error(datos.error || "No se pudieron obtener los partidos.");
  }

  return datos.partidos || [];
}