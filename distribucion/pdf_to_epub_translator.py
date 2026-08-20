import fitz  # PyMuPDF (or pdfplumber / pypdf)
import ebooklib
from ebooklib import epub
from deep_translator import GoogleTranslator
import os

def extract_text_from_pdf(pdf_path):
    """
    Extrae el texto de un archivo PDF página por página.
    """
    doc = fitz.open(pdf_path)
    pages_text = []
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text("text")
        if text.strip():
            pages_text.append((page_num + 1, text))
    doc.close()
    return pages_text

def translate_text(text, target_language='es', max_chunk_size=4000):
    """
    Traduce el texto por fragmentos para evitar límites de API.
    """
    translator = GoogleTranslator(source='auto', target=target_language)
    
    # Dividir texto por líneas o párrafos para no exceder límites por petición
    paragraphs = text.split('\n\n')
    translated_paragraphs = []
    
    for p in paragraphs:
        if not p.strip():
            continue
        # Si el párrafo es muy largo, cortarlo en partes más pequeñas
        if len(p) > max_chunk_size:
            chunks = [p[i:i+max_chunk_size] for i in range(0, len(p), max_chunk_size)]
            translated_chunks = [translator.translate(chunk) for chunk in chunks if chunk.strip()]
            translated_paragraphs.append(" ".join(translated_chunks))
        else:
            try:
                translated_p = translator.translate(p)
                translated_paragraphs.append(translated_p)
            except Exception as e:
                print(f"Error al traducir párrafo: {e}")
                translated_paragraphs.append(p)  # Mantener original en caso de falla
                
    return "\n\n".join(translated_paragraphs)

def create_epub(pages_translated, output_epub_path, title="Documento Traducido", author="ABB / Traducido"):
    """
    Crea un libro EPUB a partir de una lista de textos traducidos.
    """
    book = epub.EpubBook()
    
    # Metadatos del libro
    book.set_identifier("id_pdf_translated_es")
    book.set_title(title)
    book.set_language("es")
    book.add_author(author)
    
    spine = ['nav']
    toc = []
    
    for page_num, text in pages_translated:
        # Crear capítulo para cada página o sección
        chapter = epub.EpubHtml(
            title=f"Página {page_num}",
            file_name=f"page_{page_num}.xhtml",
            lang="es"
        )
        
        # Formatear el texto traducido a HTML
        paragraphs_html = "".join([f"<p>{p.strip()}</p>" for p in text.split('\n\n') if p.strip()])
        chapter.content = f"<h2>Página {page_num}</h2>{paragraphs_html}"
        
        # Añadir al libro
        book.add_item(chapter)
        spine.append(chapter)
        toc.append(chapter)
        
    # Definir la tabla de contenidos y la navegación
    book.toc = tuple(toc)
    book.add_item(epub.EpubNcx())
    book.add_item(epub.EpubNav())
    
    # Estilo CSS básico
    style = """
    @namespace epub "http://www.idpf.org/2007/ops";
    body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        padding: 10px;
    }
    h2 {
        color: #004080;
        border-bottom: 1px solid #ccc;
        padding-bottom: 5px;
    }
    p {
        margin-bottom: 1em;
        text-align: justify;
    }
    """
    nav_css = epub.EpubItem(
        uid="style_nav",
        file_name="style/nav.css",
        media_type="text/css",
        content=style
    )
    book.add_item(nav_css)
    book.spine = spine
    
    # Escribir el archivo EPUB
    epub.write_epub(output_epub_path, book, {})
    print(f"¡EPUB generado exitosamente en: {output_epub_path}!")

def pdf_to_translated_epub(pdf_path, epub_path):
    print("1. Extrayendo texto del PDF...")
    pages = extract_text_from_pdf(pdf_path)
    print(f"Se extrajeron {len(pages)} páginas con texto.")
    
    pages_translated = []
    total = len(pages)
    
    for idx, (page_num, text) in enumerate(pages, 1):
        print(f"2. Traduciendo página {page_num} ({idx}/{total})...")
        translated_text = translate_text(text, target_language='es')
        pages_translated.append((page_num, translated_text))
        
    print("3. Generando libro EPUB...")
    title = os.path.basename(pdf_path).replace('.pdf', '')
    create_epub(pages_translated, epub_path, title=f"Traducción: {title}")

if __name__ == "__main__":
    # Ruta del archivo PDF de entrada
    input_pdf = "DAHandbook_Section_08p07_Protection_of_HV_Transformers_757288_ENa.pdf"  # O el nombre de tu archivo PDF
    output_epub = "Proteccion_de_Transformadores_AT.epub"
    
    pdf_to_translated_epub(input_pdf, output_epub)
