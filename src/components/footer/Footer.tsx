import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react"
import { useContext, type ReactNode } from "react"
import { AuthContext } from "../../contexts/AuthContext"

function Footer() {

    let data = new Date().getFullYear()
    const { usuario } = useContext(AuthContext)

    let component: ReactNode
    
    if (usuario.token !== "") {
        component = ( 
            <div className="flex justify-center bg-[#5C94FC] text-white border-t-8 border-[#885040] shadow-[0_-4px_0_0_rgba(0,0,0,1)]">
                <div className="container flex flex-col items-center py-6">
                    
                    <p className='font-mario text-sm md:text-base uppercase tracking-normal drop-shadow-[2px_2px_0_rgba(0,0,0,1)]'>
                        Blog Pessoal Lohanna B | {data}
                    </p>
                    
                    <p className='font-mario text-[10px] uppercase mt-4 mb-4 opacity-90'>
                        Conecte-se com o Player 1
                    </p>

                    <div className='flex gap-6'>
                        <a href="https://www.linkedin.com/in/lohannab" target="_blank" 
                           className="hover:scale-125 transition-transform drop-shadow-[3px_3px_0_rgba(0,0,0,1)] text-yellow-400 hover:text-white">
                            <LinkedinLogo size={35} weight='bold' />
                        </a>
                        <a href="https://github.com/lohannab/" target="_blank" 
                           className="hover:scale-125 transition-transform drop-shadow-[3px_3px_0_rgba(0,0,0,1)] text-yellow-400 hover:text-white">
                            <GithubLogo size={35} weight='bold' />
                        </a>
                       
                    </div>

                    <div className="font-mario mt-6 text-[8px] md:text-[10px] uppercase tracking-widest opacity-70">
                      FIM
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            { component }
        </>
    )
}

export default Footer