[SYSTEM_OVERRIDE]
MODE: STRICT_SCOPE
AUTO_CLEANUP: DISABLED
FILE_MODIFICATION_POLICY: EXPLICIT_ONLY

# DIABETESFLOW — Knowledge Base & Antigravity Assistant

## REGLAS DE EFICIENCIA Y PERSONALIDAD
- **Senior Persona:** Actúa como Tech Lead. Respuestas directas, técnicas y concisas.
- **Sin Preámbulos:** No saludes, no expliques lo que vas a hacer, solo hazlo.
- **Sin Comentarios:** **REGLA DE ORO: No incluyas comentarios internos en el código.** Código puro y limpio.
- **Gestión de Tokens:** No leas archivos completos si puedes usar `grep` o leer rangos. No releas archivos ya procesados en la sesión.
- **Validación:** Antes de dar una tarea por finalizada, verifica que el código compile o no rompa tipos de TypeScript.
- **PROHIBIDO MODIFICAR ARCHIVOS FUERA DE SCOPE:** Bajo ninguna circunstancia debes refactorizar, limpiar imports o aplicar formateos a archivos que no se te haya pedido modificar explícitamente. No dispares formateadores globales. Respeta el linter local.

## PARTE A: INSTRUCCIONES DE DESARROLLO

### Stack Tecnológico
- **Backend:** NestJS (TS), Prisma ORM, PostgreSQL (Dockerizado localmente en puerto 5440).
- **Frontend:** Next.js (React), TypeScript.
- **Infraestructura:** Antigravity CLI (agy) para desarrollo asistido aislado. Docker Compose para la base de datos.
- **Datos:** Gestión estricta de decimales nativos en Prisma para cálculos médicos e ingredientes.

### Estándares de Código
- Tipado estricto en TypeScript (evitar `any`).
- Desacoplamiento: Uso de `ConfigModule` de NestJS para variables de entorno (no usar `process.env` directamente en la lógica de negocio).
- Modularidad: Uso de módulos globales para conexiones transversales (ej. `PrismaModule` y su `PrismaService`).
- Archivos completos solo si el cambio es >80%. Si no, usar cambios parciales o inserciones quirúrgicas.

## PARTE B: KNOWLEDGE BASE (Lógica de Negocio)

### Arquitectura de Datos (Dominios Principales)
- **Usuarios y Configuración:** Separación estricta entre credenciales (`Users`) y configuración médica (`User_Settings`, `User_Ratios`). Los factores como el ICR (Insulina/Carbohidrato) y el ISF (Sensibilidad) varían por franja horaria.
- **Mediciones y Dosis:** Los registros de glucemia (`Glucose_Logs`) y las inyecciones de insulina (`Insulin_Logs`, distinguiendo entre Basal y Bolo) deben mantenerse en entidades separadas.
- **Alimentación (Cálculo de Macros):** Catálogo base de ingredientes (`Foods`), platos ingeridos (`Meals`) e ítems intermedios (`Meal_Items`). Los carbohidratos se calculan automáticamente sumando el cruce de gramos consumidos contra la proporción del ingrediente.
- **Contexto y Biometría:** Actividad física manejada con campos paralelos y opcionales (`duration_min` y `steps`) para soportar tanto rutinas medidas en minutos como el conteo pasivo de pasos del teléfono. 

### Procesos y Algoritmos Críticos (A Implementar)
- **Cálculo de Insulina Activa (IOB):** Algoritmo crítico. Seguimiento de la curva de acción de la insulina rápida inyectada (generalmente 3 a 4 horas) para evitar el *stacking* de dosis y prevenir hipoglucemias severas.
- **Calculadora de Bolos:** Motor que sugiere dosis tomando: glucemia actual, glucemia objetivo, carbohidratos de la comida, IOB restante, ICR e ISF.
- **Métricas de "Tiempo en Rango" (TIR):** Porcentaje del día en que los niveles de glucosa se mantienen dentro del `target_min` y `target_max` del usuario.

