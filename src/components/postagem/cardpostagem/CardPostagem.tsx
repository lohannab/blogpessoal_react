import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
    return (
        
        <div className='border-4 border-black flex flex-col overflow-hidden justify-between bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all'>
                
            <div>
               
                <div className="flex w-full bg-[#5C94FC] py-2 px-4 items-center gap-4 border-b-4 border-black">
                    <img
                        src={postagem.usuario?.foto}
                        className='h-12 w-12 rounded-full border-2 border-black bg-white'
                        alt={postagem.usuario?.nome} />
                    <h3 className='text-lg font-black text-white uppercase drop-shadow-[2px_2px_0_rgba(0,0,0,1)]'>
                        {postagem.usuario?.nome}
                    </h3>
                </div>

               
                <div className='p-4 font-bold text-slate-800'>
                    <h4 className='text-xl font-black uppercase text-red-600 mb-2'>{postagem.titulo}</h4>
                    <p className='mb-4 text-sm leading-relaxed'>{postagem.texto}</p>
                    
                    <div className='flex flex-col gap-1 text-xs uppercase'>
                        <span className='bg-yellow-400 border-2 border-black px-2 py-1 w-fit shadow-[2px_2px_0_0_rgba(0,0,0,1)]'>
                            Tema: {postagem.tema?.descricao}
                        </span>
                        <span className='text-slate-500 mt-2'>
                            📅 {new Intl.DateTimeFormat("pt-BR", {
                                dateStyle: 'short',
                                timeStyle: 'short',
                            }).format(new Date(postagem.data))}
                        </span>
                    </div>
                </div>
            </div>

        
            <div className="flex border-t-4 border-black">
                <Link to={`/editarpostagem/${postagem.id}`}
                    className='w-full text-white bg-green-500 hover:bg-green-600 flex items-center justify-center py-2 font-black uppercase border-r-4 border-black transition-colors'>
                    <button>Editar</button>
                </Link>
                <Link to={`/deletarpostagem/${postagem.id}`}
                    className='w-full text-white bg-red-500 hover:bg-red-600 flex items-center justify-center py-2 font-black uppercase transition-colors'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardPostagem