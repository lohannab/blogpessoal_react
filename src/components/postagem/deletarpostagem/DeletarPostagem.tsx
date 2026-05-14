import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { Bounce, toast } from "react-toastify";

function DeletarPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      toast.warn("Você precisa estar logado! 🍄", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
        transition: Bounce,
      });   
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarPostagem() {
    setIsLoading(true);

    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      toast.success("Postagem excluída! 🍄", {
        theme: "colored",
        transition: Bounce,
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        toast.error("Erro ao deletar! 🐢", {
          theme: "colored",
          transition: Bounce,
        });
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/postagens");
  }

  return (
    <div className="container w-full max-w-lg mx-auto py-12 px-4">
      <h1 className="text-5xl font-black text-center my-4 uppercase tracking-tighter text-red-600 drop-shadow-[3px_3px_0_rgba(0,0,0,1)]">
        AVISO!
      </h1>

      <p className="text-center font-bold mb-8 uppercase text-slate-700">
        Deseja mesmo apagar essa postagem?
      </p>

      <div className="border-4 border-black flex flex-col overflow-hidden justify-between bg-white shadow-[10px_10px_0_0_rgba(0,0,0,1)]">
        <header className="py-2 px-6 bg-red-600 text-white font-black text-2xl border-b-4 border-black uppercase">
          Deletar Postagem
        </header>
        
        <div className="p-6 bg-slate-50">
          <p className="text-2xl font-black text-slate-800 uppercase mb-2">{postagem.titulo}</p>
          <p className="italic text-slate-600">{postagem.texto}</p>
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
            onClick={deletarPostagem}
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

export default DeletarPostagem;