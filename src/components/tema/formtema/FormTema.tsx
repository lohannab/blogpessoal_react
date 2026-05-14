import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { Bounce, toast } from "react-toastify";

function FormTema() {
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
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      toast.warn("Você precisa estar logado! It's-a me, Mario!", {
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

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/temas");
  }

  async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const textoSucesso = id !== undefined ? "Tema atualizado! 🍄" : "Tema cadastrado! 🍄";

    if (id !== undefined) {
      try {
        await atualizar(`/temas`, tema, setTema, {
          headers: { Authorization: token },
        });
        toast.success(textoSucesso, { theme: "colored", transition: Bounce });
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          toast.error("Erro ao atualizar! 🐢", { theme: "colored" });
        }
      }
    } else {
      try {
        await cadastrar(`/temas`, tema, setTema, {
          headers: { Authorization: token },
        });
        toast.success(textoSucesso, { theme: "colored", transition: Bounce });
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          toast.error("Erro ao cadastrar! 🐢", { theme: "colored" });
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto py-12">
      <h1 className="text-5xl font-black uppercase tracking-tighter drop-shadow-[4px_4px_0_rgba(0,0,0,1)] text-yellow-400 mb-10">
        {id === undefined ? "Novo Tema" : "Editar Tema"}
      </h1>

      <form 
        className="w-full max-w-md flex flex-col gap-6 p-8 border-4 border-black bg-white shadow-[10px_10px_0_0_rgba(0,0,0,1)]" 
        onSubmit={gerarNovoTema}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao" className="font-black uppercase text-sm">
            Descrição do Tema 
          </label>
          <input
            type="text"
            placeholder="Ex: Planície do Cogumelo"
            name="descricao"
            required
            className="border-4 border-black p-3 font-bold focus:bg-yellow-50 outline-none transition-all"
            value={tema.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <button
          className="mt-2 border-4 border-black bg-[#F8D870] hover:bg-[#f3c11e] active:shadow-none active:translate-x-1 active:translate-y-1 text-black font-black uppercase py-4 shadow-[5px_5px_0_0_rgba(0,0,0,1)] flex justify-center items-center transition-all"
          type="submit"
        >
          {isLoading ? (
            <ClipLoader color="#000000" size={24} />
          ) : (
            <span>{id === undefined ? "Cadastrar Tema" : "Salvar Alterações"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormTema;