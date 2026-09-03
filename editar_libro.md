Para editar un libro en calibre, creandole capitulos, secciones y subsecciones, para ello se crea dentro del modulo de buscar (**cntl + F**) ,  seleccionar el modo Funcion regex,  haciendo dos acciones:

1. Creando una expresión regular `(<h[1-3][^>]*>)(.*)(</h[1-3]>)`,  la cual permite buscar todas las llaves h1, h2 y h3 y agrupar el contenido en tres porciones.
2. Crear una función en python que capture el texto obtenido de esta expresión regular, por ejemplo para el texto capturado `<h1 id="protecciones-eléctricas">PROTECCIONES ELÉCTRICAS</h1>` se agrupan  el texto de entrada  en el código de la siguiente manera para la función numeracion:


```python
def replace(match, number, file_name, metadata, dictionaries, data, functions, *args, **kwargs):
    # Inicializar contadores globales en la primera ejecución
    if 'h1_count' not in data:
        data['h1_count'] = 0
        data['h2_count'] = 0    
        data['h3_count'] = 0
        
    # separar el texto de entrada    
    tag_open = match.group(1)
    content = match.group(2)
    tag_close = match.group(3)
    
    # Identificar nivel del título, incrementar e inyectar
    if tag_open.startswith('<h1'):
        data['h1_count'] += 1
        data['h2_count'] = 0  # Reinicia el contador para los sub-encabezados
        return f"{tag_open}Capítulo {data['h1_count']}. {content}{tag_close}"
     
    elif tag_open.startswith('<h2'):
        data['h2_count'] += 1
        data['h3_count'] = 0
        return f"{tag_open} {data['h1_count']}.{data['h2_count']}. {content}{tag_close}"
          
    elif tag_open.startswith('<h3'):
        data['h3_count'] += 1
        return f"{tag_open}{data['h1_count']}.{data['h2_count']}.{data['h3_count']}. {content}{tag_close}"
        
    return match.group(0)
```

Las expresiones regulares para quitar los capitulos h1 es: ```(<h2[^>]*>)\s\d+\.\d\.\s(.*)(</h2>)```
