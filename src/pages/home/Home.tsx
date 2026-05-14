import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens";
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem";

function Home() {
    const { usuario } = useContext(AuthContext);

    return (
        <>
            <div 
                className="flex justify-center border-b-8 border-[#885040] shadow-xl min-h-[60vh] md:min-h-[80vh]"
                style={{ 
                    backgroundImage: "url('https://i.postimg.cc/zfKS4h5G/mariobros.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover", 
                    backgroundPosition: "center",
                }}
            >
                <div className='w-full flex justify-center bg-blue-900/40 md:bg-blue-900/20 px-4'>
                    <div className="container grid grid-cols-1 md:grid-cols-2 text-white items-center">
                        
                        <div className="flex flex-col gap-4 items-center md:items-start justify-center py-10 md:py-4">
                            
                            <h2 className='text-2xl md:text-4xl text-center md:text-left font-mario uppercase tracking-tighter drop-shadow-[4px_4px_0_rgba(0,0,0,1)] text-yellow-400'>
                                It's-a me, {usuario.nome.split(' ')[0]}!
                            </h2>
                            
                            <p className='font-mario text-xs md:text-base text-center md:text-left drop-shadow-[2px_2px_0_rgba(0,0,0,1)] px-4 md:px-0'>
                                Compartilhe algo novo!
                            </p>

                            <div className="font-mario flex gap-4 mt-4 bg-indigo-600">
                                 <div className="hover:scale-110 transition-transform active:translate-y-2 cursor-pointer shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                                    <ModalPostagem />
                                 </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            <div className="bg-gray-100 py-8 px-2 md:px-0">
                <ListaPostagens />
            </div>
        </>
    );
}

export default Home;