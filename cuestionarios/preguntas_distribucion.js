/*Genérame un cuestionario de selección múltiple con 20 preguntas cada una con cinco opciones, con relación a poner aquí el tema dentro del documento, separando las preguntas de las respuestas, en formato de diccionario de javascript , así diccionario = { "pregunta": "texto del la pregunta", "respuesta": A, "opciones": {"A" : "texto opción A", "B" : "texto opción B", "C" : "texto opción C", "D" : "texto opción D", "E" : "texto opción E" } }
instrucciones para gemini
créame un formulario html/javascript que me permita interactuar sobre las siguientes preguntas seleccionando aleatoriamente de una en una*/

const preguntas = [
    {
        "pregunta": "Según la clasificación temporal de los fenómenos transitorios en un Sistema Eléctrico de Potencia (SEP), ¿cuál es el tiempo de duración de los fenómenos transitorios ultrarrápidos?",
        "respuesta": "A",
        "opciones": {
            "A" : "Pocos milisegundos después de iniciados [1]",
            "B" : "Varios segundos [no en las fuentes]",
            "C" : "Más de 5 minutos [no en las fuentes]",
            "D" : "Corresponde a fenómenos permanentes [no en las fuentes]",
            "E" : "Entre 1 y 5 ciclos [no en las fuentes]"
        }
    },
    {
        "pregunta": "¿Cuál es la principal razón para el estudio de los fenómenos transitorios ultrarrápidos, tales como las descargas atmosféricas y las operaciones de conexión/desconexión de líneas?",
        "respuesta": "C",
        "opciones": {
            "A" : "Definir la capacidad de ruptura de los interruptores [2]",
            "B" : "Determinar la Potencia de cortocircuito [3]",
            "C" : "Suministrar las bases necesarias para la selección adecuada del nivel de aislación de los equipos eléctricos asociados a las líneas y de las líneas mismas [1]",
            "D" : "Analizar las caídas de tensión post-falla en barras no falladas [4]",
            "E" : "Calcular las corrientes de secuencia cero en los transformadores [5]"
        }
    },
    {
        "pregunta": "¿Cuál tipo de cortocircuito es considerado el más severo dentro de un Sistema Eléctrico de Potencia (SEP)?",
        "respuesta": "C",
        "opciones": {
            "A" : "El monofásico, por su alta frecuencia de ocurrencia [2]",
            "B" : "El bifásico, por su complejidad de cálculo [no en las fuentes]",
            "C" : "El trifásico, porque alcanza valores elevados de corriente y reduce a cero la capacidad de transmisión de una línea [2]",
            "D" : "El monofásico a tierra, ya que produce sobretensiones en fases no falladas [6]",
            "E" : "El bifásico a tierra, por requerir el uso de tres redes de secuencia [7]"
        }
    },
    {
        "pregunta": "¿Cuál es el tipo de cortocircuito más frecuente en un SEP, representando aproximadamente el 75% de los casos?",
        "respuesta": "E",
        "opciones": {
            "A" : "El cortocircuito trifásico [2]",
            "B" : "El cortocircuito bifásico [2]",
            "C" : "La doble fase abierta [no en las fuentes]",
            "D" : "El cortocircuito bifásico a tierra [8]",
            "E" : "El cortocircuito monofásico [2]"
        }
    },
    {
        "pregunta": "Según las estadísticas de ocurrencia, ¿cuál es el tipo de cortocircuito menos frecuente en un SEP?",
        "respuesta": "A",
        "opciones": {
            "A" : "El trifásico (aproximadamente el 5% de los casos) [2]",
            "B" : "El monofásico (aproximadamente el 75% de los casos) [2]",
            "C" : "El bifásico (aproximadamente el 20% de los casos) [no en las fuentes]",
            "D" : "El cortocircuito entre dos fases a través de una impedancia [9]",
            "E" : "La falla de una fase abierta [10]"
        }
    },
    {
        "pregunta": "¿Cuál es uno de los objetivos principales del cálculo de cortocircuitos en un SEP?",
        "respuesta": "B",
        "opciones": {
            "A" : "Calcular la Potencia Activa (MW) y Reactiva (MVAr) recibida por un motor bajo falla [11]",
            "B" : "Definir la capacidad de ruptura de los interruptores necesarios en las diversas partes de un SEP [2]",
            "C" : "Determinar la caída longitudinal de tensión en la zona de falla [12]",
            "D" : "Calcular la Potencia de cortocircuito en barras no falladas [4]",
            "E" : "Determinar la Impedancia de secuencia cero de un transformador trifásico mediante su diagrama general [13]"
        }
    },
    {
        "pregunta": "Durante un cortocircuito trifásico simétrico en un SEP, ¿qué indican la magnitud de la caída de tensión en las barras no falladas?",
        "respuesta": "A",
        "opciones": {
            "A" : "Es una indicación de la capacidad del SEP para reaccionar frente al cortocircuito [4]",
            "B" : "Indica que la falla se autoextinguió [2]",
            "C" : "Mide la corriente instantánea del interruptor [14]",
            "D" : "Refleja la impedancia de Thevenin al cuadrado [15]",
            "E" : "Es directamente proporcional a la componente de corriente continua [15]"
        }
    },
    {
        "pregunta": "¿Qué nombre recibe la cantidad definida para medir la capacidad de un SEP para reaccionar frente a un cortocircuito y la severidad de la falla?",
        "respuesta": "D",
        "opciones": {
            "A" : "Tensión de Toque [16]",
            "B" : "Impedancia de Transferencia [17]",
            "C" : "Factor de Potencia [18]",
            "D" : "Potencia de cortocircuito, Capacidad de cortocircuito o nivel de falla [3]",
            "E" : "Corriente de secuencia positiva [7]"
        }
    },
    {
        "pregunta": "Para la selección de interruptores, la corriente instantánea se calcula utilizando las reactancias subtransientes de ciertos equipos. ¿Cuáles son estos equipos?",
        "respuesta": "B",
        "opciones": {
            "A" : "Solamente generadores [19]",
            "B" : "Generadores, motores sincrónicos y de inducción [14]",
            "C" : "Generadores y condensadores sincrónicos [19]",
            "D" : "Líneas de transmisión y transformadores [5, 20]",
            "E" : "Solo motores de inducción [19]"
        }
    },
    {
        "pregunta": "¿Qué tipo de reactancias se recomienda emplear en el cálculo de la corriente de interrupción de un cortocircuito, según las fuentes?",
        "respuesta": "A",
        "opciones": {
            "A" : "Reactancias subtransientes de los generadores, reactancias transientes de los motores y condensadores síncronos [19]",
            "B" : "Solo reactancias subtransientes para todos los equipos rotatorios [14]",
            "C" : "Reactancias de secuencia negativa y cero [21]",
            "D" : "Reactancias de estado estable (sincrónicas) [no en las fuentes]",
            "E" : "Reactancias de secuencia positiva y cero para motores de inducción [19]"
        }
    },
    {
        "pregunta": "En la selección de interruptores, ¿cuál componente de la corriente de cortocircuito debe tenerse en cuenta, además de la corriente simétrica?",
        "respuesta": "D",
        "opciones": {
            "A" : "La corriente de pre-falla (Ic) [22]",
            "B" : "La Potencia Activa (P) [23]",
            "C" : "La Potencia de Transferencia (Scc) [3]",
            "D" : "La componente de corriente continua [15]",
            "E" : "La corriente de excitación (I0) [24]"
        }
    },
    {
        "pregunta": "¿Cuál es la corriente que un interruptor debe ser capaz de interrumpir en el momento en que se abren sus contactos, y que requiere la aplicación de un factor que depende de la velocidad de operación?",
        "respuesta": "C",
        "opciones": {
            "A" : "Corriente instantánea [14]",
            "B" : "Corriente nominal [25]",
            "C" : "Corriente de interrupción [14]",
            "D" : "Corriente de precarga [22]",
            "E" : "Corriente simétrica de cortocircuito [15]"
        }
    },
    {
        "pregunta": "El Método de las Componentes Simétricas para el cálculo de cortocircuitos asimétricos se basa en el teorema de:",
        "respuesta": "D",
        "opciones": {
            "A" : "Teorema de Thevenin [15]",
            "B" : "Ley de Ohm [no en las fuentes]",
            "C" : "La Ley de Conservación de la Potencia [26]",
            "D" : "Teorema de Fortescue [7]",
            "E" : "Teorema de la Superposición [27]"
        }
    },
    {
        "pregunta": "Las componentes de secuencia positiva en sistemas trifásicos se caracterizan por:",
        "respuesta": "A",
        "opciones": {
            "A" : "Estar formadas por tres fasores de igual magnitud, desfasados 120º entre sí y con la misma secuencia de fase que el sistema original [7, 21]",
            "B" : "Estar formadas por tres fasores de igual magnitud, desfasados 120º entre sí y con la secuencia de fases opuesta [21]",
            "C" : "Estar formadas por tres fasores de igual módulo y con desfase nulo [21]",
            "D" : "Ser invariantes a la potencia compleja [26]",
            "E" : "Circular solo si el generador está puesto a tierra [28]"
        }
    },
    {
        "pregunta": "Si la secuencia de fase de los voltajes y las corrientes en el sistema original es $abc$, ¿cuál es la secuencia de fase de las componentes de secuencia negativa?",
        "respuesta": "C",
        "opciones": {
            "A" : "$abc$ (misma que la positiva) [21]",
            "B" : "$a0b0c0$ (desfase nulo) [21]",
            "C" : "$acb$ (opuesta a la de los fasores originales) [21]",
            "D" : "$a1b1c1$ [29]",
            "E" : "$a2b2c2$ [29]"
        }
    },
    {
        "pregunta": "En el análisis por componentes simétricas, ¿cómo se describe el conjunto de fasores de secuencia cero?",
        "respuesta": "D",
        "opciones": {
            "A" : "Tres fasores de igual módulo, desfasados 120º y con secuencia $acb$ [21]",
            "B" : "Tres fasores de diferente módulo y con desfase de 120º [no en las fuentes]",
            "C" : "Fasores que suman la corriente de neutro total [30]",
            "D" : "Tres fasores de igual módulo y con desfase nulo [21]",
            "E" : "Se utilizan únicamente para representar la caída de tensión [29]"
        }
    },
    {
        "pregunta": "Cuando se utiliza el método de componentes simétricas, cada componente del SEP (Generadores, líneas, transformadores) se representa por:",
        "respuesta": "A",
        "opciones": {
            "A" : "Tres circuitos equivalentes monofásicos, correspondientes a una secuencia determinada [26]",
            "B" : "Un único circuito equivalente trifásico [no en las fuentes]",
            "C" : "La impedancia de Thevenin únicamente [15]",
            "D" : "Un diagrama fasorial simplificado [22]",
            "E" : "La matriz de transformación [T] y su inversa [31, 32]"
        }
    },
    {
        "pregunta": "En las líneas de transmisión, ¿cuál es la relación típica entre las impedancias de secuencia?",
        "respuesta": "B",
        "opciones": {
            "A" : "$Z_0 = Z_1 = Z_2$ [no en las fuentes]",
            "B" : "$Z_1 = Z_2 \neq Z_0$ [20]",
            "C" : "$Z_0 = Z_1$ y $Z_2$ es variable [33]",
            "D" : "$Z_0 = 3 Z_1$ [34]",
            "E" : "$Z_0$ no se calcula en líneas de transmisión [20]"
        }
    },
    {
        "pregunta": "¿Qué consideración es necesaria para la impedancia de secuencia cero de una línea de transmisión en comparación con las secuencias positiva y negativa?",
        "respuesta": "C",
        "opciones": {
            "A" : "Solo depende del diámetro del conductor [35]",
            "B" : "Depende únicamente de la resistencia del conductor [36]",
            "C" : "Es necesario considerar tanto el efecto del retorno por tierra, como el de los conductores de guardia [20]",
            "D" : "La impedancia cero siempre es despreciable [no en las fuentes]",
            "E" : "Siempre debe ser modelada como cero [28]"
        }
    },
    {
        "pregunta": "¿En qué condición existirá la corriente de secuencia cero en un generador síncrono, según el modelo de circuitos equivalentes de secuencia?",
        "respuesta": "D",
        "opciones": {
            "A" : "Si opera en condiciones de carga balanceada [37]",
            "B" : "Solo si se usa la impedancia subtransiente [14]",
            "C" : "Nunca, ya que es un sistema balanceado [37]",
            "D" : "Solo si el generador está puesto a tierra, directamente o a través de una impedancia [28]",
            "E" : "Siempre que el generador esté entregando potencia reactiva [38]"
        }
    },
    {
        "pregunta": "¿Cuál es la barra de referencia utilizada para las redes de secuencia positiva y negativa de un generador síncrono?",
        "respuesta": "E",
        "opciones": {
            "A" : "La tierra del generador [30]",
            "B" : "La fase $a$ [21]",
            "C" : "La fase $c$ [29]",
            "D" : "La barra de referencia para todas las secuencias es la tierra [30]",
            "E" : "El neutro del generador [30]"
        }
    },
    {
        "pregunta": "En un transformador trifásico de dos enrollados que opera con carga desbalanceada, ¿cómo son los circuitos equivalentes de secuencia positiva y negativa?",
        "respuesta": "A",
        "opciones": {
            "A" : "Son iguales entre sí [5]",
            "B" : "El de secuencia positiva depende de $X_1$ y el de negativa de $X_2$, y son diferentes [39]",
            "C" : "Ambos son iguales a la impedancia de secuencia cero [5]",
            "D" : "El de secuencia positiva es la suma de los otros dos [29]",
            "E" : "El circuito de secuencia negativa es la inversa del positivo [32]"
        }
    },
    {
        "pregunta": "El valor de la impedancia de secuencia cero ($Z_0$) de un transformador trifásico de dos enrollados depende de:",
        "respuesta": "C",
        "opciones": {
            "A" : "Únicamente de la potencia nominal del transformador [40]",
            "B" : "Solamente del voltaje base del sistema [15]",
            "C" : "El tipo de conexión de los enrollados primario y secundario y de la existencia o no, de neutros conectados a tierra [5]",
            "D" : "El color de la etiqueta de consignación [41]",
            "E" : "El número de hilos del cable conductor [42]"
        }
    },
    {
        "pregunta": "En el caso de un cortocircuito monofásico a tierra (falla en fase $a$), ¿cuál es la relación entre las componentes simétricas de la corriente?",
        "respuesta": "B",
        "opciones": {
            "A" : "$I_{a0} + I_{a1} + I_{a2} = I_a$ [29]",
            "B" : "$I_{a0} = I_{a1} = I_{a2}$ [43]",
            "C" : "$I_{a1} = -I_{a2}$ y $I_{a0} = 0$ [44]",
            "D" : "$I_{a0} = -I_{a1}$ [no en las fuentes]",
            "E" : "$I_{a1} = 3 I_{a0}$ [34]"
        }
    },
    {
        "pregunta": "¿Qué condición de falla se describe por las siguientes ecuaciones en componentes de secuencia: $V_{a0} = 0$, $I_{a0} = 0$, $V_{a2} = 0$ y $I_{a1} + I_{a2} = 0$?",
        "respuesta": "C",
        "opciones": {
            "A" : "Cortocircuito monofásico a tierra [34, 43]",
            "B" : "Cortocircuito bifásico a tierra [8]",
            "C" : "Cortocircuito trifásico simétrico (balanceado) [27]",
            "D" : "Cortocircuito entre dos fases [44]",
            "E" : "Una fase abierta [45]"
        }
    },
    {
        "pregunta": "En el caso de un cortocircuito entre dos fases (fases $b$ y $c$), ¿cuál es la condición impuesta por la falla sobre las corrientes de línea?",
        "respuesta": "E",
        "opciones": {
            "A" : "$I_a = 0$, $I_b = I_c$ [43, 45]",
            "B" : "$I_a = I_b = I_c$ [27]",
            "C" : "$I_a = 3 I_{a0}$ [34]",
            "D" : "$I_a = 0$ y $V_b = V_c$ [45]",
            "E" : "$I_a = 0$ y $I_b + I_c = 0$ [44]"
        }
    },
    {
        "pregunta": "¿Cómo se define la caída de tensión en la regulación de tensión para cargas trifásicas en redes subterráneas, utilizando la corriente de carga $I_n$?",
        "respuesta": "A",
        "opciones": {
            "A" : "$\% \Delta V = \frac{\sqrt{3} \cdot L \cdot I_n \cdot ((R) \cos \phi + (X_L) \sin \phi)}{U} \cdot 100$ [36]",
            "B" : "$\% \Delta V = K \cdot P \cdot L$ [23]",
            "C" : "$\% \Delta V = \frac{2 \cdot L \cdot I_n \cdot ((R) \cos \phi + (X_L) \sin \phi)}{U} \cdot 100$ [46]",
            "D" : "$\% \Delta V = \frac{L \cdot I_n \cdot ((R) \cos \phi + (X_L) \sin \phi)}{U} \cdot 100$ [46]",
            "E" : "$\% \Delta V = \frac{\Delta P\% \cdot U}{P} \cdot 100$ [18]"
        }
    },
    {
        "pregunta": "¿Qué valor aproximado es usualmente utilizado para la Impedancia de Secuencia Cero ($Z_0$) en transformadores, en relación con la Impedancia de Secuencia Positiva ($Z_1$)?",
        "respuesta": "B",
        "opciones": {
            "A" : "$Z_0 \approx 0.5 \cdot Z_1$ [no en las fuentes]",
            "B" : "$Z_0 \approx 0.85 \cdot Z_1$ (rango 0.7-1.0) [33]",
            "C" : "$Z_0 \approx 2 \cdot Z_1$ [no en las fuentes]",
            "D" : "$Z_0 = Z_1$ solo para generadores [20]",
            "E" : "$Z_0$ siempre es despreciable [28]"
        }
    },
    {
        "pregunta": "En las redes subterráneas, ¿de qué depende la capacitancia por unidad de longitud de un conductor monopolar con respecto a la pantalla?",
        "respuesta": "A",
        "opciones": {
            "A" : "De las dimensiones de este y de la permitividad constante dieléctrica del aislamiento [42]",
            "B" : "De la resistividad térmica del suelo [47]",
            "C" : "De la corriente nominal y el factor de corrección por temperatura [48]",
            "D" : "Únicamente de la frecuencia del sistema (60 Hz en Colombia) [49]",
            "E" : "Del número de hilos que forman el conductor [42]"
        }
    },
    {
        "pregunta": "Según la Arquitectura de Redes y Protecciones de Media Tensión de EPSA, ¿cuál es el rango de tensión nominal definido para la red de Media Tensión (MT)?",
        "respuesta": "E",
        "opciones": {
            "A" : "115 kV a 230 kV [50]",
            "B" : "0 V a 1 kV [51]",
            "C" : "33 kV y 13.2 kV únicamente [52]",
            "D" : "Superior a 57.2 kV [51]",
            "E" : "Superior a 1 kV e inferior a 36 kV [53]"
        }
    },
    {
        "pregunta": "¿Qué es un 'Seccionador' o 'Cuchilla' en un sistema eléctrico?",
        "respuesta": "B",
        "opciones": {
            "A" : "Un equipo que tiene poder de corte de la intensidad nominal pero no capacidad de abrir con corrientes de cortocircuito [54]",
            "B" : "El elemento o equipo eléctrico que al ser operado permite tener certeza de la apertura de un circuito mediante una confirmación visual, diseñado para operar sin carga [55, 56]",
            "C" : "Un elemento capaz de abrir y cerrar bajo carga [52]",
            "D" : "Un autotransformador de relación variable con regulación automática [57]",
            "E" : "Un elemento que aísla una parte de la red al fundirse [58]"
        }
    },
    {
        "pregunta": "¿Cuál es la característica principal que distingue a un seccionalizador de un interruptor o seccionador?",
        "respuesta": "E",
        "opciones": {
            "A" : "Está diseñado para operar bajo carga [52]",
            "B" : "Tiene capacidad de cierre sobre cortocircuito [59]",
            "C" : "Tiene un alto nivel de aislamiento entre contactos abiertos [60]",
            "D" : "Debe tener un mínimo de 3 conteos de operación [61]",
            "E" : "No tiene capacidad de abrir con corrientes de cortocircuito, por lo que debe coordinar con un elemento de corte aguas arriba, y se coordina por cantidad de operaciones del elemento superior [54]"
        }
    },
    {
        "pregunta": "¿Qué equipo permite abrir, de forma monopolar, cuchillas bajo cierto nivel de carga extinguiendo el arco formado por dicha maniobra?",
        "respuesta": "D",
        "opciones": {
            "A" : "Seccionador (o cuchilla) de Puesta a Tierra [62]",
            "B" : "Seccionalizador [54]",
            "C" : "Interruptor de Potencia [2]",
            "D" : "Load Buster (Corta Carga) [52, 58, 60]",
            "E" : "Reconectador [59]"
        }
    },
    {
        "pregunta": "¿Qué es un 'Campo' o 'Bahía' en una subestación?",
        "respuesta": "A",
        "opciones": {
            "A" : "El conjunto de campos de potencia para seccionamiento o de interrupción que, al ser operados, modifican la conectividad de líneas, transformadores, etc. [63]",
            "B" : "El conjunto de conductores, barras, conectores y aisladores que sirven de nodo de enlace [63]",
            "C" : "Un autotransformador de relación variable [57]",
            "D" : "Un sector definido por un seccionalizador electrónico [64]",
            "E" : "El lugar donde se conectan las puestas a tierra portátiles [65]"
        }
    },
    {
        "pregunta": "¿Qué es una 'Nomenclatura Operativa'?",
        "respuesta": "E",
        "opciones": {
            "A" : "El protocolo de comunicación entre el Centro de Control y el Operador Móvil [66]",
            "B" : "La bitácora donde se registran las acciones realizadas [67]",
            "C" : "El código de enclavamiento mecánico de los seccionadores [68]",
            "D" : "El código Q utilizado en las comunicaciones [69]",
            "E" : "El código único de identificación de instalaciones y equipos del Sistema Eléctrico que permite diferenciarlos individualmente de cualquier otro similar [52, 70, 71]"
        }
    },
    {
        "pregunta": "Al realizar maniobras sobre un transformador en condiciones normales de operación, ¿cuál es la secuencia recomendada de apertura?",
        "respuesta": "C",
        "opciones": {
            "A" : "Primero el lado fuente (primario), luego el lado de carga (secundario) [72]",
            "B" : "Lado de mayor tensión a lado de menor tensión [73]",
            "C" : "Debe comenzar por el lado de carga (lado secundario) y el cierre por el lado fuente (lado primario) [72]",
            "D" : "La secuencia no importa, siempre que el interruptor esté abierto [74]",
            "E" : "Abrir primero los seccionadores de barra, luego el interruptor [74]"
        }
    },
    {
        "pregunta": "Para la desenergización de un circuito o equipo, ¿cuál es la primera de las 'Cinco Reglas de Oro' que debe aplicarse?",
        "respuesta": "A",
        "opciones": {
            "A" : "Corte visible [75, 76]",
            "B" : "Instalar tierras [75]",
            "C" : "Verificar ausencia de tensión [75]",
            "D" : "Señalización y delimitación de la zona de trabajo [75]",
            "E" : "Bloqueo (Condenación) [75, 76]"
        }
    },
    {
        "pregunta": "Según la secuencia de maniobras de desenergización de una línea, si la tensión de A es mayor o igual a la de B, ¿cuál es el primer paso de apertura?",
        "respuesta": "B",
        "opciones": {
            "A" : "Abrir los seccionadores a línea [77]",
            "B" : "Abrir los interruptores de las subestaciones A y B asociados a la línea [77]",
            "C" : "Bloquear eléctricamente los seccionadores [78]",
            "D" : "Cerrar los seccionadores de tierra [78]",
            "E" : "Verificar ausencia de tensión [78]"
        }
    },
    {
        "pregunta": "¿Cuál es la primera etapa sucesiva que contempla un proceso de maniobras?",
        "respuesta": "D",
        "opciones": {
            "A" : "Ejecutar la maniobra [79, 80]",
            "B" : "Prever posibles resultados adversos [80, 81]",
            "C" : "Controlar el resultado [68, 79]",
            "D" : "Planificar la maniobra [80, 81]",
            "E" : "Registrar las acciones realizadas [67, 82]"
        }
    },
    {
        "pregunta": "Al enfrentar una emergencia operacional, ¿cuál es el principio relacionado con la 'Serenidad ante emergencias' que implica tomar acciones que cumplan con la finalidad previamente concebida?",
        "respuesta": "A",
        "opciones": {
            "A" : "Actuar en forma reflexiva [83]",
            "B" : "Actuar sin prisa [83]",
            "C" : "Separar los eventos importantes de los secundarios [67]",
            "D" : "Aplicar la acción en forma decidida [67]",
            "E" : "Evitar las acciones basadas en suposiciones [83]"
        }
    },
    {
        "pregunta": "En el Protocolo de Comunicaciones Operativas (EPSA/CETSA/ZF/CELSIA), ¿quién es el 'Emisor' y qué debe indicar al iniciar la comunicación?",
        "respuesta": "A",
        "opciones": {
            "A" : "Es quien inicia la comunicación. Da un saludo formal e indica su nombre y empresa para la que labora [66]",
            "B" : "Es quien recibe el mensaje e indica la hora a partir de la cual se imparte el mensaje [66]",
            "C" : "Es el Centro de Control que espera la confirmación [66]",
            "D" : "Es el Operador Móvil que debe repetir la instrucción recibida [66]",
            "E" : "Es el CND que notifica una ocurrencia forzada [84]"
        }
    },
    {
        "pregunta": "En el Protocolo de Comunicaciones Operativas, si la información fue correctamente recibida y entendida por el receptor, ¿qué debe informar el Emisor como 'Aceptación'?",
        "respuesta": "B",
        "opciones": {
            "A" : "'Le recibo reporte de [Tipo de Evento]' [84]",
            "B" : "'Sí es correcto' [66]",
            "C" : "'¡Entendido!' [no en las fuentes]",
            "D" : "'Correcto' o 'Equivocado' [84]",
            "E" : "'QSL' (Confirmar recepción, en Código Q) [85]"
        }
    },
    {
        "pregunta": "¿Qué se debe realizar si el Centro de Control detecta un error en la marcación (nomenclatura operativa) de los equipos de maniobra en una subestación?",
        "respuesta": "C",
        "opciones": {
            "A" : "Se procede a ejecutar la maniobra, pero se registra el error [86]",
            "B" : "Se debe llamar inmediatamente al CND [87]",
            "C" : "El Centro de Control no procederá a la ejecución y/o aprobación de la maniobra si no hay confirmación y validación de la marcación [86]",
            "D" : "Se procede a corregir el error en el SCADA [88]",
            "E" : "Se deben abrir todas las cuchillas de puesta a tierra [65]"
        }
    },
    {
        "pregunta": "¿Cuál de las siguientes acciones se considera un paso necesario para 'preparar un campo o bahía' en una subestación, manteniéndose el interruptor abierto?",
        "respuesta": "D",
        "opciones": {
            "A" : "Cerrar el interruptor de línea antes de cerrar seccionadores [74]",
            "B" : "Abrir el seccionador de barra seguido del seccionador de línea [74]",
            "C" : "Desacoplar mecánicamente el interruptor del barraje principal [89]",
            "D" : "Cerrar el seccionador de barra seguido del seccionador de línea o del transformador [74]",
            "E" : "Abrir todas las cuchillas de puesta a tierra portátiles y permanentes [65]"
        }
    },
    {
        "pregunta": "¿Qué sucede si se maniobran los seccionadores bajo carga?",
        "respuesta": "E",
        "opciones": {
            "A" : "Se garantiza la continuidad del servicio [90]",
            "B" : "Se realiza la sincronización con el sistema [91]",
            "C" : "Se cumple la regla del corte visible [75]",
            "D" : "Se limita el valor de la corriente de cortocircuito [6]",
            "E" : "Se genera arco eléctrico el cual daña inmediatamente el seccionador [74]"
        }
    },
    {
        "pregunta": "En el contexto de la Arquitectura de Redes y Protecciones de MT de EPSA, ¿cómo se conecta rígidamente una derivada de circuito urbano a la troncal si es menor a 150 m?",
        "respuesta": "C",
        "opciones": {
            "A" : "Con seccionalizadores electrónicos [92]",
            "B" : "Con fusibles 30 K [93]",
            "C" : "Se conecta rígida a la troncal (aplica a lo largo de la derivada) [92]",
            "D" : "Con fusibles 15 K [94]",
            "E" : "Con un Load Buster [60]"
        }
    },
    {
        "pregunta": "Para circuitos rurales que tienen reconectadores, ¿cuántos intentos de recierre se deben programar para los reconectadores telecontrolados, según los criterios de EPSA?",
        "respuesta": "B",
        "opciones": {
            "A" : "3 intentos a 1, 30 y 60 segundos [61]",
            "B" : "2 intentos de recierre a 1 y 30 segundos [61]",
            "C" : "0 intentos (solo disparo final) [no en las fuentes]",
            "D" : "1 intento manual de prueba [95]",
            "E" : "4 intentos con exclusión de disparo a tierra [96]"
        }
    },
    {
        "pregunta": "En la configuración de 'Barra Principal y Barra de Transferencia', si la barra principal se divide por medio de un seccionador, ¿cuál es una posibilidad que esto brinda?",
        "respuesta": "A",
        "opciones": {
            "A" : "Se puede hacer mantenimiento de barras dejando sin servicio únicamente la mitad de la subestación, y aún se puede mantener en servicio, por medio del interruptor y la barra de transferencia, uno de los circuitos correspondientes a la barra que se quiere aislar [97]",
            "B" : "Elimina la necesidad de un interruptor de transferencia [97]",
            "C" : "Se convierte automáticamente en una configuración de Anillo Cruzado [98]",
            "D" : "Se logra la máxima seguridad y flexibilidad [97, 99]",
            "E" : "Se convierte en Doble Barra más Seccionador By-pass [100]"
        }
    },
    {
        "pregunta": "¿Cuál es la principal desventaja citada para la configuración de 'Barra Sencilla'?",
        "respuesta": "C",
        "opciones": {
            "A" : "Requiere un mayor número de equipos por campo [100]",
            "B" : "Es la más costosa de todas las configuraciones [98]",
            "C" : "Falta de confiabilidad, seguridad y flexibilidad, teniendo que suspender el servicio en forma total cuando se requiera hacer una revisión o reparación en la barra [99]",
            "D" : "Se limita a un máximo de seis salidas [101]",
            "E" : "Una falla en la barra exige transferir el interruptor por by-pass [102]"
        }
    },
    {
        "pregunta": "En el contexto de las configuraciones de subestaciones, ¿a qué tendencia principal pertenece la configuración de 'Barra Principal y de Transferencia'?",
        "respuesta": "D",
        "opciones": {
            "A" : "Tendencia Americana [103]",
            "B" : "Tendencia Malla [104]",
            "C" : "Tendencia Interruptor y Tres Cuartos [105]",
            "D" : "Tendencia Europea (Configuraciones de Conexión de Barras) [106, 107]",
            "E" : "Tendencia Anillo [101]"
        }
    },
    {
        "pregunta": "En la configuración de 'Doble Barra', ¿por qué el interruptor de acople debe tener la misma capacidad que las barras o la capacidad equivalente a la máxima transferencia posible?",
        "respuesta": "E",
        "opciones": {
            "A" : "Porque se usa para la sincronización de líneas [91]",
            "B" : "Porque es el elemento que se transfiere por By-pass [102]",
            "C" : "Es una exigencia exclusiva del Reglamento RETIE [47]",
            "D" : "Solamente se requiere capacidad para la mitad de la subestación [97]",
            "E" : "El interruptor de acople hace parte de los barrajes [108]"
        }
    },
    {
        "pregunta": "¿Qué requisito deben cumplir los reconectadores para que se consideren un elemento de protección y maniobra?",
        "respuesta": "B",
        "opciones": {
            "A" : "Que sean exclusivamente telecontrolados [61]",
            "B" : "Ser capaz de abrir y cerrar sobre corrientes de cortocircuito, y estar equipado con relés de apertura ajustables [59]",
            "C" : "Estar programado solo con 2 intentos de recierre a 1 y 30 segundos [61]",
            "D" : "Operar sin carga [55]",
            "E" : "Requerir materiales de repuesto ante cada actuación [109]"
        }
    },
    {
        "pregunta": "En las redes aéreas urbanas de MT, si una derivada es mayor a 150 m, pero está ubicada a menos de 3,0 km del interruptor de cabecera, ¿qué tipo de protección se debe instalar en el arranque?",
        "respuesta": "D",
        "opciones": {
            "A" : "Fusibles 30 K [93]",
            "B" : "Conexión rígida a la troncal [92]",
            "C" : "Fusibles 15 K [94]",
            "D" : "Seccionalizadores electrónicos [92]",
            "E" : "Fusibles 10 A [110]"
        }
    },
    {
        "pregunta": "La 'Arquitectura de Red de Distribución' tiene como finalidad establecer reglas y criterios para la ordenación y desarrollo de la red de Media Tensión. ¿Qué se busca como resultado de su aplicación?",
        "respuesta": "E",
        "opciones": {
            "A" : "Redes complejas que admitan múltiples puntos de alimentación [111]",
            "B" : "Solamente minimizar pérdidas [53]",
            "C" : "Solamente la Adaptabilidad al crecimiento vegetativo [53]",
            "D" : "Únicamente la segmentación de mercados [53]",
            "E" : "Redes sencillas y ordenadas que permitan una explotación ágil, segura y fiable [112]"
        }
    },
    {
        "pregunta": "¿Cuál es uno de los estados que puede tener una 'Consignación' que por motivos como falta de material o riesgo no planeado es necesario no ejecutar?",
        "respuesta": "B",
        "opciones": {
            "A" : "Ejecutándose [113]",
            "B" : "Cancelada [113]",
            "C" : "Ingresada [113]",
            "D" : "Reprogramada [113]",
            "E" : "Disponible [50]"
        }
    },
    {
        "pregunta": "¿Qué es la 'Nomenclatura Operativa' de un interruptor en el sistema de subestaciones, según la estructura de codificación?",
        "respuesta": "A",
        "opciones": {
            "A" : "Un código que incluye la identificación de la empresa propietaria, la unidad operativa, el nivel de tensión, la función del campo y la ubicación del interruptor [71, 114]",
            "B" : "Un número de 3 dígitos que indica el número del circuito [115]",
            "C" : "El número IEEE del relé asociado (e.g., 52) [116]",
            "D" : "La hora de la maniobra registrada en la bitácora [117]",
            "E" : "El código Q de comunicación [69]"
        }
    },
    {
        "pregunta": "En la inspección de transformadores, si la sílica gel se encuentra aproximadamente en un 70% de color rosado, ¿qué acción se debe tomar?",
        "respuesta": "D",
        "opciones": {
            "A" : "El transformador debe ser desconectado inmediatamente (disparo por temperatura) [118]",
            "B" : "Se debe cerrar el interruptor en modo prueba [119]",
            "C" : "Es una condición normal de operación [no en las fuentes]",
            "D" : "Debe reportarse al personal correspondiente para su reposición [120]",
            "E" : "Se debe revisar el nivel de aceite del cambiador de tomas [121]"
        }
    },
    {
        "pregunta": "En el Manual de Operación de Subestación, ¿cuál es la descripción de la Clase 3 de Alarmas?",
        "respuesta": "E",
        "opciones": {
            "A" : "Se refiere a un evento [122]",
            "B" : "Las que se refieren al sistema Hardware y Software [122]",
            "C" : "Las que exigen la intervención inmediata del asistente técnico [123]",
            "D" : "Las que se relacionan con fallas físicas en los equipos [123]",
            "E" : "Las que se refieren a exceder valores análogos de medida, por ejemplo: Sobrecarga, sobretemperatura, carga asimétrica, sobretensión, baja tensión [123]"
        }
    },
    {
        "pregunta": "Cuando se realizan pruebas de cierre o apertura de un interruptor, ¿qué procedimiento se debe seguir inicialmente en la bahía asociada?",
        "respuesta": "A",
        "opciones": {
            "A" : "Abrir primero el seccionador de barra, seguido del seccionador de línea [119]",
            "B" : "Cerrar primero el seccionador de barra, seguido del seccionador de línea [74]",
            "C" : "Cerrar primero el interruptor de línea [124]",
            "D" : "Sincronizar la tensión de la barra [91]",
            "E" : "Desacoplar mecánicamente el interruptor del barraje principal [89]"
        }
    },
    {
        "pregunta": "Para la maniobra de 'Transferir un interruptor por by-pass', ¿en qué tipo de bahías se realiza esta operación, según el Manual de Operación de Subestación Armenia?",
        "respuesta": "D",
        "opciones": {
            "A" : "Bahías de 115 kV [102]",
            "B" : "Bahías de 13,2 kV [102]",
            "C" : "Bahías de Servicios Auxiliares [125]",
            "D" : "Bahía de 33 kV de CHEC [102]",
            "E" : "Bahía de Línea Armenia-La Patria [126]"
        }
    },
    {
        "pregunta": "En el caso de un cortocircuito bifásico (entre las fases b y c), ¿cuál es la relación entre las componentes de secuencia del voltaje, suponiendo una impedancia de falla $Z_F$?",
        "respuesta": "C",
        "opciones": {
            "A" : "$V_{a0} = V_{a1} = V_{a2}$ [43]",
            "B" : "$V_{a1} = -V_{a2}$ y $V_{a0} = 0$ [no en las fuentes]",
            "C" : "$V_{a0} = 0$ y $V_{a1} + V_{a2} = -I_{a1} Z_F$ [44] (Nota: La fuente muestra la relación para corrientes: $I_{a1} + I_{a2} = 0$ y $V_{a1} + V_{a2} + I_{a1} Z_F = 0$, implicando $V_{a1} + V_{a2} = -I_{a1} Z_F$)",
            "D" : "$V_{a1} = V_{a2} = V_{a0}$ [43]",
            "E" : "$V_a = V_b = V_c$ [27]"
        }
    },
    {
        "pregunta": "El método general (sistemático) para el cálculo de cortocircuitos simétricos en sistemas de gran magnitud consiste en calcular directamente:",
        "respuesta": "A",
        "opciones": {
            "A" : "Las tensiones en los distintos nudos con ayuda de un modelo nodal de impedancias [27]",
            "B" : "Las corrientes en el punto de falla para luego repartirlas en todo el sistema [27]",
            "C" : "La matriz de transformación inversa [T]⁻¹ [32]",
            "D" : "La capacidad de ruptura de los seccionadores [54]",
            "E" : "Las corrientes y voltajes post-falla usando superposición de la situación pre-falla y la situación durante la falla [27]"
        }
    },
    {
        "pregunta": "Si un circuito rural tiene una derivada mayor a 1,0 km ubicada a menos de 5,0 km del reconectador, ¿con qué equipo de protección debe conectarse en el arranque?",
        "respuesta": "D",
        "opciones": {
            "A" : "Conexión rígida a la troncal [127]",
            "B" : "Seccionadores o Barrenos (DPF) [127]",
            "C" : "Fusibles de 5 K [128]",
            "D" : "Fusibles (XS) de 15 A [127]",
            "E" : "Seccionalizador electrónico $I_n = 45 A$ [128]"
        }
    },
    {
        "pregunta": "Según la Tendencia Europea, ¿cuál configuración se adapta muy bien a sistemas muy enmallados, permitiendo dividir sistemas y que la conexión a una u otra barra se pueda efectuar en cualquier momento?",
        "respuesta": "D",
        "opciones": {
            "A" : "Barra Sencilla [99]",
            "B" : "Interruptor y medio [98]",
            "C" : "Barra Principal y de Transferencia [97]",
            "D" : "Doble Barra [129]",
            "E" : "Anillo Cruzado [98]"
        }
    },
    {
        "pregunta": "¿Cómo se clasifican los seccionadores según su apertura?",
        "respuesta": "A",
        "opciones": {
            "A" : "De apertura vertical, de tres columnas o de rotación central, de apertura central, de pantógrafo o semipantógrafo [88]",
            "B" : "Aceite, SF6, Vacío [130]",
            "C" : "Trifásicos, Bifásicos, Monofásicos [2]",
            "D" : "Barra, línea y transferencia [131]",
            "E" : "Local y remoto [132]"
        }
    },
    {
        "pregunta": "¿Qué indica la sigla 'CND' en el contexto de la operación del sistema eléctrico?",
        "respuesta": "E",
        "opciones": {
            "A" : "Centro Nacional de Distribución [133]",
            "B" : "Centro Local de Distribución [133]",
            "C" : "Comisión Nacional de Despacho [no en las fuentes]",
            "D" : "Coordinación Nacional de Despacho [133]",
            "E" : "Centro Nacional de Despacho, encargado de la planeación, supervisión y control de la operación integrada de los recursos de generación, interconexión y transmisión del SIN [133, 134]"
        }
    },
    {
        "pregunta": "En el caso de una falla monofásica a tierra, ¿cómo se calcula la corriente de la fase 'a' ($I_a$)?",
        "respuesta": "B",
        "opciones": {
            "A" : "$I_a = \frac{E''}{Z_d + Z_e}$ [4]",
            "B" : "$I_a = \frac{3 \cdot V_{a(0)}}{Z_0 + Z_1 + Z_2 + 3 Z_F}$ [34]",
            "C" : "$I_a = I_{b} + I_{c}$ [44]",
            "D" : "$I_a = 0$ [44]",
            "E" : "$I_a = 3 I_{a0}$ [43]"
        }
    },
    {
        "pregunta": "¿Qué función cumple un 'Seccionador de Puesta a Tierra'?",
        "respuesta": "D",
        "opciones": {
            "A" : "Conectar líneas vivas al chasis [no en las fuentes]",
            "B" : "Servir de elemento de corte intermedio en líneas principales [135]",
            "C" : "Servir como elemento de maniobra bajo carga [52]",
            "D" : "Conectar las líneas de llegada a tierra cuando están desenergizadas [132]",
            "E" : "Actuar en conjunto con el relé diferencial [136]"
        }
    },
    {
        "pregunta": "¿Cuál es la función del Reconectador, además de la protección contra cortocircuitos y sobreintensidades?",
        "respuesta": "E",
        "opciones": {
            "A" : "Funcionar como un fusible de expulsión [58]",
            "B" : "Operar siempre sin carga [55]",
            "C" : "Regular la tensión en la línea [57]",
            "D" : "Transferir un interruptor por by-pass [102]",
            "E" : "Tener la función de reenganche automático, actuando en coordinación con el interruptor de cabecera [59]"
        }
    },
    {
        "pregunta": "¿Cuál es la designación de la alarma Clase 7 en el SCADA del Sistema de Control de Subestación?",
        "respuesta": "C",
        "opciones": {
            "A" : "Servicios auxiliares [137]",
            "B" : "Eventos [138]",
            "C" : "Comportamiento de las protecciones [139]",
            "D" : "Exceder valores análogos de medida [123]",
            "E" : "Acceso al sistema [137]"
        }
    },
    {
        "pregunta": "¿Qué representa el código 'L' en el carácter 7 de la nomenclatura operativa de barras, según las fuentes?",
        "respuesta": "C",
        "opciones": {
            "A" : "Acoplador [140]",
            "B" : "Transferencia de interruptores [140]",
            "C" : "Circuito de línea [141]",
            "D" : "Circuito de transformación [141]",
            "E" : "Seccionador de barras [140]"
        }
    },
    {
        "pregunta": "Si un cliente con alimentación alterna tiene una acometida definida como prioritaria, ¿en qué condición conmutará a la acometida de socorro, según las directrices para la alimentación alterna?",
        "respuesta": "D",
        "opciones": {
            "A" : "Si la impedancia de secuencia cero es menor a la positiva [20]",
            "B" : "Si la corriente de cortocircuito supera el valor nominal [2]",
            "C" : "El cliente siempre debe tomar carga de la acometida de socorro [142]",
            "D" : "En caso de falta de tensión en la acometida prioritaria [143]",
            "E" : "Cuando la operación de transferencia se realiza bajo carga [144]"
        }
    },
    {
        "pregunta": "¿Qué factor debe considerarse en el cálculo de la intensidad admisible de cortocircuito de cables, según el RETIE y la CREG 025, respecto al tiempo de despeje de las fallas?",
        "respuesta": "A",
        "opciones": {
            "A" : "El tiempo mínimo de despeje de fallas es de 0,3 segundos, pero se recomienda calcular la sección mínima con 1 segundo [145]",
            "B" : "Se recomienda siempre calcular con 0,1 segundos [no en las fuentes]",
            "C" : "Debe ser el tiempo máximo de duración del transitorio ultrarrápido [1]",
            "D" : "El tiempo de despeje es independiente de la sección del cable [145]",
            "E" : "Siempre se utiliza el tiempo de operación del interruptor de cabecera [59]"
        }
    },
    {
        "pregunta": "¿Cuál es el objetivo de los 'Equivalentes de Red' en sistemas con múltiples puntos de alimentación?",
        "respuesta": "D",
        "opciones": {
            "A" : "Determinar la Corriente de excitación I0 (secuencia cero) [24]",
            "B" : "Calcular la resistencia R basada en el factor m=X/R [146]",
            "C" : "Simular el comportamiento de transformadores con cambiador de taps [40]",
            "D" : "Reducir el sistema sombreado (la red a ser reducida) [111]",
            "E" : "Calcular directamente las tensiones en los distintos nudos con ayuda de un modelo nodal de impedancias [27]"
        }
    },
    {
        "pregunta": "Según la Tendencia Americana (Configuraciones de Conexión de Interruptores), ¿qué configuraciones proveen una mayor confiabilidad que las configuraciones de conexión de barras, debido a que cada circuito está conectado por dos interruptores en 'paralelo'?",
        "respuesta": "A",
        "opciones": {
            "A" : "Anillo, Interruptor y medio, y Doble barra con interruptor [98]",
            "B" : "Barra Sencilla y Doble Barra [99, 129]",
            "C" : "Barra Principal y Transferencia [107]",
            "D" : "Malla y Doble Transferencia [104, 147]",
            "E" : "Barra Sencilla Seccionada [99]"
        }
    },
    {
        "pregunta": "¿Cuál es la diferencia de potencial que, durante un defecto, puede resultar aplicada entre la mano y el pie de la persona que toca con aquella una masa o elemento metálico, normalmente sin tensión?",
        "respuesta": "D",
        "opciones": {
            "A" : "Tensión Nominal [16]",
            "B" : "Tensión de Paso [16]",
            "C" : "Tensión entre fases [16]",
            "D" : "Tensión de Toque o Contacto [16]",
            "E" : "Tensión en Vacío [63]"
        }
    },
    {
        "pregunta": "En el caso de las maniobras sobre líneas o circuitos, ¿cuál es la secuencia preferida de apertura y cierre respecto al nivel de tensión?",
        "respuesta": "C",
        "opciones": {
            "A" : "Apertura por el lado de menor tensión y cierre por el lado de mayor tensión [73]",
            "B" : "Apertura y cierre deben comenzar siempre por el lado de menor tensión [73]",
            "C" : "Apertura debe comenzar por el lado de mayor tensión y el cierre por el lado de menor tensión [73]",
            "D" : "La secuencia depende del número de circuitos en el apoyo [148]",
            "E" : "La secuencia siempre es abrir interruptor, abrir seccionadores, verificar ausencia de tensión [65, 77]"
        }
    },
    {
        "pregunta": "El concepto de 'Confiabilidad' en una red eléctrica se define como la probabilidad de que un elemento pueda suministrar energía, bajo la condición de que:",
        "respuesta": "A",
        "opciones": {
            "A" : "Al menos un componente de la red esté fuera de servicio [133]",
            "B" : "Todos los componentes operen simultáneamente [90]",
            "C" : "El seccionador de puesta a tierra esté cerrado [65]",
            "D" : "La corriente de secuencia cero sea nula [28]",
            "E" : "La subestación opere sin ningún seccionamiento longitudinal [99]"
        }
    },
    {
        "pregunta": "Cuando se tiene una Barra Principal y de Reserva o Transferencia, ¿qué número ordinal se asigna a la barra principal, según las convenciones de nomenclatura?",
        "respuesta": "D",
        "opciones": {
            "A" : "El número 3 [141]",
            "B" : "El número 0 [149]",
            "C" : "El número 2 [149]",
            "D" : "El número 1 [141, 149]",
            "E" : "El número 11 [150]"
        }
    },
    {
        "pregunta": "¿En qué consiste el 'Monitoreo' en una subestación?",
        "respuesta": "B",
        "opciones": {
            "A" : "En la inhabilitación del recierre automático [151]",
            "B" : "En realizar la adquisición de los valores de las variables de un sistema para ejercer funciones de supervisión y control [56]",
            "C" : "En la conexión y desconexión automática de bancos de condensadores [57]",
            "D" : "En la regulación de la tensión con el cambiador de tomas [152]",
            "E" : "En el proceso de conmutar un circuito a través de su campo de conexión [63]"
        }
    },
    {
        "pregunta": "¿Qué tipo de equipos de protección utiliza el Reconectador, según el manual de arquitectura de redes, para proteger la línea?",
        "respuesta": "E",
        "opciones": {
            "A" : "Relé de baja corriente o potencia (37) [153]",
            "B" : "Relé de ángulo entre fases (78) [154]",
            "C" : "Relé diferencial (87) [155]",
            "D" : "Relé de distancia (21) [156]",
            "E" : "Relés de apertura ajustables que protegen la línea contra cortocircuitos y sobreintensidades [59]"
        }
    },
    {
        "pregunta": "Según la Tendencia Europea, ¿qué tipo de configuración es la que requiere un mayor número de equipos por campo y presenta la más elevada posibilidad de operación incorrecta durante las maniobras?",
        "respuesta": "C",
        "opciones": {
            "A" : "Barra Sencilla [99]",
            "B" : "Barra Principal y de Transferencia [97]",
            "C" : "Doble barra más seccionador By-pass o paso directo [100]",
            "D" : "Anillo [101]",
            "E" : "Interruptor y Tres Cuartos [105]"
        }
    },
    {
        "pregunta": "Si en la maniobra de una línea, el otro extremo se encuentra desenergizado, ¿cuál es el paso de cierre recomendado?",
        "respuesta": "D",
        "opciones": {
            "A" : "No es posible cerrar, se requiere sincronismo [91]",
            "B" : "Abrir primero los seccionadores de barra [157]",
            "C" : "Se debe cerrar el interruptor de línea antes de cerrar seccionadores [74]",
            "D" : "Se puede proceder a energizar sin ningún problema [124]",
            "E" : "Se debe cerrar el seccionador de transferencia [144]"
        }
    },
    {
        "pregunta": "¿Cuál es la función del Inversor (u Ondulador) en los servicios auxiliares de una subestación?",
        "respuesta": "B",
        "opciones": {
            "A" : "Cargar las baterías convirtiendo AC a DC [63]",
            "B" : "Convertir la corriente continua (DC) en corriente alterna (AC) para respaldo de alimentación a cargas esenciales [130]",
            "C" : "Regular la tensión en la línea de MT [57]",
            "D" : "Detectar fallas internas del módulo SPAC [158]",
            "E" : "Actuar en conjunto con el relé diferencial [155]"
        }
    },
    {
        "pregunta": "Para la maniobra de 'Transferencia de un Campo a la Barra B' cuando se tiene barraje de transferencia (Ilustración 11), ¿cuál es uno de los primeros pasos a realizar?",
        "respuesta": "A",
        "opciones": {
            "A" : "Cerrar los seccionadores de Transferencia de barras [159]",
            "B" : "Abrir el interruptor del Transferencia de barras [159]",
            "C" : "Abrir el seccionador de la barra A [159]",
            "D" : "Cerrar el interruptor del Transferencia de barras y luego abrirlo [159]",
            "E" : "Verificar la corriente a través del acople [160]"
        }
    },
    {
        "pregunta": "Según la Tendencia Americana, ¿cuál configuración de conexión de interruptores, ideada por BBC, utiliza $n + n/2$ interruptores para $n$ nodos (par) y provee mayor disponibilidad al usar tres interruptores en 'paralelo'?",
        "respuesta": "E",
        "opciones": {
            "A" : "Barra Sencilla [103]",
            "B" : "Interruptor y Medio [98]",
            "C" : "Malla [104]",
            "D" : "Interruptor y Tres Cuartos [105]",
            "E" : "Anillo Cruzado [98]"
        }
    }
];
