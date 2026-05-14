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
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { Bounce, toast } from "react-toastify";

function FormPostagem() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);
  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const { id } = useParams<{ id: string }>();

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  async function buscarTemaPorId(id: string) {
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

  async function buscarTemas() {
    try {
      await buscar("/temas", setTemas, {
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
    buscarTemas();
    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate("/postagens");
  }

  async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const mensagemSucesso =
      id !== undefined ? "Postagem atualizada! 🍄" : "Postagem cadastrada! 🍄";

    if (id !== undefined) {
      try {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: { Authorization: token },
        });
        toast.success(mensagemSucesso, {
          transition: Bounce,
          theme: "colored",
        });
      } catch (error: any) {
        toast.error("Erro ao atualizar! 🐢", { theme: "colored" });
      }
    } else {
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: { Authorization: token },
        });
        toast.success(mensagemSucesso, {
          transition: Bounce,
          theme: "colored",
        });
      } catch (error: any) {
        toast.error("Erro ao cadastrar! 🐢", { theme: "colored" });
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoTema = tema.descricao === "";

  return (
    <div className="container flex flex-col mx-auto items-center py-8">
      <h1 className="text-5xl font-black uppercase tracking-tighter drop-shadow-[4px_4px_0_rgba(0,0,0,1)] text-yellow-400 mb-10">
        {id !== undefined ? "Editar Postagem" : "Nova Postagem"}
      </h1>

      <form
        className="flex flex-col w-full max-w-xl gap-6 p-8 border-4 border-black bg-white shadow-[10px_10px_0_0_rgba(0,0,0,1)]"
        onSubmit={gerarNovaPostagem}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo" className="font-black uppercase text-sm">
            Título da Postagem
          </label>
          <input
            type="text"
            placeholder="Ex: Como derrotar o Bowser..."
            name="titulo"
            required
            className="border-4 border-black p-3 font-bold focus:bg-yellow-50 outline-none transition-colors"
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="texto" className="font-black uppercase text-sm">
            Conteúdo da Aventura
          </label>
          <input
            type="text"
            placeholder="Escreva aqui seu texto..."
            name="texto"
            required
            className="border-4 border-black p-3 font-bold focus:bg-yellow-50 outline-none transition-colors"
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-black uppercase text-sm">Escolha o Mundo (Tema)</p>
          <select
            name="tema"
            id="tema"
            className="border-4 border-black p-3 font-bold bg-white cursor-pointer outline-none focus:border-green-600"
            onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
          >
            <option value="" selected disabled>
              Selecione um Tema
            </option>
            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {tema.descricao}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 border-4 border-black bg-[#F8D870] hover:bg-[#f3c11e] active:shadow-none active:translate-x-1 active:translate-y-1 text-black font-black uppercase py-4 shadow-[5px_5px_0_0_rgba(0,0,0,1)] flex justify-center items-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={carregandoTema}
        >
          {isLoading ? (
            <ClipLoader color="#000000" size={24} />
          ) : (
            <span className="flex items-center gap-2">
              {id === undefined
                ? "Iniciar Postagem"
                : "Atualizar Postagem"}
            </span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormPostagem;
