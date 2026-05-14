import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { Bounce, toast } from "react-toastify";

function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate('/');
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        toast.success("Player registrado com sucesso! Bem-vindo ao jogo!", {
          theme: "colored",
          transition: Bounce,
        });
      } catch (error) {
        toast.error("Erro ao cadastrar! Verifique se os dados estão corretos.", {
          theme: "colored",
          transition: Bounce,
        });
      }
    } else {
      toast.warn("Dados inconsistentes! A senha precisa de no mínimo 8 caracteres e as senhas devem coincidir.", {
        theme: "colored",
        transition: Bounce,
      });
      setUsuario({ ...usuario, senha: '' });
      setConfirmarSenha('');
    }

    setIsLoading(false);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-mario">
      
      <div
        className="bg-[url('https://i.postimg.cc/jsVKrD72/cadastro.png')] lg:block hidden bg-no-repeat 
                   w-full min-h-screen bg-cover bg-center border-r-8 border-black shadow-[10px_0_0_0_rgba(0,0,0,0.2)]"
      ></div>

      <div className="flex justify-center items-center w-full p-4">
        <form 
          className='flex flex-col w-full max-w-md gap-4 p-8 border-4 border-black bg-white shadow-[12px_12px_0_0_rgba(0,0,0,1)]' 
          onSubmit={cadastrarNovoUsuario}
        >
          <h2 className='text-slate-900 text-3xl md:text-4xl text-center uppercase drop-shadow-[2px_2px_0_rgba(0,0,0,0.1)] mb-4'>
            Novo Player
          </h2>

          <div className="flex flex-col w-full">
            <label htmlFor="nome" className="text-xs uppercase mb-1">Nome Completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-black p-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all outline-none"
              value={usuario.nome}
              onChange={atualizarEstado}
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="usuario" className="text-xs uppercase mb-1">Email / Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="usuario@email.com"
              className="border-2 border-black p-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all outline-none"
              value={usuario.usuario}
              onChange={atualizarEstado}
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="foto" className="text-xs uppercase mb-1">Link da Foto (Avatar)</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="URL da imagem"
              className="border-2 border-black p-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all outline-none"
              value={usuario.foto}
              onChange={atualizarEstado}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="senha" className="text-xs uppercase mb-1">Senha (Mín. 8 chars)</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="********"
              className="border-2 border-black p-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all outline-none"
              value={usuario.senha}
              onChange={atualizarEstado}
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha" className="text-xs uppercase mb-1">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="********"
              className="border-2 border-black p-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all outline-none"
              value={confirmarSenha}
              onChange={handleConfirmarSenha}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-around w-full gap-4 mt-4">
            <button 
                type='button'
                className='border-2 border-black text-white bg-red-500 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-red-600 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none w-full py-2 uppercase text-xs transition-all'
                onClick={retornar}
             >
                Cancelar
            </button>
            <button 
                type='submit'
                className='border-2 border-black text-white bg-green-500 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-green-600 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none w-full py-2 flex justify-center uppercase text-xs transition-all' 
                >
                { isLoading ? 
                  <ClipLoader color="#ffffff" size={18} /> : 
                  <span>Cadastrar</span>
                }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;