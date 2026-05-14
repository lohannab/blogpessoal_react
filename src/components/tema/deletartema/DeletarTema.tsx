import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { Bounce, toast } from "react-toastify";

function DeletarTema() {
  const navigate = useNavigate();

  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      toast.warn("Você precisa estar logado! 🍄", { theme: "colored", transition: Bounce });
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarTema() {
    setIsLoading(true);
    try {
      await deletar(`/temas/${id}`, {
        headers: { Authorization: token },
      });
      toast.success("Tema excluído! 🍄", { theme: "colored", transition: Bounce });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        toast.error("Erro ao deletar o tema! 🐢", { theme: "colored", transition: Bounce });
      }
    }
    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/temas");
  }

  return (
    <div className="font-mario container w-full max-w-lg mx-auto py-12 px-4">
      <h1 className="text-5xl font-black text-center my-4 uppercase tracking-tighter text-red-600 drop-shadow-[3px_3px_0_rgba(0,0,0,1)]">
        AVISO!
      </h1>

      <p className="text-center font-bold mb-8 uppercase text-slate-700">
        Deseja mesmo apagar esse tema?
      </p>

      <div className="border-4 border-black bg-white shadow-[10px_10px_0_0_rgba(0,0,0,1)] overflow-hidden flex flex-col justify-between">
        
        <header className="py-2 px-6 bg-red-600 text-white font-black text-2xl border-b-4 border-black uppercase">
          Deletar Tema
        </header>

        <div className="p-8 bg-slate-100 flex flex-col items-center">
            <p className="text-[10px] uppercase text-slate-500 mb-2">Descrição do Tema:</p>
            <p className="text-lg md:text-xl text-center text-slate-900 break-all">
                {tema.descricao}
            </p>
        </div>

        <div className="flex border-t-4 border-black">
           <button
            className="w-full text-white bg-green-500 hover:bg-green-600 py-3 font-black uppercase border-r-4 border-black transition-colors"
            onClick={retornar}
          >
            Não
          </button>
          
          <button
            className="w-full text-white bg-red-500 hover:bg-red-700 flex items-center justify-center py-3 font-black uppercase transition-colors"
            onClick={deletarTema}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarTema;