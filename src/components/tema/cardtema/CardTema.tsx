import { Link } from 'react-router-dom'
import type Tema from '../../../models/Tema'

interface CardTemaProps {
    tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
    return (
        <div className=' border-4 border-black flex flex-col overflow-hidden justify-between bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)]'>
            
            <header className='py-2 px-6 bg-[#F8D870] text-black font-black text-2xl border-b-4 border-black uppercase tracking-tighter'>
                Tema
            </header>
            
            <div className='p-8 bg-slate-100 h-full flex items-center justify-center'>
                <p className='text-3xl font-bold text-center text-slate-800 drop-shadow-[1px_1px_0_rgba(0,0,0,0.1)]'>
                    {tema.descricao}
                </p>
            </div>
            
            <div className="flex border-t-4 border-black">
                <Link to={`/editartema/${tema.id}`} 
                    className='w-full text-white bg-green-500 hover:bg-green-700 
                        flex items-center justify-center py-2 font-black uppercase border-r-4 border-black transition-colors'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletartema/${tema.id}`} 
                    className='text-white bg-red-500 hover:bg-red-800 w-full 
                        flex items-center justify-center py-2 font-black uppercase transition-colors'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
    )
}

export default CardTema