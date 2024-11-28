// Función para extraer información del texto
export function extraerInformacion(query: string) {
    const generoRegex = /\b(rock|pop|jazz|blues|reggaeton|hip-hop|electrónica|country|salsa|merengue|bachata)\b/i;
    const tipoEventoRegex = /\b(boda|bodas|eventos infantiles|cumpleaños|conciertos|fiestas|corporativos|quinceañeras)\b/i;
    const tipoArtistaRegex = /\b(artista|Solista|banda|grupo|dueto|cantante|músico)\b/i;

    const generoMatch = query.match(generoRegex);
    const tipoEventoMatch = query.match(tipoEventoRegex);
    const tipoArtistaMatch = query.match(tipoArtistaRegex);

    return {
        genero_musical: generoMatch ? generoMatch[0].toLowerCase() : null,
        tipo_evento: tipoEventoMatch ? tipoEventoMatch[0].toLowerCase() : null,
        tipo: tipoArtistaMatch ? tipoArtistaMatch[0] : null,
    };
}