import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";

function Login() {

    const navigate = useNavigate();
    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-mario">
            
            <div className="flex justify-center items-center w-full p-4">
                <form 
                    className="flex flex-col w-full max-w-md gap-6 p-8 border-4 border-black bg-white shadow-[12px_12px_0_0_rgba(0,0,0,1)]" 
                    onSubmit={login}
                >
                    <h2 className="text-slate-900 text-3xl md:text-5xl text-center uppercase drop-shadow-[2px_2px_0_rgba(0,0,0,0.1)] mb-4">
                        Entrar
                    </h2>

                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario" className="text-xs uppercase mb-1">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Seu email"
                            className="border-2 border-black p-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all outline-none"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            required
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="senha" className="text-xs uppercase mb-1">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="********"
                            className="border-2 border-black p-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all outline-none"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            required
                        />
                    </div>

                    <button 
                        type='submit' 
                        className="bg-indigo-500 border-2 border-black text-white py-3 uppercase text-sm shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-indigo-700 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex justify-center items-center"
                    >
                        { isLoading ? 
                            <ClipLoader color="#ffffff" size={20} /> : 
                            <span>Press Start</span>
                        }
                    </button>

                    <hr className="border-t-2 border-slate-200 w-full" />

                    <p className="text-center text-[10px] md:text-xs uppercase leading-relaxed">
                        Ainda não tem uma conta? <br />
                        <Link to="/cadastro" className="text-indigo-600 hover:text-indigo-800 underline decoration-2 underline-offset-4">
                            Cadastre-se aqui
                        </Link>
                    </p>
                </form>
            </div>

            <div 
                className="bg-[url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK-4SjCap7dXDkJ3ZCRCPFTQifxtg5ozjIZkO6mgvVHxPw3BIZDPDkcGfl6OzblQSXCGoxtmlpoh_C0jI1lLkYnqzpLSvQ6GK8T-5U5QYnAh3MP_hb0dsFh7AwWvLF2sgG1SQyGXiRXMol/s1600/mapa.gif')] lg:block hidden bg-no-repeat 
                           w-full min-h-screen bg-cover bg-center border-l-8 border-black"
            >
                <div className="w-full h-full bg-blue-500/10"></div>
            </div>
        </div>
    );
}

export default Login;