import { useContext, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Bounce, toast } from "react-toastify";
import { List, X } from "@phosphor-icons/react"; // Importando ícones para o menu

function Navbar() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const [open, setOpen] = useState(false); // Estado para controlar o menu mobile

  function logout() {
    handleLogout();
    toast.success("Sessão encerrada!", {
      position: "top-right",
      autoClose: 5000,
      theme: "colored",
      transition: Bounce,
    });
    navigate("/");
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div className="w-full bg-[#5C94FC] text-white border-b-4 border-black shadow-[0_4px_0_0_rgba(0,0,0,0.2)] relative z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-4">
          
          <div className="flex items-center gap-2 md:gap-4">
            <img
              src="https://www.oqueninguemteconta.com.br/wp-content/uploads/2023/01/pixel-art-do-mario-bros.png.webp"
              alt="Logo"
              className="w-8 md:w-12 h-auto drop-shadow-[2px_2px_0_rgba(0,0,0,1)]"
            />
            <Link
              to="/home"
              className="font-mario text-lg md:text-2xl uppercase drop-shadow-[3px_3px_0_rgba(0,0,0,1)] hover:scale-105 transition-transform"
            >
              Mario Blog
            </Link>
          </div>

          <button 
            className="md:hidden text-white bg-black/20 p-1 border-2 border-white shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
          </button>

          <div className="hidden md:flex gap-6 font-mario uppercase text-xs lg:text-sm items-center">
            <Link to="/postagens" className="hover:text-yellow-400 transition-all">Postagens</Link>
            <Link to="/temas" className="hover:text-green-400 transition-all">Temas</Link>
            <Link to="/cadastrartema" className="hover:text-orange-400 transition-all">Novo Tema</Link>
            <Link to="/perfil" className="hover:text-red-400 transition-all">Perfil</Link>
            <button
              onClick={logout}
              className="bg-red-600 px-3 py-1 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all"
            >
              Sair
            </button>
          </div>
        </div>

        <div className={`${open ? "block" : "hidden"} md:hidden bg-[#5C94FC] border-t-4 border-black w-full font-mario text-[10px] uppercase`}>
          <div className="flex flex-col items-center gap-4 py-6">
            <Link to="/postagens" onClick={() => setOpen(false)} className="py-2 hover:text-yellow-400">Postagens</Link>
            <Link to="/temas" onClick={() => setOpen(false)} className="py-2 hover:text-green-400">Temas</Link>
            <Link to="/cadastrartema" onClick={() => setOpen(false)} className="py-2 hover:text-orange-400">Novo Tema</Link>
            <Link to="/perfil" onClick={() => setOpen(false)} className="py-2 hover:text-red-400">Perfil</Link>
            <button
              onClick={() => { logout(); setOpen(false); }}
              className="bg-red-600 px-6 py-2 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] mt-2"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{component}</>;
}

export default Navbar;