// import axios from 'axios';
import { ENDPOINTS, ENV, API_VERSION } from './env'

// Colores base de la aplicación
export const COLORS = {}

// Imagenes de toda la aplicacion separadas por categorias
export const IMG = {}

// Se genera la URL base de acuerdo a los endpoints del entorno
// Opcionalmente se puede usar versionamiento de la API

const {URL} = ENDPOINTS
export const BASEURL = `${URL[ENV]}/${API_VERSION}/`

// En dado caso que se use axios
// axios.defaults.baseURL = BASEURL;
