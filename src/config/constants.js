import axios                           from 'axios'
import { ENDPOINTS, ENV, API_VERSION } from './env'

// Se usa para manejar una version, del estado de la aplicación,
// cuando se cambia, setea el storage del cliente por el estado por defecto.
export const STATE_VERSION = 0.1

// Constante para definir la edad minima del usuario para usar la app
// export const MAX_AGE = 18;

// Colores base de la aplicación
export const COLORS = {}

// Imagenes de toda la aplicacion separadas por categorias
export const IMG = {
  logo,
}

// Se genera la URL base de acuerdo a los endpoints del entorno
// Opcionalmente se puede usar versionamiento de la API
const {API} = ENDPOINTS

const API_URL = `${API[ENV]}/${API_VERSION}/`

// En dado caso que se use axios
axios.defaults.baseURL = API_URL
