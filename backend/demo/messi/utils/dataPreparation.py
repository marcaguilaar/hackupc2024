import pandas as pd
from localSearch import busqueda_local, solucion_inicial_greedy

# Función para obtener, preparar y procesar los datos
def getData(filepath):
    # Leer el conjunto de datos desde el archivo CSV
    df = pd.read_csv(filepath)
    # Agrupar los viajes por ciudad de llegada
    grupos_por_ciudad = df.groupby('Arrival City')
    resultados = []

    # Aplicar búsqueda local para cada grupo de viajes por ciudad de llegada
    for ciudad, viajes in grupos_por_ciudad:
        print(f"Aplicando búsqueda local para los viajes a {ciudad}:")
        viajes_lista = viajes.to_dict('records')
        resultado_final = busqueda_local(solucion_inicial_greedy(viajes_lista))
        resultados.append((ciudad, resultado_final))
        print("Búsqueda local aplicada.\n")

    return resultados

def main():
    # Obtener los datos ya procesados y listos para ser usados o mostrados
    resultados_finales = getData("travel_dataset.csv")
    for ciudad, resultado in resultados_finales:
        print(f"Resultados para {ciudad}:")
        for grupo in resultado:
            print(grupo)
            print()

if __name__ == '__main__':
    main()
