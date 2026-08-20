/*Genérame un cuestionario de selección múltiple con 20 preguntas cada una con cinco opciones, con relación a poner aquí el tema dentro del documento, separando las preguntas de las respuestas, en formato de diccionario de javascript , así diccionario = { "pregunta": "texto del la pregunta", "respuesta": A, "opciones": {"A. texto opción A", "B. texto opción B", "C. texto opción C", "D. texto opción D", "E. texto opción E" } }
instrucciones para gemini
créame un formulario html/javascript que me permita interactuar sobre las siguientes preguntas seleccionando aleatoriamente de una en una*/

const preguntas = [
    {
        "pregunta": "Según la fuente, ¿cuál es uno de los objetivos clave del Protocolo IEC 61850 en la automatización de subestaciones?",
        "respuesta": "A",
        "opciones": {
            "A": "Facilitar la instalación e integración de sistemas de control y protección, incluyendo equipos de varios proveedores [1].",
            "B": "Reemplazar completamente todos los protocolos de comunicación existentes en la red de distribución.",
            "C": "Implementar exclusivamente la comunicación serial en el bus de proceso [2].",
            "D": "Eliminar la necesidad de herramientas de ingeniería propietarias para la configuración de los DEI [3].",
            "E": "Estandarizar únicamente la capa física y de enlace del modelo OSI [4]."
        }
    },
    {
        "pregunta": "¿En qué año se convirtió el Protocolo IEC 61850 en un estándar internacional, ganando aceptación en las empresas eléctricas?",
        "respuesta": "D",
        "opciones": {
            "A": "1991, con la introducción de UCA [5].",
            "B": "1997, cuando se vinculó la IEC a la investigación [6].",
            "C": "2004, al concluir la primera edición [7].",
            "D": "2005, cuando se hizo estándar internacional [1].",
            "E": "2012, con la publicación de los Roadmaps para Smart Grids [8]."
        }
    },
    {
        "pregunta": "¿Cuál de las siguientes es una ventaja principal que ofrece el Protocolo IEC 61850, según las fuentes?",
        "respuesta": "B",
        "opciones": {
            "A": "Dependencia obligatoria de protocolos propietarios [9].",
            "B": "Interoperabilidad entre IEDs de diferentes fabricantes y estandarización de ingeniería [9-11].",
            "C": "Limitación del crecimiento de la red a pequeñas áreas geográficas [12].",
            "D": "Uso exclusivo de direcciones fijas para la identificación de la información [13].",
            "E": "Implementación de VPNs de forma exclusiva [14]."
        }
    },
    {
        "pregunta": "Originalmente, el IEC 61850 fue concebido para la automatización de subestaciones y la telecomunicación entre sus dispositivos, enfocado en:",
        "respuesta": "C",
        "opciones": {
            "A": "La comunicación entre subestaciones a gran distancia [7].",
            "B": "La comunicación hacia los centros de control [7].",
            "C": "La comunicación interna de la subestación [7, 15].",
            "D": "La armonización con el protocolo DNP 3.0 [16].",
            "E": "La implementación de redes inalámbricas [17]."
        }
    },
    {
        "pregunta": "El primer principio clave en el que se basa la norma IEC 61850 para lograr sus objetivos es:",
        "respuesta": "A",
        "opciones": {
            "A": "Definir un modelo de información unificado con una jerarquía de nombres y estructuras de datos específicas [18, 19].",
            "B": "Establecer la transmisión de valores muestreados sobre medios seriales exclusivamente [2].",
            "C": "Requerir el uso de cables UTP para todos los enlaces del bus de estación [20].",
            "D": "Prohibir totalmente las funciones y soluciones propietarias [21].",
            "E": "Utilizar únicamente el MMS para toda la comunicación dentro de la subestación [22]."
        }
    },
    {
        "pregunta": "El segundo principio clave del IEC 61850 para alcanzar sus objetivos se refiere a:",
        "respuesta": "B",
        "opciones": {
            "A": "La utilización de comandos en modo texto (CLI) para la configuración de los DEI [23].",
            "B": "Definir un protocolo de comunicaciones y una funcionalidad común que es un lenguaje acordado para todos los equipos del sistema [19].",
            "C": "La adopción del protocolo SNMP para el monitoreo de los dispositivos [24].",
            "D": "El uso exclusivo de la autodescripción para la configuración automática [25].",
            "E": "La obligatoriedad de utilizar interfaces de red de 10 Mbps [26]."
        }
    },
    {
        "pregunta": "La parte 6 del estándar IEC 61850 (SCL) está pensada para cumplir con qué principio clave:",
        "respuesta": "D",
        "opciones": {
            "A": "La estandarización de los mensajes GOOSE [27].",
            "B": "La definición de las clases de datos comunes (CDC) [28].",
            "C": "La asignación de direcciones IP de manera automática (DHCP) [29].",
            "D": "Establecer un formato de fichero de configuración basado en XML para facilitar las tareas de automatización y configuración [30, 31].",
            "E": "El uso del modelo Cliente-Servidor basado en TCP/IP [22]."
        }
    },
    {
        "pregunta": "¿Qué representa un Nodo Lógico (Logical Node) en el modelo IEC 61850?",
        "respuesta": "E",
        "opciones": {
            "A": "Una dirección MAC específica en la red [32].",
            "B": "El dispositivo físico (Physical Device) completo [33].",
            "C": "El formato de archivo XML utilizado para la configuración del sistema [34].",
            "D": "Un tipo de Gateway para la conversión de protocolos [35].",
            "E": "Una agrupación nombrada de datos y servicios asociados que está lógicamente relacionada con alguna función del sistema de potencia [36, 37]."
        }
    },
    {
        "pregunta": "Para la comunicación, la IEC 61850 optó por el uso de Ethernet después de pruebas intensivas, aprendiendo del fracaso del proyecto:",
        "respuesta": "C",
        "opciones": {
            "A": "DNP 3.0 [38].",
            "B": "IEC 60870-5-104 [4].",
            "C": "MAP (Manufacturing Automation Protocol) [39].",
            "D": "UCA 2.0 [6].",
            "E": "H.323 [40]."
        }
    },
    {
        "pregunta": "Según los roadmaps (mapas de ruta) para redes inteligentes (Smart Grids), ¿qué serie de la norma IEC es considerada la apropiada para la comunicación dentro de la subestación, entre subestaciones y a los centros de control?",
        "respuesta": "A",
        "opciones": {
            "A": "La serie completa de la IEC 61850 [41].",
            "B": "El estándar IEEE C37.118 [41].",
            "C": "Los protocolos IEC 60870-5 [42].",
            "D": "El protocolo DNP 3.0 [16].",
            "E": "El modelo CIM (Common Information Model) [43]."
        }
    },
    {
        "pregunta": "En la jerarquía de la información de IEC 61850, ¿cuál es el nivel más alto que representa el IED físico?",
        "respuesta": "B",
        "opciones": {
            "A": "Logical Device (LD) [33].",
            "B": "Physical Device (PHD) [33].",
            "C": "Logical Node (LN) [33].",
            "D": "Data Attribute (DA) [44].",
            "E": "Common Data Class (CDC) [45]."
        }
    },
    {
        "pregunta": "¿Qué componente dentro del esquema de comunicación de un Dispositivo Físico (PHD) es una composición de Nodos Lógicos y servicios adicionales (como GOOSE o SV)?",
        "respuesta": "D",
        "opciones": {
            "A": "Data (Data) [33].",
            "B": "Functional Constraint (FC) [44].",
            "C": "Data Attribute (DA) [44].",
            "D": "Logical Device (LD) [33, 45].",
            "E": "Server (SERVER) [46]."
        }
    },
    {
        "pregunta": "Los Logical Nodes (Nodos Lógicos) para las funciones de Protección se identifican en sus nombres comenzando con la letra:",
        "respuesta": "C",
        "opciones": {
            "A": "M (Metering and Measurement) [36].",
            "B": "X (Switchgear) [36].",
            "C": "P (Protection) [36, 47].",
            "D": "C (Supervisory Control) [36].",
            "E": "A (Automatic Control) [36]."
        }
    },
    {
        "pregunta": "Un disyuntor o interruptor es modelado como un nodo lógico, cuyas iniciales de clase de nodo lógico (LNClass) son:",
        "respuesta": "B",
        "opciones": {
            "A": "MMXU [36].",
            "B": "XCBR [36].",
            "C": "PTOC [47].",
            "D": "RPSB [47].",
            "E": "GGIO [48]."
        }
    },
    {
        "pregunta": "El concepto de Common Data Classes (CDC) fue desarrollado para definir bloques de construcción comunes para crear objetos de datos más grandes, como:",
        "respuesta": "A",
        "opciones": {
            "A": "Status, Control, Measurement, Substitution [28, 47].",
            "B": "Protocolos de enrutamiento (RIP, OSPF) [49].",
            "C": "MAC Address y direcciones IP [32].",
            "D": "Comandos de Telnet y SSH [50].",
            "E": "SCL, ICD y SSD [51]."
        }
    },
    {
        "pregunta": "En la anatomía de un nombre de objeto IEC 61850-8-1 (e.g., Relay1/XCBR1\$ST\$Loc\$stVal), ¿qué parte corresponde al Nodo Lógico (Logical Node)?",
        "respuesta": "D",
        "opciones": {
            "A": "Relay1 [5].",
            "B": "\$ST\$Loc\$stVal [5].",
            "C": "\$stVal [5].",
            "D": "XCBR1 [5].",
            "E": "El Functional Constraint [5]."
        }
    },
    {
        "pregunta": "Los Data Attributes (atributos de datos) dentro de los Logical Nodes se encuentran ordenados por:",
        "respuesta": "A",
        "opciones": {
            "A": "Functional Constraints (FC) [44, 52].",
            "B": "Abstract Syntax Notation (ASN.1) [53].",
            "C": "Quality of Service (QoS) [54].",
            "D": "IP Multicast Addresses [55].",
            "E": "Protocolos de red (IP/TCP) [4]."
        }
    },
    {
        "pregunta": "Según la IEC 61850, ¿cuál es la definición de un Nodo Lógico?",
        "respuesta": "E",
        "opciones": {
            "A": "Una tabla de direcciones MAC [32].",
            "B": "La capa de red del modelo OSI [56].",
            "C": "Un conjunto de herramientas para la ciberseguridad [57].",
            "D": "El lenguaje de descripción de configuración (SCL) [58].",
            "E": "Una agrupación nombrada de datos y servicios que es lógicamente relacionada con alguna función del sistema de potencia [36].",
        }
    },
    {
        "pregunta": "La IEC 61850 mapea su modelo abstracto de objetos y servicios al protocolo real conocido como:",
        "respuesta": "C",
        "opciones": {
            "A": "Generic Object Oriented Substation Event (GOOSE) [59].",
            "B": "Sampled Measured Values (SMV) [8].",
            "C": "Manufacturing Message Specification (MMS) [5, 28, 59].",
            "D": "Distributed Network Protocol (DNP3) [38].",
            "E": "Hypertext Transfer Protocol (HTTP) [60]."
        }
    },
    {
        "pregunta": "¿Por qué se eligió MMS para el mapeo de IEC 61850, según las fuentes?",
        "respuesta": "A",
        "opciones": {
            "A": "Es el único protocolo público (estándar ISO) con un historial probado que puede soportar fácilmente los complejos modelos de nombres y servicios de IEC 61850 [5].",
            "B": "Es un protocolo sencillo que solo proporciona servicios de lectura/escritura para variables indexadas [5].",
            "C": "Fue desarrollado específicamente por IEC TC 57 para la automatización de subestaciones [39].",
            "D": "Opera directamente sobre la Capa 2 (multidifusión) para comunicaciones rápidas [22].",
            "E": "Utiliza únicamente el formato XML para la serialización de datos [61]."
        }
    },
    {
        "pregunta": "¿Cuál es el tipo de comunicación dentro del IEC 61850 que se basa en TCP/IP MMS (orientado a la conexión)?",
        "respuesta": "C",
        "opciones": {
            "A": "GOOSE [22].",
            "B": "Valores muestreados (SV) [22].",
            "C": "Cliente - Servidor [22].",
            "D": "Generic Substation State Event (GSSE) [62].",
            "E": "Protocolo de tiempo de precisión (PTP) [63]."
        }
    },
    {
        "pregunta": "¿En qué parte del estándar IEC 61850 se define la abstracción de los servicios?",
        "respuesta": "E",
        "opciones": {
            "A": "Parte 6 (SCL) [28].",
            "B": "Parte 8.1 (MMS Mapping) [28].",
            "C": "Parte 7.4 (Logical Nodes) [28].",
            "D": "Parte 7.3 (CDC) [28].",
            "E": "Parte 7.2 (Abstract Services) [28].",
        }
    },
    {
        "pregunta": "MMS (Manufacturing Message Specification) fue originalmente diseñado para la industria de:",
        "respuesta": "B",
        "opciones": {
            "A": "Servicios de Internet (Web Services) [64].",
            "B": "Manufactura (Manufacturing) [5, 39].",
            "C": "Telecomunicaciones celulares (5G) [17].",
            "D": "Protección contra fallas de interruptores [65].",
            "E": "Redes de área local inalámbricas (WLAN) [66]."
        }
    },
    {
        "pregunta": "Según la tabla de mapeo de objetos IEC 61850 a MMS, ¿a qué objeto MMS se mapea el objeto LOGICAL DEVICE class?",
        "respuesta": "D",
        "opciones": {
            "A": "Named Variable [46].",
            "B": "SERVER class [46].",
            "C": "Virtual Manufacturing Device (VMD) [46].",
            "D": "Domain [46].",
            "E": "Journal [46]."
        }
    },
    {
        "pregunta": "El ACSI (Abstract Communication Service Interface) modela un conjunto de servicios que permite a todos los IEDs comportarse de manera idéntica desde la perspectiva del comportamiento de la red. ¿Qué significa ACSI?",
        "respuesta": "A",
        "opciones": {
            "A": "Abstract Communication Service Interface [67].",
            "B": "Asymmetric Digital Subscriber Line [68].",
            "C": "Application Service Data Unit [69].",
            "D": "Adaptive Security Device Manager [70].",
            "E": "Array Configuration Specification Index [71]."
        }
    },
    {
        "pregunta": "Los mensajes GOOSE, utilizados para comunicaciones rápidas, se mapean a la Capa 2 (enlace de datos) y utilizan el mecanismo de:",
        "respuesta": "E",
        "opciones": {
            "A": "IP sobre TCP/IP [59].",
            "B": "Comunicaciones seriales asíncronas [72].",
            "C": "Conmutación de circuitos (TDM) [73].",
            "D": "Encapsulación en HTTP/XML [74].",
            "E": "Multidifusión (Multicast).",
        }
    },
    {
        "pregunta": "Para la sincronización de tiempo, el NIST y la IEC han seleccionado el estándar IEEE 1588 v.2 / IEC 61588-2009, que define el protocolo:",
        "respuesta": "B",
        "opciones": {
            "A": "NTP (Network Time Protocol) [75].",
            "B": "PTP (Precision Time Protocol) [63, 76].",
            "C": "SNMP (Simple Network Management Protocol) [24].",
            "D": "DHCP (Dynamic Host Configuration Protocol) [29].",
            "E": "RTCP (Real Time Control Protocol) [77]."
        }
    },
    {
        "pregunta": "En el nombre de objeto IEC 61850-8-1 (e.g., Relay1/XCBR1\$ST\$Loc\$stVal), ¿qué representa el componente “\$ST\$”?",
        "respuesta": "D",
        "opciones": {
            "A": "Logical Device [5].",
            "B": "Logical Node [5].",
            "C": "Data Attribute [5].",
            "D": "Functional Constraint [5, 52].",
            "E": "Data Object [52]."
        }
    },
    {
        "pregunta": "MMS es apropiado para cualquier aplicación que requiera:",
        "respuesta": "B",
        "opciones": {
            "A": "Conmutación rápida basada en MAC Addresses [32].",
            "B": "Un mecanismo común de comunicación para el acceso en tiempo real y distribución de datos y control del proceso de supervisión [78].",
            "C": "El establecimiento de un circuito físico dedicado para la comunicación [73].",
            "D": "La encriptación de credenciales en texto claro [79].",
            "E": "El uso exclusivo de la autodescripción para el intercambio de información [80]."
        }
    },
    {
        "pregunta": "¿Cuáles son las dos clases de mensajes GSE (Generic Substation Event) definidas en IEC 61850, antes de que GSSE fuera depurado en la Segunda Edición?",
        "respuesta": "C",
        "opciones": {
            "A": "MMS y SV [81].",
            "B": "H.323 y SIP [82].",
            "C": "GOOSE y GSSE [62, 83, 84].",
            "D": "PRP y HSR [85].",
            "E": "ICD y SCD [51]."
        }
    },
    {
        "pregunta": "¿Qué significa la sigla GOOSE?",
        "respuesta": "E",
        "opciones": {
            "A": "General Output Operations Substation Exchange [27].",
            "B": "Generic Operation Over Substation Ethernet [27].",
            "C": "Global Object Oriented System Exchange [27].",
            "D": "Generic Operational Organization System Event [27].",
            "E": "Generic Object Oriented Substation Event [27, 86].",
        }
    },
    {
        "pregunta": "¿Cuál es uno de los propósitos principales de los mensajes GOOSE?",
        "respuesta": "B",
        "opciones": {
            "A": "Proveer la dirección IP y la máscara de subred automáticamente a los IEDs [29].",
            "B": "Transmitir comandos de disparo a un interruptor desde un relevador a otro (esquemas de protección) [27, 87].",
            "C": "Centralizar el almacenamiento de eventos de log en un servidor [57].",
            "D": "Actuar como conversor de protocolos entre DNP3 y Modbus [88].",
            "E": "Definir la arquitectura jerárquica de la subestación (LN, LD, etc.) [33]."
        }
    },
    {
        "pregunta": "¿Qué modelo de transmisión utilizan los mensajes GOOSE?",
        "respuesta": "A",
        "opciones": {
            "A": "Modelo Editor – Subscriptor (Publisher – Subscriber) [55, 89, 90].",
            "B": "Modelo Cliente – Servidor (Client – Server) [22].",
            "C": "Modelo Maestro – Esclavo (Master – Slave) [69].",
            "D": "Modelo Punto a Punto (Point-to-Point) serial [2].",
            "E": "Modelo de Circuito Conmutado (TDM) [73]."
        }
    },
    {
        "pregunta": "Dado que los mensajes GOOSE no cuentan con un mecanismo de confirmación de recepción en la capa de transporte, ¿qué propone la IEC 61850 para mejorar la fiabilidad de la transmisión?",
        "respuesta": "C",
        "opciones": {
            "A": "Implementar un protocolo TCP para cada mensaje GOOSE [90].",
            "B": "Forzar una conexión Punto a Punto dedicada [2].",
            "C": "La repetición de los mismos mensajes GOOSE varias veces [90].",
            "D": "Enviar los mensajes utilizando GSSE en paralelo [62].",
            "E": "Utilizar exclusivamente cables de fibra óptica para el bus de estación [91]."
        }
    },
    {
        "pregunta": "El uso de mensajes GOOSE para la lógica de control y el bloqueo distribuido en la subestación permite eliminar:",
        "respuesta": "D",
        "opciones": {
            "A": "El uso de direcciones IP en los IEDs [13].",
            "B": "La capa de aplicación del modelo OSI [59].",
            "C": "La necesidad de herramientas de ingeniería [3].",
            "D": "El alambrado y los switches convencionales en el panel de relés (cableado físico tradicional) [92-94].",
            "E": "El uso del formato XML para la descripción de la configuración [34]."
        }
    },
    {
        "pregunta": "¿Qué es el 'monitoreo activo' (active monitoring) que realizan los relés receptores de mensajes GOOSE?",
        "respuesta": "B",
        "opciones": {
            "A": "La verificación de que la dirección MAC de destino sea correcta [32].",
            "B": "El relevador receptor busca en el constante flujo de mensajes y puede reportar inmediatamente cuando dicho flujo cesa o si los mensajes están ausentes cuando se esperaban [92].",
            "C": "El proceso de autodescripción del DEI hacia el cliente [80].",
            "D": "El registro de eventos de log para auditoría [57].",
            "E": "El uso de un algoritmo de hash para verificar la integridad del mensaje [95]."
        }
    },
    {
        "pregunta": "Además de comandos de disparo y cierre de interruptor, los mensajes GOOSE también llevan información como:",
        "respuesta": "E",
        "opciones": {
            "A": "Direcciones MAC de origen y destino [32].",
            "B": "Modelos UML para la configuración del sistema [96].",
            "C": "Configuración de DHCP y DNS [29].",
            "D": "Valores de latencia y jitter [97, 98].",
            "E": "Inicio de falla de interruptor y estado de una salida lógica para supervisión de acciones [27].",
        }
    },
    {
        "pregunta": "GSSE (Generic Substation State Event) proporciona la capacidad para transmitir información de cambio de estado (pares de bits) y es descendiente de qué protocolo anterior a IEC 61850:",
        "respuesta": "C",
        "opciones": {
            "A": "MMS [39].",
            "B": "DNP 3.0 [38].",
            "C": "UCA (Utility Communications Architecture) [62].",
            "D": "VoIP (Voice over IP) [99].",
            "E": "HTML (Hypertext Markup Language) [64]."
        }
    },
    {
        "pregunta": "Los mensajes GOOSE se transmiten directamente sobre la Capa 2 (enlace de datos) y utilizan qué tipo de direccionamiento para llegar a múltiples receptores simultáneamente?",
        "respuesta": "C",
        "opciones": {
            "A": "Unicast IP [59].",
            "B": "Broadcast [65].",
            "C": "Multicast [22, 55].",
            "D": "Punto a punto [2].",
            "E": "WAN (Wide Area Network) [100]."
        }
    },
    {
        "pregunta": "¿Cuál es un punto poderoso para usar mensajes GOOSE relacionado con las fallas en el camino de control?",
        "respuesta": "A",
        "opciones": {
            "A": "Los usuarios siempre saben cuando una trayectoria de control falla, y no tienen que esperar hasta que una operación incorrecta se presente para detectarla [89].",
            "B": "Se garantiza que el mensaje llegará al destino por el uso de TCP/IP [90].",
            "C": "Permite el uso de protocolos cifrados como SSH y HTTPS [79].",
            "D": "Automatiza la asignación de direcciones IP mediante DHCP [29].",
            "E": "Asegura la trazabilidad de los paquetes a través del router [101]."
        }
    },
    {
        "pregunta": "El Lenguaje de Configuración de Subestaciones (SCL) es un formato de archivo estandarizado basado en:",
        "respuesta": "D",
        "opciones": {
            "A": "ASN.1 (Abstract Syntax Notation One) [53].",
            "B": "UML (Unified Modeling Language) [96].",
            "C": "HTML (Hypertext Markup Language) [102].",
            "D": "XML (Extensible Markup Language) [31, 34, 61, 103].",
            "E": "BNF (Backus-Naur Format) [53]."
        }
    },
    {
        "pregunta": "¿Qué es la Auto-descripción en el contexto de IEC 61850?",
        "respuesta": "A",
        "opciones": {
            "A": "La posibilidad de los servidores (DEI’s) de decirle a los clientes (Maestras) la lista y el formato de los datos que tienen disponible para reportar [25, 80].",
            "B": "El lenguaje de descripción de configuración basado en XML [34].",
            "C": "El mecanismo de repetición de mensajes GOOSE para asegurar la entrega [90].",
            "D": "La función de un Gateway para convertir protocolos [35].",
            "E": "La capacidad de un switch para aprender las direcciones MAC [32]."
        }
    },
    {
        "pregunta": "Una desventaja de usar solo la Auto-descripción para la configuración es que el DEI debe estar conectado físicamente, lo que causa conflictos durante:",
        "respuesta": "C",
        "opciones": {
            "A": "La transmisión de mensajes GOOSE en tiempo real [92].",
            "B": "El establecimiento de la comunicación Cliente-Servidor [22].",
            "C": "Pruebas de instalación en sitio o de aceptación en fábrica, cuando el equipo llega en diferentes tiempos [104, 105].",
            "D": "El uso del modelo Publisher-Subscriber [55].",
            "E": "La implementación de SNMP para el monitoreo [24]."
        }
    },
    {
        "pregunta": "Para resolver la mayoría de las desventajas de la Auto-descripción, el IEC 61850 utiliza la tecnología complementaria:",
        "respuesta": "B",
        "opciones": {
            "A": "El protocolo DNP 3.0 [38].",
            "B": "El SCL (Substation Configuration description Language) [34, 106].",
            "C": "El MMS (Manufacturing Message Specification) [5].",
            "D": "El concepto Plug and Play de las PC’s [107].",
            "E": "El CIM (Common Information Model) [43]."
        }
    },
    {
        "pregunta": "¿Cómo se llama el método que combina la Auto-descripción, el SCL y una configuración manual para configurar clientes con IEC 61850?",
        "respuesta": "C",
        "opciones": {
            "A": "Plug and Play avanzado [107].",
            "B": "Configuración de Fábrica Unificada (CFU) [108].",
            "C": "Configuración Asistida por Potencia (Configuración Asistida por Energía) [108].",
            "D": "Modelo Cliente-Servidor MMS [22].",
            "E": "Bloqueo Distribuido [65]."
        }
    },
    {
        "pregunta": "¿Cuál es una ventaja de utilizar la Configuración Asistida por Potencia sobre usar solo la Auto-descripción?",
        "respuesta": "A",
        "opciones": {
            "A": "El DEI no tiene que estar físicamente conectado para la integración, ya que la configuración puede ser transferida de una herramienta de ingeniería a otra usando SCL [109].",
            "B": "El usuario recibe automáticamente solo los datos que desea, evitando datos innecesarios [110].",
            "C": "El proceso se realiza en tiempo de corrida para garantizar la inmediatez [104].",
            "D": "El archivo SCL nunca requiere ser editado manualmente [111].",
            "E": "Se eliminan todos los requerimientos de seguridad informática [112]."
        }
    },
    {
        "pregunta": "¿Cuál de los siguientes tipos de archivos SCL describe la configuración de la subestación completa (System Configuration Description)?",
        "respuesta": "D",
        "opciones": {
            "A": "ICD (IED Capability Description) [51].",
            "B": "SSD (System Specification Description) [51].",
            "C": "CID (Configured IED Description) [51].",
            "D": "SCD (System Configuration Description) [51, 61].",
            "E": "IID (Instantiated IED Description) [51]."
        }
    },
    {
        "pregunta": "Los Valores Muestreados (Sampled Measured Values - SMV/SV) se utilizan principalmente para la comunicación en el nivel conocido como:",
        "respuesta": "B",
        "opciones": {
            "A": "Nivel de Estación [113].",
            "B": "Bus de Proceso (Process Bus) [2, 114].",
            "C": "Nivel de Bahía [113].",
            "D": "Centro de Control (NCC) [35].",
            "E": "Bus de Campo [114]."
        }
    },
    {
        "pregunta": "Al igual que GOOSE, el mecanismo de transmisión de los Sampled Values (SV) es:",
        "respuesta": "E",
        "opciones": {
            "A": "Cliente-Servidor (Client-Server) basado en MMS [22].",
            "B": "Protocolo de enrutamiento dinámico (RIP) [49].",
            "C": "Telecontrol serial y asíncrono (IEC 60870-5-101) [72].",
            "D": "Consulta y respuesta (Query/Response) [115].",
            "E": "Publicador-Suscriptor (Publisher-Subscriber) [55, 90].",
        }
    },
    {
        "pregunta": "A diferencia de GOOSE, la norma IEC 61850 en su parte 9-2 no sugiere la repetición del mismo mensaje para los paquetes SV. ¿Por qué?",
        "respuesta": "B",
        "opciones": {
            "A": "Porque los paquetes SV son menos críticos para la protección [17].",
            "B": "Porque los paquetes SV se envían continuamente (80 muestras por ciclo) y su repetición aumentaría la carga de la red enormemente [90].",
            "C": "Porque MMS maneja la confirmación de entrega por ellos [90].",
            "D": "Porque solo usan TCP/IP para la transmisión [4].",
            "E": "Porque utilizan el chequeo de redundancia cíclica (CRC) [116].",
        }
    },
    {
        "pregunta": "Para la migración de subestaciones existentes donde coexisten equipos IEC 61850 y equipos con comunicaciones propietarias, es necesario utilizar:",
        "respuesta": "A",
        "opciones": {
            "A": "Gateways (Convertidores de protocolos) .",
            "B": "Solamente SCL para reconfigurar los equipos viejos.",
            "C": "El protocolo DNP3 exclusivamente [38].",
            "D": "Redes de fibra óptica punto a punto [91].",
            "E": "Sistemas de cableado cruzado (Crossover) [118]."
        }
    },
    {
        "pregunta": "En el contexto de IEC 61850, ¿qué significa IED?",
        "respuesta": "D",
        "opciones": {
            "A": "Internet Explorer Device [119].",
            "B": "Interface Exchange Description [51].",
            "C": "Intrusion Evasion Detection [120].",
            "D": "Intelligent Electronic Device (Dispositivo Electrónico Inteligente) [121, 122].",
            "E": "Integrated Services Router [123]."
        }
    },
    {
        "pregunta": "¿Qué parte de la norma IEC 61850 define una metodología de pruebas para determinar la 'conformidad' con las definiciones y restricciones del protocolo?",
        "respuesta": "E",
        "opciones": {
            "A": "IEC 61850-6 (SCL) [61].",
            "B": "IEC 61850-7 (Modelado) [28].",
            "C": "IEC 61850-8.1 (MMS Mapping) [28].",
            "D": "IEC 61850-9.2 (SMV Mapping) [28].",
            "E": "IEC 61850-10 (Pruebas de conformidad) [28, 124, 125]."
        }
    },
    {
        "pregunta": "Cuando se utiliza la Configuración Asistida por Potencia, ¿cuál es una desventaja del SCL que se resuelve?",
        "respuesta": "B",
        "opciones": {
            "A": "El cliente necesita una base de datos dinámica [117].",
            "B": "El archivo SCL siempre se acopla al dispositivo, ya que es generado desde el modelo exacto y la configuración del DEI [109, 111].",
            "C": "Se evita la configuración manual [108].",
            "D": "La comunicación se realiza en tiempo de corrida [104].",
            "E": "Se elimina la necesidad de XML [34]."
        }
    },
    {
        "pregunta": "¿Qué tipo de protocolo, según la fuente, prohíbe en Colombia 'el envío de mensajes cifrados o en lenguaje ininteligible' a través de equipos que usan el espectro electromagnético?",
        "respuesta": "A",
        "opciones": {
            "A": "Equipos de comunicación que usan el espectro electromagnético [126].",
            "B": "GOOSE [27].",
            "C": "MMS [5].",
            "D": "Sampled Measured Values [2].",
            "E": "DNP 3.0 [38]."
        }
    },
    {
        "pregunta": "La funcionalidad que permite al cliente recuperar la lista de elementos de datos definidos en un servidor en lugar de tener que estar pre-configurado se llama:",
        "respuesta": "B",
        "opciones": {
            "A": "SNMP Traps [24].",
            "B": "OPC browse interface (función de exploración) [127].",
            "C": "General Interrogation (GI) [128].",
            "D": "Telnet [50].",
            "E": "FTP (File Transfer Protocol) [52]."
        }
    },
    {
        "pregunta": "Una desventaja del SCL es que los dispositivos en la industria de potencia no pueden actualizar sus bases de datos de forma inmediata, lo cual causa que el archivo SCL:",
        "respuesta": "D",
        "opciones": {
            "A": "Siempre coincida con el firmware del dispositivo [129].",
            "B": "Se genere automáticamente en tiempo de corrida [104].",
            "C": "Se adapte automáticamente a los cambios de configuración del panel frontal [130].",
            "D": "Puede no coincidir con el firmware del dispositivo, o no acoplarse a la configuración si esta cambias.",
            "E": "Siempre esté disponible para el integrador [3]."
        }
    },
    {
        "pregunta": "¿Qué modelo utiliza el IEC 61850 para asegurar la trazabilidad y la integridad de los mensajes de reporte, indicando si hay más información a ser enviada en secuencias?",
        "respuesta": "E",
        "opciones": {
            "A": "MAC Flooding [131].",
            "B": "Plug and Play [107].",
            "C": "Unbuffered Report Control Block (URCB) [132].",
            "D": "Abstract Communication Service Interface (ACSI) [5].",
            "E": "Segmentación de reportes (Report Segmentation) [133].",
        }
    },
    {
        "pregunta": "Dentro de los Logical Nodes, ¿cuáles son los elementos que contienen un array (matriz) y para los cuales la especificación SCSM típicamente mapea este tipo de miembro a un MMS VariableAccessSpecification conteniendo un AlternateAccessSpecification?",
        "respuesta": "C",
        "opciones": {
            "A": "Datos de Status (SPS) [134].",
            "B": "Datos de Control (SPC) [135].",
            "C": "Objetos de Datos (Data Objects) que contienen arrays [71].",
            "D": "Logs y Journals [46].",
            "E": "GOOSE Control Blocks [46]."
        }
    },
    {
        "pregunta": "La característica IEC 61850 que reduce la ingeniería y la configuración, describiendo las capacidades de los IED en forma estándar, se denomina:",
        "respuesta": "A",
        "opciones": {
            "A": "Descripción abierta de IED (Open IED Description) [21].",
            "B": "Filosofía de Bloqueo Distribuido [65].",
            "C": "Protocolo de Redundancia Paralela (PRP) [85].",
            "D": "Arquitectura Híbrida [117].",
            "E": "Modelado de objetos UML [96]."
        }
    },
    {
        "pregunta": "¿Qué protocolos convencionales para la automatización de subestaciones utilizan el uso de direcciones fijas para la identificación de la información, haciendo necesario conocer el significado asignado por el fabricante o programador?",
        "respuesta": "E",
        "opciones": {
            "A": "IEC 61850 y MMS [13].",
            "B": "GOOSE y SMV [90].",
            "C": "Telnet y SSH [50].",
            "D": "HTTP y HTTPS [74].",
            "E": "DNP 3.0 e IEC 60870-5-101/104 [13].",
        }
    },
    {
        "pregunta": "Según la IEC 61850-7-4, si un Logical Node comienza con la letra 'M', generalmente está relacionado con:",
        "respuesta": "C",
        "opciones": {
            "A": "Interruptores (Switchgear) [36].",
            "B": "Control Automático [36].",
            "C": "Medición y Monitoreo (Metering and Measurement) [36].",
            "D": "Funciones Genéricas [36].",
            "E": "Protección [36]."
        }
    },
    {
        "pregunta": "La migración de subestaciones de tecnologías tradicionales (cableado físico) al esquema de Subestación Digital implica que la información primaria se transforma en paquetes de protocolos de comunicación que viajan por:",
        "respuesta": "D",
        "opciones": {
            "A": "Redes de cobre con mayores niveles de tensión [136].",
            "B": "Protocolos propietarios únicamente [137].",
            "C": "Redes telefónicas conmutadas (PSTN) [99].",
            "D": "Medios endurecidos como la fibra óptica [91].",
            "E": "Sistemas de cableado serial (RS-232) [2]."
        }
    },
    {
        "pregunta": "El concepto de Bloqueo Distribuido (Distributed Interlocking) se hizo posible por:",
        "respuesta": "A",
        "opciones": {
            "A": "La posibilidad de intercambiar información entre DEI's (IEDs) utilizando IEC 61850, a menudo a través de mensajes GOOSE [87, 138].",
            "B": "El uso exclusivo de relevadores monofuncionales alambrados [93].",
            "C": "La implementación de SNMP para la administración de la red [24].",
            "D": "La centralización de todas las funciones de protección en un solo DEI [138].",
            "E": "La eliminación total del factor humano en la configuración [108]."
        }
    },


    
{
    "pregunta": "¿Cuál es el objetivo principal de la norma IEC 61850, según se define en las fuentes?",
    "opciones": {
      "A": "Estandarizar el hardware físico de los Dispositivos Electrónicos Inteligentes (IEDs).",
      "B": "Asegurar la interoperabilidad entre IEDs de uno o varios fabricantes para el intercambio y uso de información.",
      "C": "Definir estrictamente la topología de red Ethernet que debe usarse en las subestaciones.",
      "D": "Limitar el desarrollo futuro de funciones de automatización para evitar incompatibilidades.",
      "E": "Reemplazar exclusivamente los cables de cobre por fibra óptica en el Nivel de Proceso."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "Según la norma IEC 61850, ¿qué concepto debe soportar distintas filosofías de automatización, permitiendo la ubicación centralizada (tipo RTU) o distribuida (tipo SCS) de funciones?",
    "opciones": {
      "A": "Estabilidad en el tiempo.",
      "B": "Intercambiabilidad.",
      "C": "Libre configuración.",
      "D": "Virtualización de interfaces.",
      "E": "Normalización de funciones."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "En el contexto de IEC 61850, ¿qué significa el concepto de 'Interoperabilidad'?",
    "opciones": {
      "A": "La capacidad de reemplazar un IED de un fabricante por el de otro sin afectar el sistema.",
      "B": "La habilidad de IEDs de uno o varios fabricantes de intercambiar información y utilizarla para sus propias funciones.",
      "C": "La estandarización de los algoritmos de protección utilizados en los IEDs.",
      "D": "La obligación de que todos los IEDs trabajen con el protocolo MMS.",
      "E": "El uso exclusivo de fibra óptica para la comunicación horizontal."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "¿Qué aspecto de los sistemas de automatización *no* es normalizado por IEC 61850, según las fuentes, para no dificultar el desarrollo futuro de funciones?",
    "opciones": {
      "A": "El intercambio de datos.",
      "B": "Las funciones o algoritmos de protección.",
      "C": "La comunicación serial (Fibras ópticas).",
      "D": "La arquitectura Cliente-Servidor.",
      "E": "La denominación de los Nodos Lógicos."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "La norma IEC 61850 utiliza una pila de protocolos de comunicación basada principalmente en qué tecnología de red, que también define el medio físico subyacente?",
    "opciones": {
      "A": "Profibus (Tecnología de bus de token).",
      "B": "Comunicación serial RS-232/485.",
      "C": "Ethernet.",
      "D": "Red Token Ring.",
      "E": "Modbus RTU/ASCII."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "La parte más pequeña de la función que intercambia datos en IEC 61850 se denomina:",
    "opciones": {
      "A": "IED (Dispositivo Electrónico Inteligente).",
      "B": "Objeto de Datos (DO).",
      "C": "Clase de Datos Común (CDC).",
      "D": "Nodo Lógico (NL).",
      "E": "Dispositivo Lógico (LD)."
    },
    "respuesta": "D"
  },
  {
    "pregunta": "Según el modelo de IEC 61850, la información se intercambia más precisamente entre:",
    "opciones": {
      "A": "Los equipos físicos (IEDs).",
      "B": "El Bus de Estación y el Bus de Proceso.",
      "C": "Las funciones y sub-funciones residentes en los equipos.",
      "D": "El Servidor IED y las Asociaciones Cliente.",
      "E": "La Bahía de Maniobras y la Sala de Control."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "¿Qué mecanismo utiliza IEC 61850 para separar la funcionalidad representada por el modelo de datos y los servicios de comunicación de la implementación de la comunicación (pila)?",
    "opciones": {
      "A": "El concepto de Intercambiabilidad.",
      "B": "El uso obligatorio de Ethernet.",
      "C": "Un mapeo estandarizado.",
      "D": "La estandarización del hardware.",
      "E": "El uso exclusivo de MMS para todos los servicios."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "La norma IEC 61850 define la estructura de datos para la posición de un interruptor con nombre 'POS'. ¿Qué elemento proporciona la semántica estandarizada y el significado de ese dato, eliminando la necesidad de índices numéricos?",
    "opciones": {
      "A": "El bus de estación (Bus de bahía).",
      "B": "El Bus de Proceso (Bus de campo).",
      "C": "Los Modelos de Datos Semánticos (Nodos Lógicos).",
      "D": "El Lenguaje de Configuración SCL (System Configuration Language).",
      "E": "El protocolo DNP3."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "La 'Estabilidad en el tiempo' es un requerimiento fundamental de la norma IEC 61850, ¿qué implica esto para la norma?",
    "opciones": {
      "A": "Que las especificaciones de hardware deben ser fijas.",
      "B": "Que la norma debe ser apta para el futuro, siguiendo la evolución de la tecnología de comunicaciones.",
      "C": "Que se debe utilizar cableado de cobre por su robustez.",
      "D": "Que se deben usar solamente protocolos de Capa 3.",
      "E": "Que no se permite la asignación libre de Nodos Lógicos."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "En la jerarquía del modelo de datos de IEC 61850 (IED -> Dispositivo Lógico -> Nodo Lógico -> Objeto de Datos -> Atributo de Datos), ¿cuál es el nivel que agrupa una colección de Nodos Lógicos y se utiliza para la jerarquía de nombres y la gestión de dispositivos?",
    "opciones": {
      "A": "Nodo Lógico (LN).",
      "B": "Objeto de Datos (DO).",
      "C": "Dispositivo Físico (IED).",
      "D": "Dispositivo Lógico (LD).",
      "E": "Clase de Atributo Construido (CAC)."
    },
    "respuesta": "D"
  },
  {
    "pregunta": "La estructura de un Objeto de Datos, es decir, qué Atributos de Datos están disponibles, está determinada por:",
    "opciones": {
      "A": "El Nodo Lógico (LN).",
      "B": "La Clase de Datos Común (CDC).",
      "C": "La Clase de Atributo Construido (CAC).",
      "D": "El Dispositivo Lógico (LD).",
      "E": "El Servidor IED."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "¿Qué elemento dentro de un Objeto de Datos es donde se encuentran los valores reales de la información (la 'hoja' de la jerarquía de datos)?",
    "opciones": {
      "A": "El Nodo Lógico (LN).",
      "B": "El Dispositivo Lógico (LD).",
      "C": "El Atributo de Datos (Data Attribute).",
      "D": "La Clase de Datos Común (CDC).",
      "E": "La Restricción Funcional (FC)."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "¿Cuál es la letra inicial reservada para identificar los Nodos Lógicos relacionados con Protección, según la denominación y agrupamiento de Nodos Lógicos?",
    "opciones": {
      "A": "M (Medición).",
      "B": "C (Control).",
      "C": "P (Protección).",
      "D": "X (Aparataje de Bahía).",
      "E": "L (Nodo de Sistema)."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "¿Cuál es el Nodo Lógico (LN) utilizado para modelar la interfaz y la información de un Interruptor de Circuito (Circuit Breaker)?",
    "opciones": {
      "A": "XCBR.",
      "B": "CSWI.",
      "C": "PDIS.",
      "D": "PTRC.",
      "E": "TCTR."
    },
    "respuesta": "A"
  },
  {
    "pregunta": "¿Cuál es el Nodo Lógico (LN) que modela la función de control para switches como interruptores o seccionadores, y típicamente recibe comandos de SCADA?",
    "opciones": {
      "A": "XCBR.",
      "B": "CSWI.",
      "C": "MMXU.",
      "D": "RBRF.",
      "E": "TVTR."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "¿Cuál es el Nodo Lógico (LN) que modela la función de Unidad de Medición, reportando valores calculados de voltaje y corriente?",
    "opciones": {
      "A": "YPTR.",
      "B": "XCBR.",
      "C": "MMXU.",
      "D": "IHMI.",
      "E": "PDIF."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "La interfaz con el transformador de corriente (Current Transformer) se modela con qué Nodo Lógico (LN)?",
    "opciones": {
      "A": "TVTR (Trafo de Tensión).",
      "B": "TCTR (Trafo de Corriente).",
      "C": "YPTR (Trafo de Potencia).",
      "D": "PTOC (Sobrecorriente).",
      "E": "M (Medición)."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "Según el modelo de IED, el Nodo Lógico **LLN0** (Logical Node 0) es específico para:",
    "opciones": {
      "A": "El Dispositivo Físico (IED).",
      "B": "La interfaz de protección diferencial.",
      "C": "El Control de Switch.",
      "D": "El Dispositivo Lógico (LD).",
      "E": "La Protección de arco."
    },
    "respuesta": "D"
  },
  {
    "pregunta": "El Nodo Lógico LPHD (Logical Node Physical Device) contiene información específica relacionada con:",
    "opciones": {
      "A": "La interfaz del interruptor.",
      "B": "El estado de la protección diferencial.",
      "C": "El dispositivo físico o IED (como problemas de fuente de alimentación).",
      "D": "El control de switch.",
      "E": "La medición de corriente."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "¿Qué protocolo o servicio se utiliza para la comunicación vertical Cliente-Servidor (Bay a Estación) para tareas como control y monitoreo remoto, reportes y transferencia de archivos?",
    "opciones": {
      "A": "GOOSE.",
      "B": "Sampled Values (SV).",
      "C": "MMS (Manufacturing Message Specification).",
      "D": "Modbus RTU.",
      "E": "DNP 3.0."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "¿Qué protocolo de comunicación se utiliza en el Bus de Proceso para llevar información digitalizada, como eventos (disparos/enclavamientos) y medidas de transformadores de instrumentación (CT's, PT's)?",
    "opciones": {
      "A": "ICCP TASE.2.",
      "B": "MODBUS TCP/IP.",
      "C": "GOOSE y Sampled Values (SV).",
      "D": "MMS y Cliente-Servidor.",
      "E": "DNP3."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "¿Qué significa el acrónimo GOOSE en el contexto de IEC 61850?",
    "opciones": {
      "A": "General Output Oriented Substation Event.",
      "B": "Generic Object Oriented System Exchange.",
      "C": "Generic Object Oriented Substation Event.",
      "D": "Global Operational Output System Event.",
      "E": "Generic Operating System Emulator."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "La comunicación GOOSE se utiliza principalmente para transmitir eventos entre IEDs en una subestación de forma punto a punto. ¿Cuál es una aplicación típica y crítica que aprovecha esta comunicación horizontal estandarizada?",
    "opciones": {
      "A": "Supervisión y configuración lentas.",
      "B": "Transferencia de archivos COMTRADE.",
      "C": "Enclavamientos de subestación.",
      "D": "Medición de valores analógicos por polling.",
      "E": "Transferencia de datos a Centros de Control Remoto."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "GOOSE y Sampled Values (SV) se mapean directamente sobre qué capa del modelo OSI, ya que requieren una comunicación en tiempo real rápida (real-time communication), a diferencia de MMS que utiliza la pila completa de 7 capas?",
    "opciones": {
      "A": "Capa de Sesión (Capa 5).",
      "B": "Capa de Aplicación (Capa 7).",
      "C": "Capa de Presentación (Capa 6).",
      "D": "Capa de Enlace (Capa 2).",
      "E": "Capa de Transporte (Capa 4)."
    },
    "respuesta": "D"
  },
  {
    "pregunta": "GOOSE utiliza comunicación multicast, ¿qué ventaja fundamental ofrece esto para el intercambio de información de eventos?",
    "opciones": {
      "A": "Permite el cifrado punto a punto.",
      "B": "Permite enviar la misma información a varios destinatarios simultáneamente.",
      "C": "Reduce el número de switches requeridos.",
      "D": "Asegura la recepción mediante confirmación del receptor.",
      "E": "Utiliza únicamente direcciones IP estáticas."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "En una red con múltiples tipos de tráfico (video, monitoreo, GOOSE), ¿cómo asegura el mensaje GOOSE que la información de protección sea más relevante y prioritaria en el switch?",
    "opciones": {
      "A": "Mediante el uso de direcciones IP únicas.",
      "B": "A través de la asignación de una VLAN y una prioridad (como 802.1p).",
      "C": "Mediante el uso de Sampled Values.",
      "D": "Usando el servicio de Reportes Bufferizados.",
      "E": "Publicando los mensajes exclusivamente en el Bus de Estación."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "¿Qué protocolo utiliza el concepto de Merging Unit (MU) para recibir información analógica de transformadores de instrumentación (CT/VT) y convertirla en información digital para la red?",
    "opciones": {
      "A": "MMS.",
      "B": "GOOSE.",
      "C": "Sampled Values (SV).",
      "D": "DNP3.",
      "E": "MODBUS RTU."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "GOOSE envía réplicas constantemente, incluso cuando los datos no han cambiado, lo que se controla mediante el tiempo máximo (Tmax). ¿Cuál es el propósito de esta réplica?",
      "opciones": { 
      "A": "Asegurar que los datos sean bufferizados para la reconexión de clientes.",
      "B": "Permitir que los mensajes viajen por redes de Capa 3.",
      "C": "Garantizar que si alguien se conecta o ya está conectado, sepa que el mensaje y la comunicación están activos.",
      "D": "Utilizar el ancho de banda máximo de la red.",
      "E": "Sustituir el mecanismo de calidad de datos."
      },
    "respuesta": "C"
  },
  {
    "pregunta": "¿Cuál es la función del parámetro **StNum** (State Number) en un mensaje GOOSE?",
    "opciones": {
      "A": "Indica el número de secuencia de las réplicas.",
      "B": "Representa el valor de un contador que se incrementa cada vez que se envía un mensaje GOOSE y se detecta un cambio de valor en el dataset.",
      "C": "Es la dirección MAC de destino (Multicast).",
      "D": "Define la prioridad (VLAN) del mensaje.",
      "E": "Indica el tiempo máximo permitido (Tmax) para la réplica."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "La norma IEC 61850, según la Figura 1 de la fuente, define tres niveles lógicos en la subestación. ¿Cuáles son estos niveles?",
    "opciones": {
      "A": "SCADA, HMI, Gateway.",
      "B": "Central, AIS, GIS.",
      "C": "IED, LD, LN.",
      "D": "Estación, Bahía (o Campo), y Proceso.",
      "E": "Primario, Secundario, Terciario."
    },
    "respuesta": "D"
  },
  {
    "pregunta": "En la 'Tendencias en Automatización de Subestaciones', la arquitectura 'Actual' utiliza qué buses de comunicación para el tráfico de datos, diferenciándose de la arquitectura 'Convencional' con cables de cobre:",
    "opciones": {
      "A": "Solo Bus de Estación.",
      "B": "Bus de Estación y Bus de Proceso.",
      "C": "Solo Comunicación Serial (Fibras ópticas).",
      "D": "Solo Gateway y HMI.",
      "E": "Bus de Control y Bus de Monitoreo."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "¿Cuál es la topología de red básica utilizada en subestaciones que presenta los **menores retardos** en la comunicación?",
    "opciones": {
      "A": "Bus o Cascada.",
      "B": "Anillo Simple.",
      "C": "Estrella.",
      "D": "Doble Anillo.",
      "E": "Combinada Estrella-Anillo."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "Aunque la norma IEC 61850-Ed.1 no define topologías específicas, ¿cuál es la topología recomendada o adoptada frecuentemente en proyectos de 132 kV en Argentina para lograr tolerancia a fallas y redundancia, según las fuentes?",
    "opciones": {
      "A": "Bus simple.",
      "B": "Estrella simple.",
      "C": "Anillo simple o Anillo simple combinado con Estrella.",
      "D": "Doble Estrella.",
      "E": "Cascada."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "Para prevenir bucles lógicos en topologías de red que contienen anillos físicos entre switches, ¿qué tipo de protocolos de transmisión de datos deben utilizarse?",
    "opciones": {
      "A": "GOOSE.",
      "B": "MMS.",
      "C": "Protocolos que impiden la formación de bucles lógicos (ej. RSTP).",
      "D": "Sampled Values.",
      "E": "Protocolos Cliente-Servidor."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "¿Cuál es el protocolo de redundancia que, al utilizar dos redes simultáneas, envía un mensaje duplicado a través de ambas redes para que el tiempo de recuperación de fallas tienda a cero, aunque incrementa el tráfico en la red?",
    "opciones": {
      "A": "RSTP (Rapid Spanning Tree Protocol).",
      "B": "HSR (High-Availability Seamless Redundancy).",
      "C": "PRP (Parallel Redundancy Protocol).",
      "D": "Modbus TCP/IP.",
      "E": "GOOSE."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "La asignacion de nodos logicos en  los equipos, que permite la optimización del sistema, está controlada por:",
    "opciones": {
      "A": "La capacidad del equipo especificada en las hojas de datos.",
      "B": "Reglas estrictas y el concepto de IEC 61850.",
      "C": "El protocolo DNP 3.0.",
      "D": "La tecnología de cables de cobre.",
      "E": "El uso exclusivo de la arquitectura MMS."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "La estandarización IEC 61850-9-2 LE (Light Edition) especifica restricciones para los mensajes Sampled Values. ¿Cuál es uno de los propósitos principales de esta implementación acordada?",
    "opciones": {
      "A": "Asegurar que SV se utilice para synchrophasors.",
      "B": "Definir un número limitado de maneras de implementar Sampled Values para asegurar la interoperabilidad.",
      "C": "Permitir que SV se enrute fuera de la subestación.",
      "D": "Eliminar la necesidad de Merging Units.",
      "E": "Reemplazar MMS como el protocolo vertical preferido."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "El protocolo SNTP (Simple Network Time Protocol) se utiliza de acuerdo a la norma IEC 61850 para:",
    "opciones": {
      "A": "La transferencia de archivos grandes.",
      "B": "La comunicación horizontal de eventos.",
      "C": "La sincronización temporal entre IEDs.",
      "D": "El monitoreo de la calidad de la energía.",
      "E": "El control de dispositivos en el nivel de proceso."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "La norma IEC 61850 define un concepto de 'virtualización' de los aparatos de campo ¿Qué Nodo Lógico se utiliza para virtualizar un interruptor (Circuit Breaker)?",
    "opciones": {
      "A": "CSWI (Control de Switch).",
      "B": "PDIF (Protección Diferencial).",
      "C": "XCBR (Interruptor).",
      "D": "PTRC (Lógica de Trip).",
      "E": "TCTR (Trafo de Corriente)."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "¿Cuál es el Lenguaje de Descripción de Configuración de Subestaciones (SCL) y para qué se utiliza?",
    "opciones": {
      "A": "Un lenguaje de programación basado en C++ para algoritmos de protección.",
      "B": "Un lenguaje basado en XML para describir la configuración completa del sistema, incluyendo topología, IEDs, y comunicación.",
      "C": "Un protocolo de comunicación de Capa 2 para intercambio rápido de datos.",
      "D": "El protocolo de transferencia de archivos para perturbógrafos.",
      "E": "Un protocolo de sincronización de tiempo."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "¿Qué tipo de archivo SCL contiene la descripción de las capacidades de un IED, típicamente proporcionado por el fabricante, y cuyo nombre IED por defecto es 'TEMPLATE'?",
    "opciones": {
      "A": "SSD (System Specification Description).",
      "B": "SCD (Substation Configuration Description).",
      "C": "ICD (IED Capability Description).",
      "D": "ISD (IED Specification Description).",
      "E": "SIED (System Interface Exchange Description)."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "¿Qué tipo de archivo SCL incluye toda la información requerida (topología, comunicación, IEDs configurados) para configurar un sistema de automatización de subestaciones completo, siendo el resultado final de la herramienta de configuración del sistema (SCT)?",
    "opciones": {
      "A": "ICD.",
      "B": "SSD.",
      "C": "SCD (Substation Configuration Description).",
      "D": "ISD.",
      "E": "IID (Instantiated IED Description)."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "En la sección de Data Type Templates del SCL, las definiciones de los Data Objects (DO) hacen referencia a:",
    "opciones": {
      "A": "Un protocolo MMS.",
      "B": "Un IED Capability Description (ICD).",
      "C": "Una DOType, que es una instanciación de una Clase de Datos Común (CDC).",
      "D": "Un control block GOOSE.",
      "E": "El Bus de Proceso."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "Cuando se utiliza Sampled Values, el proceso de ingeniería debe incluir la definición del **Dataset** que se va a transmitir. ¿Qué es un Dataset en IEC 61850?",
    "opciones": {
      "A": "Un único valor de medición analógica.",
      "B": "Un MMS NamedVariableList (NVL).",
      "C": "Una lista ordenada de referencias a objetos que son miembros del Dataset.",
      "D": "El archivo SCL completo.",
      "E": "Un listado de todas las clases de nodos lógicos (LN)."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "En el modelo de datos, ¿cuál es la función de una **Restricción Funcional (FC)**?",
    "opciones": {
      "A": "Limitar el número de Nodos Lógicos en un IED.",
      "B": "Agrupar los Atributos de Datos según su propósito o característica (ej. estado ST, configuración CF, medición MX).",
      "C": "Definir el protocolo de comunicación a usar (GOOSE, MMS, SV).",
      "D": "Establecer la prioridad en la red Ethernet.",
      "E": "Determinar si un Nodo Lógico es mandatorio u opcional."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "Un **Reporte Bufferizado** (Buffered Reporting) se utiliza para el intercambio de información. ¿Qué ventaja ofrece este tipo de reporte en comparación con GOOSE, especialmente si el HMI o Gateway se desconecta brevemente?",
    "opciones": {
      "A": "Utiliza comunicación multicast más rápida.",
      "B": "Los eventos se almacenan en un búfer del servidor y se pueden recuperar más tarde (buffered report).",
      "C": "Permite el uso de Sampled Values.",
      "D": "No requiere una asociación Cliente-Servidor.",
      "E": "Es exclusivo para la comunicación horizontal."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "Cuando se habla de Calidad (Quality) en IEC 61850-7-3, el campo **Validity** tiene cuatro valores principales. ¿Cuáles son estos valores?",
    "opciones": {
      "A": "True, False, Test, Process.",
      "B": "Good, Invalid, Reserved, Questionable.",
      "C": "On, Off, Intermediate, Bad.",
      "D": "Simulated, Real, Substituted, Blocked.",
      "E": "Local, Remoto, Central, Bay."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "Para la protección de arco del relé REF615, ¿cuál es el tiempo típico de operación cuando se utiliza la detección basada **solamente en la luz**?",
    "opciones": {
      "A": "50 ms.",
      "B": "12 ms (Luz y Corriente).",
      "C": "10 ms (Luz solamente).",
      "D": "3 ms (Requerimiento de GOOSE).",
      "E": "20 ms (Máximo permitido)."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "Para el control del equipo primario, ¿cuál es el modelo de control preferido por IEC 61850 para asegurar una operación segura (safe and secure operation), ya que proporciona una reserva del objeto de control?",
    "opciones": {
      "A": "Direct Operate (Control Directo).",
      "B": "Time Activated Control (Control Activado por Tiempo).",
      "C": "Select Before Operate (Seleccionar Antes de Operar) con seguridad mejorada.",
      "D": "Status-only (Solo Estado).",
      "E": "Control Genérico (GGIO)."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "La asignación de Nodos Lógicos (NL) a los equipos IEDs es soportada por IEC 61850. ¿Cuál es la principal restricción que limita asignación libre de los nodos logicos?",
    "opciones": {
      "A": "La interoperabilidad del sistema.",
      "B": "Los requerimientos de software.",
      "C": "El cumplimiento estricto de la norma.",
      "D": "La capacidad física o de procesamiento del equipo (descrita en las hojas de datos).",
      "E": "La necesidad de usar únicamente Nodos Lógicos del grupo G."
    },
    "respuesta": "D"
  },
  {
    "pregunta": "¿Qué información crítica del proceso se transmite mediante Sampled Values (SV)? ",
    "opciones": {
      "A": "La posición de interruptores (XCBR).",
      "B": "Medidas de transformadores de instrumentación (CT/PT).",
      "C": "Comandos de reconfiguración del IED.",
      "D": "Datos de logs y eventos históricos.",
      "E": "Mensajes de supervisión lentos."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "¿Qué nodo lógico utiliza la Clase de Datos Común (CDC) SAV (Sampled Value Analog) y es utilizado para transmitir 'mediciones raw' de CTs y PTs sin dead-banding?",
    "opciones": {
      "A": "XCBR.",
      "B": "MMXU.",
      "C": "TCTR o TVTR.",
      "D": "CSWI.",
      "E": "PDIF."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "Si un IED suscriptor de GOOSE recibe un mensaje cuyo valor **confRev** (Configuration Revision) es diferente al que esperaba, ¿qué indica esto?",
    "opciones": {
      "A": "Que el IED publicador está en modo Test.",
      "B": "Que la comunicación es Routable GOOSE (R-GOOSE).",
      "C": "Que el contenido del dataset fue modificado desde la última configuración esperada, por lo que podría no ser confiable.",
      "D": "Que el mensaje debe tener la máxima prioridad.",
      "E": "Que el tiempo de vida (TAL) ha expirado."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "Según la IEC 61850-9-2, la transmisión de Sampled Values para protección de 60 Hz utiliza un número de muestras por ciclo. ¿Cuál es el número de muestras por ciclo asociado con la implementación IEC 61850 9-2 LE para protección?",
      "opciones": { 
      "A": "80.",
      "B": "128.",
      "C": "96.",
      "D": "256.",
      "E": "4800."
      },
    "respuesta": "A"
  },
  {
    "pregunta": "En el bus de proceso, ¿qué equipos reciben información analógica de CTs y VTs y la convierten a Sampled Values digitales?",
      "opciones": {
      "A": "IEDs multifunción.",
      "B": "Gateways.",
      "C": "Merging Units (MUs).",
      "D": "HMI (Human Machine Interface).",
      "E": "Puntos de Acceso del Bus (APs)."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "La comunicación GOOSE se identifica en la red Ethernet de Capa 2 por medio de una **dirección MAC multicast** específica que inicia en 01-0C-CD-01-XX-XX, la cual es asignada por:",
    "opciones": {
      "A": "El fabricante del IED (ABB, Siemens, etc.).",
      "B": "La IANA (Internet Assigned Numbers Authority).",
      "C": "La IEC, utilizando un rango específico para GOOSE.",
      "D": "El servidor DNS de la subestación.",
      "E": "El protocolo DNP3."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "En la comunicación horizontal, ¿qué tipo de datos se puede transmitir por GOOSE además de eventos binarios (ej. trip, start), asumiendo que el cambio se trata como un evento basado en una banda muerta (deadband)?",
    "opciones": {
      "A": "Solo reportes bufferizados.",
      "B": "Solamente archivos COMTRADE.",
      "C": "Cualquier tipo de dato del proceso, incluyendo señales análogas como voltajes y corrientes.",
      "D": "Solamente mensajes de sincronización de tiempo.",
      "E": "Mensajes de configuración de seguridad."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "Cuando se utiliza Sampled Values, el proceso de muestreo se realiza con una frecuencia específica. Si se utiliza una Sampling Rate de 4800 Hz en un sistema de 60 Hz, ¿cuántas muestras por ciclo se obtienen?",
    "opciones": {
      "A": "80 muestras por ciclo.",
      "B": "128 muestras por ciclo.",
      "C": "96 muestras por ciclo.",
      "D": "256 muestras por ciclo.",
      "E": "4000 muestras por ciclo."
    },
    "respuesta": "A"
  },
  {
    "pregunta": "Según la estructura del IED, este actúa como un 'servidor' donde corren las funciones. ¿Qué tipo de asociación se utiliza para la comunicación Cliente-Servidor bidireccional, orientada a conexión?",
    "opciones": {
      "A": "Asociaciones Multicast.",
      "B": "Asociaciones PRP/HSR.",
      "C": "Asociaciones de Dos Partes (Two-Party Application Association, TPAA).",
      "D": "Asociaciones GOOSE.",
      "E": "Asociaciones de Enlace."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "En el contexto de la calidad del dato, ¿qué atributo se utiliza para indicar que un operador ha escrito manualmente el valor de un objeto de proceso que no pudo ser adquirido de la fuente real?",
    "opciones": {
      "A": "Test.",
      "B": "Operator Blocked.",
      "C": "Source = Substituted.",
      "D": "Validity = Invalid.",
      "E": "Old Data."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "El Nodo Lógico PDIS (Protección de Distancia) se utiliza como ejemplo de qué grupo de Nodos Lógicos?",
    "opciones": {
      "A": "Nodo de Sistema (L).",
      "B": "Protección (P).",
      "C": "Control (C).",
      "D": "Medición (M).",
      "E": "Interface y Archivo (I)."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "La norma IEC 61850 define qué lenguajes deben ser utilizados para expresar la sintaxis de los protocolos MMS, GOOSE y Sampled Values?",
    "opciones": {
      "A": "C++ y Java.",
      "B": "UML y OCL.",
      "C": "ASN.1 (Abstract Syntax Notation 1).",
      "D": "Python y JavaScript.",
      "E": "XML (SCL)."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "La capa de aplicación de IEC 61850 define servicios como **Reporting** (Reportes). ¿Qué servicio es utilizado por el cliente SCADA para obtener valores iniciales después de una desconexión, si la opción GI (General Interrogation) está habilitada?",
    "opciones": {
      "A": "SendReport.",
      "B": "SelectBeforeOperate.",
      "C": "SetEditSGValue.",
      "D": "InitiateGeneralInterrogation (GI).",
      "E": "Release."
    },
    "respuesta": "D"
  },
  {
    "pregunta": "El modelo de datos IEC 61850 incluye Data Attributes que pueden ser de tipo 'integer' o 'floating point'. ¿Cuál es el tipo de representación preferido y más común en muchas implementaciones para valores analógicos?",
    "opciones": {
      "A": "Integer (INT32) con factor de escala.",
      "B": "Floating Point (FLOAT32).",
      "C": "OctetString.",
      "D": "VisibleString.",
      "E": "Boolean."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "Cuando se realiza la inyección de información de prueba en un IED energizado, ¿qué bandera (flag) debe establecerse en el mensaje GOOSE o Sampled Value para que el IED receptor distinga la información simulada de la real y la procese si está configurado para ello?",
    "opciones": {
      "A": "StNum.",
      "B": "ConfRev.",
      "C": "La bandera Test (en Ed. 1) o Simulation (en Ed. 2).",
      "D": "ApplID.",
      "E": "SmpCnt."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "En la jerarquía de la estandarización de IEC 61850, ¿dónde se definen todas las Clases de Datos Comunes (CDC) y las Clases de Atributos Construidos (CAC)?",
    "opciones": {
      "A": "Parte 7-4 (Logical Nodes).",
      "B": "Parte 7-3 (Common Data Classes).",
      "C": "Parte 6 (SCL).",
      "D": "Parte 7-2 (Servicios Abstractos).",
      "E": "Parte 8-1 (MMS/GOOSE)."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "¿Qué mecanismo se utiliza para agrupar Data Attributes dentro de una CDC según su característica, por ejemplo, ST para estado o CF para configuración?",
    "opciones": {
      "A": "Logical Device (LD).",
      "B": "Data Object (DO).",
      "C": "Función de Tripping (PTRC).",
      "D": "Restricción Funcional (Functional Constraint, FC).",
      "E": "Clase de Atributo Construido (CAC)."
    },
    "respuesta": "D"
  },
    {
    "pregunta": "La asignación de Nodos Lógicos (NL) a los equipos IEDs es soportada por IEC 61850. ¿Cuál es la principal restricción que limita esta asignación?",
    "opciones": {
      "A": "La interoperabilidad del sistema.",
      "B": "Los requerimientos de software.",
      "C": "El cumplimiento estricto de la norma.",
      "D": "La capacidad física o de procesamiento del equipo (descrita en las hojas de datos).",
      "E": "La necesidad de usar únicamente Nodos Lógicos del grupo G."
    },
    "respuesta": "D"
  },
  {
    "pregunta": "¿Qué información crítica del proceso se transmite mediante Sampled Values (SV)? ",
    "opciones": {
      "A": "La posición de interruptores (XCBR).",
      "B": "Medidas de transformadores de instrumentación (CT/PT).",
      "C": "Comandos de reconfiguración del IED.",
      "D": "Datos de logs y eventos históricos.",
      "E": "Mensajes de supervisión lentos."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "¿Qué nodo lógico utiliza la Clase de Datos Común (CDC) SAV (Sampled Value Analog) y es utilizado para transmitir 'mediciones raw' de CTs y PTs sin dead-banding?",
    "opciones": {
      "A": "XCBR.",
      "B": "MMXU.",
      "C": "TCTR o TVTR.",
      "D": "CSWI.",
      "E": "PDIF."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "Si un IED suscriptor de GOOSE recibe un mensaje cuyo valor **confRev** (Configuration Revision) es diferente al que esperaba, ¿qué indica esto?",
    "opciones": {
      "A": "Que el IED publicador está en modo Test.",
      "B": "Que la comunicación es Routable GOOSE (R-GOOSE).",
      "C": "Que el contenido del dataset fue modificado desde la última configuración esperada, por lo que podría no ser confiable.",
      "D": "Que el mensaje debe tener la máxima prioridad.",
      "E": "Que el tiempo de vida (TAL) ha expirado."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "Según la IEC 61850-9-2, la transmisión de Sampled Values para protección de 60 Hz utiliza un número de muestras por ciclo. ¿Cuál es el número de muestras por ciclo asociado con la implementación IEC 61850 9-2 LE para protección?",
    "opciones": {
      "A": "80 muestras por ciclo.",
      "B": "128 muestras por ciclo.",
      "C": "96 muestras por ciclo.",
      "D": "256 muestras por ciclo.",
      "E": "4800 muestras por ciclo."
    },
    "respuesta": "A"
  },
  {
    "pregunta": "En el bus de proceso, ¿qué equipos reciben información analógica de CTs y VTs y la convierten a Sampled Values digitales?",
    "opciones": {
      "A": "IEDs multifunción.",
      "B": "Gateways.",
      "C": "Merging Units (MUs).",
      "D": "HMI (Human Machine Interface).",
      "E": "Puntos de Acceso del Bus (APs)."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "La comunicación GOOSE se identifica en la red Ethernet de Capa 2 por medio de una **dirección MAC multicast** específica que inicia en 01-0C-CD-01-XX-XX, la cual es asignada por:",
    "opciones": {
      "A": "El fabricante del IED (ABB, Siemens, etc.).",
      "B": "La IANA (Internet Assigned Numbers Authority).",
      "C": "La IEC, utilizando un rango específico para GOOSE.",
      "D": "El servidor DNS de la subestación.",
      "E": "El protocolo DNP3."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "En la comunicación horizontal, ¿qué tipo de datos se puede transmitir por GOOSE además de eventos binarios (ej. trip, start), asumiendo que el cambio se trata como un evento basado en una banda muerta (deadband)?",
    "opciones": {
      "A": "Solo reportes bufferizados.",
      "B": "Solamente archivos COMTRADE.",
      "C": "Cualquier tipo de dato del proceso, incluyendo señales análogas como voltajes y corrientes.",
      "D": "Solamente mensajes de sincronización de tiempo.",
      "E": "Mensajes de configuración de seguridad."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "Cuando se utiliza Sampled Values, el proceso de muestreo se realiza con una frecuencia específica. Si se utiliza una Sampling Rate de 4800 Hz en un sistema de 60 Hz, ¿cuántas muestras por ciclo se obtienen?",
    "opciones": {
      "A": "80 muestras por ciclo.",
      "B": "128 muestras por ciclo.",
      "C": "96 muestras por ciclo.",
      "D": "256 muestras por ciclo.",
      "E": "4000 muestras por ciclo."
    },
    "respuesta": "A"
  },
  {
    "pregunta": "Según la estructura del IED, este actúa como un 'servidor' donde corren las funciones. ¿Qué tipo de asociación se utiliza para la comunicación Cliente-Servidor bidireccional, orientada a conexión?",
    "opciones": {
      "A": "Asociaciones Multicast.",
      "B": "Asociaciones PRP/HSR.",
      "C": "Asociaciones de Dos Partes (Two-Party Application Association, TPAA).",
      "D": "Asociaciones GOOSE.",
      "E": "Asociaciones de Enlace."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "En el contexto de la calidad del dato, ¿qué atributo se utiliza para indicar que un operador ha escrito manualmente el valor de un objeto de proceso que no pudo ser adquirido de la fuente real?",
    "opciones": {
      "A": "Test.",
      "B": "Operator Blocked.",
      "C": "Source = Substituted.",
      "D": "Validity = Invalid.",
      "E": "Old Data."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "El Nodo Lógico PDIS (Protección de Distancia) se utiliza como ejemplo de qué grupo de Nodos Lógicos?",
    "opciones": {
      "A": "Nodo de Sistema (L).",
      "B": "Protección (P).",
      "C": "Control (C).",
      "D": "Medición (M).",
      "E": "Interface y Archivo (I)."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "La norma IEC 61850 define qué lenguajes o notaciones deben ser utilizados para expresar la sintaxis de los protocolos MMS, GOOSE y Sampled Values?",
    "opciones": {
      "A": "C++ y Java.",
      "B": "UML y OCL.",
      "C": "ASN.1 (Abstract Syntax Notation 1).",
      "D": "Python y JavaScript.",
      "E": "XML (SCL)."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "La capa de aplicación de IEC 61850 define servicios como **Reporting** (Reportes). ¿Qué servicio es utilizado por el cliente SCADA para obtener valores iniciales después de una desconexión, si la opción GI (General Interrogation) está habilitada?",
    "opciones": {
      "A": "SendReport.",
      "B": "SelectBeforeOperate.",
      "C": "SetEditSGValue.",
      "D": "InitiateGeneralInterrogation (GI).",
      "E": "Release."
    },
    "respuesta": "D"
  },
  {
    "pregunta": "El modelo de datos IEC 61850 incluye Data Attributes que pueden ser de tipo 'integer' o 'floating point'. ¿Cuál es el tipo de representación preferido y más común en muchas implementaciones para valores analógicos?",
    "opciones": {
      "A": "Integer (INT32) con factor de escala.",
      "B": "Floating Point (FLOAT32).",
      "C": "OctetString.",
      "D": "VisibleString.",
      "E": "Boolean."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "Cuando se realiza la inyección de información de prueba en un IED energizado, ¿qué bandera (flag) debe establecerse en el mensaje GOOSE o Sampled Value para que el IED receptor distinga la información simulada de la real y la procese si está configurado para ello?",
    "opciones": {
      "A": "StNum.",
      "B": "ConfRev.",
      "C": "La bandera Test (en Ed. 1) o Simulation (en Ed. 2).",
      "D": "ApplID.",
      "E": "SmpCnt."
    },
    "respuesta": "C"
  },
  {
    "pregunta": "En la jerarquía de la estandarización de IEC 61850, ¿dónde se definen todas las Clases de Datos Comunes (CDC) y las Clases de Atributos Construidos (CAC)?",
    "opciones": {
      "A": "Parte 7-4 (Logical Nodes).",
      "B": "Parte 7-3 (Common Data Classes).",
      "C": "Parte 6 (SCL).",
      "D": "Parte 7-2 (Servicios Abstractos).",
      "E": "Parte 8-1 (MMS/GOOSE)."
    },
    "respuesta": "B"
  },
  {
    "pregunta": "¿Qué mecanismo se utiliza para agrupar Data Attributes dentro de una CDC según su característica, por ejemplo, ST para estado o CF para configuración?",
    "opciones": {
      "A": "Logical Device (LD).",
      "B": "Data Object (DO).",
      "C": "Función de Tripping (PTRC).",
      "D": "Restricción Funcional (Functional Constraint, FC).",
      "E": "Clase de Atributo Construido (CAC)."
    },
    "respuesta": "D"
  }];

