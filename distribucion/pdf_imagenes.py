import os
import re
import fitz  # Importa PyMuPDF
from deep_translator import GoogleTranslator


def limpiar_y_traducir_pdf(ruta_pdf, carpeta_salida="resultado_pdf"):
    """Extrae texto e imágenes directamente de un PDF, filtra encabezados con Regex,

    traduce al español y guarda los resultados.
    """
    # 1. Crear carpetas de salida
    carpeta_imagenes = os.path.join(carpeta_salida, "imagenes")
    os.makedirs(carpeta_imagenes, exist_ok=True)

    print(f"[*] Leyendo el archivo PDF: {ruta_pdf}")
    documento = fitz.open(ruta_pdf)

    # Inicializar el traductor al español
    traductor = GoogleTranslator(source="auto", target="es")
    texto_completo_traducido = []

    # Configurar expresión regular para detectar/eliminar encabezados no deseados
    regex_encabezados = re.compile(
        r"^\s*(chapter|capítulo|section|sección|header|encabezado)\s+\w+.*$",
        re.IGNORECASE,
    )

    # Contadores para las imágenes
    contador_imagenes = 1

    # 2. PROCESAR EL PDF PÁGINA POR PÁGINA
    for numero_pagina in range(len(documento)):
        pagina = documento.load_page(numero_pagina)
        print(
            f"[*] Procesando página {numero_pagina + 1} de {len(documento)}..."
        )

        # --- EXTRACCIÓN DE IMÁGENES ---
        lista_imagenes = pagina.get_images(full=True)
        for img_info in lista_imagenes:
            xref = img_info[0]
            base_imagen = documento.extract_image(xref)
            bytes_imagen = base_imagen["image"]
            extension_img = base_imagen["ext"]

            # Guardar la imagen extraída
            nombre_img = f"imagen_pag_{numero_pagina + 1}_{contador_imagenes}.{extension_img}"
            ruta_guardado_img = os.path.join(carpeta_imagenes, nombre_img)

            with open(ruta_guardado_img, "wb") as f_img:
                f_img.write(bytes_imagen)

            contador_imagenes += 1

        # --- EXTRACCIÓN Y TRADUCCIÓN DE TEXTO ---
        # Extraemos el texto de la página en bloques independientes
        bloques_texto = pagina.get_text("blocks")

        for bloque in bloques_texto:
            # El texto del bloque está en la posición index 4 de la tupla
            lineas = bloque[4].split("\n")

            for linea in lineas:
                linea_limpia = linea.strip()

                if not linea_limpia:
                    continue

                # Filtrar la línea usando la expresión regular de encabezados
                if regex_encabezados.match(linea_limpia):
                    continue

                # Traducir la línea que pasó el filtro
 
                                # Traducir la línea que pasó el filtro
                try:
                    if len(linea_limpia) > 0:
                        texto_espanol = traductor.translate(linea_limpia)
                        
                        # SEGURIDAD: Solo agregar si la traducción fue exitosa (no es None)
                        if texto_espanol is not None:
                            texto_completo_traducido.append(str(texto_espanol))
                        else:
                            # Si falla, conserva el texto original en vez de dejarlo vacío
                            texto_completo_traducido.append(linea_limpia)
                except Exception as e:
                    # En caso de error de red, guarda la línea original
                    texto_completo_traducido.append(linea_limpia)
                    
    # 3. GUARDAR EL TEXTO FINAL TRADUCIDO
    ruta_texto_final = os.path.join(carpeta_salida, "texto_traducido.txt")
    
    # SEGURIDAD EXTRAS: Filtra la lista completa eliminando cualquier None remanente
    texto_limpio_final = [linea for linea in texto_completo_traducido if linea is not None]
    
    with open(ruta_texto_final, "w", encoding="utf-8") as f_txt:
        f_txt.write("\n".join(texto_limpio_final))
                

    print(f"\n[+] Proceso completado con éxito.")
    print(f"[+] {contador_imagenes - 1} imágenes guardadas en: {carpeta_imagenes}")
    print(f"[+] Texto traducido guardado en: {ruta_texto_final}")


# --- EJECUCIÓN DEL SCRIPT ---
if __name__ == "__main__":
    # Cambia 'mi_documento.pdf' por la ruta real de tu archivo en Kali Linux
    archivo_pdf = "DAHandbook_Section_08p07_Protection_of_HV_Transformers_757288_ENa.pdf"

    if os.path.exists(archivo_pdf):
        limpiar_y_traducir_pdf(archivo_pdf)
    else:
        print(
            f"[-] Error: No se encontró el archivo '{archivo_pdf}' en el directorio."
        )
