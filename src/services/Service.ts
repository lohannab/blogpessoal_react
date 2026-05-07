import axios from "axios";

const api = axios.create({
    baseURL: "https://blogpessoal-nest-jqt5.onrender.com/"
})

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}
export const loginUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}