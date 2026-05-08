import { createContext, type ReactNode, useState } from "react"
import type UsuarioLogin from "../models/UsuarioLogin"
import { loginUsuario } from "../services/Service"

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    const [isLoading, setIsLoading] = useState(false) // Estado para controlar o carregamento durante o login

    async function handleLogin(usuarioLogin: UsuarioLogin) { //função assíncrona para lidar com o login do usuário
        setIsLoading(true)       // Ativa o estado de carregamento
        try {
            await loginUsuario(`/usuarios/logar`, usuarioLogin, setUsuario)  // Chama a função de login do serviço, passando a URL, os dados do usuário e a função para atualizar o estado do usuário
            alert("O Usuário foi autenticado com sucesso!")
        } catch (error) {
            alert("Os Dados do usuário estão inconsistentes!")
        }
        setIsLoading(false)
    }

    function handleLogout() {  //função para lidar com o logout do usuário, que simplesmente redefine o estado do usuário para um objeto vazio
        setUsuario({       // Redefine o estado do usuário para um objeto vazio
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>      
            {children}
        </AuthContext.Provider>    
    ) //Fornece o contexto de autenticação para os componentes filhos, passando o estado do usuário, as funções de login e logout, e o estado de carregamento
}