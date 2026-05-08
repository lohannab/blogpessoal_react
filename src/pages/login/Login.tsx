import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";

function Login() {

    const navigate = useNavigate(); // Hook do React Router para navegação programática

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)  // Acessa o contexto de autenticação para obter o estado do usuário, a função de login e o estado de carregamento

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(  // Estado local para armazenar os dados de login do usuário, inicializado como um objeto vazio do tipo UsuarioLogin
        {} as UsuarioLogin  // O tipo é forçado a ser UsuarioLogin para evitar erros de tipo, mas inicialmente é um objeto vazio
    )

    useEffect(() => {                   // Efeito colateral que verifica se o usuário está autenticado (se o token não está vazio) e, se estiver, navega para a página "/home"
        if (usuario.token !== "") {  // Verifica se o token do usuário não está vazio, indicando que o usuário está autenticado
            navigate('/home')       // Navega para a página "/home" usando o hook useNavigate do React Router
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {  //    Função para atualizar o estado do usuárioLogin com base nas mudanças nos campos de entrada do formulário. Recebe um evento de mudança como argumento, que é do tipo ChangeEvent para um elemento de entrada HTML.
        setUsuarioLogin({                       // Atualiza o estado do usuárioLogin usando a função setUsuarioLogin. O estado é atualizado criando um novo objeto que mantém os valores anteriores de usuarioLogin e atualiza a propriedade correspondente ao campo de entrada que foi alterado (usando e.target.name para identificar qual campo foi alterado e e.target.value para obter o novo valor).
            ...usuarioLogin,                    // Mantém os valores anteriores de usuarioLogin usando o operador spread (...).
            [e.target.name]: e.target.value     // Atualiza a propriedade do estado correspondente ao campo de entrada que foi alterado, usando a sintaxe de propriedade computada para definir a chave do objeto com base no nome do campo de entrada (e.target.name) e atribuindo o novo valor (e.target.value).
        })
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">
                <form className="flex justify-center items-center flex-col w-1/2 gap-4" 
                    onSubmit={login}>

                    <h2 className="text-slate-900 text-5xl ">Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-slate-700 rounded p-2"
                            value = {usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value = {usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button 
                        type='submit' 
                        className="rounded bg-indigo-400 flex justify-center
                                   hover:bg-indigo-900 text-white w-1/2 py-2">
                        { isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={24}
                            /> : 
                            <span>Entrar</span>
                        }
                    </button>

                    <hr className="border-slate-800 w-full" />

                   <p>
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-indigo-800 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                 <div className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat 
                            w-full min-h-screen bg-cover bg-center"
                ></div>
            </div>
        </>
    );
}

export default Login;