from datetime import datetime, timedelta
from itertools import combinations
import random

class Grupo:
    def __init__(self, personas):
        self.personas = personas
        self.fechas_comunes = self.calcular_fechas_comunes()

    def calcular_fechas_comunes(self):
        fechas_comunes = None
        for persona in self.personas:
            fechas_persona = set(generar_rango_fechas(persona['Departure Date'], persona['Return Date']))
            if fechas_comunes is None:
                fechas_comunes = fechas_persona
            else:
                fechas_comunes.intersection_update(fechas_persona)
            if not fechas_comunes:  # Poda temprana si no hay fechas comunes
                break
        return fechas_comunes if fechas_comunes else set()

    def __str__(self):
        return f"Grupo de {len(self.personas)} personas: {self.personas}"

def generar_rango_fechas(start_date_str, end_date_str):
    start_date = datetime.strptime(start_date_str, "%d/%m/%Y")
    end_date = datetime.strptime(end_date_str, "%d/%m/%Y")
    return {start_date + timedelta(days=i) for i in range((end_date - start_date).days + 1)}

def solucion_inicial_greedy(personas):
    grupos_iniciales = []
    visitados = set()
    for persona in personas:
        if persona['Trip ID'] not in visitados:
            grupo_actual = [persona]
            fechas_actuales = set(generar_rango_fechas(persona['Departure Date'], persona['Return Date']))
            posibles_miembros = []

            # Buscar potenciales miembros del grupo
            for otra_persona in personas:
                if otra_persona['Trip ID'] not in visitados and otra_persona != persona:
                    fechas_otra = set(generar_rango_fechas(otra_persona['Departure Date'], otra_persona['Return Date']))
                    if fechas_actuales.intersection(fechas_otra):
                        posibles_miembros.append(otra_persona)
                        fechas_actuales.intersection_update(fechas_otra)

            # Solo formar el grupo si se alcanza el mínimo de 4 personas incluyendo la persona actual
            if len(posibles_miembros) >= 3:  # Ya hay 1 en grupo_actual, necesitamos al menos 3 más
                grupo_actual.extend(posibles_miembros)
                grupos_iniciales.append(Grupo(grupo_actual))
                for p in grupo_actual:
                    visitados.add(p['Trip ID'])

    return grupos_iniciales

def heuristica_grupo(grupo):
    num_personas = len(grupo.personas)
    dias_comunes = len(grupo.fechas_comunes)

    # Bonificaciones y penalizaciones
    bonificacion_base = 10 * num_personas
    bonificacion_dias_comunes = 20 * dias_comunes
    penalizacion_por_grupo_pequeno = -50 if num_personas < 4 else 0

    return bonificacion_base + bonificacion_dias_comunes + penalizacion_por_grupo_pequeno

def operador_anadir_grupo(todas_las_personas, todos_los_grupos):
    # Filtrar personas que no están en ningún grupo
    personas_sin_grupo = [p for p in todas_las_personas if not cualquier_grupo(p, todos_los_grupos)]
    
    if len(personas_sin_grupo) >= 4:  # Asegurarse de que haya suficientes personas para formar un nuevo grupo
        nuevas_personas = random.sample(personas_sin_grupo, 4)  # Seleccionar 4 personas aleatoriamente
        nuevo_grupo = Grupo(nuevas_personas)
        if es_viable(nuevo_grupo):
            todos_los_grupos.append(nuevo_grupo)
            print("Nuevo grupo añadido")
        else:
            print("No se pudo formar un grupo viable")
    else:
        print("No hay suficientes personas para formar un nuevo grupo")
    return todos_los_grupos

def operador_eliminar_grupo(todos_los_grupos):
    grupos_viables = []
    for grupo in todos_los_grupos:
        if es_viable(grupo) and len(grupo.personas) >= 4:
            grupos_viables.append(grupo)
        else:
            print("Grupo eliminado por no cumplir con los criterios mínimos")
    return grupos_viables


def cualquier_grupo(persona, todos_los_grupos):
    return any(persona in grupo.personas for grupo in todos_los_grupos)

def es_viable(grupo):
    # Asegurar que hay al menos un día en común entre las personas
    return len(grupo.fechas_comunes) > 0


def generar_sucesores(grupo, todas_las_personas, todos_los_grupos):
    sucesores = []
    # Intentar añadir nuevas personas
    personas_fuera = [p for p in todas_las_personas if p not in grupo.personas]
    for persona in personas_fuera:
        nuevo_grupo = Grupo(grupo.personas + [persona])
        if heuristica_grupo(nuevo_grupo) > heuristica_grupo(grupo):
            sucesores.append(nuevo_grupo)
    # Intentar eliminar personas
    for persona in grupo.personas:
        nuevo_grupo = Grupo([p for p in grupo.personas if p != persona])
        if heuristica_grupo(nuevo_grupo) > heuristica_grupo(grupo):
            sucesores.append(nuevo_grupo)

    # Operadores de añadir y eliminar grupos
    # todos_los_grupos = operador_anadir_grupo(todas_las_personas, todos_los_grupos)
    # todos_los_grupos = operador_eliminar_grupo(todos_los_grupos)
    return sucesores




def busqueda_local(grupos_iniciales):
    solucion_actual = grupos_iniciales
    mejor_valor = sum(heuristica_grupo(gr) for gr in solucion_actual)
    todas_las_personas = [persona for grupo in grupos_iniciales for persona in grupo.personas]

    for _ in range(100):  # Número de iteraciones
        for grupo in solucion_actual:
            sucesores = generar_sucesores(grupo, todas_las_personas, solucion_actual)  # Pasamos todos los grupos actuales
            for sucesor in sucesores:
                valor_sucesor = sum(heuristica_grupo(gr) for gr in sucesores)
                if valor_sucesor > mejor_valor:
                    solucion_actual = sucesores
                    mejor_valor = valor_sucesor
                    break
            else:
                continue
            break

    return solucion_actual