## HISTORIAL DE SESIONES
- **Sesión 2026-05-22:** Inicialización del proyecto base. Levantamiento de PostgreSQL en Docker solucionando choques de puertos (5440) y volúmenes. Estructuración del `schema.prisma` y adaptación a Prisma 7.8.0 mediante el archivo modular `prisma.config.mjs`. Implementación del servicio global `PrismaService` y securización de entorno mediante `@nestjs/config`.
- **Sesión 2026-05-22 (II):** Implementación de `PrismaService` extendiendo de `PrismaClient` con integración de ciclos de vida (`OnModuleInit`/`OnModuleDestroy`). Decoración global de `PrismaModule` y exportación de `PrismaService`. Integración de `ConfigModule` y refactorización de `PrismaService` para inyectar `ConfigService` de forma desacoplada y opcional para compatibilidad con Jest. Instalación del paquete `@nestjs/config`.
- **Sesión 2026-05-22 (III):** Implementación de métodos CRUD para la entidad `Foods` y endpoints REST. Implementación de servicio transaccional para `Meals` que calcula carbohidratos por ítem consumido usando proporciones de ingredientes, gestionando guardado en cascada. Inyección condicional mediante `@Optional()` para estabilidad de suite de tests. Archivos: `foods.service.ts`, `foods.controller.ts`, `meals.service.ts`, `meals.controller.ts`. Pendiente: Algoritmo IOB y Calculadora de Bolos.
- **Sesión 2026-05-22 (IV):** Implementación de CRUD para `Activities` soportando biometría opcional. Desarrollo de motor clínico en `CalculatorService` para cálculo de Insulina Activa (IOB) con decaimiento lineal y Sugerencia de Bolus integrando configuración metabólica. Refactorización estricta para eliminar comentarios internos en el código generado. Creación de `ActivitiesController` y `CalculatorController`. Archivos: `activities.service.ts`, `activities.controller.ts`, `calculator.service.ts`, `calculator.controller.ts`. Pendiente: Registro de controladores en módulos y métricas de Tiempo en Rango (TIR).
- **Sesión 2026-05-22 (V):** Implementación de analíticas en `MetricsService` calculando "Tiempo en Rango" (TIR) y generación de exportables CSV. Implementación de endpoints REST asociados en `MetricsController` forzando parseo de fechas por querystring y forzado de cabeceras HTTP con `express` manejando el bug TS1272 con importaciones estáticas de tipo. Archivos: `metrics.service.ts`, `metrics.controller.ts`. Pendiente: Integración general y Frontend.
- **Sesión 2026-05-22 (VI):** Configuración avanzada de conexión de base de datos en `PrismaService` integrando adaptador `PrismaPg` y `Pool` de `pg` para compatibilidad óptima. Activación de logs (`['error', 'warn', 'query']`). Habilitación de CORS global en la inicialización de la aplicación. Archivos: `src/prisma/prisma.service.ts`, `src/main.ts`. Pendiente: Integración general y Frontend.
- **Sesión 2026-05-22 (VII):** Implementación completa y estricta de CRUD REST para entidades `Food` y `Meal`. Refactorización de `FoodsService`, `FoodsController`, `MealsService` y `MealsController` asegurando tipado estricto, inyección directa de dependencias y limpieza total de comentarios internos. El método `create` de `MealsService` consolida el cálculo automático de carbohidratos mediante transacciones de Prisma. Archivos: `src/foods/foods.service.ts`, `src/foods/foods.controller.ts`, `src/meals/meals.service.ts`, `src/meals/meals.controller.ts`. Pendiente: Algoritmo IOB, Calculadora de Bolos e Integración Frontend.

## REGLA DE PERSISTENCIA (Bitácora de Sesión)
- Al finalizar una tarea o antes de cerrar el chat, te pediré: "Generá el Session Summary".
- Tu tarea es editar este mismo archivo (GEMINI.md) y añadir una entrada en la sección 'HISTORIAL DE SESIONES'.
- La entrada debe incluir: Fecha, Tarea realizada, Repositorios/Archivos afectados y cualquier Pendiente técnico.
- Mantén el formato técnico y minimalista, sin saludos.