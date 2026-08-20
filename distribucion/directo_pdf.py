import os
import re
import fitz  # PyMuPDF
from ebooklib import epub


def pdf_a_epub_sin_traduccion(ruta_pdf, ruta_epub_salida="libro_generado.epub"):
    """Lee un PDF, extrae texto e imágenes, elimina encabezados mediante Regex,

    y empaqueta el contenido directamente en un formato EPUB (sin traducir).
    """
    print(f"[*] Leyendo el archivo PDF: {ruta_pdf}")
    doc_pdf = fitz.open(ruta_pdf)

    # 1. Inicializar el contenedor del libro EPUB
    libro = epub.EpubBook()

    # Configurar metadatos básicos por defecto
    libro.set_identifier("pdf_convertido_01")
    libro.set_title("Libro Convertido desde PDF")
    libro.set_language("es")

    # Configurar la expresión regular para eliminar los encabezados no deseados
    regex_encabezados = re.compile(
        r"^\s*(chapter|capítulo|section|sección|header|encabezado)\s+\w+.*$",
        re.IGNORECASE,
    )

    # Estructuras para almacenar el contenido del libro
    items_capitulos = []
    contador_imagenes = 1

    print("[*] Procesando páginas del PDF...")

    # 2. PROCESAR CADA PÁGINA DEL PDF
    for num_pag in range(len(doc_pdf)):
        pagina = doc_pdf.load_page(num_pag)
        html_contenido_capitulo = f"<h2>Página {num_pag + 1}</h2>"

        # --- A. EXTRACCIÓN Y PROCESAMIENTO DE IMÁGENES ---
        imagenes_pagina = pagina.get_images(full=True)
        for img_info in imagenes_pagina:
            xref = img_info[0]
            base_img = doc_pdf.extract_image(xref)
            bytes_img = base_img["image"]
            ext_img = base_img["ext"]

            # Crear el nombre del archivo de imagen interno en el EPUB
            nombre_interno_img = f"imagenes/img_{num_pag + 1}_{contador_imagenes}.{ext_img}"

            # Crear el objeto de imagen para EbookLib
            item_epub_img = epub.EpubImage()
            item_epub_img.file_name = nombre_interno_img
            item_epub_img.content = bytes_img

            # Añadir la imagen al catálogo general del libro
            libro.add_item(item_epub_img)

            # Insertar la referencia HTML de la imagen en el texto de la página
            html_contenido_capitulo += (
                f'<p style="text-align: center;"><img src="{nombre_interno_img}" alt="Imagen"/></p>'
            )
            contador_imagenes += 1

        # --- B. EXTRACCIÓN Y LIMPIEZA DE TEXTO ---
        bloques_texto = pagina.get_text("blocks")
        texto_pagina_limpio = []

        for bloque in bloques_texto:
            lineas = bloque[4].split("\n")

            for linea in lineas:
                linea_limpia = linea.strip()

                if not linea_limpia:
                    continue

                # Filtrar con la expresión regular: si coincide con un encabezado, se salta
                if regex_encabezados.match(linea_limpia):
                    continue

                # Almacenar línea limpia
                texto_pagina_limpio.append(linea_limpia)

        # Reconstruir el texto limpio en formato de párrafos HTML (<p>)
        for parrafo in texto_pagina_limpio:
            html_contenido_capitulo += f"<p>{parrafo}</p>"

        # --- C. CREAR EL CAPÍTULO INTERNO DEL EPUB ---
        # El formato EPUB requiere que el texto esté encapsulado en XHTML
        capitulo = epub.EpubHtml(
            title=f"Página {num_pag + 1}",
            file_name=f"capitulo_{num_pag + 1}.xhtml",
            lang="es",
        )
        capitulo.content = (
            f"<html><body>{html_contenido_capitulo}</body></html>"
        )

        # Guardar en las listas internas
        libro.add_item(capitulo)
        items_capitulos.append(capitulo)

    # 3. CONFIGURAR LA ESTRUCTURA INTERNA DEL EPUB (Navegación Obligatoria)
    libro.toc = tuple(items_capitulos)

    # Definir el orden de lectura lineal (Spine)
    libro.spine = ["nav"] + items_capitulos

    # Agregar archivos de control de formato requeridos por el estándar EPUB
    libro.add_item(epub.EpubNcx())
    libro.add_item(epub.EpubNav())

    # 4. GUARDAR EL ARCHIVO FINAL
    print(f"[*] Empaquetando y escribiendo archivo EPUB final...")
    epub.write_epub(ruta_epub_salida, libro)

    print(f"\n[+] ¡Éxito! Archivo EPUB generado correctamente.")
    print(f"[+] Destino: {os.path.abspath(ruta_epub_salida)}")
    print(f"[+] Se procesaron {len(doc_pdf)} páginas y {contador_imagenes - 1} imágenes.")


# --- EJECUCIÓN DEL SCRIPT ---
if __name__ == "__main__":
    # Cambia esto por el nombre de tu archivo PDF en Kali Linux
    archivo_pdf_origen = "DAHandbook_Section_08p07_Protection_of_HV_Transformers_757288_ENa.pdf"

    if os.path.exists(archivo_pdf_origen):
        pdf_a_epub_sin_traduccion(archivo_pdf_origen)
    else:
        print(
            f"[-] Error: No se encontró el archivo '{archivo_pdf_origen}' en este directorio."
        )
