import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { Bounce, toast } from "react-toastify"

function Perfil() {
    const navigate = useNavigate()
    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            toast.warn("Você precisa estar logado! 🍄", {
                theme: "colored",
                transition: Bounce,
            });
            navigate("/")
        }
    }, [usuario.token])

    return (
        <div className="flex justify-center items-center py-10 px-4">
            <div className="container max-w-2xl mx-auto border-4 border-black bg-white shadow-[12px_12px_0_0_rgba(0,0,0,1)] overflow-hidden">
                
                <div className="relative h-48 md:h-64 bg-[#5C94FC] border-b-4 border-black overflow-hidden flex items-center justify-center">
                    <img
                        className="w-full h-full object-cover opacity-60"
                        src="https://i.ytimg.com/vi/CWRkPPSMuPk/maxresdefault.jpg"
                        alt="Capa do Perfil"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mario text-white text-xl md:text-3xl drop-shadow-[3px_3px_0_rgba(0,0,0,1)] uppercase">
                            Player Status
                        </span>
                    </div>
                </div>

                <div className="relative flex justify-center -mt-16 md:-mt-24">
                    <img
                        className="rounded-full w-32 h-32 md:w-48 md:h-48 border-4 md:border-8 border-yellow-400 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] relative z-10 object-cover"
                        src={usuario.foto || "https://i.imgur.com/HeIi0wU.png"}
                        alt={`Foto de perfil de ${usuario.nome}`}
                    />
                </div>

                <div className="flex flex-col items-center justify-center py-8 px-4 gap-4 bg-slate-50">
                    
                    <div className="text-center">
                        <p className="font-mario text-[10px] md:text-xs text-slate-500 uppercase mb-2">Nome do Player</p>
                        <h2 className="font-mario text-lg md:text-2xl text-indigo-600 drop-shadow-[2px_2px_0_rgba(0,0,0,0.1)] uppercase">
                            {usuario.nome}
                        </h2>
                    </div>

                    <div className="text-center mt-4">
                        <p className="font-mario text-[10px] md:text-xs text-slate-500 uppercase mb-2">Email de Contato</p>
                        <p className="font-mario text-[8px] md:text-sm text-slate-700 bg-yellow-100 border-2 border-dashed border-yellow-600 px-4 py-2">
                            {usuario.usuario}
                        </p>
                    </div>

                    {/* Badge de Nível (Apenas Decorativo) */}
                    <div className="mt-6 flex gap-2">
                        <div className="bg-green-500 border-2 border-black px-3 py-1 text-white font-mario text-[8px] md:text-[10px] shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                            LVL 99
                        </div>
                        <div className="bg-red-500 border-2 border-black px-3 py-1 text-white font-mario text-[8px] md:text-[10px] shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                            HP MAX
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil