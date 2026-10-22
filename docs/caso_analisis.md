# Caso de análisis Gestión de incidencias

## Requerimientos
- [front] Crear formulario incidencias con validaciones
- [front] Crear vista con listado paginado de incidencias
- [front] Crear vista detalle de incidencia
- [front] Implementar filtrado de incidencias
- [front] Implementar login
- [front] Implementar auth service
- [back] Implementar configuracion CORS
- [back] Implementar autenticacion y autorizacion por jwt
- [back] Implementar error handling middleware
- [back] Implementar endpoint POST /Ticket
- [back] Implementar endpoint POST /Comment

## Supuestos y preguntas
- Se asume que se consumira el servicio desde cualquier dispositivo moderno (smartphone, tablet, pc)
- En que navegadores se requiere que exista full compatibilidad/responsividad?
- Cuantos dias prefieren que dure el token de usuario? (Considerando minima seguridad)
- Cuales son los roles que se requieren para el proyecto y que permisos tienen?

## Modelos y diagramas
Ver fotos databasemodel.png y architecturediagram.png

## Estrategia
(Se asume proyecto helpdesk como base)
- Mapear entidades cuando se realizan GETS
- Agregar campo UpdatedBy para mejor seguimiento
- Agregar campo "Deleted" y "DeletedBy", no se borran de verdad porque es crucial el historial.
- Usar tinyint para Status y Priority, más eficiente
- Adicionalmente, implementar Index para Tabla Ticket campo Usuario, ya que se filtrarán comúnmente según usuario logeado o si se quiere consultar los de un usuario en especúfico y ver su avance
- Usar secretos para keys

## Integración con sistema de legado
Implementaría una API gateway de forma que sirve como punto de entrada para conectar todos los microservicios existentes, tanto los nuevos como los de legado. La aplicación de front usaría de ruta del back end la API Gateway y luego desde ahí navegaría hacia la API Helpdesk o sino hacia el servicio de legado donde finalmente se consume  el endpoint solicitado. Por su lado, la app de legado seguiría con su propio sistema.

## Manejo de errores
- 2 Backups de la base de datos a servicios distintos
- Prueba de restauracion de base de datos a partir de un backup
- Seguimiento de intentos de login fallidos mediante auditoria
- Monitoreo de métricas en servicio externo (Amazon, Azure)
- Integrar tabla para auditoria de errores del servidor

## ADRs

### JWT vs Otros metodos de auth
Si se va a implementar una API Gateway, lo mejor es utilizar JWT token con refresh cookies para la autenticación, ya que sirve tanto para clientes en navegador y no navegador lo cual nos va a servir para adaptar el sistema de legado, es sencillo de implementar y es ideal para aplicaciones que escalan de forma horizontal. Al final se logrará una app escalable, altamente configurable y con alta disponibilidad al usuario.

### EF vs Dapper
EF es generalmente considerado más "infalible", ya que las consultas realizadas con Dapper son básicamente sentencias de base de datos integradas en c#, entonces un typo o un cambio menor en la base de datos caería en un error de sistema. Además, con EF se logra un código más limpio y se puede mapear fácilmente a DTOs. Por último, la paginación es mucho más eficiente realizarla desde EF que desde Dapper, ya que limita la consulta que se ejecuta a la base de datos sin tener que escanear la tabla entera. Gracias a esto, se lograría un sistema eficiente para la carga requerida.

## Sprint plan
### User stories
#### Como usuario, quiero filtrar tickets, para así llevar seguimiento de mejor manera los tickets pendientes
- Criterio aceptación 1: Si no calza el filtro, mostrar mensaje de feedback
- Criterio aceptación 2: Usuario puede combinar varios filtros y paginados y ver el listado correcto segun los filtros ingresados


#### Como usuario, quiero crear tickets, para así informar de posibles incidencias
- Criterio aceptación 1: Usuario puede llenar formulario con validación correspondiente
- Criterio aceptación 2: Al enviar el formulario, se muestra una notifiación exitosa de la creación del ticket


#### Como usuario, quiero ver un ticket específico, para ver así el detalle y los comentarios del ticket en cuestión
- Criterio aceptación 1: Usuario puede clickear en un ticket en específico y puede ver un modal con la información detallada del ticket desplegada.
- Criterio aceptación 2: El listado de comentarios está ordenado de forma descendiente.


#### Como usuario, quiero comentar en un ticket en específico, para discutir los detalles de la incidencia
- Criterio aceptación 1: Al comentar se registra y muestra el usuario y timestamp del posteo. 
- Criterio aceptación 2: Si no existen comentarios en un ticket se muestra un feedback de "vacío"


#### Como usuario, quiero mover el estado de un ticket, para que se pueda ver el progreso
- Criterio aceptación 1: La edición del estado toma menos de 2 segundos.
- Criterio aceptación 2: Se muestra un mensaje de éxito al cambiar de estado un ticket

#### Como usuario, quiero ingresar al sitio de forma segura y ver solo los tickets asociados a mi rol
- Criterio aceptación 1: Los tickets mostrados están filtrados según el rol de la persona logeada.
- Criterio aceptación 2: Si el token no es válido, el backend debe entregar error 401.
- 





