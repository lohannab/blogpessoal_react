import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

    const navigate = useNavigate(); // Hook do React Router para navegação programática

    const { usuario, handleLogout } = useContext(AuthContext)  // Acessa o contexto de autenticação para obter a função de logout do usuário

    function logout() {             // Função para lidar com o logout do usuário, que chama a função handleLogout do contexto de autenticação para limpar os dados do usuário e, em seguida, exibe um alerta informando que o usuário foi desconectado com sucesso e navega de volta para a página de login ("/") usando o hook useNavigate do React Router.

        handleLogout()
        alert('O Usuário foi desconectado com sucesso!')
        navigate('/')             // Navega para a página de login ("/") usando o hook useNavigate do React Router
    }

    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-indigo-900 text-white'>
            
                <div className="container flex justify-between text-lg mx-8">
                    <Link to='/home' className="text-2xl font-bold">Blog Pessoal</Link>
                    <img src={usuario.foto} alt="Foto do usuário" className="w-10 h-10 rounded-full" />
                    <p>Bem-vindo, {usuario.nome}!</p>

                    <div className='flex gap-4'>
                        Postagens
                        <Link to='/temas' className='hover:underline'>Temas</Link>
                        <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>
                         Perfil
                        <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar