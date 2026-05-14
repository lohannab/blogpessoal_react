import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import CardTema from "../cardtema/CardTema";
import { Bounce, toast } from "react-toastify";

function ListaTemas() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      toast.warn("Você precisa estar logado! ⭐", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", 
        transition: Bounce,
      });
      navigate("/");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
  }, [temas.length]);

  async function buscarTemas() {
    try {
      setIsLoading(true);
      await buscar("/temas", setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
   
    <div className="bg-gray-100 min-h-screen py-8">
     
      {isLoading && (
        <div className="flex flex-col items-center justify-center w-full my-8">
          <SyncLoader color="#ef4444" size={25} />
          <p className="font-black uppercase text-red-600 mt-4 animate-pulse">
            Carregando Temas...
          </p>
        </div>
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col mx-4">
          {!isLoading && temas.length === 0 && (
            <div className="flex flex-col items-center justify-center my-12 p-8 border-4 border-dashed border-slate-400">
              <span className="text-4xl font-black text-slate-500 uppercase text-center">
                Game Over! <br />
                <span className="text-xl">
                  Nenhum tema encontrado neste castelo.
                </span>
              </span>
            </div>
          )}

          <div
            className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-10"
          >
            {temas.map((tema) => (
              <CardTema key={tema.id} tema={tema} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListaTemas;
