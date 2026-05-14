import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import CardPostagem from "../cardpostagem/CardPostagem";
import { Bounce, toast } from "react-toastify";

function ListaPostagens() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [postagens, setPostagens] = useState<Postagem[]>([]);

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
    }
  }, [token]);

  useEffect(() => {
    buscarPostagens();
  }, [postagens.length]);

  async function buscarPostagens() {
    try {
      setIsLoading(true);

      await buscar("/postagens", setPostagens, {
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
    <>
      {isLoading && (
        <div className="flex flex-col justify-center items-center w-full my-12">
          <SyncLoader color="#ef4444" size={25} />
          <p className="font-black uppercase text-red-600 mt-4 animate-bounce">
            Buscando Postagens...
          </p>
        </div>
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col mx-4">
          
          {!isLoading && postagens.length === 0 && (
            <div className="flex flex-col items-center justify-center my-12 p-10 border-4 border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
              <span className="text-4xl font-black text-red-600 uppercase text-center">
                Mamma Mia! 
                <br />
                <span className="text-2xl text-black">Nenhuma postagem encontrada.</span>
              </span>
            </div>
          )}

          <div
            className="grid grid-cols-1 md:grid-cols-2 
                       lg:grid-cols-3 gap-10 mb-10"
          >
            {postagens.map((postagem) => (
              <CardPostagem key={postagem.id} postagem={postagem} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default ListaPostagens;