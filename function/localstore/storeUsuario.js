import { DescryptCualquierDato, EncryptCualquierDato } from "../util/ecrypt";
import { usuario_local } from "../util/global";


export function setDatosUsuario(data) {
    try {
        const strings = JSON.stringify(data)
        const use = EncryptCualquierDato(strings);
        localStorage.setItem(usuario_local,use)
        return true;
    } catch (error) {
        console.log(error);
    }
  }
export function getDatosUsuario() {
    try {
        const parse =DescryptCualquierDato(localStorage.getItem(usuario_local))
        const datos_usuario = JSON.parse(parse)
        return datos_usuario;
    } catch (error) {
        console.log(error);
    }
}
export function removeDatosUsuario() {
    try {
        localStorage.removeItem(usuario_local)
        return true;
    } catch (error) {
        console.log(error);
    }
}