import os
import re
from bs4 import BeautifulSoup
from ebooklib import epub

def html_to_epub(html_file_path, output_epub_path):
    # 1. Leer el contenido del archivo HTML
    with open(html_file_path, 'r', encoding='utf-8', errors='ignore') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    # 2. Inicializar el libro EPUB
    book = epub.EpubBook()

    # Extraer el título del documento o usar uno predeterminado
    title_tag = soup.find('title')
    book_title = title_tag.get_text(strip=True) if title_tag else "Manual del Sistema de Gestión Ambiental"
    
    book.set_identifier("daruma-sga-2026")
    book.set_title(book_title)
    book.set_language('es')
    book.add_author('EMCALI E.I.C.E. E.S.P.')

    # 3. Extraer y procesar el contenido principal
    content_div = soup.find('div', id='cA8VctNbeUjyJlwd')
    if not content_div:
        content_div = soup.find('div', id='document-viewer')

    # Eliminar elementos no deseados de la interfaz
    for tag in soup.find_all(['script', 'style', 'meta', 'link']):
        tag.decompose()

    # Extraer encabezado/tabla de control si existe
    header_table = soup.find('table', id='WTf7uAwF62f6MvUC')
    header_html = str(header_table) if header_table else ""

    # Limpiar atributos innecesarios de etiquetas (remueve anchos fijos en HTML)
    if content_div:
        for tag in content_div.find_all(True):
            # Limpiar estilos fijos y atributos de ancho que rompen el diseño responsivo
            if tag.name in ['table', 'tr', 'td', 'th']:
                if 'width' in tag.attrs:
                    del tag.attrs['width']
                if 'style' in tag.attrs:
                    del tag.attrs['style']
            elif 'style' in tag.attrs:
                del tag.attrs['style']

        body_html = str(content_div)
    else:
        body_html = "<p>No se pudo procesar el contenido principal del documento.</p>"

    # 4. Crear el capítulo dentro del EPUB
    chapter = epub.EpubHtml(
        title="Manual del Sistema de Gestión Ambiental",
        file_name="contenido.xhtml",
        lang="es"
    )

    # Estilos CSS optimizados para tablas
    css_style = """
    body {
        font-family: Arial, sans-serif;
        line-height: 1.5;
        padding: 5px;
    }
    h1, h2, h3 {
        color: #003366;
    }
    /* La tabla ocupa el 100% del ancho de la página */
    table {
        width: 100% !important;
        max-width: 100%;
        border-collapse: collapse;
        margin: 15px 0;
        table-layout: auto; /* Permite que las columnas se distribuyan según el texto */
    }
    /* Estilos para celdas con fuente reducida y ajuste de palabra */
    th, td {
        border: 1px solid #ccc;
        padding: 4px 6px;
        font-size: 0.75em; /* Tamaño de fuente reducido para las tablas */
        word-wrap: break-word;
        overflow-wrap: break-word;
    }
    th {
        background-color: #f2f2f2;
        font-weight: bold;
    }
    ul {
        margin-left: 20px;
    }
    """

    chapter.content = f"""
    <html>
    <head>
        <style>{css_style}</style>
    </head>
    <body>
        {header_html}
        <hr/>
        {body_html}
    </body>
    </html>
    """

    # Agregar el capítulo al libro
    book.add_item(chapter)

    # Configurar la estructura de navegación
    book.toc = (epub.Link("contenido.xhtml", "Manual SGA", "intro"),)
    book.add_item(epub.EpubNcx())
    book.add_item(epub.EpubNav())

    # Definir el orden de lectura
    book.spine = ['nav', chapter]

    # 5. Generar el archivo EPUB
    epub.write_epub(output_epub_path, book, {})
    print(f"¡Éxito! El EPUB se ha generado correctamente en: {output_epub_path}")

if __name__ == "__main__":
    input_file = "MANUAL DEL SISTEMA DE GESTIÓN AMBIENTAL.html"
    output_file = "MANUAL_SGA_EMCALI.epub"

    if os.path.exists(input_file):
        html_to_epub(input_file, output_file)
    else:
        print(f"El archivo '{input_file}' no se encuentra en el directorio actual.")